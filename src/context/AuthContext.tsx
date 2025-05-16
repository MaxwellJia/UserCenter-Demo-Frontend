/** This file is used to help global web pages to share user information **/

// context/AuthContext.tsx
"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { LoginUser } from "@/types/auth";

interface AuthContextType {
    user: LoginUser | null;
    setUser: (user: LoginUser | null) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<LoginUser | null>(null);

    useEffect(() => {
        const stored = localStorage.getItem("user");
        if (stored && stored !== "undefined") {
            try {
                setUser(JSON.parse(stored));
            } catch (e) {
                console.error("Failed to parse user:", e);
                localStorage.removeItem("user");
            }
        }
    }, []);

    useEffect(() => {
        if (user) localStorage.setItem("user", JSON.stringify(user));
        else localStorage.removeItem("user");
    }, [user]);

    return (
        <AuthContext.Provider value={{ user, setUser }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuthContext = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuthContext must be used within an AuthProvider");
    }
    return context;
};
