import { auth, signOut } from "@/auth";
import { User } from "@prisma/client";
import Link from "next/link";

const MobileDropdown = ({ user }: { user?: User }) => {
  return (
    <div className="dropdown md:hidden block">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h16M4 18h7"
          />
        </svg>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
      >
        <li>
          <Link className="text-accent" href={"/series"}>
            Series
          </Link>
        </li>
        <li>
          <div className="flex flex-col mt-5">
            {!user ? (
              <Link
                className="btn btn-outline btn-info btn-sm w-full"
                href={"/login"}
              >
                Log in
              </Link>
            ) : (
              <div className="md:hidden w-full">
                <LogoutButton />
              </div>
            )}
          </div>
        </li>
      </ul>
    </div>
  );
};

const AppNameAndLinks = () => {
  return (
    <>
      <div className="prose">
        <Link
          className="btn btn-ghost bg-base-100 no-underline p-1 md:px-3"
          href="/"
        >
          <svg
            className="h-6 w-6 md:h-9 md:w-9 text-accent"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 16 14" />
          </svg>
          <div className="m-0 p-0 ml-1 text-lg md:text-2xl text-base-content font-bold">
            Timer App
          </div>
        </Link>
      </div>
      <div className="ml-3 hidden md:block">
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link href={"/series"}>
              <h3 className="prose font-bold text-accent">Series</h3>
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
};

const LoginButton = () => {
  return (
    <div className="md:ml-5 w-full md:w-auto">
      <Link className="btn btn-outline btn-info" href={"/login"}>
        Log in
      </Link>
    </div>
  );
};

const LogoutButton = () => {
  return (
    <div className="md:ml-5 w-full md:w-auto">
      <form
        action={async () => {
          "use server";
          await signOut();
        }}
      >
        <button className="btn btn-outline btn-sm  btn-info w-full md:w-auto">
          Log out
        </button>
      </form>
    </div>
  );
};

const NavBar = async () => {
  const session = await auth();
  const user = session?.user as unknown as User | undefined;

  return (
    <div className="navbar bg-base-100 justify-between">
      <div className="navbar-start w-fit ml-1">
        <MobileDropdown user={user} />
        <AppNameAndLinks />
      </div>
      <div className="flex justify-end float-end w-1/4 md:navbar-end mr-1">
        {/* <ThemeController /> // Currently disabled. */}
        {!user ? (
          <div className="hidden md:block">
            <LoginButton />
          </div>
        ) : (
          <div className="hidden md:block">
            <LogoutButton />
          </div>
        )}
      </div>
    </div>
  );
};

export default NavBar;
