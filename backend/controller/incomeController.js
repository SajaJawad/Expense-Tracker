const xlsx = require("xlsx");
const supabase = require("../config/supabase");

// Add Income source
exports.addIncome = async (req, res) => {
    const userId = req.user.id;

    try {
        const { icon, source, amount, date } = req.body;

        if (!source || !amount || !date) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const { data, error } = await supabase
            .from("incomes")
            .insert([
                {
                    user_id: userId,
                    icon,
                    source,
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
            source: data.source,
            amount: Number(data.amount),
            date: data.date,
            createdAt: data.created_at
        };

        res.status(200).json(formatted);
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

// Get All Income 
exports.getAllIncome = async (req, res) => {
    const userId = req.user.id;

    try {
        const { data, error } = await supabase
            .from("incomes")
            .select("*")
            .eq("user_id", userId)
            .order("date", { ascending: false });

        if (error) throw error;

        const formattedList = (data || []).map((item) => ({
            _id: item.id,
            id: item.id,
            userId: item.user_id,
            icon: item.icon,
            source: item.source,
            amount: Number(item.amount),
            date: item.date,
            createdAt: item.created_at
        }));

        res.json(formattedList);
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

// Delete Income  
exports.deleteIncome = async (req, res) => {
    try {
        const { error } = await supabase
            .from("incomes")
            .delete()
            .eq("id", req.params.id);

        if (error) throw error;

        res.json({ message: "Income deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

// Download Income Excel 
exports.downloadIncomeExcel = async (req, res) => {
    const userId = req.user.id;

    try {
        const { data, error } = await supabase
            .from("incomes")
            .select("*")
            .eq("user_id", userId)
            .order("date", { ascending: false });

        if (error) throw error;

        const dataForExcel = (data || []).map((item) => ({
            Source: item.source,
            Amount: Number(item.amount),
            Date: item.date
        }));

        const wb = xlsx.utils.book_new();
        const ws = xlsx.utils.json_to_sheet(dataForExcel);
        xlsx.utils.book_append_sheet(wb, ws, "Income");
        xlsx.writeFile(wb, "income_details.xlsx");
        res.download("income_details.xlsx");
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

