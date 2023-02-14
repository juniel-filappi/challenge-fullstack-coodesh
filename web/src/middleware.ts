import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("token");

  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  const user = await fetch(process.env.NEXT_PUBLIC_API_URL + "/me", {
    headers: {
      Authorization: `Bearer ${token.value}`,
    },
  });

  const data = await user.json();

  if (!data.isSuccess) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/dashboard",
};
