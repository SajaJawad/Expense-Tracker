export const BASE_URL = import.meta.env.VITE_API_BASE_URL || import.meta.env.VITE_BASE_URL || "http://localhost:8000";

export const API_PATHS = {
    AUTH: {
        LOGIN: "/api/v1/auth/login",
        REGISTER: "/api/v1/auth/register",
        GET_USER_INFO: "/api/v1/auth/getUser",
        UPDATE_PROFILE: "/api/v1/auth/update-profile"
    },
    DASHBOARD: {
        GET_DATA: "/api/v1/dashboard"
    },
    BUDGET: {
        GET_BUDGET: "/api/v1/budget",
        UPDATE_BUDGET: "/api/v1/budget"
    },
    GOALS: {
        GET_GOALS: "/api/v1/goals",
        ADD_GOAL: "/api/v1/goals",
        UPDATE_GOAL: (goalId) => `/api/v1/goals/${goalId}`,
        DELETE_GOAL: (goalId) => `/api/v1/goals/${goalId}`
    },
    RECURRING: {
        GET_RECURRING: "/api/v1/recurring",
        ADD_RECURRING: "/api/v1/recurring",
        DELETE_RECURRING: (id) => `/api/v1/recurring/${id}`
    },
    INCOME: {
        ADD_INCOME: "/api/v1/income/add",
        GET_ALL_INCOME: "/api/v1/income/get",
        UPDATE_INCOME: (incomeId) => `/api/v1/income/${incomeId}`,
        DELETE_INCOME: (incomeId) => `/api/v1/income/${incomeId}`,
        DOWNLOAD_INCOME: "/api/v1/income/downloadexcel"
    },
    EXPENSE: {
        ADD_EXPENSE: "/api/v1/expense/add",
        GET_ALL_EXPENSE: "/api/v1/expense/get",
        UPDATE_EXPENSE: (expenseId) => `/api/v1/expense/${expenseId}`,
        DELETE_EXPENSE: (expenseId) => `/api/v1/expense/${expenseId}`,
        DOWNLOAD_EXPENSE: "/api/v1/expense/downloadexcel"
    },
    IMAGE: {
        UPLOAD_IMAGE: "/api/v1/auth/upload-image"
    }
};
