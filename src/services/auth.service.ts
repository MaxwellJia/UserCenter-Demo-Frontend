// src/services/welcome.service.ts
import api from './api';
import {RegisterRequest, RegisterResponse, LoginRequest, LoginResponse, LoginUser, LogoutResponse} from '@/types/auth';

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
export async function searchUsers() {
    try {
        const response = await api.get('/User/list', {
            withCredentials: true, // 必须带上 Cookie 才能验证身份
        });

        return {
            data: response.data.data,   // 对应后端返回结构 { data: [...], total: ... }
            total: response.data.total,
            success: true,
        };
    } catch (error: any) {
        // 提取状态码
        const status = error.response?.status;

        if (status === 401) {
            throw new Error("Unauthorized: The user is not logged in or the identity is invalid");
        }

        if (status === 403) {
            throw new Error(error.response?.data || "Forbidden: Insufficient permissions");
        }

        console.error("Failed to obtain user list", error);
        throw new Error("Unexpected error occurred while fetching user list");
    }
}