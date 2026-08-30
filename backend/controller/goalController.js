const supabase = require("../config/supabase");

// Get all goals for user
exports.getGoals = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const { data, error } = await supabase
            .from("goals")
            .select("*")
            .eq("user_id", userId)
            .order("created_at", { ascending: false });

        if (error && error.code !== "PGRST116" && error.code !== "42P01") {
            return next(error);
        }

        const formatted = (data || []).map(g => ({
            _id: g.id,
            id: g.id,
            userId: g.user_id,
            title: g.title,
            targetAmount: Number(g.target_amount),
            currentAmount: Number(g.current_amount || 0),
            targetDate: g.target_date,
            createdAt: g.created_at
        }));

        res.status(200).json(formatted);
    } catch (err) {
        next(err);
    }
};

// Create new goal
exports.addGoal = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const { title, targetAmount, currentAmount, targetDate } = req.body;

        if (!title || !targetAmount || isNaN(targetAmount) || Number(targetAmount) <= 0) {
            return res.status(400).json({ message: "Title and a valid target amount (> 0) are required" });
        }

        const { data, error } = await supabase
            .from("goals")
            .insert([{
                user_id: userId,
                title: title.trim(),
                target_amount: Number(targetAmount),
                current_amount: Number(currentAmount || 0),
                target_date: targetDate ? new Date(targetDate).toISOString() : null
            }])
            .select("*")
            .single();

        if (error) throw error;

        res.status(201).json({
            _id: data.id,
            id: data.id,
            userId: data.user_id,
            title: data.title,
            targetAmount: Number(data.target_amount),
            currentAmount: Number(data.current_amount),
            targetDate: data.target_date,
            createdAt: data.created_at
        });
    } catch (err) {
        next(err);
    }
};

// Update goal
exports.updateGoal = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const { id } = req.params;
        const { title, targetAmount, currentAmount, targetDate } = req.body;

        const updateData = {};
        if (title) updateData.title = title.trim();
        if (targetAmount !== undefined) updateData.target_amount = Number(targetAmount);
        if (currentAmount !== undefined) updateData.current_amount = Number(currentAmount);
        if (targetDate !== undefined) updateData.target_date = targetDate ? new Date(targetDate).toISOString() : null;

        const { data, error } = await supabase
            .from("goals")
            .update(updateData)
            .eq("id", id)
            .eq("user_id", userId)
            .select("*")
            .single();

        if (error || !data) {
            return res.status(404).json({ message: "Goal not found or unauthorized" });
        }

        res.status(200).json({
            _id: data.id,
            id: data.id,
            userId: data.user_id,
            title: data.title,
            targetAmount: Number(data.target_amount),
            currentAmount: Number(data.current_amount),
            targetDate: data.target_date,
            createdAt: data.created_at
        });
    } catch (err) {
        next(err);
    }
};

// Delete goal
exports.deleteGoal = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const { id } = req.params;

        const { error } = await supabase
            .from("goals")
            .delete()
            .eq("id", id)
            .eq("user_id", userId);

        if (error) throw error;

        res.status(200).json({ message: "Goal deleted successfully" });
    } catch (err) {
        next(err);
    }
};
