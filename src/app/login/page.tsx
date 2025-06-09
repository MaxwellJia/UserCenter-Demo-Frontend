"use client"
import {login} from "@/services/auth.service"
import {useState} from "react";
import {LoginRequest} from "@/types/auth";
import { validateField } from "@/utils/validation";
import 'react-toastify/dist/ReactToastify.css';
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useSearchParams } from 'next/navigation';
import { Toaster, toast } from 'react-hot-toast';
import { useEffect } from 'react';

export default function LoginPage() {
    const router = useRouter();
    // Check whether user has login and alert users
    const searchParams = useSearchParams();

    useEffect(() => {
        const reason = searchParams.get("reason");
        if (reason === "missing_token") {
            toast.error("Please log in to access this page");
        } else if (reason === "invalid_token") {
            toast.error("Your login has expired, please log in again");
        } else if (reason === "already_logged_in") {
            toast.error("You are already logged in. Redirecting...");
            router.push("/dashboard/welcome");
        }
    }, [searchParams, router]);

    const [formData, setFormData] = useState<LoginRequest>({
        username:'',
        password:''
    });

    /** Validate whether users enter the correct things */
        // Validate user enter the right things or errors will occur
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [confirmPassword] = useState('');
    const [error, setError] = useState<string | null>(null);

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        const mergedFormData = {
            ...formData,
            email: "",
            confirmPassword,
        };

        const errorMsg = validateField(name, value,mergedFormData);
        setErrors(prev => ({
            ...prev,
            [name]: errorMsg,
        }));
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const loginPromise = login(formData)
            .then((response) => {
                localStorage.setItem("user", JSON.stringify(response.data));
                router.push("/dashboard/welcome");
                return response; // important for toast to resolve
            })
            .catch((err: unknown) => {
                if (err && typeof err === 'object' && 'response' in err) {
                    const axiosErr = err as { response?: { data: string } };
                    setError(axiosErr.response?.data || "Login failed");
                } else {
                    setError("Login failed");
                }
                throw err;
            });

        await toast.promise(
            loginPromise,
            {
                loading: "Logging in...",
                success: "Login successful, redirecting",
                error: "Login failed, please check your username or password",
            },
            {
                position: "top-center",
            }
        );
    };

    return (
        <div className="min-h-screen bg-gradient-to-tr from-indigo-100 via-white to-indigo-200 flex flex-col justify-center items-center px-4 py-12 sm:px-6 lg:px-8 font-sans">
            <Toaster position="top-center" />
            <div className="w-full max-w-md space-y-8 p-10 bg-white rounded-xl shadow-lg ring-1 ring-gray-200">
                <div className="text-center">
                    <Image
                        className="mx-auto w-auto"
                        // src="https://github.com/MaxwellJia/filesSaver/blob/main/cam_fall.PNG?raw=true"
                        src="/cam_fall.png"
                        alt="Cam Fall"
                        height={180}
                        width={180}
                    />
                    <h2 className="mt-6 text-3xl font-bold text-gray-900">Welcome to Cam Fall User Center</h2>
                    <p className="mt-2 text-sm text-gray-600">
                        Sign in to access your dashboard and continue your journey.
                    </p>
                </div>

                <form className="mt-8 space-y-6" onSubmit={handleSubmit} method="POST">
                    <div className="space-y-4">
                        <div>
                            <input
                                id="username"
                                name="username"
                                type="text"
                                placeholder={"User Name"}
                                value={formData.username}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                autoComplete="username"
                                required
                                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                            />
                            {errors.username && (
                                <p className="text-red-500 text-sm mt-1">{errors.username}</p>
                            )}
                        </div>

                        <div>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                placeholder={"Password"}
                                value={formData.password}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                autoComplete="current-password"
                                required
                                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                            />
                            {errors.password && (
                                <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                            )}
                        </div>
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="text-sm">
                            <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                                Forgot your password? Please Contact Administrator
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
                © {new Date().getFullYear()} Cam Fall. All rights reserved.
            </footer>
        </div>
    );
}
