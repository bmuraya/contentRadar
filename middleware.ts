import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const protectedRoutes = ["/dashboard"];

  const isProtected = protectedRoutes.some(route =>
    req.nextUrl.pathname.startsWith(route)
  );

  if (isProtected) {
    // later: check Supabase session cookie
  }

  return NextResponse.next();
}