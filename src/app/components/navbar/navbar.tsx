import { auth, signOut } from "@/auth";
import { User } from "@prisma/client";
import Link from "next/link";
import { ClockIcon, MenuIcon } from "../icons";
import ThemeController from "./theme-controller";

const MobileDropdown = ({ user }: { user?: User }) => {
  return (
    <div className="dropdown md:hidden block">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
        <MenuIcon size={6} />
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content mt-3 z-1 p-2 shadow-sm bg-base-100 rounded-box w-52"
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
          className="flex flex-row bg-base-100 no-underline p-1 md:px-3"
          href="/"
        >
          <ClockIcon className="h-6 w-6 md:h-9 md:w-9 text-success" />
          <div className="m-0 p-0 ml-2 text-lg md:text-2xl text-base-content font-bold">
            Timer App
          </div>
        </Link>
      </div>
      <div className="ml-3 hidden md:block">
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link href={"/series"}>
              <h3 className="prose font-bold text-base-content">Series</h3>
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
        <ThemeController />
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
