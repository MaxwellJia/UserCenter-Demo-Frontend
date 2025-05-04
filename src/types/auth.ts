// src/types/auth.ts
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

export interface LoginResponse {
    token: string;
    isSuccess: boolean;
    errorMessage?: string;
}
