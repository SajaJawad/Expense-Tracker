import {
    LuLayoutDashboard,
    LuTrendingUp,
    LuTrendingDown,
    LuSettings,
    LuLogOut
} from "react-icons/lu";

export const SIDE_MENU_DATA = [
    {
        id: "01",
        label: "Dashboard",
        icon: LuLayoutDashboard,
        path: "/dashboard"
    },
    {
        id: "02",
        label: "Income",
        icon: LuTrendingUp,
        path: "/income"
    },
    {
        id: "03",
        label: "Expense",
        icon: LuTrendingDown,
        path: "/expense"
    },
    {
        id: "04",
        label: "Settings",
        icon: LuSettings,
        path: "/settings"
    },
    {
        id: "06",
        label: "Logout",
        icon: LuLogOut,
        path: "/logout"
    }
];