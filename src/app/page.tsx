import NavBar from "@/app/components/navbar/navbar";
import { auth } from "@/auth";
import { User } from "@prisma/client";
import Link from "next/link";
import Countdown from "./components/countdown";

export default async function Home() {
  const session = await auth();
  const user = session?.user as unknown as User | undefined;

  return (
    <main className="min-h-screen">
      <NavBar />
      <div className="flex flex-col">
        <div className="w-full text-center pt-5 pb-3">
          <h1 className="text-4xl md:text-5xl font-bold">
            Create a series of timers!
          </h1>
        </div>
        <div className="flex justify-center w-full pb-3">
          <Countdown />
        </div>
        <div className="w-full text-center py-4">
          {!user ? (
            <Link className="btn btn-primary btn-lg" href="/register">
              <svg
                className="h-6 w-6 text-base-100"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="8.5" cy="7" r="4" />
                <line x1="20" y1="8" x2="20" y2="14" />
                <line x1="23" y1="11" x2="17" y2="11" />
              </svg>
              Sign up now!
            </Link>
          ) : (
            <Link className="btn btn-accent btn-lg" href="/timers">
              <svg
                className="h-8 w-8 text-base-100"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                stroke-width="2"
                stroke="currentColor"
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" />
                <line x1="12" y1="5" x2="12" y2="19" />
                <line x1="5" y1="12" x2="19" y2="12" />
              </svg>
              Create timers now!
            </Link>
          )}
        </div>
      </div>
    </main>
  );
}
