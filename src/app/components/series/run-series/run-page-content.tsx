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
import StartTimerView from "./start-timer-view";

interface Props {
  series: Series & { timers: Timer[] };
}

type CountType = "start" | "interval" | "main" | "end";

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

  const { count, isPaused, start, pause, resume, restart, resetWith } =
    useCountdown({
      initialCount: 5,
    });

  const startTimerRun: TimerRun = useMemo(
    () => ({
      id: -1,
      name: "Start",
      interval: 0,
      main: 5,
      colour: "white",
      repeat: 0,
    }),
    []
  );

  // Create timer runs array starting with the start timer run.
  const timerRuns: TimerRuns = useMemo(
    () =>
      [startTimerRun, ...timers]
        .map((timer, index) => {
          const run: TimerRun = {
            id: index - 1,
            name: timer.name,
            interval: timer.interval,
            main: timer.main,
            colour: timer.colour as Colour,
            repeat: timer.repeat,
          };
          return timer.repeat === 0 ? run : Array(timer.repeat + 1).fill(run);
        })
        .flat(),
    [startTimerRun, timers]
  );

  // Timer state management.
  const initialState: TimerState = {
    currentRunIndex: 0,
    currentCountType: "start",
    completeTimers: [],
  };
  const [timerState, setTimerState] = useState<TimerState>(initialState);

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

  // Handle timer completion.
  useEffect(() => {
    if (timerState.currentCountType === "end") return;
    if (count === 3 || count === 2 || count === 1) {
      playCountTick(); // Play count sound on 3, 2 and 1.
    } else if (count === 0 && timerState.currentCountType === "interval") {
      playIntervalEndTick(); // Play interval end sound.
    }
    if (count === 0) {
      const doneStart = timerState.currentCountType === "start";
      const doneInterval = timerState.currentCountType === "interval";
      if (doneStart) {
        setTimerState((prev) => ({
          currentRunIndex: prev.currentRunIndex + 1,
          currentCountType: "main",
          completeTimers: [currentTimerRun.id],
        }));
        resetWith(nextTimerRun.main);
      } else if (doneInterval) {
        const nextMain = timerRuns[timerState.currentRunIndex].main;
        const nextIsMain = nextMain > 0;
        setTimerState((prev) => ({
          currentRunIndex: prev.currentRunIndex + 1,
          currentCountType: nextIsMain ? "main" : "interval",
          completeTimers: [...prev.completeTimers, currentTimerRun.id],
        }));
        resetWith(nextIsMain ? nextMain : nextTimerRun.interval);
      } else {
        setTimerState((prev) => ({
          ...prev,
          currentCountType: "interval",
          completeTimers: [...prev.completeTimers],
        }));
        resetWith(currentTimerRun.interval);
      }
    }
  }, [
    timerRuns,
    nextTimerRun,
    timerState,
    count,
    timerState.currentCountType,
    timerState.currentRunIndex,
    currentTimerRun.id,
    currentTimerRun.main,
    nextTimerRun.main,
    currentTimerRun.interval,
    nextTimerRun.id,
    nextTimerRun.interval,
    playCountTick,
    playIntervalEndTick,
    playPauseTick,
    resetWith,
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

  const isLastTimer = (() => {
    if (timerState.currentRunIndex !== timerRuns.length - 1) return false;
    if (nextTimerRun.interval > 0) {
      return timerState.currentCountType === "interval";
    } else {
      return timerState.currentCountType === "main";
    }
  })();

  useEffect(() => {
    if (isPaused) pause();
  }, [isPaused, pause]);

  useEffect(() => {
    if (isLastTimer && count === 0) {
      resetTimerOnEnd();
    }
  }, [isLastTimer, count, resetTimerOnEnd]);

  // Compute display values.
  const getDisplayName = useCallback(
    (timerRun: TimerRun) => {
      const { name, repeat } = timerRun;
      let repeatIndex = timerState.completeTimers.filter(
        (id) => id === timerRun.id
      ).length;
      repeatIndex = repeatIndex < 0 ? 0 : repeatIndex;
      return repeat > 0 ? `${name} (${repeatIndex + 1}/${repeat + 1})` : name;
    },
    [timerState.completeTimers]
  );

  const name = currentTimerRun.name;
  const displayName = getDisplayName(currentTimerRun);
  const nextName = nextTimerRun.name;
  const colour = currentTimerRun?.colour;
  const mainColour = supprtedColours[colour];
  const nextMainColour = supprtedColours[nextTimerRun.colour];
  const actionBtnHoverColour = buttonHoverColours[colour];

  const countTimeDetails = getTimeFromSeconds(count);
  const nextTimeDetails = getTimeFromSeconds(nextTimerRun.main);
  const nextIntervalTimeDetails = (time: number) =>
    isLastTimer ? "End" : getTimeFromSeconds(time);

  if (timerState.currentCountType === "start") {
    return (
      <StartTimerView
        name={name}
        nextName={nextName}
        isPaused={isPaused}
        mainColour={nextMainColour}
        countTimeDetails={countTimeDetails}
        mainTimeDetails={nextTimeDetails}
        onRestart={() => resetWith(currentTimerRun.main)}
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
        onSkip={() => {
          playCountTick();
          setTimerState((prev) => ({
            currentRunIndex: prev.currentRunIndex + 1,
            currentCountType: "main",
            completeTimers: [...prev.completeTimers, currentTimerRun.id],
          }));
          resetWith(nextTimerRun.main);
        }}
      />
    );
  }

  if (timerState.currentCountType === "interval") {
    return (
      <IntervalTimerView
        name={nextName}
        isPaused={isPaused}
        mainTimeDetails={nextIntervalTimeDetails(nextTimerRun.main)}
        countTimeDetails={countTimeDetails}
        mainColour={nextMainColour}
        onRestart={() => resetWith(currentTimerRun.interval)}
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
        onSkip={() => {
          playCountTick();
          if (isLastTimer) {
            setTimerState(() => ({
              currentRunIndex: 0,
              currentCountType: "end",
              completeTimers: [],
            }));
            return;
          }
          setTimerState((prev) => ({
            currentRunIndex: prev.currentRunIndex + 1,
            currentCountType: "main",
            completeTimers: [...prev.completeTimers, currentTimerRun.id],
          }));
          resetWith(nextTimerRun.main);
        }}
      />
    );
  }

  if (timerState.currentCountType === "main") {
    return (
      <MainTimerView
        name={displayName}
        nextName={nextName}
        isPaused={isPaused}
        mainColour={mainColour}
        actionBtnHoverColour={actionBtnHoverColour}
        countTimeDetails={countTimeDetails}
        nextTimerRunDetails={
          currentTimerRun.interval > 0
            ? {
                type: "interval",
                time: nextIntervalTimeDetails(currentTimerRun.interval),
              }
            : {
                type: "main",
                time: nextTimeDetails,
                name: nextTimerRun.name,
                colour: supprtedColours[nextTimerRun.colour],
              }
        }
        onRestart={() => resetWith(currentTimerRun.main)}
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
        onSkip={() => {
          playCountTick();
          const nextInterval = timerRuns[timerState.currentRunIndex].interval;
          const nextIsInterval = nextInterval > 0;
          setTimerState((prev) => ({
            currentRunIndex: nextIsInterval
              ? prev.currentRunIndex
              : prev.currentRunIndex + 1,
            currentCountType: nextIsInterval ? "interval" : "main",
            completeTimers: !nextIsInterval
              ? [...prev.completeTimers, currentTimerRun.id]
              : [...prev.completeTimers],
          }));
          resetWith(nextIsInterval ? nextInterval : nextTimerRun.main);
        }}
      />
    );
  }

  return (
    <div className="flex flex-col grow ">
      <div className="flex flex-row grow justify-center bg-base-300 rounded-md">
        <div className="flex items-center mr-1">
          <div
            className="btn btn-primary btn-lg"
            onClick={() => {
              restart();
              setTimerState({
                ...initialState,
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
