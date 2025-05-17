import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

const PUBLIC_PATHS = ["/login", "/register"];

export async function middleware(req: NextRequest) {
    const { pathname } = req.nextUrl;

    if (PUBLIC_PATHS.includes(pathname)) return NextResponse.next();

    const token = req.cookies.get("token")?.value;

    const loginUrl = new URL("/login", req.url);

    if (!token) {
        // save reasons for login page use
        loginUrl.searchParams.set("reason", "missing_token");
        return NextResponse.redirect(loginUrl);
    }

    try {
        await jwtVerify(token, new TextEncoder().encode(process.env.JWT_SECRET));
        return NextResponse.next();
    } catch (err) {
        // save reasons for login page use
        loginUrl.searchParams.set("reason", "invalid_token");
        return NextResponse.redirect(loginUrl);
    }
}

export const config = {
    matcher: ["/dashboard/:path*"],
};

