"use client";

import useThemeToggle from "@/app/hooks/use-theme-toggle";
import { MoonIcon, SunIcon } from "../icons";

const ThemeController = () => {
  const [theme, handleToggle] = useThemeToggle({
    key: "theme",
    otherTheme: "light",
    defaultTheme: "dark",
  });

  return (
    <div>
      <label className="swap swap-rotate">
        <input
          type="checkbox"
          checked={theme === "light"}
          onChange={handleToggle}
          value={theme}
          className="theme-controller row-start-1 col-start-1 col-span-2"
        />
        <SunIcon />
        <MoonIcon />
      </label>
    </div>
  );
};

export default ThemeController;
