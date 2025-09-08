const User = require("../models/User")
const Income = require("../models/Income")

//Add Income source
exports.addIncome = async (req, res) => {
    const userId = req.user.id;

    try {
        const { icon, source, amount, date } = req.body

        //Validation: Check for missing fields
        if (!source || !amount || !date) {
            return res.status(400).json({ message: "All fields are required" })
        }
        const newIncome = new Income({
            userId,
            icon,
            source,
            amount,
            date: new Date(date)
        })
        await newIncome.save();
        res.status(200).json(newIncome);

    } catch (error) {
        res.status(500).json({ message: "Server Error" })
    }

}



//Get All Income 
exports.getAllIncome = async (req, res) => {
    const userId = req.user.id;

    try {
        const income = await Income.find({ userId }).sort({ date: -1 })
        res.json(income)
    } catch (error) {
        res.status(500).json({ message: "Server Error" })
    }
}


//Delete Income  
exports.deleteIncome = async (req, res) => {

    try {
        await Income.findByIdAndDelete(req.params.id);
        res.json({ message: "Income deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server Error" })
    }
}


//Download Income Excel 
exports.downloadIncomeExcel = async (req, res) => { }
