export const supprtedColours = {
  white: "bg-white",
  slate: "bg-gray-500",
  gray: "bg-gray-500",
  stone: "bg-stone-500",
  red: "bg-red-500",
  orange: "bg-orange-500",
  amber: "bg-amber-500",
  yellow: "bg-yellow-500",
  lime: "bg-lime-500",
  green: "bg-green-500",
  emerald: "bg-emerald-500",
  teal: "bg-teal-500",
  cyan: "bg-cyan-500",
  sky: "bg-sky-500",
  blue: "bg-blue-500",
  indigo: "bg-indigo-500",
  violet: "bg-violet-500",
  purple: "bg-purple-500",
  fuchsia: "bg-fuchsia-500",
  pink: "bg-pink-500",
  magenta: "bg-magenta-500",
  rose: "bg-pink-500",
};

export const supprtedHoverColours = {
  white: "hover:bg-white",
  slate: "hover:bg-gray-600",
  gray: "hover:bg-gray-600",
  stone: "hover:bg-stone-600",
  red: "hover:bg-red-600",
  orange: "hover:bg-orange-600",
  amber: "hover:bg-amber-600",
  yellow: "hover:bg-yellow-600",
  lime: "hover:bg-lime-600",
  green: "hover:bg-green-600",
  emerald: "hover:bg-emerald-600",
  teal: "hover:bg-teal-600",
  cyan: "hover:bg-cyan-600",
  sky: "hover:bg-sky-600",
  blue: "hover:bg-blue-600",
  indigo: "hover:bg-indigo-600",
  violet: "hover:bg-violet-600",
  purple: "hover:bg-purple-600",
  fuchsia: "hover:bg-fuchsia-600",
  pink: "hover:bg-pink-600",
  magenta: "hover:bg-magenta-600",
  rose: "hover:bg-pink-600",
};

export const buttonHoverColours = {
  white: "hover:bg-white",
  slate: "hover:bg-gray-400",
  gray: "hover:bg-gray-400",
  stone: "hover:bg-stone-400",
  red: "hover:bg-red-400",
  orange: "hover:bg-orange-400",
  amber: "hover:bg-amber-400",
  yellow: "hover:bg-yellow-400",
  lime: "hover:bg-lime-400",
  green: "hover:bg-green-400",
  emerald: "hover:bg-emerald-400",
  teal: "hover:bg-teal-400",
  cyan: "hover:bg-cyan-400",
  sky: "hover:bg-sky-400",
  blue: "hover:bg-blue-400",
  indigo: "hover:bg-indigo-400",
  violet: "hover:bg-violet-400",
  purple: "hover:bg-purple-400",
  fuchsia: "hover:bg-fuchsia-400",
  pink: "hover:bg-pink-400",
  magenta: "hover:bg-magenta-400",
  rose: "hover:bg-pink-400",
};

export const supprtedTextColours = {
  white: "text-white",
  slate: "text-gray-500",
  gray: "text-gray-500",
  stone: "text-stone-500",
  red: "text-red-500",
  orange: "text-orange-500",
  amber: "text-amber-500",
  yellow: "text-yellow-500",
  lime: "text-lime-500",
  green: "text-green-500",
  emerald: "text-emerald-500",
  teal: "text-teal-500",
  cyan: "text-cyan-500",
  sky: "text-sky-500",
  blue: "text-blue-500",
  indigo: "text-indigo-500",
  violet: "text-violet-500",
  purple: "text-purple-500",
  fuchsia: "text-fuchsia-500",
  pink: "text-pink-500",
  magenta: "text-magenta-500",
  rose: "text-pink-500",
};

export type Colour = keyof typeof supprtedColours;

export const randomColour = (): Colour => {
  const colours = Object.keys(supprtedColours) as Colour[];
  return colours[Math.floor(Math.random() * colours.length)];
};

export type TimerRun = {
  id: number;
  name: string;
  interval: number;
  main: number;
  colour: Colour;
  repeat: number;
};

export type TimerRuns = Array<TimerRun>;

export type TimeDetails = {
  totalSeconds: number;
  seconds: number;
  minutes: number;
  hours: number;
  days: number;
};

export const getTimeFromSeconds = (secs: number): TimeDetails => {
  const totalSeconds = Math.ceil(secs);
  const days = Math.floor(totalSeconds / (60 * 60 * 24));
  const hours = Math.floor((totalSeconds % (60 * 60 * 24)) / (60 * 60));
  const minutes = Math.floor((totalSeconds % (60 * 60)) / 60);
  const seconds = Math.floor(totalSeconds % 60);

  return {
    totalSeconds,
    seconds,
    minutes,
    hours,
    days,
  };
};
