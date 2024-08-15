import "@/app/globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    template: "%s | Timer App",
    default: "Timer App",
  },
  description: "Timer App allows you to create a series of timers.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html data-theme="dark" lang="en">
      <body
        style={{ maxWidth: "100%", overflowX: "hidden" }}
        className={`${inter.className} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
