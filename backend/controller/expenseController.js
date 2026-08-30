const xlsx = require("xlsx");
const supabase = require("../config/supabase");

// Add Expense
exports.addExpense = async (req, res, next) => {
    const userId = req.user.id;

    try {
        let { icon, category, amount, date } = req.body;

        category = category ? String(category).trim() : "";
        const numericAmount = Number(amount);

        if (!category) {
            return res.status(400).json({ message: "Expense category is required" });
        }
        if (!amount || isNaN(numericAmount) || !isFinite(numericAmount) || numericAmount <= 0) {
            return res.status(400).json({ message: "Amount must be a valid number greater than 0" });
        }
        if (!date || isNaN(new Date(date).getTime())) {
            return res.status(400).json({ message: "A valid date is required" });
        }

        const { data, error } = await supabase
            .from("expenses")
            .insert([
                {
                    user_id: userId,
                    icon: icon || "",
                    category,
                    amount: numericAmount,
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

        res.status(201).json(formatted);
    } catch (error) {
        next(error);
    }
};

// Get All Expense with Search, Filter, Sort & Pagination
exports.getAllExpense = async (req, res, next) => {
    const userId = req.user.id;

    try {
        const {
            search = "",
            from = "",
            to = "",
            minAmount = "",
            maxAmount = "",
            category = "",
            sort = "newest",
            page = 1,
            limit = 100
        } = req.query;

        let query = supabase
            .from("expenses")
            .select("*", { count: "exact" })
            .eq("user_id", userId);

        if (search.trim()) {
            query = query.ilike("category", `%${search.trim()}%`);
        }
        if (category.trim()) {
            query = query.eq("category", category.trim());
        }
        if (from) {
            query = query.gte("date", new Date(from).toISOString());
        }
        if (to) {
            query = query.lte("date", new Date(to).toISOString());
        }
        if (minAmount && !isNaN(Number(minAmount))) {
            query = query.gte("amount", Number(minAmount));
        }
        if (maxAmount && !isNaN(Number(maxAmount))) {
            query = query.lte("amount", Number(maxAmount));
        }

        // Sorting
        switch (sort) {
            case "oldest":
                query = query.order("date", { ascending: true });
                break;
            case "highest":
                query = query.order("amount", { ascending: false });
                break;
            case "lowest":
                query = query.order("amount", { ascending: true });
                break;
            case "newest":
            default:
                query = query.order("date", { ascending: false });
                break;
        }

        // Pagination
        const pageNum = Math.max(1, parseInt(page, 10) || 1);
        const limitNum = Math.max(1, Math.min(500, parseInt(limit, 10) || 100));
        const fromIndex = (pageNum - 1) * limitNum;
        const toIndex = fromIndex + limitNum - 1;

        query = query.range(fromIndex, toIndex);

        const { data, count, error } = await query;
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

        res.json({
            data: formattedList,
            pagination: {
                page: pageNum,
                limit: limitNum,
                total: count || formattedList.length,
                totalPages: Math.ceil((count || formattedList.length) / limitNum)
            }
        });
    } catch (error) {
        next(error);
    }
};

// Update Expense with Ownership Check
exports.updateExpense = async (req, res, next) => {
    const userId = req.user.id;
    const { id } = req.params;

    try {
        let { icon, category, amount, date } = req.body;
        const updateData = {};

        if (icon !== undefined) updateData.icon = icon;
        if (category !== undefined) updateData.category = String(category).trim();
        if (amount !== undefined) {
            const numericAmount = Number(amount);
            if (isNaN(numericAmount) || !isFinite(numericAmount) || numericAmount <= 0) {
                return res.status(400).json({ message: "Amount must be a valid number greater than 0" });
            }
            updateData.amount = numericAmount;
        }
        if (date !== undefined) updateData.date = new Date(date).toISOString();

        const { data, error } = await supabase
            .from("expenses")
            .update(updateData)
            .eq("id", id)
            .eq("user_id", userId)
            .select("*")
            .single();

        if (error || !data) {
            return res.status(404).json({ message: "Expense transaction not found or unauthorized" });
        }

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

        res.json(formatted);
    } catch (error) {
        next(error);
    }
};

// Delete Expense with Ownership Check
exports.deleteExpense = async (req, res, next) => {
    const userId = req.user.id;
    const { id } = req.params;

    try {
        const { data, error } = await supabase
            .from("expenses")
            .delete()
            .eq("id", id)
            .eq("user_id", userId)
            .select("id");

        if (error) throw error;
        if (!data || data.length === 0) {
            return res.status(404).json({ message: "Expense transaction not found or unauthorized" });
        }

        res.json({ message: "Expense deleted successfully" });
    } catch (error) {
        next(error);
    }
};

// Download Expense Excel in memory
exports.downloadExpenseExcel = async (req, res, next) => {
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
            Date: new Date(item.date).toLocaleDateString()
        }));

        const wb = xlsx.utils.book_new();
        const ws = xlsx.utils.json_to_sheet(dataForExcel);
        xlsx.utils.book_append_sheet(wb, ws, "Expense");

        const excelBuffer = xlsx.write(wb, { type: "buffer", bookType: "xlsx" });

        res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
        res.setHeader("Content-Disposition", `attachment; filename=expense_details.xlsx`);
        res.send(excelBuffer);
    } catch (error) {
        next(error);
    }
};
