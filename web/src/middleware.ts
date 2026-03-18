import { NextResponse, type NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";

const HANDOFF_DONE_COOKIE = "handoff_done";

export async function middleware(request: NextRequest) {
  if (request.nextUrl.pathname === "/handoff" && request.cookies.get(HANDOFF_DONE_COOKIE)?.value === "1") {
    return NextResponse.redirect(new URL("/", request.url));
  }
  return updateSession(request);
}

export const config = {
  matcher: ["/handoff", "/dashboard/:path*", "/api/admin/:path*"],
};
