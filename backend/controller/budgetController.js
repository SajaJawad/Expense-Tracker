const supabase = require("../config/supabase");

// Get user budget
exports.getBudget = async (req, res, next) => {
    try {
        const userId = req.user.id;

        const { data, error } = await supabase
            .from("budgets")
            .select("*")
            .eq("user_id", userId)
            .maybeSingle();

        if (error && error.code !== "PGRST116") {
            return next(error);
        }

        res.status(200).json(data || { amount: 0, userId });
    } catch (err) {
        next(err);
    }
};

// Set / Update user budget
exports.updateBudget = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const { amount } = req.body;

        if (amount === undefined || isNaN(amount) || Number(amount) < 0) {
            return res.status(400).json({ message: "Valid budget amount is required" });
        }

        const { data: existing } = await supabase
            .from("budgets")
            .select("id")
            .eq("user_id", userId)
            .maybeSingle();

        let result;
        if (existing) {
            const { data, error } = await supabase
                .from("budgets")
                .update({ amount: Number(amount) })
                .eq("user_id", userId)
                .select("*")
                .single();
            if (error) throw error;
            result = data;
        } else {
            const { data, error } = await supabase
                .from("budgets")
                .insert([{ user_id: userId, amount: Number(amount) }])
                .select("*")
                .single();
            if (error) throw error;
            result = data;
        }

        res.status(200).json({
            id: result.id,
            userId: result.user_id,
            amount: Number(result.amount)
        });
    } catch (err) {
        next(err);
    }
};
