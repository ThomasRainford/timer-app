"use client";

import useThemeToggle from "@/app/hooks/useThemeToggle";
import { MoonIcon, SunIcon } from "../icons";

const ThemeController = () => {
  const [theme, handleToggle] = useThemeToggle({
    key: "theme",
    otherTheme: "light",
    defaultTheme: "dark",
  });

  return (
    <div>
      <label className="cursor-pointer grid place-items-center">
        <input
          type="checkbox"
          checked={theme === "light"}
          onChange={handleToggle}
          value={theme}
          className="toggle theme-controller bg-base-content row-start-1 col-start-1 col-span-2"
        />
        <MoonIcon size={14} />
        <SunIcon size={14} />
      </label>
    </div>
  );
};

export default ThemeController;
