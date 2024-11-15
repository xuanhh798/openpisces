import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose"; // Use jose instead of jsonwebtoken

// Define protected routes that require authentication
const protectedRoutes = ["/profile", "/create"];

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Check if the requested path is in protectedRoutes
  if (protectedRoutes.some((route) => pathname.startsWith(route))) {
    const token = request.cookies.get("token");
    if (!token) {
      // Redirect to home page if no token is found
      return NextResponse.redirect(new URL("/", request.url));
    }

    try {
      // Verify the JWT token
      const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

      // Convert the secret to a Uint8Array
      const encoder = new TextEncoder();
      const secret = encoder.encode(JWT_SECRET);

      await jwtVerify(token.value, secret);

      // Token is valid, allow the request to continue
      console.log("Token is valid");
      return NextResponse.next();
    } catch (error) {
      console.log("Token is invalid", error);
      // Token is invalid, redirect to home page
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  // For non-protected routes, continue normally
  return NextResponse.next();
}

export const config = {
  matcher: ["/profile/:path*", "/create/:path*"],
};
