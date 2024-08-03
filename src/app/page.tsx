import NavBar from "@/app/components/navbar/navbar";
import { auth } from "@/auth";
import { User } from "@prisma/client";
import Link from "next/link";
import Countdown from "./components/countdown";
import { PersonPlusIcon, PlusIcon } from "./components/icons";

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
              <PersonPlusIcon size={6} />
              Sign up now!
            </Link>
          ) : (
            <Link className="btn btn-accent btn-lg" href="/series">
              <PlusIcon size={8} />
              Create timers now!
            </Link>
          )}
        </div>
      </div>
    </main>
  );
}
