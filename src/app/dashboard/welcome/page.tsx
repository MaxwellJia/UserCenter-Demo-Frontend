"use client";
import { UserCircle, Settings, Users } from 'lucide-react';
import { useAuthContext } from "@/context/AuthContext";

export default function DashboardPage() {
    const { user, setUser } = useAuthContext();

    return (
        <div className="p-6">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Welcome back!</h1>
                <p className="text-gray-600 dark:text-gray-300">
                    You are currently logged in as <span className="font-medium text-indigo-600 dark:text-indigo-400">{user?.nickName}</span>
                </p>
            </div>

            {/* Cam Fall 简介区域 */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-2">About Cam Fall</h2>
                <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-2">
                    <strong>Cam Fall</strong> It is an intelligent video surveillance system for nursing home safety scenarios, supporting real-time fall detection and emergency reminders.
                </p>
                <ul className="list-disc list-inside text-sm text-gray-700 dark:text-gray-300 space-y-1">
                    <li>📹 AI-based real-time fall detection</li>
                    <li>💼 Centralized management of user information</li>
                    <li>⚠️ Immediate alarm reminder in case of emergency</li>
                    <li>🔐 Backstage role permission control</li>
                </ul>
            </div>


            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-2">User Information</h2>
                <div className="text-gray-600 dark:text-gray-300">
                    <p><strong>Email:</strong> {user?.email}</p>
                    <p><strong>Role:</strong> {Number(user?.userRole) === 1 ? "Admin" : "User"}</p>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Profile Card */}
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow hover:shadow-lg transition-shadow">
                    <div className="flex items-center gap-3 mb-3">
                        <UserCircle className="w-6 h-6 text-indigo-500" />
                        <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Profile</h2>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">View and update your profile details.</p>
                </div>

                {/* User Management Card */}
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow hover:shadow-lg transition-shadow">
                    <div className="flex items-center gap-3 mb-3">
                        <Users className="w-6 h-6 text-green-500" />
                        <h2 className="text-xl font-semibold text-gray-800 dark:text-white">User Management</h2>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">Only admins can manage users.</p>
                </div>

                {/* Settings Card */}
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow hover:shadow-lg transition-shadow">
                    <div className="flex items-center gap-3 mb-3">
                        <Settings className="w-6 h-6 text-yellow-500" />
                        <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Settings</h2>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">Manage your preferences and settings.</p>
                </div>
            </div>
        </div>
    );
}
