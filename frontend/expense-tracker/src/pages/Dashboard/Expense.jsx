import React, { useEffect, useState, useCallback } from 'react';
import { useUserAuth } from '../../hooks/useUserAuth';
import DashboardLayout from '../../components/layouts/DashboardLayout';
import { API_PATHS } from '../../utils/apiPaths';
import toast from 'react-hot-toast';
import axiosInstance from '../../utils/axiosInstance';
import ExpenseOverview from '../../components/Expense/ExpenseOverview';
import AddExpenseForm from '../../components/Expense/AddExpenseForm';
import Modal from '../../components/Modal';
import ExpenseList from '../../components/Expense/ExpenseList';
import DeleteAlert from '../../components/DeleteAlert';
import FilterToolbar from '../../components/FilterToolbar';
import { EXPENSE_CATEGORIES } from '../../utils/categories';
import { LuPlus, LuReceipt } from 'react-icons/lu';
import { useLanguage } from '../../context/LanguageContext';

const Expense = () => {
  useUserAuth();
  const { t } = useLanguage();

  const [loading, setLoading] = useState(false);
  const [expenseData, setExpenseData] = useState([]);
  const [filters, setFilters] = useState({});
  const [pagination, setPagination] = useState({ page: 1, totalPages: 1 });
  const [openDeleteAlert, setOpenDeleteAlert] = useState({ show: false, data: null });
  const [openAddExpenseModal, setOpenAddExpenseModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState({ show: false, data: null });

  // Get All Expense Details
  const fetchExpenseDetails = useCallback(async (currentFilters = filters, page = 1) => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      params.append("page", page);
      params.append("limit", 50);

      if (currentFilters.search) params.append("search", currentFilters.search);
      if (currentFilters.category) params.append("category", currentFilters.category);
      if (currentFilters.from) params.append("from", currentFilters.from);
      if (currentFilters.to) params.append("to", currentFilters.to);
      if (currentFilters.minAmount) params.append("minAmount", currentFilters.minAmount);
      if (currentFilters.maxAmount) params.append("maxAmount", currentFilters.maxAmount);
      if (currentFilters.sort) params.append("sort", currentFilters.sort);

      const response = await axiosInstance.get(
        `${API_PATHS.EXPENSE.GET_ALL_EXPENSE}?${params.toString()}`
      );
      if (response.data) {
        setExpenseData(response.data.data || (Array.isArray(response.data) ? response.data : []));
        if (response.data.pagination) {
          setPagination(response.data.pagination);
        }
      }
    } catch (error) {
      console.log("Error fetching expenses: ", error);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchExpenseDetails(filters, 1);
  }, [filters, fetchExpenseDetails]);

  // Add Expense
  const handleAddExpense = async (expense) => {
    const { category, amount, date, icon } = expense;

    if (!category.trim()) {
      toast.error("Please enter a category");
      return;
    }
    if (!amount || isNaN(amount) || Number(amount) <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }
    if (!date) {
      toast.error("Please select a date");
      return;
    }

    try {
      await axiosInstance.post(API_PATHS.EXPENSE.ADD_EXPENSE, {
        category,
        amount: Number(amount),
        date,
        icon
      });
      setOpenAddExpenseModal(false);
      toast.success("Expense recorded successfully");
      fetchExpenseDetails(filters, pagination.page);
    } catch (error) {
      console.error("Error adding expense:", error.response?.data?.message || error.message);
      toast.error(error.response?.data?.message || "Failed to record expense");
    }
  };

  // Edit Expense
  const handleEditExpense = async (expense) => {
    const { category, amount, date, icon } = expense;
    const id = openEditModal.data?._id || openEditModal.data?.id;

    if (!category.trim()) {
      toast.error("Please enter a category");
      return;
    }
    if (!amount || isNaN(amount) || Number(amount) <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }
    if (!date) {
      toast.error("Please select a date");
      return;
    }

    try {
      await axiosInstance.put(API_PATHS.EXPENSE.EDIT_EXPENSE(id), {
        category,
        amount: Number(amount),
        date,
        icon
      });
      setOpenEditModal({ show: false, data: null });
      toast.success("Expense updated successfully");
      fetchExpenseDetails(filters, pagination.page);
    } catch (error) {
      console.error("Error updating expense:", error.response?.data?.message || error.message);
      toast.error(error.response?.data?.message || "Failed to update expense");
    }
  };

  // Delete Expense
  const deleteExpense = async (id) => {
    try {
      await axiosInstance.delete(API_PATHS.EXPENSE.DELETE_EXPENSE(id));
      setOpenDeleteAlert({ show: false, data: null });
      toast.success("Expense details deleted successfully");
      fetchExpenseDetails(filters, pagination.page);
    } catch (error) {
      console.error("Error deleting expense: ", error.response?.data?.message || error.message);
      toast.error(error.response?.data?.message || "Failed to delete expense");
    }
  };

  // Handle Download Expense Details
  const handleDownloadExpenseDetails = async () => {
    try {
      const response = await axiosInstance.get(API_PATHS.EXPENSE.DOWNLOAD_EXPENSE, {
        responseType: "blob"
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "expense_details.xlsx");
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(url);
      toast.success("Excel report downloaded");
    } catch (error) {
      console.error("Error downloading expense details:", error);
      toast.error("Failed to download expense details");
    }
  };

  return (
    <DashboardLayout activeMenu="Expense">
      <div className="my-5 mx-auto">
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
              <LuReceipt className="text-rose-600 dark:text-rose-400" />
              {t('navExpense')}
            </h1>
            <p className="text-slate-500 dark:text-slate-400 text-xs mt-1">
              {t('detailedSpendingRecord')}
            </p>
          </div>

          <button
            onClick={() => setOpenAddExpenseModal(true)}
            className="flex items-center gap-2 px-4 py-2.5 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold rounded-xl shadow-lg shadow-rose-600/30 transition-all cursor-pointer active:scale-95"
          >
            <LuPlus className="text-base" /> {t('recordExpense')}
          </button>
        </div>

        <div className='grid grid-cols-1 gap-6'>
          <ExpenseOverview
            transactions={expenseData}
            onExpenseIncome={() => setOpenAddExpenseModal(true)}
          />

          <FilterToolbar 
            categories={EXPENSE_CATEGORIES}
            categoryLabel="Category"
            onFilterChange={(newFilters) => setFilters(newFilters)}
            onReset={() => setFilters({})}
          />

          <ExpenseList 
            transactions={expenseData} 
            onDelete={(id) => setOpenDeleteAlert({ show: true, data: id })} 
            onEdit={(item) => setOpenEditModal({ show: true, data: item })}
            onDownload={handleDownloadExpenseDetails}
            onAddExpense={() => setOpenAddExpenseModal(true)}
          />
        </div>

        {/* Add Modal */}
        <Modal
          isOpen={openAddExpenseModal}
          onClose={() => setOpenAddExpenseModal(false)}
          title={t('recordExpense')}
        >
          <AddExpenseForm onAddExpense={handleAddExpense} />
        </Modal>

        {/* Edit Modal */}
        <Modal
          isOpen={openEditModal.show}
          onClose={() => setOpenEditModal({ show: false, data: null })}
          title={t('editExpense')}
        >
          <AddExpenseForm
            initialData={openEditModal.data}
            onAddExpense={handleEditExpense}
          />
        </Modal>

        {/* Delete Alert Modal */}
        <Modal
          isOpen={openDeleteAlert.show}
          onClose={() => setOpenDeleteAlert({ show: false, data: null })}
          title={t('deleteExpense')}
        >
          <DeleteAlert
            content={t('confirmDeleteExpense')}
            onDelete={() => deleteExpense(openDeleteAlert.data)}
          />
        </Modal>
      </div>
    </DashboardLayout>
  );
};

export default Expense;