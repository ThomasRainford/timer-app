"use client";

import {
  Colour,
  supprtedColours,
  TimerRun,
  TimerRuns,
} from "@/app/components/util";
import { useCountdown } from "@/app/hooks/useCountdown";
import { Series, Timer } from "@prisma/client";
import { useEffect, useMemo, useState } from "react";

interface Props {
  series: Series & { timers: Timer[] };
}

const RunPageContent = ({ series }: Props) => {
  const timers = series?.timers.sort((a, b) => {
    return a.position - b.position;
  });
  const { count, start, pause, resume, restart, restartWith } = useCountdown({
    initialCount: timers[0].interval,
  });
  const timerRuns: TimerRuns = useMemo(
    () =>
      timers
        .map((timer) => {
          const repeat = timer.repeat;
          const run: TimerRun = {
            interval: timer.interval,
            main: timer.main,
            colour: timer.colour as Colour,
            repeat,
          };
          if (repeat === 0) {
            return run;
          }
          return Array(repeat + 1).fill(run);
        })
        .flat(),
    [timers]
  );

  const [currentRunIndex, setRunIndex] = useState(0);
  const currentTimerRun = timerRuns[currentRunIndex];
  const nextTimerRun =
    timerRuns[
      currentRunIndex < timerRuns.length - 1
        ? currentRunIndex + 1
        : currentRunIndex
    ];
  const [currentCountType, setCurrentCountType] = useState<"interval" | "main">(
    currentTimerRun.interval > 0 ? "interval" : "main"
  );

  useEffect(() => {
    //start();
  }, [start]);

  if (count === 0) {
    const doneMain = currentCountType === "main";
    const nextMain = timerRuns[currentRunIndex + 1].main;
    if (doneMain) {
      const nextInterval = timerRuns[currentRunIndex + 1].interval;
      const nextIsInterval = nextInterval > 0;
      setRunIndex((prev) => prev + 1);
      setCurrentCountType(nextIsInterval ? "interval" : "main");
      restartWith(nextIsInterval ? nextInterval : nextMain);
    } else {
      setCurrentCountType("main");
      restartWith(nextMain);
    }
  }

  const nextInterval = nextTimerRun.interval;
  const main = currentTimerRun?.main;
  const colour = currentTimerRun?.colour as Colour;
  const mainColour = supprtedColours[colour];
  const intervalColour = "bg-base-200";

  console.log("currentCountType", currentCountType);
  console.log("nextInterval", nextInterval);
  console.log(currentTimerRun);
  if (currentCountType === "interval") {
    return (
      <div className="flex flex-col h-screen">
        <div
          className={`${intervalColour} h-[80%] flex justify-center items-center`}
        >
          <h1 className="text-9xl text-center">{count}</h1>
        </div>
        <div
          className={`${mainColour} h-[20%] flex justify-center items-center`}
        >
          <h1 className="text-6xl text-center text-base-100">{main}</h1>
        </div>
      </div>
    );
  }
  return (
    <div className="flex flex-col h-screen">
      <div className={`${mainColour} h-[80%] flex justify-center items-center`}>
        <h1 className="text-9xl text-center text-base-200">{count}</h1>
      </div>
      <div
        className={`${intervalColour} h-[20%] flex justify-center items-center`}
      >
        <h1 className="text-6xl text-center ">{nextInterval}</h1>
      </div>
    </div>
  );
};

export default RunPageContent;
