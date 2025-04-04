"use client";

import { useEffect, useState } from "react";

const Countdown = () => {
  const [timer, setTimer] = useState(10);

  useEffect(() => {
    const interval = setInterval(() => {
      if (timer === 0) setTimer(11);
      setTimer((prevTimer) => prevTimer - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [timer]);

  return (
    <div className="bg-accent-content rounded-box text-neutral-content p-2">
      <span className="countdown font-mono text-6xl">
        <span style={{ "--value": timer } as any}></span>
      </span>
    </div>
  );
};

export default Countdown;
