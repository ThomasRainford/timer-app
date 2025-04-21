import { useState } from "react";

interface Props {
  name: string;
  defaultValue: number;
}

const TimerInput = ({ name, defaultValue }: Props) => {
  const defaultMinutes = Math.floor(defaultValue / 60);
  const defaultSeconds = defaultValue % 60;

  const formatTwoDigit = (val: number): string => {
    return val < 10 ? `0${val}` : `${val}`;
  };

  const [minutes, setMinutes] = useState<number | "">(defaultMinutes);
  const [seconds, setSeconds] = useState<number | "">(defaultSeconds);
  const [formattedMinutes, setFormattedMinutes] = useState<string>(
    formatTwoDigit(defaultMinutes)
  );
  const [formattedSeconds, setFormattedSeconds] = useState<string>(
    formatTwoDigit(defaultSeconds)
  );

  const maxSeconds = 10 * 60 * 60; // 10 hours

  const totalSeconds =
    (typeof minutes === "number" ? minutes : 0) * 60 +
    (typeof seconds === "number" ? seconds : 0);

  const handleMinutesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setFormattedMinutes(val);
    if (val === "") {
      setMinutes("");
      return;
    }

    const num = parseInt(val, 10);
    if (
      !isNaN(num) &&
      num >= 0 &&
      num * 60 + (typeof seconds === "number" ? seconds : 0) <= maxSeconds
    ) {
      setMinutes(num);
    }
  };

  const handleMinutesBlur = () => {
    if (minutes === "") {
      setMinutes(0);
      setFormattedMinutes("00");
    } else {
      setFormattedMinutes(formatTwoDigit(minutes));
    }
  };

  const handleSecondsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setFormattedSeconds(val);
    if (val === "") {
      setSeconds("");
      return;
    }

    let num = parseInt(val, 10);
    if (isNaN(num)) return;

    const currentMinutes = typeof minutes === "number" ? minutes : 0;

    if (num >= 60) {
      const addedMinutes = Math.floor(num / 60);
      const remainingSeconds = num % 60;
      const newMinutes = currentMinutes + addedMinutes;
      if (newMinutes * 60 + remainingSeconds <= maxSeconds) {
        setMinutes(newMinutes);
        setFormattedMinutes(formatTwoDigit(newMinutes));
        setSeconds(remainingSeconds);
        setFormattedSeconds(formatTwoDigit(remainingSeconds));
      }
    } else {
      if (currentMinutes * 60 + num <= maxSeconds && num >= 0) {
        setSeconds(num);
      }
    }
  };

  const handleSecondsBlur = () => {
    if (seconds === "") {
      setSeconds(0);
      setFormattedSeconds("00");
    } else {
      setFormattedSeconds(formatTwoDigit(seconds));
    }
  };

  const incrementMinutes = () => {
    const m = typeof minutes === "number" ? minutes : 0;
    const s = typeof seconds === "number" ? seconds : 0;
    if ((m + 1) * 60 + s <= maxSeconds) {
      const newMinutes = m + 1;
      setMinutes(newMinutes);
      setFormattedMinutes(formatTwoDigit(newMinutes));
    }
  };

  const decrementMinutes = () => {
    const m = typeof minutes === "number" ? minutes : 0;
    if (m > 0) {
      const newMinutes = m - 1;
      setMinutes(newMinutes);
      setFormattedMinutes(formatTwoDigit(newMinutes));
    }
  };

  const incrementSeconds = () => {
    const m = typeof minutes === "number" ? minutes : 0;
    const s = typeof seconds === "number" ? seconds : 0;
    const newSeconds = s + 5;

    if (newSeconds < 60) {
      if (m * 60 + newSeconds <= maxSeconds) {
        setSeconds(newSeconds);
        setFormattedSeconds(formatTwoDigit(newSeconds));
      }
    } else {
      const newMinutes = m + 1;
      const rolloverSeconds = newSeconds - 60;
      if (newMinutes * 60 + rolloverSeconds <= maxSeconds) {
        setMinutes(newMinutes);
        setFormattedMinutes(formatTwoDigit(newMinutes));
        setSeconds(rolloverSeconds);
        setFormattedSeconds(formatTwoDigit(rolloverSeconds));
      }
    }
  };

  const decrementSeconds = () => {
    const m = typeof minutes === "number" ? minutes : 0;
    const s = typeof seconds === "number" ? seconds : 0;

    if (s >= 5) {
      const newSeconds = s - 5;
      setSeconds(newSeconds);
      setFormattedSeconds(formatTwoDigit(newSeconds));
    } else if (m > 0) {
      const newMinutes = m - 1;
      const newSeconds = 55;
      setMinutes(newMinutes);
      setFormattedMinutes(formatTwoDigit(newMinutes));
      setSeconds(newSeconds);
      setFormattedSeconds(formatTwoDigit(newSeconds));
    }
  };

  return (
    <div className="flex flex-row">
      <div className="flex flex-col">
        <button
          type="button"
          className="btn btn-outline btn-sm text-lg opacity-70"
          onClick={incrementMinutes}
        >
          +
        </button>
        <input
          type="text"
          inputMode="numeric"
          min="0"
          className="text-center text-xl font-bold my-2 w-16 appearance-textfield [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          value={formattedMinutes}
          onChange={handleMinutesChange}
          onBlur={handleMinutesBlur}
        />
        <button
          type="button"
          className="btn btn-outline btn-sm text-lg opacity-70"
          onClick={decrementMinutes}
        >
          -
        </button>
      </div>
      <div className="flex justify-center items-center text-xl font-bold ml-1 mr-1">
        :
      </div>
      <div className="flex flex-col">
        <button
          type="button"
          className="btn btn-outline btn-sm text-lg opacity-70"
          onClick={incrementSeconds}
        >
          +
        </button>
        <input
          type="text"
          inputMode="numeric"
          min="0"
          className="text-center text-xl font-bold my-2 w-16 appearance-textfield [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          value={formattedSeconds}
          onChange={handleSecondsChange}
          onBlur={handleSecondsBlur}
        />
        <button
          type="button"
          className="btn btn-outline btn-sm text-lg opacity-70"
          onClick={decrementSeconds}
        >
          -
        </button>
      </div>
      <input type="hidden" name={name} value={totalSeconds} />
    </div>
  );
};

export default TimerInput;
