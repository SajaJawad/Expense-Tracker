const express = require("express");
const { protect } = require("../middleware/authMiddelware");
const { getBudget, updateBudget } = require("../controller/budgetController");

const router = express.Router();

router.get("/", protect, getBudget);
router.post("/", protect, updateBudget);

module.exports = router;
