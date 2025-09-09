import axios from "axios"
import { BASE_URL } from "./apiPaths"

const axiosInstance = axios.create({
    baseURL: BASE_URL,
    timeout: 1000,
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
    }
})


//Request Interceptor
axiosInstance.interceptors.request.use(
    (config)=>{
        const accessToken = localStorage.grtItem("token");
        if (accessToken) {
            config.headers.Authorization= `Bearer ${accessToken}`
        }
        return config
    },
    (error)=>{
        return Promise.reject(error)
    }
)



