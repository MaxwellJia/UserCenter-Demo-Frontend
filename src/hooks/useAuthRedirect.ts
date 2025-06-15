// hooks/useAuthRedirect.ts
import { useEffect } from "react";
import { useRouter } from "next/navigation";

/**
 * 用于检查 localStorage 中是否存在 token
 * 若不存在，则重定向到 login 页面，并附加 reason
 */
export function useAuthRedirect() {
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (!token) {
            router.replace("/login?reason=missing_token");
        }
    }, [router]);
}
