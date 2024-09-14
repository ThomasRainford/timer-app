import { useCallback, useRef, useState } from "react";

interface Props {
  initialCount: number; // time in seconds
}

export const useCountdown = ({ initialCount }: Props) => {
  const [count, setCount] = useState(initialCount);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Start timer
  const start = useCallback(() => {
    stopTimer(); // Ensure any previous interval is cleared

    intervalRef.current = setInterval(() => {
      setCount((prevTime) => {
        if (prevTime <= 0) {
          stopTimer();
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);
  }, []);

  // Stop timer
  const stopTimer = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  // Pause timer
  const pause = () => {
    setIsPaused(true);
    stopTimer();
  };

  // Resume timer
  const resume = () => {
    if (count > 0) {
      setIsPaused(false);
      start();
    }
  };

  // Restart timer
  const restart = () => {
    setCount(initialCount);
    setIsPaused(false);
    start();
  };

  const restartWith = (newCount: number) => {
    setCount(newCount);
    setIsPaused(false);
    start();
  };

  return { count, start, pause, resume, restart, restartWith };
};
