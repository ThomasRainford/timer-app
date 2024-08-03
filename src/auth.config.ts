import type { NextAuthConfig } from "next-auth";
import { NextResponse } from "next/server";

export const authConfig = {
  pages: {
    signIn: "/login",
    newUser: "/register",
  },
  callbacks: {
    async session({ session, token }) {
      // Attach 'id' to session.
      session.user = { ...session.user, id: token.sub || "" };
      return session;
    },
    authorized({ auth, request: { nextUrl } }) {
      if (nextUrl.pathname === "/") return true;
      const isLoggedIn = !!auth?.user;
      const isRegisterPage = nextUrl.pathname.startsWith("/register");
      if (!isLoggedIn && !isRegisterPage) return false;
      if (!isLoggedIn && isRegisterPage) return true;
      const isLoginPage = nextUrl.pathname.startsWith("/login");
      if (isLoginPage || isRegisterPage) {
        return NextResponse.redirect(new URL("/series", nextUrl.href));
      }
      return true;
    },
  },
  providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig;
