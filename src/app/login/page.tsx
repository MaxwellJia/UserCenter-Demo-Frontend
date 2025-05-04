"use client"
import {login} from "@/services/auth.service"
import {useState} from "react";
import {LoginRequest} from "@/types/auth";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function LoginPage() {
    const [formData, setFormData] = useState<LoginRequest>({
        username:'',
        password:''
    });



    const [error, setError] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await login(formData);
            console.log('Login success:', response);
        } catch (err: any) {
            console.error('Login failed:', err);
            setError(err.response?.data || 'Login failed');
            // const errorMessage = err.response?.data;
            // console.log(errorMessage);
            // alert("Login failed")
            // setError(errorMessage);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-tr from-indigo-100 via-white to-indigo-200 flex flex-col justify-center items-center px-4 py-12 sm:px-6 lg:px-8 font-sans">
            <div className="w-full max-w-md space-y-8 p-10 bg-white rounded-xl shadow-lg ring-1 ring-gray-200">
                <div className="text-center">
                    <img
                        className="mx-auto h-12 w-auto"
                        src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
                        alt="Your Company"
                    />
                    <h2 className="mt-6 text-3xl font-bold text-gray-900">Welcome Back</h2>
                    <p className="mt-2 text-sm text-gray-600">
                        Sign in to access your dashboard and continue your journey.
                    </p>
                </div>

                <form className="mt-8 space-y-6" onSubmit={handleSubmit} method="POST">
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                                User Name
                            </label>
                            <input
                                id="username"
                                name="username"
                                type="text"
                                value={formData.username}
                                onChange={handleChange}
                                autoComplete="username"
                                required
                                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                            />
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                Password
                            </label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                value={formData.password}
                                onChange={handleChange}
                                autoComplete="current-password"
                                required
                                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                            />
                        </div>
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="text-sm">
                            <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                                Forgot your password?
                            </a>
                        </div>
                    </div>
                    {error && <p className="text-red-500">{error}</p>}

                    <div>
                        <button
                            type="submit"
                            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Sign in
                        </button>
                    </div>
                </form>

                <div className="text-sm text-center text-gray-500">
                    Don&#39;t have an account?{" "}
                    <a href="/register" className="font-medium text-indigo-600 hover:text-indigo-500">
                        Register here
                    </a>
                </div>
            </div>

            {/* Footer */}
            <footer className="mt-10 text-center text-xs text-gray-400">
                © {new Date().getFullYear()} Your Company. All rights reserved.
            </footer>
        </div>
    );
}
