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

const Income = () => {
  useUserAuth();

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
      console.error("Error fetching income:", error);
      toast.error("Failed to load income data");
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchIncomeDetails(filters, 1);
  }, [filters, fetchIncomeDetails]);

  // Handle Add Income
  const handleAddIncome = async (income) => {
    const { source, amount, date, icon } = income;

    if (!source || !source.trim()) {
      toast.error("Income source is required.");
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
      await axiosInstance.post(API_PATHS.INCOME.ADD_INCOME, {
        source: source.trim(),
        amount: Number(amount),
        date,
        icon
      });
      setOpenAddIncomeModal(false);
      toast.success("Income added successfully");
      fetchIncomeDetails(filters, 1);
    } catch (error) {
      console.error("Error adding income:", error.response?.data?.message || error.message);
      toast.error(error.response?.data?.message || "Failed to add income");
    }
  };

  // Handle Edit Income
  const handleEditIncome = async (income) => {
    const { source, amount, date, icon } = income;
    const item = openEditModal.data;
    if (!item) return;

    if (!source || !source.trim()) {
      toast.error("Income source is required.");
      return;
    }

    if (!amount || isNaN(amount) || Number(amount) <= 0) {
      toast.error("Amount must be a valid number greater than 0.");
      return;
    }

    try {
      await axiosInstance.put(API_PATHS.INCOME.UPDATE_INCOME(item._id || item.id), {
        source: source.trim(),
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

  // Download Income Excel
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
      console.error("Error downloading income details: ", error);
      toast.error("Failed to download income details. Please try again.");
    }
  };

  return (
    <DashboardLayout activeMenu="Income">
      <div className='my-2 mx-auto space-y-6'>
        
        {/* Page Header Banner */}
        <div className="flex flex-wrap items-center justify-between gap-4 bg-gradient-to-r from-purple-900 via-indigo-900 to-slate-900 text-white p-6 sm:p-8 rounded-2xl shadow-xl relative overflow-hidden">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-xs font-semibold text-purple-200 border border-white/15">
              <LuWallet className="text-purple-300" /> Income Hub
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">Income Analytics</h2>
            <p className="text-xs sm:text-sm text-purple-100/80">Track and manage your earnings across multiple sources.</p>
          </div>

          <button
            onClick={() => setOpenAddIncomeModal(true)}
            className="flex items-center gap-2 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-lg shadow-emerald-600/30 transition-all cursor-pointer active:scale-95"
          >
            <LuPlus className="text-base" /> Add Income Source
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
          title="Add Income"
        >
          <AddIncomeForm onAddIncome={handleAddIncome} />
        </Modal>

        {/* Edit Modal */}
        <Modal
          isOpen={openEditModal.show}
          onClose={() => setOpenEditModal({ show: false, data: null })}
          title="Edit Income"
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
          title="Delete Income"
        >
          <DeleteAlert
            content="Are you sure you want to delete this income detail?"
            onDelete={() => deleteIncome(openDeleteAlert.data)}
          />
        </Modal>
      </div>
    </DashboardLayout>
  );
};

export default Income;