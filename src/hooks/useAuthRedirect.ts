// hooks/useAuthRedirect.ts
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import {jwtDecode} from "jwt-decode";

interface JwtPayload {
    exp: number;
    // 你可以加更多字段，如 sub, username, role 等
}

export function useAuthRedirect() {
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem("token");

        // 1. No token at all → missing_token
        if (!token) {
            router.replace("/login?reason=missing_token");
            return;
        }

        try {
            // 2. Try decode
            const decoded = jwtDecode<JwtPayload>(token);

            // 3. Token exists, but expired → invalid_token
            if (decoded.exp * 1000 < Date.now()) {
                localStorage.removeItem("token");
                router.replace("/login?reason=invalid_token");
            }

            // ✅ Valid token → do nothing, let user stay
        } catch (e) {
            // 4. Malformed token → also invalid_token
            console.error("Invalid token format", e);
            localStorage.removeItem("token");
            router.replace("/login?reason=invalid_token");
        }
    }, [router]);
}