const express = require("express");
const { protect } = require("../middleware/authMiddelware");
const { registerUser, loginUser, getUserInfo, updateUserProfile } = require("../controller/authController");
const upload = require("../middleware/uploadMiddleware");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/getUser", protect, getUserInfo);
router.put("/update-profile", protect, updateUserProfile);

// Protect image upload endpoint (converts buffer to portable base64 data URL)
router.post("/upload-image", protect, upload.single("image"), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
    }

    // Convert file buffer to portable data URL (works 100% on Vercel, Supabase, Render, Localhost)
    const base64Data = req.file.buffer.toString("base64");
    const imageUrl = `data:${req.file.mimetype};base64,${base64Data}`;

    res.status(200).json({ imageUrl });
});

module.exports = router;
