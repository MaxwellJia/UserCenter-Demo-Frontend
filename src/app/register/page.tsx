"use client"
import {register} from "@/services/auth.service"
import {useState} from "react";
import {RegisterRequest} from "@/types/auth";
import { validateField } from "@/utils/validation";
import Image from "next/image";
export default function RegisterPage() {
    const [formData, setFormData] = useState<RegisterRequest>({
        username: '',
        email: '',
        password: ''
    });

    /** Validate whether users enter the correct things */
    // Validate user enter the right things or errors will occur
    const [errors, setErrors] = useState<Record<string, string>>({});

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        const mergedFormData = {
            ...formData,
            confirmPassword,
        };

        const errorMsg = validateField(name, value, mergedFormData);
        setErrors(prev => ({
            ...prev,
            [name]: errorMsg,
        }));
    };



    /** User information to the backend */
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (formData.password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        try {
            const response = await register(formData);
            console.log('Registration success:', response);

            // 可选：存储 token、跳转页面、弹出提示
            // localStorage.setItem('token', response.token);
            // router.push('/dashboard');
        } catch (err: any) {
            console.error('Registration failed:', err);
            setError(err.response?.data?.message || 'Registration failed');
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-tr from-indigo-100 via-white to-indigo-200 flex flex-col justify-center items-center px-4 py-12 sm:px-6 lg:px-8 font-sans">
            <div className="w-full max-w-md space-y-8 p-10 bg-white rounded-xl shadow-lg ring-1 ring-gray-200">
                <div className="text-center items-center">
                    <Image
                        className="mx-auto w-auto"
                        src="/cam_fall.png"
                        alt="Cam Fall"
                        height={300}
                        width={300}
                    />
                    <h2 className="mt-6 text-3xl font-bold text-gray-900">Create your account</h2>
                    <p className="mt-2 text-sm text-gray-600">Join us and get started in seconds.</p>
                </div>

                <form className="mt-8 space-y-6" onSubmit={handleSubmit} method="POST">
                    <div className="space-y-4">
                        <div>
                            <input
                                id="username"
                                name="username"
                                type="text"
                                required
                                minLength={3}
                                maxLength={32}
                                pattern="^[a-zA-Z0-9_]+$"
                                placeholder="Username"
                                value={formData.username}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                            />
                            {errors.username && (
                                <p className="text-red-500 text-sm mt-1">{errors.username}</p>
                            )}
                        </div>

                        <div>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                placeholder="Email"
                                required
                                value={formData.email}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                            />
                            {errors.email && (
                                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                            )}
                        </div>

                        <div>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                placeholder="Password"
                                required
                                minLength={8}
                                maxLength={32}
                                pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$"
                                value={formData.password}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                            />
                            {errors.password && (
                                <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                            )}
                        </div>

                        <div>
                            <input
                                id="confirm-password"
                                name="confirm-password"
                                type="password"
                                placeholder="Confirm Password"
                                required
                                minLength={8}
                                maxLength={32}
                                pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$"
                                onChange={e => setConfirmPassword(e.target.value)}
                                onBlur={handleBlur}
                                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                            />
                            {errors.confirmPassword && (
                                <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>
                            )}
                        </div>
                    </div>
                    <div>
                        <button
                            type="submit"
                            className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                        >
                            Sign up
                        </button>
                    </div>
                </form>

                <div className="text-sm text-center text-gray-500">
                    Already have an account?{" "}
                    <a href="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
                        Sign in
                    </a>
                </div>
            </div>

            <footer className="mt-10 text-center text-xs text-gray-400">
                © {new Date().getFullYear()} Cam Fall. All rights reserved.
            </footer>
        </div>
    );
}
