/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useState, useEffect } from "react";
import axiosInstance from "../utils/axiosInstance";
import { API_PATHS } from "../utils/apiPaths";

export const UserContext = createContext();

const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthLoading, setIsAuthLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            setUser(null);
            setIsAuthLoading(false);
            return;
        }

        const fetchUserOnAppStart = async () => {
            try {
                const response = await axiosInstance.get(API_PATHS.AUTH.GET_USER_INFO);
                if (response.data) {
                    setUser(response.data);
                }
            } catch (err) {
                console.error("Failed to load authenticated user:", err);
                localStorage.removeItem("token");
                setUser(null);
            } finally {
                setIsAuthLoading(false);
            }
        };

        fetchUserOnAppStart();
    }, []);

    const updateUser = (userData) => {
        setUser(userData);
    };

    const clearUser = () => {
        localStorage.removeItem("token");
        setUser(null);
    };

    return (
        <UserContext.Provider
            value={{
                user,
                updateUser,
                clearUser,
                isAuthLoading
            }}
        >
            {children}
        </UserContext.Provider>
    );
};

export default UserProvider;
