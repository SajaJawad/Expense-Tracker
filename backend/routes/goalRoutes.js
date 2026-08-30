const express = require("express");
const { protect } = require("../middleware/authMiddelware");
const { getGoals, addGoal, updateGoal, deleteGoal } = require("../controller/goalController");

const router = express.Router();

router.get("/", protect, getGoals);
router.post("/", protect, addGoal);
router.put("/:id", protect, updateGoal);
router.delete("/:id", protect, deleteGoal);

module.exports = router;
