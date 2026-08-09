const xlsx = require("xlsx");
const supabase = require("../config/supabase");

// Add Expense source
exports.addExpense = async (req, res) => {
    const userId = req.user.id;

    try {
        const { icon, category, amount, date } = req.body;

        if (!category || !amount || !date) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const { data, error } = await supabase
            .from("expenses")
            .insert([
                {
                    user_id: userId,
                    icon,
                    category,
                    amount: Number(amount),
                    date: new Date(date).toISOString()
                }
            ])
            .select("*")
            .single();

        if (error) throw error;

        const formatted = {
            _id: data.id,
            id: data.id,
            userId: data.user_id,
            icon: data.icon,
            category: data.category,
            amount: Number(data.amount),
            date: data.date,
            createdAt: data.created_at
        };

        res.status(200).json(formatted);
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

// Get All Expense 
exports.getAllExpense = async (req, res) => {
    const userId = req.user.id;

    try {
        const { data, error } = await supabase
            .from("expenses")
            .select("*")
            .eq("user_id", userId)
            .order("date", { ascending: false });

        if (error) throw error;

        const formattedList = (data || []).map((item) => ({
            _id: item.id,
            id: item.id,
            userId: item.user_id,
            icon: item.icon,
            category: item.category,
            amount: Number(item.amount),
            date: item.date,
            createdAt: item.created_at
        }));

        res.json(formattedList);
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

// Delete Expense  
exports.deleteExpense = async (req, res) => {
    try {
        const { error } = await supabase
            .from("expenses")
            .delete()
            .eq("id", req.params.id);

        if (error) throw error;

        res.json({ message: "Expense deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

// Download Expense Excel 
exports.downloadExpenseExcel = async (req, res) => {
    const userId = req.user.id;

    try {
        const { data, error } = await supabase
            .from("expenses")
            .select("*")
            .eq("user_id", userId)
            .order("date", { ascending: false });

        if (error) throw error;

        const dataForExcel = (data || []).map((item) => ({
            Category: item.category,
            Amount: Number(item.amount),
            Date: item.date
        }));

        const wb = xlsx.utils.book_new();
        const ws = xlsx.utils.json_to_sheet(dataForExcel);
        xlsx.utils.book_append_sheet(wb, ws, "Expense");
        xlsx.writeFile(wb, "expense_details.xlsx");
        res.download("expense_details.xlsx");
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

