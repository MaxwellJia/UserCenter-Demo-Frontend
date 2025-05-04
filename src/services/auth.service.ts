// src/services/auth.service.ts
import api from './api';
import { RegisterRequest, RegisterResponse, LoginRequest, LoginResponse } from '@/types/auth';

export const register = async (data: RegisterRequest): Promise<RegisterResponse> => {
    const res = await api.post<RegisterResponse>('/Auth/register', data);
    return res.data;
};

export const login = async (data: LoginRequest): Promise<LoginResponse> => {
    const res = await api.post<LoginResponse>('/auth/login', data);
    return res.data;
};
