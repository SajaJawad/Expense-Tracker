const supabase = require("../config/supabase");

// Get all recurring transactions for user
exports.getRecurring = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const { data, error } = await supabase
            .from("recurring_transactions")
            .select("*")
            .eq("user_id", userId)
            .order("created_at", { ascending: false });

        if (error && error.code !== "PGRST116" && error.code !== "42P01") {
            return next(error);
        }

        const formatted = (data || []).map(item => ({
            _id: item.id,
            id: item.id,
            userId: item.user_id,
            title: item.title,
            type: item.type, // income or expense
            amount: Number(item.amount),
            frequency: item.frequency, // monthly, weekly, yearly
            categoryOrSource: item.category_or_source,
            icon: item.icon,
            nextDate: item.next_date,
            isActive: item.is_active !== false,
            createdAt: item.created_at
        }));

        res.status(200).json(formatted);
    } catch (err) {
        next(err);
    }
};

// Create recurring transaction
exports.addRecurring = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const { title, type, amount, frequency, categoryOrSource, icon, nextDate } = req.body;

        if (!title || !type || !amount || isNaN(amount) || Number(amount) <= 0 || !frequency) {
            return res.status(400).json({ message: "Title, type, valid amount (> 0) and frequency are required" });
        }

        const { data, error } = await supabase
            .from("recurring_transactions")
            .insert([{
                user_id: userId,
                title: title.trim(),
                type: type.toLowerCase() === "income" ? "income" : "expense",
                amount: Number(amount),
                frequency: frequency.toLowerCase(),
                category_or_source: categoryOrSource || "General",
                icon: icon || "",
                next_date: nextDate ? new Date(nextDate).toISOString() : new Date().toISOString(),
                is_active: true
            }])
            .select("*")
            .single();

        if (error) throw error;

        res.status(201).json({
            _id: data.id,
            id: data.id,
            userId: data.user_id,
            title: data.title,
            type: data.type,
            amount: Number(data.amount),
            frequency: data.frequency,
            categoryOrSource: data.category_or_source,
            icon: data.icon,
            nextDate: data.next_date,
            isActive: data.is_active,
            createdAt: data.created_at
        });
    } catch (err) {
        next(err);
    }
};

// Delete recurring transaction
exports.deleteRecurring = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const { id } = req.params;

        const { error } = await supabase
            .from("recurring_transactions")
            .delete()
            .eq("id", id)
            .eq("user_id", userId);

        if (error) throw error;

        res.status(200).json({ message: "Recurring transaction deleted successfully" });
    } catch (err) {
        next(err);
    }
};
