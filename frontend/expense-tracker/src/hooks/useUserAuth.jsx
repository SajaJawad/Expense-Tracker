import { useContext } from "react";
import { UserContext } from "../context/userContext";

export const useUserAuth = () => {
    const { user, updateUser, clearUser, isAuthLoading } = useContext(UserContext);
    return { user, updateUser, clearUser, isAuthLoading };
};
