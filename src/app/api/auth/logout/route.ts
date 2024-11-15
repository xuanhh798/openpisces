import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const response = NextResponse.json({ message: "Logged out" });
  response.cookies.set({
    name: "token",
    value: "",
    maxAge: 0,
    path: "/",
    httpOnly: true,
    secure: true,
    sameSite: "lax",
  });
  return response;
}
