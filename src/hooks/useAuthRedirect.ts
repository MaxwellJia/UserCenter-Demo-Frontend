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

            // 🟧 检查 exp 是否存在（用于防止 decode 失败但没抛异常的情况）
            if (!decoded.exp) {
                localStorage.removeItem("token");
                router.replace("/login?reason=invalid_token_decode_fail");
                return;
            }

            // 3. Token exists, but expired → invalid_token
            if (decoded.exp * 1000 < Date.now()) {
                localStorage.removeItem("token");
                router.replace(`/login?reason=invalid_token_expired`);
            }

            // ✅ Valid token → let user stay to welcome page
        } catch (e) {
            // 4. Malformed token → also invalid_token
            console.error("Invalid token format", e);
            localStorage.removeItem("token");
            router.replace("/login?reason=invalid_token");
        }
    }, [router]);
}