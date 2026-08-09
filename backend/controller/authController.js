
const supabase = require("../config/supabase");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// Generate JWT Token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1h" });
};

// Register User
const registerUser = async (req, res) => {
    const { fullName, email, password, profileImageUrl } = req.body;

    if (!fullName || !email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        const { data: existingUser } = await supabase
            .from("users")
            .select("id")
            .eq("email", email)
            .single();

        if (existingUser) {
            return res.status(400).json({ message: "Email already in use" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const { data: user, error } = await supabase
            .from("users")
            .insert([
                {
                    full_name: fullName,
                    email,
                    password: hashedPassword,
                    profile_image_url: profileImageUrl || null
                }
            ])
            .select("id, full_name, email, profile_image_url, created_at")
            .single();

        if (error) {
            throw error;
        }

        const formattedUser = {
            ...user,
            fullName: user.full_name,
            profileImageUrl: user.profile_image_url
        };

        res.status(201).json({
            id: user.id,
            user: formattedUser,
            token: generateToken(user.id)
        });
    } catch (err) {
        res.status(500).json({ message: "Error registering user", error: err.message });
    }
};

// Login User
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        const { data: user, error } = await supabase
            .from("users")
            .select("*")
            .eq("email", email)
            .single();

        if (error || !user) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        const formattedUser = {
            id: user.id,
            fullName: user.full_name,
            email: user.email,
            profileImageUrl: user.profile_image_url,
            createdAt: user.created_at
        };

        res.status(200).json({
            id: user.id,
            user: formattedUser,
            token: generateToken(user.id)
        });
    } catch (error) {
        res.status(500).json({
            message: "Error logging in",
            error: error.message
        });
    }
};

// Get User Info
const getUserInfo = async (req, res) => {
    try {
        const formattedUser = {
            id: req.user.id,
            fullName: req.user.full_name || req.user.fullName,
            email: req.user.email,
            profileImageUrl: req.user.profile_image_url || req.user.profileImageUrl,
            createdAt: req.user.created_at
        };
        res.status(200).json(formattedUser);
    } catch (error) {
        res.status(500).json({
            message: "Error fetching user info",
            error: error.message
        });
    }
};

// Update User Profile
const updateUserProfile = async (req, res) => {
    const { fullName, profileImageUrl } = req.body;

    try {
        const updates = {};
        if (fullName) updates.full_name = fullName;
        if (profileImageUrl !== undefined) updates.profile_image_url = profileImageUrl;

        const { data: user, error } = await supabase
            .from("users")
            .update(updates)
            .eq("id", req.user.id)
            .select("id, full_name, email, profile_image_url, created_at")
            .single();

        if (error) throw error;

        const formattedUser = {
            id: user.id,
            fullName: user.full_name,
            email: user.email,
            profileImageUrl: user.profile_image_url,
            createdAt: user.created_at
        };

        res.status(200).json({ message: "Profile updated successfully", user: formattedUser });
    } catch (error) {
        res.status(500).json({ message: "Error updating profile", error: error.message });
    }
};

module.exports = {
    registerUser,
    loginUser,
    getUserInfo,
    updateUserProfile
};
