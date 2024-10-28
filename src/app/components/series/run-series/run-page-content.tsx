"use client";

import {
  Colour,
  getTimeFromSeconds,
  supprtedColours,
  TimerRun,
  TimerRuns,
} from "@/app/components/util";
import { useCountdown } from "@/app/hooks/use-countdown";
import { Series, Timer } from "@prisma/client";
import { useEffect, useMemo, useState } from "react";
import { CircleArrowIcon } from "../../icons";
import Time from "./Time";

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
            id: timer.id,
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
  const [currentCountType, setCurrentCountType] = useState<
    "interval" | "main" | "end"
  >(currentTimerRun.interval > 0 ? "interval" : "main");

  useEffect(() => {
    start();
  }, [start]);

  if (count === 0) {
    const doneMain = currentCountType === "main";
    const nextMain = timerRuns[currentRunIndex].main;
    if (doneMain) {
      const nextInterval = timerRuns[currentRunIndex].interval;
      const nextIsInterval = nextInterval > 0;
      setRunIndex((prev) => prev + 1);
      setCurrentCountType(nextIsInterval ? "interval" : "main");
      restartWith(nextIsInterval ? nextInterval : nextMain);
    } else {
      setCurrentCountType("main");
      restartWith(nextMain);
    }
  }

  const resetTimerOnEnd = () => {
    setRunIndex(0);
    setCurrentCountType("end");
    pause();
  };

  const isLastTimer =
    currentRunIndex === timerRuns.length - 1 && currentCountType === "main";
  if (isLastTimer && count === 0) {
    resetTimerOnEnd();
  }

  const nextName = (() => {
    const name = nextTimerRun.name;
    const repeat = nextTimerRun.repeat;
    if (repeat > 0) {
      return `${name} (${repeat})`;
    }
    return name;
  })();
  const nextInterval = nextTimerRun.interval;

  const name = (() => {
    const name = currentTimerRun.name;
    const repeat = currentTimerRun.repeat;
    if (repeat > 0) {
      return `${name} (${repeat})`;
    }
    return name;
  })();
  const main = currentTimerRun?.main;
  const colour = currentTimerRun?.colour as Colour;
  const mainColour = supprtedColours[colour];
  const intervalColour = "bg-base-200";

  const countTimeDetails = getTimeFromSeconds(count);
  const mainTimeDetails = getTimeFromSeconds(main);
  const nextIntervalTimeDetails = isLastTimer
    ? "End"
    : getTimeFromSeconds(nextInterval);

  if (currentCountType === "interval") {
    return (
      <div className="flex flex-col flex-grow">
        <div
          className={`${intervalColour} h-[80%] flex justify-center items-center`}
        >
          <h1 className="text-9xl text-center">
            <Time timeDetails={countTimeDetails} />
          </h1>
        </div>
        <div
          className={`${mainColour} h-[20%] flex flex-col justify-start items-center`}
        >
          <div className="h-[100%]">
            <div className="mt-1 pb-4">
              <h5 className="text-lg text-center text-base-300">
                Next: {name}
              </h5>
            </div>
            <div>
              <h3 className="text-6xl text-center text-base-300">
                <Time timeDetails={mainTimeDetails} />
              </h3>
            </div>
          </div>
        </div>
      </div>
    );
  } else if (currentCountType === "main") {
    return (
      <div className="flex flex-col flex-grow">
        <div
          className={`${mainColour} h-[80%] flex justify-center items-center`}
        >
          <div className="h-[100%] flex flex-col">
            <div className="mt-4" style={{ paddingBottom: "165px" }}>
              <h5 className="text-xl pb-2 text-center text-base-300">{name}</h5>
            </div>
            <div>
              <h1 className="text-9xl text-center text-base-300">
                <Time timeDetails={countTimeDetails} />
              </h1>
            </div>
          </div>
        </div>
        <div
          className={`${intervalColour} h-[20%] flex flex-col justify-center items-center`}
        >
          <div className="h-[100%]">
            <div className="pb-5" style={{ visibility: "hidden" }}>
              <h5 className="text-lg text-center text-base-300">
                Next: {nextName}
              </h5>
            </div>
            <div>
              <h3 className="text-6xl text-center">
                {typeof nextIntervalTimeDetails === "string" ? (
                  <div>{nextIntervalTimeDetails}</div>
                ) : (
                  <Time timeDetails={nextIntervalTimeDetails} />
                )}
              </h3>
            </div>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="flex flex-col flex-grow">
      <div className="flex flex-row flex-grow justify-center">
        <div className="flex items-center mr-1">
          <div
            className="btn btn-primary btn-lg"
            onClick={() => {
              restart();
              if (timerRuns[0].interval > 0) {
                setCurrentCountType("interval");
              } else {
                setCurrentCountType("main");
              }
            }}
          >
            <CircleArrowIcon size={8} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RunPageContent;
