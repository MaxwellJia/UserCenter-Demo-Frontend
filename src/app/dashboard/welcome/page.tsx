'use client';

export default function DashboardPage() {

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">
                Welcome back!
            </h1>
            <p className="text-gray-600 mb-6">
                You are currently logged in as.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* 示例卡片 */}
                <div className="bg-white p-4 rounded-lg shadow">
                    <h2 className="text-xl font-semibold mb-2">Profile</h2>
                    <p className="text-sm text-gray-500">View and update your profile details.</p>
                </div>


                <div className="bg-white p-4 rounded-lg shadow">
                    <h2 className="text-xl font-semibold mb-2">User Management</h2>
                    <p className="text-sm text-gray-500">Only admins can manage users.</p>
                </div>

                <div className="bg-white p-4 rounded-lg shadow">
                    <h2 className="text-xl font-semibold mb-2">Settings</h2>
                    <p className="text-sm text-gray-500">Manage your preferences and settings.</p>
                </div>
            </div>
        </div>
    );
}