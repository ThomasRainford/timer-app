"use client";

import dynamic from "next/dynamic";

const ThemeController = dynamic(() => import("./theme-controller"), {
  ssr: false,
});

export default ThemeController;
