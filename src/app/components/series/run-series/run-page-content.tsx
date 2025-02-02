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
import useSound from "use-sound";
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
  completeTimers: number[]; // Array if timer ids.
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
    completeTimers: [],
  });

  const currentTimerRun = timerRuns[timerState.currentRunIndex];
  const nextTimerRun =
    timerRuns[
      timerState.currentRunIndex < timerRuns.length - 1
        ? timerState.currentRunIndex + 1
        : timerState.currentRunIndex
    ];

  const [playPauseTick] = useSound("/tick.mp3", {
    volume: 0.25,
  });
  const [playCountTick] = useSound("/tick-2.mp3", {
    volume: 0.25,
  });
  const [playIntervalEndTick] = useSound("/beep.mp3", {
    volume: 0.25,
  });

  // Handle timer completion
  useEffect(() => {
    if (count === 3 || count === 2 || count === 1) {
      playCountTick(); // Play count sound on 3,2,1.
    } else if (count === 0 && timerState.currentCountType === "interval") {
      playIntervalEndTick(); // Play interval end sound.
    }
    if (count === 0) {
      const doneMain = timerState.currentCountType === "main";
      if (doneMain) {
        const nextInterval = timerRuns[timerState.currentRunIndex].interval;
        const nextIsInterval = nextInterval > 0;
        setTimerState((prev) => ({
          currentRunIndex: prev.currentRunIndex + 1,
          currentCountType: nextIsInterval ? "interval" : "main",
          completeTimers: [...prev.completeTimers, currentTimerRun.id],
        }));
        restartWith(nextIsInterval ? nextInterval : nextTimerRun.main);
      } else {
        setTimerState((prev) => ({
          ...prev,
          currentCountType: "main",
          completeTimers: [...prev.completeTimers],
        }));
        restartWith(currentTimerRun.main);
      }
    }
  }, [
    count,
    currentTimerRun.id,
    currentTimerRun.main,
    nextTimerRun.main,
    playCountTick,
    playIntervalEndTick,
    playPauseTick,
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
      completeTimers: [],
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
  const getDisplayName = useCallback(
    (timerRun: TimerRun) => {
      const { name, repeat } = timerRun;
      const repeatIndex = timerState.completeTimers.filter(
        (id) => id === timerRun.id
      ).length;
      return repeat > 0 ? `${name} (${repeatIndex + 1}/${repeat + 1})` : name;
    },
    [timerState.completeTimers]
  );

  const nextName = getDisplayName(nextTimerRun);
  const name = getDisplayName(currentTimerRun);
  const colour = currentTimerRun?.colour as Colour;
  const mainColour = supprtedColours[colour];
  const actionBtnHoverColour = buttonHoverColours[colour];

  const countTimeDetails = getTimeFromSeconds(count);
  const mainTimeDetails = getTimeFromSeconds(currentTimerRun.main);
  const nextIntervalTimeDetails = (time: number) =>
    isLastTimer ? "End" : getTimeFromSeconds(time);

  if (timerState.currentCountType === "interval") {
    return (
      <IntervalTimerView
        name={name}
        isPaused={isPaused}
        mainTimeDetails={mainTimeDetails}
        countTimeDetails={countTimeDetails}
        mainColour={mainColour}
        onRestart={() => restartWith(currentTimerRun.interval)}
        onPauseResume={() =>
          isPaused
            ? (() => {
                playPauseTick();
                resume();
              })()
            : (() => {
                playPauseTick();
                pause();
              })()
        }
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
        nextIntervalTimeDetails={nextIntervalTimeDetails(nextTimerRun.interval)}
        onRestart={() => restartWith(currentTimerRun.main)}
        onPauseResume={() =>
          isPaused
            ? (() => {
                playPauseTick();
                resume();
              })()
            : (() => {
                playPauseTick();
                pause();
              })()
        }
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
                completeTimers: [...timerState.completeTimers],
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
