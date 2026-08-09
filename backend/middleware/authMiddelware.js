const jwt = require("jsonwebtoken");
const supabase = require("../config/supabase");

exports.protect = async (req, res, next) => {
    let token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "Not authorized , no token" });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const { data: user, error } = await supabase
            .from("users")
            .select("id, full_name, email, profile_image_url, created_at")
            .eq("id", decoded.id)
            .single();

        if (error || !user) {
            return res.status(401).json({ message: "Not authorized, user not found" });
        }

        req.user = user;
        next();
    } catch (err) {
        res.status(401).json({ message: "Not authorized, token failed" });
    }
};