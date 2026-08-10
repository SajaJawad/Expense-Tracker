const express = require('express');

const {
    addExpense,
    getAllExpense,
    updateExpense,
    deleteExpense,
    downloadExpenseExcel
} = require('../controller/expenseController');


const { protect } = require('../middleware/authMiddelware');

const router = express.Router();

router.post('/add', protect, addExpense);
router.get('/get', protect, getAllExpense);
router.get('/downloadexcel', protect, downloadExpenseExcel);
router.put('/:id', protect, updateExpense);
router.delete('/:id', protect, deleteExpense);

module.exports = router;