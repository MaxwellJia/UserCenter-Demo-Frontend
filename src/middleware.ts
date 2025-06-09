import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

const PUBLIC_PATHS = ["/register"];

export async function middleware(req: NextRequest) {
    const { pathname } = req.nextUrl;

    const token = req.cookies.get("token")?.value;

    const loginUrl = new URL("/login", req.url);

    // 1. If user is hitting /login:
    if (pathname === '/login') {
        if (token) {
            try {
                // If token is valid, redirect back to /login with reason=already_logged_in
                await jwtVerify(token, new TextEncoder().encode(process.env.JWT_SECRET));
                loginUrl.searchParams.set('reason', 'already_logged_in');
                return NextResponse.redirect(loginUrl);
            } catch {
                // Token exists but is invalid/expired ⇒ let them see the login form
                return NextResponse.next();
            }
        }
        // No token at all ⇒ just show login page
        return NextResponse.next();
    }

    // 2. If user is hitting a truly public path (e.g. /register):
    if (PUBLIC_PATHS.includes(pathname)) {
        return NextResponse.next();
    }

    // 3. All other routes require a valid token:
    if (!token) {
        // No token ⇒ redirect to /login?reason=missing_token
        loginUrl.searchParams.set('reason', 'missing_token');
        return NextResponse.redirect(loginUrl);
    }

    try {
        // If token is valid ⇒ allow access
        await jwtVerify(token, new TextEncoder().encode(process.env.JWT_SECRET));
        return NextResponse.next();
    } catch {
        loginUrl.searchParams.set("reason", "invalid_token");
        return NextResponse.redirect(loginUrl);
    }
}

export const config = {
    matcher: ["/dashboard/:path*"],
};

