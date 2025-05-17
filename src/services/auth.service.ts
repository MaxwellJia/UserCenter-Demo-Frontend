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
    const res = await api.post<LoginResponse>("/Auth/saveChanges", data,{withCredentials: true,});
    return res.data;
}

/** Save changes request to the backend to change users' information and return a json file included updated user information **/
export async function signOut(): Promise<LogoutResponse> {
    const res = await api.post<LogoutResponse>("/Auth/signOut", null, {
        withCredentials: true,
    });
    return res.data;
}