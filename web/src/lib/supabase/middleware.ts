import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function updateSession(request: NextRequest) {
  let response = NextResponse.next({
    request,
  });

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON;
  if (!url || !anonKey) {
    return response;
  }

  try {
    const supabase = createServerClient(url, anonKey, {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          );
        },
      },
    });

    const {
      data: { user },
    } = await supabase.auth.getUser();

    const isDashboard = request.nextUrl.pathname.startsWith("/dashboard");
    const isDashboardLogin = request.nextUrl.pathname === "/dashboard/login";
    const isAdminApi = request.nextUrl.pathname.startsWith("/api/admin");

    if (isDashboard && !isDashboardLogin && !user) {
      const redirectUrl = request.nextUrl.clone();
      redirectUrl.pathname = "/dashboard/login";
      return NextResponse.redirect(redirectUrl);
    }

    if (isDashboardLogin && user) {
      const redirectUrl = request.nextUrl.clone();
      redirectUrl.pathname = "/dashboard/events";
      return NextResponse.redirect(redirectUrl);
    }

    if (isAdminApi && !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  } catch {
    return response;
  }

  return response;
}
