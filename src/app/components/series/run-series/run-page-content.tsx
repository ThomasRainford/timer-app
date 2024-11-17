"use client";

import {
  Colour,
  TimerRun,
  TimerRuns,
  buttonHoverColours,
  getTimeFromSeconds,
  supprtedColours,
} from "@/app/components/util";
import { useCountdown } from "@/app/hooks/use-countdown";
import { Series, Timer } from "@prisma/client";
import { useCallback, useEffect, useMemo, useState } from "react";
import { CircleArrowIcon } from "../../icons";
import IntervalTimerView from "./interval-timer-view";
import MainTimerView from "./main-timer-view";

interface Props {
  series: Series & { timers: Timer[] };
}

type CountType = "interval" | "main" | "end";

interface TimerState {
  currentRunIndex: number;
  currentCountType: CountType;
}

const RunPageContent = ({ series }: Props) => {
  // Sort timers by position
  const timers = useMemo(
    () => series?.timers.sort((a, b) => a.position - b.position),
    [series?.timers]
  );

  const { count, isPaused, start, pause, resume, restart, restartWith } =
    useCountdown({
      initialCount: timers[0].interval,
    });

  // Create timer runs array
  const timerRuns: TimerRuns = useMemo(
    () =>
      timers
        .map((timer) => {
          const run: TimerRun = {
            id: timer.id,
            name: timer.name,
            interval: timer.interval,
            main: timer.main,
            colour: timer.colour as Colour,
            repeat: timer.repeat,
          };
          return timer.repeat === 0 ? run : Array(timer.repeat + 1).fill(run);
        })
        .flat(),
    [timers]
  );

  // Timer state management
  const [timerState, setTimerState] = useState<TimerState>({
    currentRunIndex: 0,
    currentCountType: timerRuns[0].interval > 0 ? "interval" : "main",
  });

  const currentTimerRun = timerRuns[timerState.currentRunIndex];
  const nextTimerRun =
    timerRuns[
      timerState.currentRunIndex < timerRuns.length - 1
        ? timerState.currentRunIndex + 1
        : timerState.currentRunIndex
    ];

  // Handle timer completion
  useEffect(() => {
    if (count === 0) {
      const doneMain = timerState.currentCountType === "main";
      if (doneMain) {
        const nextInterval = timerRuns[timerState.currentRunIndex].interval;
        const nextIsInterval = nextInterval > 0;
        setTimerState((prev) => ({
          currentRunIndex: prev.currentRunIndex + 1,
          currentCountType: nextIsInterval ? "interval" : "main",
        }));
        restartWith(nextIsInterval ? nextInterval : nextTimerRun.main);
      } else {
        setTimerState((prev) => ({
          ...prev,
          currentCountType: "main",
        }));
        restartWith(currentTimerRun.main);
      }
    }
  }, [
    count,
    currentTimerRun.main,
    nextTimerRun.main,
    restartWith,
    timerRuns,
    timerState,
  ]);

  // Start timer on mount
  useEffect(() => {
    start();
  }, [start]);

  // Handle timer end
  const resetTimerOnEnd = useCallback(() => {
    setTimerState({
      currentRunIndex: 0,
      currentCountType: "end",
    });
    pause();
  }, [pause]);

  const isLastTimer =
    timerState.currentRunIndex === timerRuns.length - 1 &&
    timerState.currentCountType === "main";

  useEffect(() => {
    if (isLastTimer && count === 0) {
      resetTimerOnEnd();
    }
  }, [isLastTimer, count, resetTimerOnEnd]);

  // Compute display values
  const getDisplayName = useCallback((timerRun: TimerRun) => {
    const { name, repeat } = timerRun;
    return repeat > 0 ? `${name} (${repeat + 1})` : name;
  }, []);

  const nextName = getDisplayName(nextTimerRun);
  const name = getDisplayName(currentTimerRun);
  const colour = currentTimerRun?.colour as Colour;
  const mainColour = supprtedColours[colour];
  const actionBtnHoverColour = buttonHoverColours[colour];

  const countTimeDetails = getTimeFromSeconds(count);
  const mainTimeDetails = getTimeFromSeconds(currentTimerRun.main);
  const nextIntervalTimeDetails = isLastTimer
    ? "End"
    : getTimeFromSeconds(nextTimerRun.interval);

  if (timerState.currentCountType === "interval") {
    return (
      <IntervalTimerView
        name={name}
        mainTimeDetails={mainTimeDetails}
        countTimeDetails={countTimeDetails}
        mainColour={mainColour}
      />
    );
  }

  if (timerState.currentCountType === "main") {
    return (
      <MainTimerView
        name={name}
        nextName={nextName}
        isPaused={isPaused}
        mainColour={mainColour}
        actionBtnHoverColour={actionBtnHoverColour}
        countTimeDetails={countTimeDetails}
        nextIntervalTimeDetails={nextIntervalTimeDetails}
        onRestart={() => restartWith(currentTimerRun.main)}
        onPauseResume={() => (isPaused ? resume() : pause())}
      />
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
              setTimerState({
                currentRunIndex: 0,
                currentCountType:
                  timerRuns[0].interval > 0 ? "interval" : "main",
              });
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
