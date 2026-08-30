import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { UserContext } from '../context/userContext';
import { CgSpinner } from 'react-icons/cg';

export const ProtectedRoute = ({ children }) => {
  const { user, isAuthLoading } = useContext(UserContext);
  const token = localStorage.getItem("token");

  if (isAuthLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50">
        <CgSpinner className="animate-spin text-4xl text-purple-600 mb-2" />
        <p className="text-sm font-medium text-slate-600">Verifying session...</p>
      </div>
    );
  }

  if (!token || !user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export const PublicOnlyRoute = ({ children }) => {
  const { user, isAuthLoading } = useContext(UserContext);
  const token = localStorage.getItem("token");

  if (isAuthLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50">
        <CgSpinner className="animate-spin text-4xl text-purple-600 mb-2" />
      </div>
    );
  }

  if (token && user) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};
