import React, { useEffect, useState, useCallback, useContext } from 'react';
import DashboardLayout from '../../components/layouts/DashboardLayout';
import { useUserAuth } from '../../hooks/useUserAuth';
import { UserContext } from '../../context/userContext';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';
import InfoCard from '../../components/Cards/InfoCard';
import { LuWallet, LuArrowUpRight, LuArrowDownRight, LuPlus, LuSparkles } from 'react-icons/lu';
import RecentIncomeWithChart from '../../components/Dashboard/RecentIncomeWithChart';
import RecentIncome from '../../components/Dashboard/RecentIncome';
import FinanceOverview from '../../components/Dashboard/FinanceOverview';
import RecentTransitions from '../../components/Dashboard/RecentTransitions';
import Last30DaysExpenses from '../../components/Dashboard/Last30DaysExpenses';
import MonthlyBudgetCard from '../../components/Dashboard/MonthlyBudgetCard';
import FinancialInsightsCard from '../../components/Dashboard/FinancialInsightsCard';
import CategoryBreakdownChart from '../../components/Dashboard/CategoryBreakdownChart';
import Modal from '../../components/Modal';
import AddExpenseForm from '../../components/Expense/AddExpenseForm';
import AddIncomeForm from '../../components/Income/AddIncomeForm';
import DeleteAlert from '../../components/DeleteAlert';
import { CardSkeleton, ChartSkeleton } from '../../components/SkeletonLoader';
import toast from 'react-hot-toast';

const Home = () => {
  useUserAuth();
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Modal States
  const [openAddExpenseModal, setOpenAddExpenseModal] = useState(false);
  const [openAddIncomeModal, setOpenAddIncomeModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState({ show: false, data: null });
  const [openDeleteAlert, setOpenDeleteAlert] = useState({ show: false, data: null });

  const fetchDashboardData = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(API_PATHS.DASHBOARD.GET_DATA);
      if (response.data) {
        setDashboardData(response.data);
      }
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
      toast.error("Failed to load dashboard metrics");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

  // Greeting helper
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  };

  // Handle Budget Update
  const handleUpdateBudget = async (amount) => {
    try {
      await axiosInstance.post(API_PATHS.BUDGET.UPDATE_BUDGET, { amount });
      toast.success("Monthly budget updated");
      fetchDashboardData();
    } catch (error) {
      console.error("Error updating budget:", error);
      toast.error("Failed to update budget");
    }
  };

  // Handle Add Expense
  const handleAddExpense = async (expense) => {
    const { category, amount, date, icon } = expense;
    if (!category || !category.trim()) {
      toast.error("Category is required.");
      return;
    }
    if (!amount || isNaN(amount) || Number(amount) <= 0) {
      toast.error("Amount must be a valid number greater than 0.");
      return;
    }
    if (!date) {
      toast.error("Date is required.");
      return;
    }
    try {
      await axiosInstance.post(API_PATHS.EXPENSE.ADD_EXPENSE, { category: category.trim(), amount: Number(amount), date, icon });
      setOpenAddExpenseModal(false);
      toast.success("Expense added successfully");
      fetchDashboardData();
    } catch (error) {
      console.error("Error adding expense:", error.response?.data?.message || error.message);
      toast.error(error.response?.data?.message || "Failed to add expense");
    }
  };

  // Handle Add Income
  const handleAddIncome = async (income) => {
    const { source, amount, date, icon } = income;
    if (!source || !source.trim()) {
      toast.error("Source is required.");
      return;
    }
    if (!amount || isNaN(amount) || Number(amount) <= 0) {
      toast.error("Amount must be a valid number greater than 0.");
      return;
    }
    if (!date) {
      toast.error("Date is required.");
      return;
    }
    try {
      await axiosInstance.post(API_PATHS.INCOME.ADD_INCOME, { source: source.trim(), amount: Number(amount), date, icon });
      setOpenAddIncomeModal(false);
      toast.success("Income added successfully");
      fetchDashboardData();
    } catch (error) {
      console.error("Error adding income:", error.response?.data?.message || error.message);
      toast.error(error.response?.data?.message || "Failed to add income");
    }
  };

  // Handle Edit Transaction
  const handleSaveEdit = async (formData) => {
    const transaction = openEditModal.data;
    if (!transaction) return;

    const isExpense = transaction.type === "expense" || transaction.category !== undefined;

    try {
      if (isExpense) {
        await axiosInstance.put(
          API_PATHS.EXPENSE.UPDATE_EXPENSE(transaction._id || transaction.id),
          {
            category: formData.category,
            amount: Number(formData.amount),
            date: formData.date,
            icon: formData.icon
          }
        );
        toast.success("Expense updated successfully");
      } else {
        await axiosInstance.put(
          API_PATHS.INCOME.UPDATE_INCOME(transaction._id || transaction.id),
          {
            source: formData.source,
            amount: Number(formData.amount),
            date: formData.date,
            icon: formData.icon
          }
        );
        toast.success("Income updated successfully");
      }

      setOpenEditModal({ show: false, data: null });
      fetchDashboardData();
    } catch (error) {
      console.error("Error updating transaction:", error.response?.data?.message || error.message);
      toast.error("Failed to update transaction");
    }
  };

  // Handle Delete Transaction
  const handleDeleteTransaction = async () => {
    const item = openDeleteAlert.data;
    if (!item) return;

    const isExpense = item.type === "expense" || item.category !== undefined;

    try {
      if (isExpense) {
        await axiosInstance.delete(API_PATHS.EXPENSE.DELETE_EXPENSE(item._id || item.id));
        toast.success("Expense deleted successfully");
      } else {
        await axiosInstance.delete(API_PATHS.INCOME.DELETE_INCOME(item._id || item.id));
        toast.success("Income deleted successfully");
      }

      setOpenDeleteAlert({ show: false, data: null });
      fetchDashboardData();
    } catch (error) {
      console.error("Error deleting transaction:", error.response?.data?.message || error.message);
      toast.error("Failed to delete transaction");
    }
  };

  const currentMonthMetrics = dashboardData?.currentMonth || {};

  return (
    <DashboardLayout activeMenu="Dashboard">
      <div className='my-2 mx-auto space-y-6'>

        {/* Compact Dashboard Hero Header */}
        <div className='flex flex-wrap items-center justify-between gap-4 py-2 border-b border-slate-200/60 dark:border-slate-800/60 pb-5'>
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-purple-600 dark:text-purple-400">
              <LuSparkles /> <span>FinTech Overview</span>
            </div>
            <h2 className='text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight mt-0.5'>
              {getGreeting()}, {user?.fullName?.split(" ")[0] || "User"} 👋
            </h2>
            <p className='text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1'>
              Here's what's happening with your money today.
            </p>
          </div>

          <div className='flex items-center gap-3 shrink-0'>
            <button
              className='flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white text-xs font-semibold rounded-xl transition-all cursor-pointer shadow-md shadow-purple-600/20 active:scale-95'
              onClick={() => setOpenAddExpenseModal(true)}
            >
              <LuPlus className='text-base' /> Record Expense
            </button>
            <button
              className='flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-xl transition-all cursor-pointer shadow-md shadow-emerald-600/20 active:scale-95'
              onClick={() => setOpenAddIncomeModal(true)}
            >
              <LuPlus className='text-base' /> Add Income
            </button>
          </div>
        </div>

        {/* Skeleton loading or Data cards */}
        {loading && !dashboardData ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <CardSkeleton />
            <CardSkeleton />
            <CardSkeleton />
          </div>
        ) : (
          <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
            <InfoCard
              icon={<LuWallet />}
              label="Total Balance"
              rawValue={dashboardData?.totalBalance || 0}
              containerBg="bg-purple-100 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400"
            />

            <InfoCard
              icon={<LuArrowUpRight />}
              label="Total Income"
              rawValue={dashboardData?.totalIncome || 0}
              containerBg="bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400"
              growth={currentMonthMetrics.incomeGrowth}
            />

            <InfoCard
              icon={<LuArrowDownRight />}
              label="Total Expense"
              rawValue={dashboardData?.totalExpense || 0}
              containerBg="bg-rose-100 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400"
              growth={currentMonthMetrics.expenseGrowth}
            />
          </div>
        )}

        {/* Budget & Insights Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <MonthlyBudgetCard 
            budgetData={dashboardData?.monthlyBudget} 
            onUpdateBudget={handleUpdateBudget}
          />
          <FinancialInsightsCard 
            insights={dashboardData?.insights} 
          />
        </div>

        {/* Overview Charts & Category Breakdown */}
        {loading && !dashboardData ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ChartSkeleton />
            <ChartSkeleton />
          </div>
        ) : (
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            
            <RecentTransitions
              transitions={dashboardData?.recentTransactions}
              onSeeMore={() => navigate("/expense")}
              onEdit={(item) => setOpenEditModal({ show: true, data: item })}
              onDelete={(item) => setOpenDeleteAlert({ show: true, data: item })}
            />

            <FinanceOverview
              totalBalance={dashboardData?.totalBalance || 0}
              totalIncome={dashboardData?.totalIncome || 0}
              totalExpense={dashboardData?.totalExpense || 0}
            />

            <CategoryBreakdownChart 
              data={dashboardData?.categoryBreakdown || []} 
            />

            <Last30DaysExpenses
              data={dashboardData?.last30DaysExpense?.transactions || []}
            />

            <RecentIncome
              transactions={dashboardData?.recentTransactions?.filter(t => t.type === "income") || []}
              onSeeMore={() => navigate("/income")}
              onEdit={(item) => setOpenEditModal({ show: true, data: item })}
              onDelete={(item) => setOpenDeleteAlert({ show: true, data: item })}
            />

            <RecentIncomeWithChart
              data={dashboardData?.last60DaysIncome?.transactions?.slice(0, 4)}
              totalIncome={dashboardData?.totalIncome || 0}
            />

          </div>
        )}
      </div>

      {/* Add Expense Modal */}
      <Modal
        isOpen={openAddExpenseModal}
        onClose={() => setOpenAddExpenseModal(false)}
        title="Add Expense"
      >
        <AddExpenseForm onAddExpense={handleAddExpense} />
      </Modal>

      {/* Add Income Modal */}
      <Modal
        isOpen={openAddIncomeModal}
        onClose={() => setOpenAddIncomeModal(false)}
        title="Add Income"
      >
        <AddIncomeForm onAddIncome={handleAddIncome} />
      </Modal>

      {/* Edit Modal */}
      <Modal
        isOpen={openEditModal.show}
        onClose={() => setOpenEditModal({ show: false, data: null })}
        title={
          openEditModal.data?.type === "expense" || openEditModal.data?.category !== undefined
            ? "Edit Expense"
            : "Edit Income"
        }
      >
        {openEditModal.data?.type === "expense" || openEditModal.data?.category !== undefined ? (
          <AddExpenseForm
            initialData={openEditModal.data}
            onAddExpense={handleSaveEdit}
          />
        ) : (
          <AddIncomeForm
            initialData={openEditModal.data}
            onAddIncome={handleSaveEdit}
          />
        )}
      </Modal>

      {/* Delete Alert Modal */}
      <Modal
        isOpen={openDeleteAlert.show}
        onClose={() => setOpenDeleteAlert({ show: false, data: null })}
        title={
          openDeleteAlert.data?.type === "expense" || openDeleteAlert.data?.category !== undefined
            ? "Delete Expense"
            : "Delete Income"
        }
      >
        <DeleteAlert
          content={`Are you sure you want to delete this ${
            openDeleteAlert.data?.type === "expense" || openDeleteAlert.data?.category !== undefined
              ? "expense"
              : "income"
          } detail?`}
          onDelete={handleDeleteTransaction}
        />
      </Modal>

    </DashboardLayout>
  );
};

export default Home;