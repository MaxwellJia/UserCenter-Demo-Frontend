import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

const PUBLIC_PATHS = ["/login", "/register"];

export async function middleware(req: NextRequest) {

    const { pathname } = req.nextUrl;

    // 放行公开页面
    if (PUBLIC_PATHS.includes(pathname)) return NextResponse.next();

    //  读取 Cookie 中的 token
    const token = req.cookies.get("token")?.value;


    if (!token) {
        // 没有 token，重定向回登录页
        return NextResponse.redirect(new URL("/login", req.url));
    }

    try {
        // 检查 token 是否有效 & 是否过期
        /** JWT_SECRET在.env.local中， 不要上传到git， 请gitignore，前后端请保持一致**/
        await jwtVerify(token, new TextEncoder().encode(process.env.JWT_SECRET));
        return NextResponse.next(); // 放行
    } catch (err) {
        console.log(123456789);
        // token 无效或已过期
        return NextResponse.redirect(new URL("/login", req.url));
    }
}

export const config = {
    matcher: ["/dashboard/:path*"], // 仅匹配这些路径, 在http://localhost:3000/dashboard/下所有路径都会查看token是否过期
};
