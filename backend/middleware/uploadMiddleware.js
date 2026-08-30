const multer = require("multer");

// Use memory storage for seamless Vercel / serverless cloud deployment
const storage = multer.memoryStorage();

// File filter (image/jpeg, image/png, image/webp)
const fileFilter = (req, file, cb) => {
    const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/webp'];
    if (allowedMimeTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('Only .jpeg, .jpg, .png and .webp formats are allowed'), false);
    }
};

const upload = multer({
    storage,
    fileFilter,
    limits: { fileSize: 5 * 1024 * 1024 } // 5 MB max size
});

module.exports = upload;
