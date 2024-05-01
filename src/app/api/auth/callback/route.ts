import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET(req: NextRequest) {
  const requestUrl = new URL(req.url);
  const code = requestUrl.searchParams.get("code");

  if (code) {
    const supabase = createRouteHandlerClient({ cookies });
    await supabase.auth.exchangeCodeForSession(code);
  }
  return NextResponse.redirect(`${requestUrl.origin}/dashboard`);
}

// Extracting the Code: The code extracts the code query parameter from the incoming request URL. This code parameter is typically provided by the third-party authentication provider as part of the authentication flow. Exchanging the Code for a Session: If the code parameter is present, the code creates a Supabase client using the createRouteHandlerClient function, which uses the cookies from the incoming request. It then calls the exchangeCodeForSessio  method on the Supabase client, passing in the code parameter. This exchanges the code for a Supabase session, which can be used to authenticate the user in the application. Redirecting to the Dashboard: Finally, the code redirects the user to the /dashboar route using the NextResponse.redirec function. This will redirect the user to the dashboard page after the authentication process is complete. In summary, this code is responsible for handling the authentication callback from a third-party authentication provide and exchanging the provided code for a Supabase session, which can then be used to authenticate the user in th application.
