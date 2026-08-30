const express = require("express");
const { protect } = require("../middleware/authMiddelware");
const { getRecurring, addRecurring, deleteRecurring } = require("../controller/recurringController");

const router = express.Router();

router.get("/", protect, getRecurring);
router.post("/", protect, addRecurring);
router.delete("/:id", protect, deleteRecurring);

module.exports = router;
