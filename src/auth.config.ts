import type { NextAuthConfig } from "next-auth";
import { NextResponse } from "next/server";

export const authConfig = {
  pages: {
    signIn: "/login",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isRegisterPage = nextUrl.pathname.startsWith("/register");
      if (!isLoggedIn && !isRegisterPage) return false;
      const isLoginPage = nextUrl.pathname.startsWith("/login");
      if (isLoginPage) {
        return NextResponse.redirect(new URL("/timers", nextUrl.href));
      }
      return true;
    },
  },
  providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig;
