import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });
  const {
    data: { session },
  } = await supabase.auth.getSession();
  if (req.nextUrl.pathname.startsWith("/dashboard")) {
    if (!session) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  const emailLinkError = "Email link is invalid or has expired";
  if (
    req.nextUrl.searchParams.get("error_description") === emailLinkError &&
    req.nextUrl.pathname !== "/signup"
  ) {
    return NextResponse.redirect(
      new URL(
        `/signup?error_description=${req.nextUrl.searchParams.get(
          "error_description"
        )}`,
        req.url
      )
    );
  }

  // console.log(req.nextUrl.pathname);

  if (["/login", "/signup"].includes(req.nextUrl.pathname)) {
    if (session) {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }
  }
  return res;
}

// The middleware function is executed for every incoming request to the application.

// It creates a Supabase client using the createMiddlewareClient function from the @supabase/auth-helpers-nextjs library.

// It then retrieves the current user session from the Supabase client.

// If the request is for the /dashboard route and there is no active session, the middleware redirects the user to the /login page.

// If the request has an error_description query parameter with the value "Email link is invalid or has expired", and the request is not for the /signup page, the middleware redirects the user to the /signup page with the same error_description parameter.
