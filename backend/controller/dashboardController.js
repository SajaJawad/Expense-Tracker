const supabase = require("../config/supabase");

exports.getDashboardData = async (req, res, next) => {
    try {
        const userId = req.user.id;

        // Parallel fetching for performance
        const [allIncomesRes, allExpensesRes, budgetRes] = await Promise.all([
            supabase.from("incomes").select("*").eq("user_id", userId).order("date", { ascending: false }),
            supabase.from("expenses").select("*").eq("user_id", userId).order("date", { ascending: false }),
            supabase.from("budgets").select("*").eq("user_id", userId).maybeSingle()
        ]);

        if (allIncomesRes.error) throw allIncomesRes.error;
        if (allExpensesRes.error) throw allExpensesRes.error;

        const allIncomes = allIncomesRes.data || [];
        const allExpenses = allExpensesRes.data || [];
        const budgetObj = budgetRes.data || { amount: 0 };
        const monthlyBudget = Number(budgetObj.amount || 0);

        // Overall Totals
        const totalIncomeVal = allIncomes.reduce((sum, item) => sum + Number(item.amount), 0);
        const totalExpenseVal = allExpenses.reduce((sum, item) => sum + Number(item.amount), 0);
        const totalBalanceVal = totalIncomeVal - totalExpenseVal;

        // Current & Previous Month dates calculation
        const now = new Date();
        const startOfCurrentMonth = new Date(now.getFullYear(), now.getMonth(), 1);
        const startOfPrevMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
        const endOfPrevMonth = new Date(now.getFullYear(), now.getMonth(), 0, 23, 59, 59);

        // Filter current month
        const currentMonthIncomes = allIncomes.filter(i => new Date(i.date) >= startOfCurrentMonth);
        const currentMonthExpenses = allExpenses.filter(e => new Date(e.date) >= startOfCurrentMonth);

        const currentMonthIncomeTotal = currentMonthIncomes.reduce((sum, i) => sum + Number(i.amount), 0);
        const currentMonthExpenseTotal = currentMonthExpenses.reduce((sum, e) => sum + Number(e.amount), 0);
        const currentMonthNetSavings = currentMonthIncomeTotal - currentMonthExpenseTotal;
        const currentMonthSavingsRate = currentMonthIncomeTotal > 0 
            ? Math.max(0, Math.round((currentMonthNetSavings / currentMonthIncomeTotal) * 100))
            : 0;

        // Filter previous month
        const prevMonthIncomes = allIncomes.filter(i => {
            const d = new Date(i.date);
            return d >= startOfPrevMonth && d <= endOfPrevMonth;
        });
        const prevMonthExpenses = allExpenses.filter(e => {
            const d = new Date(e.date);
            return d >= startOfPrevMonth && d <= endOfPrevMonth;
        });

        const prevMonthIncomeTotal = prevMonthIncomes.reduce((sum, i) => sum + Number(i.amount), 0);
        const prevMonthExpenseTotal = prevMonthExpenses.reduce((sum, e) => sum + Number(e.amount), 0);

        // Calculate Month-over-Month % change
        const calcPercentChange = (current, previous) => {
            if (previous === 0) return current > 0 ? 100 : 0;
            return Math.round(((current - previous) / previous) * 100);
        };

        const incomeGrowth = calcPercentChange(currentMonthIncomeTotal, prevMonthIncomeTotal);
        const expenseGrowth = calcPercentChange(currentMonthExpenseTotal, prevMonthExpenseTotal);

        // Category Breakdown for current month
        const categoryMap = {};
        allExpenses.forEach(exp => {
            const cat = exp.category || "Other";
            categoryMap[cat] = (categoryMap[cat] || 0) + Number(exp.amount);
        });

        const categoryBreakdown = Object.keys(categoryMap).map(cat => ({
            category: cat,
            amount: categoryMap[cat],
            percentage: totalExpenseVal > 0 ? Math.round((categoryMap[cat] / totalExpenseVal) * 100) : 0
        })).sort((a, b) => b.amount - a.amount);

        // 6-Month Cash Flow Data
        const cashFlowData = [];
        for (let i = 5; i >= 0; i--) {
            const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
            const monthLabel = d.toLocaleString("default", { month: "short" });
            const startStr = new Date(d.getFullYear(), d.getMonth(), 1);
            const endStr = new Date(d.getFullYear(), d.getMonth() + 1, 0, 23, 59, 59);

            const mIncomes = allIncomes
                .filter(item => { const date = new Date(item.date); return date >= startStr && date <= endStr; })
                .reduce((s, item) => s + Number(item.amount), 0);

            const mExpenses = allExpenses
                .filter(item => { const date = new Date(item.date); return date >= startStr && date <= endStr; })
                .reduce((s, item) => s + Number(item.amount), 0);

            cashFlowData.push({
                month: monthLabel,
                income: mIncomes,
                expense: mExpenses
            });
        }

        // Recent 5 Transactions
        const lastTransactions = [
            ...allIncomes.slice(0, 5).map(item => ({
                _id: item.id,
                id: item.id,
                userId: item.user_id,
                icon: item.icon,
                source: item.source,
                amount: Number(item.amount),
                date: item.date,
                type: "income"
            })),
            ...allExpenses.slice(0, 5).map(item => ({
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

        // Financial Insights (Deterministic)
        const insights = [];
        if (currentMonthExpenseTotal > 0 && prevMonthExpenseTotal > 0) {
            if (expenseGrowth > 0) {
                insights.push(`You spent ${expenseGrowth}% more this month than last month.`);
            } else if (expenseGrowth < 0) {
                insights.push(`You spent ${Math.abs(expenseGrowth)}% less this month than last month.`);
            }
        }

        if (categoryBreakdown.length > 0) {
            insights.push(`${categoryBreakdown[0].category} is your largest spending category.`);
        }

        if (monthlyBudget > 0) {
            const budgetUsedPct = Math.round((currentMonthExpenseTotal / monthlyBudget) * 100);
            insights.push(`You have used ${budgetUsedPct}% of your monthly budget.`);
        }

        if (currentMonthIncomeTotal > 0 && currentMonthSavingsRate > 0) {
            insights.push(`Your savings rate this month is ${currentMonthSavingsRate}%.`);
        }

        // Response object
        res.json({
            totalBalance: totalBalanceVal,
            totalIncome: totalIncomeVal,
            totalExpense: totalExpenseVal,
            currentMonth: {
                income: currentMonthIncomeTotal,
                expense: currentMonthExpenseTotal,
                netSavings: currentMonthNetSavings,
                savingsRate: currentMonthSavingsRate,
                incomeGrowth,
                expenseGrowth
            },
            monthlyBudget: {
                amount: monthlyBudget,
                spent: currentMonthExpenseTotal,
                remaining: Math.max(0, monthlyBudget - currentMonthExpenseTotal),
                percentageUsed: monthlyBudget > 0 ? Math.min(100, Math.round((currentMonthExpenseTotal / monthlyBudget) * 100)) : 0,
                status: monthlyBudget === 0 ? "none" : (currentMonthExpenseTotal > monthlyBudget ? "over" : (currentMonthExpenseTotal >= monthlyBudget * 0.85 ? "approaching" : "safe"))
            },
            categoryBreakdown,
            cashFlowData,
            recentTransactions: lastTransactions,
            insights
        });
    } catch (error) {
        next(error);
    }
};