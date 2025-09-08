const express = require("express");
const {
    addIncome,
    getAllIncome,
    deleteIncome,
    downloadIncomeExcel
}= require("../controller/incomeController");
const { protect } = require("../middleware/authMiddelware");

const router = express.Router();

router.post("/add", protect , addIncome)
router.post("/get", protect , getAllIncome)
router.post("/downloadexcel", protect , downloadIncomeExcel)
router.post("/:id", protect , deleteIncome)

module.exports=router