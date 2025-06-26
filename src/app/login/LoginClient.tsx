"use client"
import {login} from "@/services/auth.service"
import {useEffect, useState} from "react";
import {LoginRequest} from "@/types/auth";
import { validateField } from "@/utils/validation";
import 'react-toastify/dist/ReactToastify.css';
import Image from "next/image";
import {useRouter, useSearchParams} from "next/navigation";
import { Toaster, toast } from 'react-hot-toast';


export default function LoginClient() {
    const [isSubmitting, setIsSubmitting] = useState(false); // Click login or not
    const router = useRouter();
    const searchParams = useSearchParams();
    useEffect(() => {
        const reason = searchParams.get("reason");
        if (reason === "missing_token") {
            toast.error("Please log in to access this page");
            router.replace("/login");
        } else if (reason === "invalid_token_decode_fail" || reason === "invalid_token") {
            toast.error("Authentication failed, please log in again.");
            router.replace("/login");
        } else if (reason === "invalid_token_expired"){
            toast.error("Session expired. Please log in again.");
            router.replace("/login");
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

        if (isSubmitting) return; // Prevent duplicate clicks
        setIsSubmitting(true);    // Set the button to be unclickable

        const loginPromise = login(formData)
            .then((response) => {
                localStorage.setItem("user", JSON.stringify(response.user));
                localStorage.setItem("token", response.token);
                router.push("/dashboard/welcome");

                return response; // important for toast to resolve
            })
            .catch((err: unknown) => {
                setIsSubmitting(false); // can submit again if error
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
                id: "login-toast", // Avoid multiple repeated toasts
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

                    <div className="mt-4 bg-yellow-50 border border-yellow-200 text-yellow-800 text-sm rounded-md p-4">
                        <p className="font-semibold mb-1">⚠️ Note:</p>
                        <p>
                            This demo app uses a cloud-hosted serverless database and HTTP-only cookies for secure cross-origin authentication, which may take up to 1 minute to
                            resume after being idle.
                            If you experience a login failure, please use a desktop browser and wait a few seconds and try again.
                        </p>
                    </div>

                    <div className="mt-4 bg-indigo-50 border border-indigo-200 text-indigo-800 text-sm rounded-md p-4">
                        <p className="font-semibold mb-1">🔐 Demo Login Accounts:</p>
                        <p><strong>Admin</strong> — <span className="font-mono">Username: </span>
                            <code>admin </code> <span className="font-mono">Password:</span> <code> Pw123456!</code></p>
                        <p><strong>User</strong> — <span className="font-mono">Username: </span>
                            <code>user1 </code> <span className="font-mono">Password:</span> <code> Pw123456!</code></p>
                    </div>
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
                            <a href="https://github.com/MaxwellJia" className="font-medium text-indigo-600 hover:text-indigo-500">
                                Forgot your password? Please Contact Administrator
                            </a>
                        </div>
                    </div>
                    {error && <p className="text-red-500">{error}</p>}
                    <div>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-semibold text-white ${
                                isSubmitting ? 'bg-indigo-300 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-500'
                            } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
                        >
                            {isSubmitting ? 'Signing in...' : 'Sign in'}
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

