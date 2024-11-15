import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

// Define protected routes that require authentication
const protectedRoutes = ["/profile", "/create"];

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Check if the requested path is in protectedRoutes
  if (protectedRoutes.includes(pathname)) {
    const token = request.cookies.get("token")?.value;

    if (!token) {
      // Redirect to home page if no token is found
      return NextResponse.redirect(new URL("/", request.url));
    }

    try {
      // Verify the JWT token
      const JWT_SECRET = new TextEncoder().encode(
        process.env.JWT_SECRET || "your-secret-key"
      );

      await jwt.verify(token, JWT_SECRET);

      // Token is valid, allow the request to continue
      return NextResponse.next();
    } catch (error) {
      // Token is invalid, redirect to home page
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  // For non-protected routes, continue normally
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    "/((?!api|_next/static|_next/image|favicon.ico|public).*)",
  ],
};
