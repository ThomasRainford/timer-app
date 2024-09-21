"use client";

import {
  Colour,
  supprtedColours,
  TimerRun,
  TimerRuns,
} from "@/app/components/util";
import { useCountdown } from "@/app/hooks/use-countdown";
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
            name: timer.name,
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
    start();
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

  const nextName = nextTimerRun.name;
  const nextInterval = nextTimerRun.interval;

  const name = currentTimerRun?.name;
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
          className={`${intervalColour} h-[70%] flex justify-center items-center`}
        >
          <h1 className="text-9xl text-center">{count}</h1>
        </div>
        <div
          className={`${mainColour} h-[30%] flex flex-col justify-start items-center`}
        >
          <div className="h-[100%]">
            <div className="mt-1 pb-4">
              <h5 className="text-lg text-center text-base-300">
                Next: {nextName}
              </h5>
            </div>
            <div>
              <h3 className="text-6xl text-center text-base-300">{main}</h3>
            </div>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="flex flex-col h-screen">
      <div className={`${mainColour} h-[70%] flex justify-center items-center`}>
        <div className="h-[100%] flex flex-col">
          <div className="mt-4" style={{ paddingBottom: "165px" }}>
            <h5 className="text-xl pb-2 text-center text-base-300">{name}</h5>
          </div>
          <div>
            <h1 className="text-9xl text-center text-base-300">{count}</h1>
          </div>
        </div>
      </div>
      <div
        className={`${intervalColour} h-[30%] flex flex-col justify-center items-center`}
      >
        <div className="h-[100%]">
          <div className="pb-5" style={{ visibility: "hidden" }}>
            <h5 className="text-lg text-center text-base-300">
              Next: {nextName}
            </h5>
          </div>
          <div>
            <h3 className="text-6xl text-center">{nextInterval}</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RunPageContent;
