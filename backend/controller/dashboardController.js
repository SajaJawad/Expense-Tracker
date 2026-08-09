const supabase = require("../config/supabase");

// Dashboard Data
exports.getDashboardData = async (req, res) => {
    try {
        const userId = req.user.id;

        // Fetch all incomes for total calculation
        const { data: allIncomes, error: incErr } = await supabase
            .from("incomes")
            .select("*")
            .eq("user_id", userId);
        if (incErr) throw incErr;

        // Fetch all expenses for total calculation
        const { data: allExpenses, error: expErr } = await supabase
            .from("expenses")
            .select("*")
            .eq("user_id", userId);
        if (expErr) throw expErr;

        const totalIncomeVal = (allIncomes || []).reduce((sum, item) => sum + Number(item.amount), 0);
        const totalExpenseVal = (allExpenses || []).reduce((sum, item) => sum + Number(item.amount), 0);

        // Get income transactions in the last 60 days
        const sixtyDaysAgo = new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString();
        const { data: incomeLast60, error: inc60Err } = await supabase
            .from("incomes")
            .select("*")
            .eq("user_id", userId)
            .gte("date", sixtyDaysAgo)
            .order("date", { ascending: false });
        if (inc60Err) throw inc60Err;

        const formattedIncome60 = (incomeLast60 || []).map(item => ({
            _id: item.id,
            id: item.id,
            userId: item.user_id,
            icon: item.icon,
            source: item.source,
            amount: Number(item.amount),
            date: item.date,
            createdAt: item.created_at
        }));

        const incomeLast60DaysTotal = formattedIncome60.reduce((sum, item) => sum + item.amount, 0);

        // Get expense transactions in the last 30 days
        const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString();
        const { data: expenseLast30, error: exp30Err } = await supabase
            .from("expenses")
            .select("*")
            .eq("user_id", userId)
            .gte("date", thirtyDaysAgo)
            .order("date", { ascending: false });
        if (exp30Err) throw exp30Err;

        const formattedExpense30 = (expenseLast30 || []).map(item => ({
            _id: item.id,
            id: item.id,
            userId: item.user_id,
            icon: item.icon,
            category: item.category,
            amount: Number(item.amount),
            date: item.date,
            createdAt: item.created_at
        }));

        const expenseLast30DaysTotal = formattedExpense30.reduce((sum, item) => sum + item.amount, 0);

        // Fetch recent 5 incomes and 5 expenses
        const { data: recentIncomes } = await supabase
            .from("incomes")
            .select("*")
            .eq("user_id", userId)
            .order("date", { ascending: false })
            .limit(5);

        const { data: recentExpenses } = await supabase
            .from("expenses")
            .select("*")
            .eq("user_id", userId)
            .order("date", { ascending: false })
            .limit(5);

        const lastTransactions = [
            ...(recentIncomes || []).map(item => ({
                _id: item.id,
                id: item.id,
                userId: item.user_id,
                icon: item.icon,
                source: item.source,
                amount: Number(item.amount),
                date: item.date,
                type: "income"
            })),
            ...(recentExpenses || []).map(item => ({
                _id: item.id,
                id: item.id,
                userId: item.user_id,
                icon: item.icon,
                category: item.category,
                amount: Number(item.amount),
                date: item.date,
                type: "expense"
            }))
        ].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 5);

        res.json({
            totalBalance: totalIncomeVal - totalExpenseVal,
            totalIncome: totalIncomeVal,
            totalExpense: totalExpenseVal,
            last30DaysExpense: {
                total: expenseLast30DaysTotal,
                transactions: formattedExpense30
            },
            last60DaysIncome: {
                total: incomeLast60DaysTotal,
                transactions: formattedIncome60
            },
            recentTransactions: lastTransactions
        });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};