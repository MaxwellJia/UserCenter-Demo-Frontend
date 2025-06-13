// src/services/api.ts
import axios from 'axios';

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE || process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5134/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

export default api;
