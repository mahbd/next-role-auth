import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    console.log(req.nextUrl.pathname);
    console.log(req.nextauth.token?.role);

    if (
      req.nextUrl.pathname === "/create-user" &&
      req.nextauth.token?.role !== "Admin"
    ) {
      const url = req.nextUrl.clone();
      url.pathname = "/denied";
      return NextResponse.rewrite(url);
    }
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);

export const config = { matcher: ["/create-user"] };
