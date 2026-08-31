import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { validateEmail } from '../../utils/helper';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';
import { UserContext } from '../../context/userContext';
import { useLanguage } from '../../context/LanguageContext';
import AuthLayout from '../../components/layouts/AuthLayout';
import Input from '../../components/Inputs/Input';
import { CgSpinner } from 'react-icons/cg';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const { updateUser } = useContext(UserContext);
  const { t } = useLanguage();
  const navigate = useNavigate();

  // Handle Login Form Submit
  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (!password) {
      setError("Please enter your password.");
      return;
    }

    setError("");
    setIsLoading(true);

    try {
      const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, {
        email: email.trim(),
        password,
      });

      const { token, user } = response.data;

      if (token) {
        localStorage.setItem("token", token);
        updateUser(user);
        navigate("/dashboard");
        return;
      }
    } catch (err) {
      console.error("Login error:", err.response?.data);
      if (err.response && err.response.data?.message) {
        setError(err.response.data.message);
      } else {
        setError("Something went wrong. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout
      title={t('loginTitle')}
      subtitle={t('loginSubtitle')}
    >
      <form onSubmit={handleLogin} className="space-y-4">
        <Input
          value={email}
          onChange={({ target }) => setEmail(target.value)}
          label={t('emailAddress')}
          placeholder="name@company.com"
          type="email"
        />

        <Input
          value={password}
          onChange={({ target }) => setPassword(target.value)}
          label={t('password')}
          placeholder="••••••••"
          type="password"
        />

        {error && (
          <div className="p-3 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800/40 text-red-600 dark:text-red-400 text-xs font-medium">
            {error}
          </div>
        )}

        <button 
          type="submit" 
          className="ptn-primary font-semibold text-sm py-3.5 shadow-lg shadow-purple-600/20 cursor-pointer"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <CgSpinner className="animate-spin text-lg" />
              <span>{t('loading')}</span>
            </>
          ) : (
            t('signInBtn')
          )}
        </button>

        <p className="text-xs text-center text-slate-600 dark:text-slate-400 mt-4">
          {t('noAccount')}{" "}
          <Link className="font-semibold text-purple-600 dark:text-purple-400 hover:underline" to="/signup">
            {t('signUpLink')}
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
};

export default Login;
