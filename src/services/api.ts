// src/services/api.ts
import axios from 'axios';

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE ||
        process.env.NEXT_PUBLIC_API_BASE_URL ||
        (process.env.NODE_ENV === 'development'
            ? 'http://localhost:5134/api'
            : 'https://usercenter-demo-bsc9fyazcubtgka0.australiaeast-01.azurewebsites.net/api'),

    headers: {

        'Content-Type': 'application/json',
    },
});

export default api;
