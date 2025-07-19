"use client"
import {register} from "@/services/auth.service"
import {useState} from "react";
import {RegisterRequest} from "@/types/auth";
import { validateField } from "@/utils/validation";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {AxiosError} from "axios";

export default function RegisterPage() {
    const [isSubmitting, setIsSubmitting] = useState(false); // sign up or not
    const router = useRouter();
    const [success, setSuccess] = useState(false); // 注册成功状态

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
        // 用户开始输入时清除错误提示
        setError(null);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (isSubmitting) return;
        setIsSubmitting(true);

        if (formData.password !== confirmPassword) {
            setError('Passwords do not match');
            setIsSubmitting(false);
            return;
        }

        try {
            const response = await register(formData);
            console.log('Registration success:', response);

            setSuccess(true); //  显示注册成功提示

            // 2秒后跳转到登录页
            setTimeout(() => {
                router.push("/login");
            }, 2000);
        } catch (err: unknown) {
            setIsSubmitting(false); // can submit again if error
            const axiosError = err as AxiosError<{ message?: string }>;
            console.error('Registration failed:', axiosError);
            setError(axiosError.response?.data?.message || 'Registration failed');
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
                        height={180}
                        width={180}
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
                                id="confirmPassword"
                                name="confirmPassword"
                                type="password"
                                placeholder="Confirm Password"
                                required
                                minLength={8}
                                maxLength={32}
                                pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$"
                                onChange={(e) => {
                                    setConfirmPassword(e.target.value);
                                    setError(null); // 也清除错误提示
                                }}
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
                            disabled={isSubmitting}
                            className={`block w-full rounded-md px-3 py-1.5 text-base text-white font-medium ${
                                isSubmitting
                                    ? "bg-indigo-300 cursor-not-allowed"
                                    : "bg-indigo-600 hover:bg-indigo-500"
                            } outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6`}
                        >
                            {isSubmitting ? "Signing up..." : "Sign up"}
                        </button>
                    </div>
                    {/* 成功或失败提示 */}
                    {success && (
                        <p className="text-green-600 text-center font-medium">
                            Registration successful! Redirecting to the login page...
                        </p>
                    )}
                    {error && (
                        <p className="text-red-500 text-center font-medium">
                            {error}
                        </p>
                    )}
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
