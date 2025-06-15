"use client";

import { useEffect, useState } from "react";

interface ThemeToggle {
  key: string;
  otherTheme: string;
  defaultTheme: string;
}

const useThemeToggle = ({
  key,
  otherTheme,
  defaultTheme,
}: ThemeToggle): [string, (e: any) => void] => {
  const [theme, setTheme] = useState(localStorage.getItem(key) ?? defaultTheme);

  const handleToggle = (e: any) => {
    if (e.target.checked) {
      setTheme(otherTheme);
    } else {
      setTheme(defaultTheme);
    }
  };

  useEffect(() => {
    localStorage.setItem(key, theme!);
    const localTheme = localStorage.getItem(key);
    document.querySelector("html")?.setAttribute("data-theme", localTheme!);
  }, [key, theme]);

  return [theme, handleToggle];
};

export default useThemeToggle;
