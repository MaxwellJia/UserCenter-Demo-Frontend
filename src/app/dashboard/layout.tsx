"use client";

import { useSidebar } from "@/context/SidebarContext";
import AppHeader from "@/layouts/AppHeader";
import AppSidebar from "@/layouts/AppSidebar";
import Backdrop from "@/layouts/Backdrop";
import React from "react";
import { AuthProvider } from "@/context/AuthContext";
import {useAuthRedirect} from "@/hooks/useAuthRedirect";
export default function AdminLayout({
                                        children,
                                    }: {
    children: React.ReactNode;
}) {
    useAuthRedirect();
    const { isExpanded, isHovered, isMobileOpen } = useSidebar();

    // Dynamic class for main content margin based on sidebar state
    const mainContentMargin = isMobileOpen
        ? "ml-0"
        : isExpanded || isHovered
            ? "lg:ml-[290px]"
            : "lg:ml-[90px]";

    return (
        <AuthProvider>
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            <div className="flex min-h-screen">
                {/* Sidebar and Backdrop */}
                <AppSidebar/>
                <Backdrop/>

                {/* Main Content Area */}
                <div className={`flex-1 transition-all duration-300 ease-in-out ${mainContentMargin}`}>
                    {/* Header */}
                    <AppHeader/>

                    {/* Page Content */}
                    <main className="p-4 mx-auto max-w-7xl md:p-6">
                        {children}
                    </main>
                </div>
            </div>
        </div>
        </AuthProvider>
    );
}
