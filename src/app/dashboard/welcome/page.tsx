'use client';

import { useEffect, useState } from 'react';
import { UserCircle, Settings, Users } from 'lucide-react';
import {useAuthContext} from "@/context/AuthContext";

export default function DashboardPage() {
    const { user, setUser } = useAuthContext();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await fetch('/api/user/me', {   // TODO: Change url
                    credentials: 'include',
                });

                if (res.ok) {
                    const data = await res.json();
                    setUser(data);
                } else {
                    console.error("Failed to fetch user info:", res.status);
                }
            } catch (error) {
                console.error("Error fetching user info:", error);
            }
        };

        // Only fetch if user is not yet loaded
        if (!user) {
            fetchUser();
        }
    }, [user, setUser]);

    return (
        <div className="p-6">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Welcome back!</h1>
                <p className="text-gray-600 dark:text-gray-300">
                    You are currently logged in as <span className="font-medium text-indigo-600 dark:text-indigo-400">{user?.nickName}</span>
                </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-2">User Information</h2>
                <div className="text-gray-600 dark:text-gray-300">
                    <p><strong>Email:</strong> {user?.email}</p>
                    <p><strong>Role:</strong> {
                        Number(user?.userRole) === 1 ? "Admin" : "User"
                        // 根据用户角色显示 Admin 或 User
                    }</p>
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
