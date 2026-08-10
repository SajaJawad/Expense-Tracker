import React, { useEffect, useState } from 'react'
import DashboardLayout from '../../componants/layouts/DashboardLayout';
import { useUserAuth } from '../../hooks/useUserAuth';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';
import InfoCard from '../../componants/Cards/InfoCard';
import { LuHandCoins, LuWalletMinimal, LuPlus } from 'react-icons/lu'
import { IoMdCard } from "react-icons/io"
import { addThousandsSeparator } from '../../utils/helper';
import RecentIncomeWithChart from '../../componants/Dashboard/RecentIncomeWithChart';
import RecentIncome from '../../componants/Dashboard/RecentIncome';
import FinanceOverview from './../../componants/Dashboard/FinanceOverview';
import RecentTransitions from './../../componants/Dashboard/RecentTransitions';
import ExpenseTransactions from '../../componants/Dashboard/ExpenseTransactions';
import Last30DaysExpenses from '../../componants/Dashboard/Last30DaysExpenses';
import Modal from '../../componants/Modal';
import AddExpenseForm from '../../componants/Expense/AddExpenseForm';
import AddIncomeForm from '../../componants/Income/AddIncomeForm';
import DeleteAlert from '../../componants/DeleteAlert';
import toast from 'react-hot-toast';

const Home = () => {
  useUserAuth();

  const navigate = useNavigate();

  const [dashboardData, setDashboardData] = useState(null)
  const [loading, setLoading] = useState(false)

  // Modal States
  const [openAddExpenseModal, setOpenAddExpenseModal] = useState(false)
  const [openAddIncomeModal, setOpenAddIncomeModal] = useState(false)
  const [openEditModal, setOpenEditModal] = useState({ show: false, data: null })
  const [openDeleteAlert, setOpenDeleteAlert] = useState({ show: false, data: null })

  const fetchDashboardData = async () => {
    if (loading) return;

    setLoading(true)

    try {
      const response = await axiosInstance.get(
        `${API_PATHS.DASHBOARD.GET_DATA}`
      );
      if (response.data) {
        setDashboardData(response.data)
      }
    } catch (error) {
      console.log("Something went wrong. Please try again.", error);
    } finally {
      setLoading(false)
    }
  }

  // Handle Add Expense
  const handleAddExpense = async (expense) => {
    const { category, amount, date, icon } = expense
    if (!category.trim()) {
      toast.error("Category is required.")
      return
    }
    if (!amount || isNaN(amount) || Number(amount) <= 0) {
      toast.error("Amount should be a valid number greater than 0.")
      return
    }
    if (!date) {
      toast.error("Date is required.")
      return
    }
    try {
      await axiosInstance.post(API_PATHS.EXPENSE.ADD_EXPENSE, { category, amount, date, icon })
      setOpenAddExpenseModal(false)
      toast.success("Expense added successfully")
      fetchDashboardData()
    } catch (error) {
      console.error("Error adding expense:", error.response?.data?.message || error.message)
    }
  }

  // Handle Add Income
  const handleAddIncome = async (income) => {
    const { source, amount, date, icon } = income
    if (!source.trim()) {
      toast.error("Source is required.")
      return
    }
    if (!amount || isNaN(amount) || Number(amount) <= 0) {
      toast.error("Amount should be a valid number greater than 0.")
      return
    }
    if (!date) {
      toast.error("Date is required.")
      return
    }
    try {
      await axiosInstance.post(API_PATHS.INCOME.ADD_INCOME, { source, amount, date, icon })
      setOpenAddIncomeModal(false)
      toast.success("Income added successfully")
      fetchDashboardData()
    } catch (error) {
      console.error("Error adding income:", error.response?.data?.message || error.message)
    }
  }

  // Handle Edit Transaction
  const handleSaveEdit = async (formData) => {
    const transaction = openEditModal.data
    if (!transaction) return

    const isExpense = transaction.type === "expense" || transaction.category !== undefined

    try {
      if (isExpense) {
        await axiosInstance.put(
          API_PATHS.EXPENSE.UPDATE_EXPENSE(transaction._id || transaction.id),
          {
            category: formData.category,
            amount: formData.amount,
            date: formData.date,
            icon: formData.icon
          }
        )
        toast.success("Expense updated successfully")
      } else {
        await axiosInstance.put(
          API_PATHS.INCOME.UPDATE_INCOME(transaction._id || transaction.id),
          {
            source: formData.source,
            amount: formData.amount,
            date: formData.date,
            icon: formData.icon
          }
        )
        toast.success("Income updated successfully")
      }

      setOpenEditModal({ show: false, data: null })
      fetchDashboardData()
    } catch (error) {
      console.error("Error updating transaction:", error.response?.data?.message || error.message)
    }
  }

  // Handle Delete Transaction
  const handleDeleteTransaction = async () => {
    const item = openDeleteAlert.data
    if (!item) return

    const isExpense = item.type === "expense" || item.category !== undefined

    try {
      if (isExpense) {
        await axiosInstance.delete(API_PATHS.EXPENSE.DELETE_EXPENSE(item._id || item.id))
        toast.success("Expense deleted successfully")
      } else {
        await axiosInstance.delete(API_PATHS.INCOME.DELETE_INCOME(item._id || item.id))
        toast.success("Income deleted successfully")
      }

      setOpenDeleteAlert({ show: false, data: null })
      fetchDashboardData()
    } catch (error) {
      console.error("Error deleting transaction:", error.response?.data?.message || error.message)
    }
  }

  useEffect(() => {
    fetchDashboardData()
    return () => {}
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <DashboardLayout activeMenu="Dashboard">
      <div className='my-5 mx-auto'>

        {/* Dashboard Header Actions */}
        <div className='flex flex-wrap items-center justify-between gap-4 mb-6'>
          <h4 className='text-xl font-semibold text-gray-800'>Dashboard Overview</h4>
          <div className='flex items-center gap-3'>
            <button
              className='flex items-center gap-1.5 px-4 py-2 bg-purple-600 text-white text-sm font-medium rounded-lg hover:bg-purple-700 transition-colors cursor-pointer shadow-sm'
              onClick={() => setOpenAddExpenseModal(true)}
            >
              <LuPlus className='text-lg' /> Add Expense
            </button>
            <button
              className='flex items-center gap-1.5 px-4 py-2 bg-emerald-600 text-white text-sm font-medium rounded-lg hover:bg-emerald-700 transition-colors cursor-pointer shadow-sm'
              onClick={() => setOpenAddIncomeModal(true)}
            >
              <LuPlus className='text-lg' /> Add Income
            </button>
          </div>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
          <InfoCard
            icon={<IoMdCard/>}
            label="Total Balance"
            value={addThousandsSeparator(dashboardData?.totalBalance || 0)}
            color="bg-primary"
          />

          <InfoCard
            icon={<LuWalletMinimal/>}
            label="Total Income"
            value={addThousandsSeparator(dashboardData?.totalIncome || 0)}
            color="bg-orange-500"
          />

          <InfoCard
            icon={<LuHandCoins/>}
            label="Total Expense"
            value={addThousandsSeparator(dashboardData?.totalExpense || 0)}
            color="bg-red-500"
          />
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mt-6'>
          
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

          <ExpenseTransactions
            transactions={dashboardData?.recentTransactions.filter(t => t.type === "expense") || []}
            onSeeMore={() => navigate("/expense")}
            onEdit={(item) => setOpenEditModal({ show: true, data: item })}
            onDelete={(item) => setOpenDeleteAlert({ show: true, data: item })}
          />

          <Last30DaysExpenses
            data={dashboardData?.last30DaysExpense?.transactions || []}
          />

          <RecentIncome
            transactions={dashboardData?.recentTransactions.filter(t => t.type === "income") || []}
            onSeeMore={() => navigate("/income")}
            onEdit={(item) => setOpenEditModal({ show: true, data: item })}
            onDelete={(item) => setOpenDeleteAlert({ show: true, data: item })}
          />

          <RecentIncomeWithChart
            data={dashboardData?.last60DaysIncome?.transactions.slice(0, 4)}
            totalIncome={dashboardData?.totalIncome || 0}
          />

        </div>
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
  )
}

export default Home