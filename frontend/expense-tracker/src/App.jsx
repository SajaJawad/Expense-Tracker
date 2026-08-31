import React from 'react';
import Login from './pages/Auth/Login';
import SignUp from './pages/Auth/SignUp';
import Home from './pages/Dashboard/Home';
import Income from './pages/Dashboard/Income';
import Expense from './pages/Dashboard/Expense';
import Settings from './pages/Dashboard/Settings';
import { Toaster } from 'react-hot-toast';

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from 'react-router-dom';
import UserProvider from './context/userContext';
import { ThemeProvider } from './context/themeContext';
import { LanguageProvider } from './context/LanguageContext';
import { ProtectedRoute, PublicOnlyRoute } from './components/ProtectedRoute';

const App = () => {
  return (
    <LanguageProvider>
      <ThemeProvider>
        <UserProvider>
        <Router>
          <Routes>
            <Route path='/' element={<Root />} />
            <Route 
              path='/login' 
              element={
                <PublicOnlyRoute>
                  <Login />
                </PublicOnlyRoute>
              } 
            />
            <Route 
              path='/signup' 
              element={
                <PublicOnlyRoute>
                  <SignUp />
                </PublicOnlyRoute>
              } 
            />
            <Route 
              path='/dashboard' 
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              } 
            />
            <Route 
              path='/income' 
              element={
                <ProtectedRoute>
                  <Income />
                </ProtectedRoute>
              } 
            />
            <Route 
              path='/expense' 
              element={
                <ProtectedRoute>
                  <Expense />
                </ProtectedRoute>
              } 
            />
            <Route 
              path='/settings' 
              element={
                <ProtectedRoute>
                  <Settings />
                </ProtectedRoute>
              } 
            />
            <Route path='*' element={<Navigate to='/dashboard' replace />} />
          </Routes>
        </Router>

        <Toaster
          toastOptions={{
            style: {
              fontSize: '13px'
            }
          }}
        />
      </UserProvider>
    </ThemeProvider>
    </LanguageProvider>
  );
};

export default App;

const Root = () => {
  const token = localStorage.getItem("token");
  return token ? <Navigate to="/dashboard" replace /> : <Navigate to="/login" replace />;
};