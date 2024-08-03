"use client";

import { useEffect, useState } from "react";
import { MoonIcon, SunIcon } from "../icons";

const ThemeController = () => {
  const [theme, setTheme] = useState(
    global?.window !== undefined
      ? localStorage.getItem("theme") ?? "dark"
      : "dark"
  );
  const handleToggle = (e: any) => {
    if (e.target.checked) {
      setTheme("light");
    } else {
      setTheme("dark");
    }
  };
  useEffect(() => {
    localStorage.setItem("theme", theme!);
    const localTheme = localStorage.getItem("theme");
    document.querySelector("html")?.setAttribute("data-theme", localTheme!);
  }, [theme]);

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
