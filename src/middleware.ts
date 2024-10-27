import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/lib/auth";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  console.log("Middleware triggered for", pathname);
  

  if (pathname.startsWith("/api/private")) {
    const token = request.cookies.get("AuthToken");
    console.log("Token found", token);
    
    
    if (token === undefined || token === null) {
      console.log("No token found, returning 401");
      return NextResponse.json({ error: "No token found" }, { status: 401 });
    }

    const verified = verifyToken(token.value);
    
    if(!verified) {
      console.log("Token verification failed, returning 401");
      return NextResponse.json({ error: "Unauthorized or token expired" }, { status: 401 });
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/api/private/:path*", "/api/private/dashboard"],
};
