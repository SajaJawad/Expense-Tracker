import React, { useEffect, useState, useCallback } from 'react';
import DashboardLayout from '../../components/layouts/DashboardLayout';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';
import IncomeOverview from '../../components/Income/IncomeOverview';
import Modal from '../../components/Modal';
import AddIncomeForm from '../../components/Income/AddIncomeForm';
import toast from 'react-hot-toast';
import IncomeList from '../../components/Income/IncomeList';
import DeleteAlert from '../../components/DeleteAlert';
import FilterToolbar from '../../components/FilterToolbar';
import { INCOME_SOURCES } from '../../utils/categories';
import { useUserAuth } from '../../hooks/useUserAuth';
import { LuPlus, LuWallet } from 'react-icons/lu';
import { useLanguage } from '../../context/LanguageContext';

const Income = () => {
  useUserAuth();
  const { t } = useLanguage();

  const [loading, setLoading] = useState(false);
  const [incomeData, setIncomeData] = useState([]);
  const [filters, setFilters] = useState({});
  const [pagination, setPagination] = useState({ page: 1, totalPages: 1 });
  const [openDeleteAlert, setOpenDeleteAlert] = useState({ show: false, data: null });
  const [openAddIncomeModal, setOpenAddIncomeModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState({ show: false, data: null });

  // Fetch Income Details
  const fetchIncomeDetails = useCallback(async (currentFilters = filters, page = 1) => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      params.append("page", page);
      params.append("limit", 50);

      if (currentFilters.search) params.append("search", currentFilters.search);
      if (currentFilters.category) params.append("source", currentFilters.category);
      if (currentFilters.from) params.append("from", currentFilters.from);
      if (currentFilters.to) params.append("to", currentFilters.to);
      if (currentFilters.minAmount) params.append("minAmount", currentFilters.minAmount);
      if (currentFilters.maxAmount) params.append("maxAmount", currentFilters.maxAmount);
      if (currentFilters.sort) params.append("sort", currentFilters.sort);

      const response = await axiosInstance.get(
        `${API_PATHS.INCOME.GET_ALL_INCOME}?${params.toString()}`
      );
      if (response.data) {
        setIncomeData(response.data.data || (Array.isArray(response.data) ? response.data : []));
        if (response.data.pagination) {
          setPagination(response.data.pagination);
        }
      }
    } catch (error) {
      console.log("Error fetching income: ", error);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchIncomeDetails(filters, 1);
  }, [filters, fetchIncomeDetails]);

  // Add Income
  const handleAddIncome = async (income) => {
    const { source, amount, date, icon } = income;

    if (!source.trim()) {
      toast.error("Please enter an income source");
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
      await axiosInstance.post(API_PATHS.INCOME.ADD_INCOME, {
        source,
        amount: Number(amount),
        date,
        icon
      });
      setOpenAddIncomeModal(false);
      toast.success("Income added successfully");
      fetchIncomeDetails(filters, pagination.page);
    } catch (error) {
      console.error("Error adding income:", error.response?.data?.message || error.message);
      toast.error(error.response?.data?.message || "Failed to add income");
    }
  };

  // Edit Income
  const handleEditIncome = async (income) => {
    const { source, amount, date, icon } = income;
    const id = openEditModal.data?._id || openEditModal.data?.id;

    if (!source.trim()) {
      toast.error("Please enter an income source");
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
      await axiosInstance.put(API_PATHS.INCOME.EDIT_INCOME(id), {
        source,
        amount: Number(amount),
        date,
        icon
      });
      setOpenEditModal({ show: false, data: null });
      toast.success("Income updated successfully");
      fetchIncomeDetails(filters, pagination.page);
    } catch (error) {
      console.error("Error updating income:", error.response?.data?.message || error.message);
      toast.error(error.response?.data?.message || "Failed to update income");
    }
  };

  // Delete Income
  const deleteIncome = async (id) => {
    try {
      await axiosInstance.delete(API_PATHS.INCOME.DELETE_INCOME(id));
      setOpenDeleteAlert({ show: false, data: null });
      toast.success("Income details deleted successfully");
      fetchIncomeDetails(filters, pagination.page);
    } catch (error) {
      console.error("Error deleting income: ", error.response?.data?.message || error.message);
      toast.error(error.response?.data?.message || "Failed to delete income");
    }
  };

  // Handle Download Income Details
  const handleDownloadIncomeDetails = async () => {
    try {
      const response = await axiosInstance.get(API_PATHS.INCOME.DOWNLOAD_INCOME, {
        responseType: "blob"
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "income_details.xlsx");
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(url);
      toast.success("Excel report downloaded");
    } catch (error) {
      console.error("Error downloading income details:", error);
      toast.error("Failed to download income details");
    }
  };

  return (
    <DashboardLayout activeMenu="Income">
      <div className="my-5 mx-auto">
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
              <LuWallet className="text-emerald-600 dark:text-emerald-400" />
              {t('navIncome')}
            </h1>
            <p className="text-slate-500 dark:text-slate-400 text-xs mt-1">
              {t('detailedIncomeRecord')}
            </p>
          </div>

          <button
            onClick={() => setOpenAddIncomeModal(true)}
            className="flex items-center gap-2 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-lg shadow-emerald-600/30 transition-all cursor-pointer active:scale-95"
          >
            <LuPlus className="text-base" /> {t('addIncome')}
          </button>
        </div>

        <div className='grid grid-cols-1 gap-6'>
          <IncomeOverview
            transactions={incomeData}
            onAddIncome={() => setOpenAddIncomeModal(true)}
          />

          <FilterToolbar 
            categories={INCOME_SOURCES}
            categoryLabel="Source"
            onFilterChange={(newFilters) => setFilters(newFilters)}
            onReset={() => setFilters({})}
          />

          <IncomeList
            transactions={incomeData}
            onDelete={(id) => setOpenDeleteAlert({ show: true, data: id })}
            onEdit={(item) => setOpenEditModal({ show: true, data: item })}
            onDownload={handleDownloadIncomeDetails}
            onAddIncome={() => setOpenAddIncomeModal(true)}
          />
        </div>

        {/* Add Modal */}
        <Modal
          isOpen={openAddIncomeModal}
          onClose={() => setOpenAddIncomeModal(false)}
          title={t('addIncome')}
        >
          <AddIncomeForm onAddIncome={handleAddIncome} />
        </Modal>

        {/* Edit Modal */}
        <Modal
          isOpen={openEditModal.show}
          onClose={() => setOpenEditModal({ show: false, data: null })}
          title={t('editIncome')}
        >
          <AddIncomeForm
            initialData={openEditModal.data}
            onAddIncome={handleEditIncome}
          />
        </Modal>

        {/* Delete Alert Modal */}
        <Modal
          isOpen={openDeleteAlert.show}
          onClose={() => setOpenDeleteAlert({ show: false, data: null })}
          title={t('deleteIncome')}
        >
          <DeleteAlert
            content={t('confirmDeleteIncome')}
            onDelete={() => deleteIncome(openDeleteAlert.data)}
          />
        </Modal>
      </div>
    </DashboardLayout>
  );
};

export default Income;