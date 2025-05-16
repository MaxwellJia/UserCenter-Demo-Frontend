// src/types/welcome.ts
export interface RegisterRequest {
    username: string;
    email: string;
    password: string;
}

export interface RegisterResponse {
    token?: string;
    IsSuccess: boolean;
    ErrorMessage?: string;
}

export interface LoginRequest {
    username: string;
    password: string;
}

export interface LoginUser {
    userId:string;
    avatar?: string;
    nickName: string;
    email: string;
    token: string;
    userRole: bigint;
    phone: string;
    gender: number;
}

export interface LoginResponse {
    isSuccess: boolean;
    message: string;
    data?: LoginUser;
}

