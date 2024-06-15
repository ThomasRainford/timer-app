import Link from "next/link";

const MobileDropdown = () => {
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
          <Link className="text-accent" href={"/timers"}>
            Timers
          </Link>
        </li>
        <li>
          <div className="flex flex-col mt-5">
            <Link
              className="btn btn-outline btn-info btn-sm w-full"
              href={"/login"}
            >
              Log in
            </Link>
          </div>
        </li>
      </ul>
    </div>
  );
};

const ThemeController = () => {
  return (
    <div>
      <label className="cursor-pointer grid place-items-center">
        <input
          type="checkbox"
          value="synthwave"
          className="toggle theme-controller bg-base-content row-start-1 col-start-1 col-span-2"
        />
        <svg
          className="col-start-1 row-start-1 stroke-base-100 fill-base-100"
          xmlns="http://www.w3.org/2000/svg"
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="5" />
          <path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
        </svg>
        <svg
          className="col-start-2 row-start-1 stroke-base-100 fill-base-100"
          xmlns="http://www.w3.org/2000/svg"
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
        </svg>
      </label>
    </div>
  );
};

const AppNameAndLinks = () => {
  return (
    <>
      <div className="prose">
        <a
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
        </a>
      </div>
      <div className="ml-3 hidden md:block">
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link href={"/timers"}>
              <h3 className="prose font-bold text-accent">Timers</h3>
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
};

const LoginButton = () => {
  return (
    <div className="ml-5 hidden md:block">
      <Link className="btn btn-outline btn-info" href={"/login"}>
        Log in
      </Link>
    </div>
  );
};

const NavBar = () => {
  return (
    <div className="navbar bg-base-100 justify-between">
      <div className="navbar-start w-fit ml-1">
        <MobileDropdown />
        <AppNameAndLinks />
      </div>
      <div className="flex justify-end float-end w-1/4 md:navbar-end mr-1">
        <ThemeController />
        <LoginButton />
      </div>
    </div>
  );
};

export default NavBar;
