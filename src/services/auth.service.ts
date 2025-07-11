// src/services/welcome.service.ts
import api from './api';
import {
    RegisterRequest,
    RegisterResponse,
    LoginRequest,
    LoginResponse,
    LoginUser,
    LogoutResponse,
    FilterUser, UpdateUser
} from '@/types/auth';
import {AxiosError} from "axios";

export const register = async (data: RegisterRequest): Promise<RegisterResponse> => {
    const res = await api.post<RegisterResponse>('/Auth/register', data);
    return res.data;
};

/** Login request to the backend and return a json file included user information **/
export async function login(data: LoginRequest): Promise<LoginResponse> {
    const res = await api.post<LoginResponse>("/Auth/login", data,{withCredentials: true,});
    return res.data;
}

/** Save changes request to the backend to change users' information and return a json file included updated user information **/
export async function saveChanges(data: LoginUser): Promise<LoginResponse> {
    const res = await api.post<LoginResponse>("/User/saveChanges", data,{
        withCredentials: true, // request to allow HttpOnly Cookie
    });
    return res.data;
}

/** Save changes request to the backend to change users' information and return a json file included updated user information **/
export async function signOut(): Promise<LogoutResponse> {
    const res = await api.post<LogoutResponse>("/Auth/signOut", null, {
        withCredentials: true,
    });
    return res.data;
}

/**
 * Retrieve all users' information from the back end
 * Only accessible by admin (userRole = "1")
 */
export async function searchUsers(params?: FilterUser) {
    try {
        const response = await api.get('/User/list', {
            params,
            withCredentials: true, // 必须带上 Cookie 才能验证身份
        });

        return {
            data: response.data.data,   // 对应后端返回结构 { data: [...], total: ... }
            total: response.data.total,
            success: true,
        };
    } catch (error: unknown) {
        const axiosError = error as AxiosError<{ message?: string; data?: string }>;
        const status = axiosError.response?.status;

        if (status === 401) {
            throw new Error("Unauthorized: The user is not logged in or the identity is invalid");
        }

        if (status === 403) {
            const errorMsg =
                axiosError.response?.data?.message ||
                axiosError.response?.data?.data ||
                "Forbidden: Insufficient permissions";
            throw new Error(errorMsg);
        }

        console.error("Failed to obtain user list", error);
        throw new Error("Unexpected error occurred while fetching user list");
    }
}

/**
 * Delete user safely, change its isDelete to 1, then it will not show in the chart
 * Server response string to let the front know whether it is successful
 */
export async function deleteUser(userId: string) {
    return await api.delete(`/User/delete/${userId}`);
}

/**
 * Update relative user selected in the user management list
 * Server response string to let the front know whether it is successful
 */
export async function updateUser(data: UpdateUser) {
    return await api.put(`/User/update/${data.id}`, data);
}

/**
 * Check whether the database is slept
 * Try to wake the database up if it's slept
 */
export async function ensureServerAwake(maxRetries = 3, interval = 20000) {
    for (let i = 0; i < maxRetries; i++) {
        try {
            // 这里会调用 baseURL + '/health'
            const res = await api.get('/health');
            if (res.status === 200) return;
        } catch {
            // ignore
        }
        await new Promise(r => setTimeout(r, interval));
    }
    throw new Error('Backend not ready');
}