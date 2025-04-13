import { Prisma } from "@prisma/client";
import Link from "next/link";
import {
  Colour,
  formatTime,
  getTimeFromSeconds,
  supprtedColours,
  supprtedHoverColours,
} from "../util";

interface Props {
  series: Prisma.SeriesGetPayload<{ include: { timers: true } }>;
  index: number;
}

const SingleSeries = ({ series, index }: Props) => {
  const id = series.id;
  const name = series.name;
  const timersCount = series.timers.length;
  const totalTime = series.timers.reduce((acc, curr) => {
    // Calculate the main timer given the number of repeats.
    const mainRepeat = curr.repeat ? (curr.repeat + 1) * curr.main : curr.main;
    return acc + curr.interval + mainRepeat;
  }, 0);
  const colour = series.colour as Colour;

  const dislayColour = supprtedColours[colour];
  const hoverColour = supprtedHoverColours[colour];

  const timeDetails = getTimeFromSeconds(totalTime);
  const time = formatTime(timeDetails);

  return (
    <Link
      className={`flex flex-col ${dislayColour} ${hoverColour} cursor-pointer rounded-md p-2`}
      href={`/series/${id}`}
    >
      <div className="text-base-300 text-6xl text-center my-14">
        <h3>{index}</h3>
      </div>
      <div className="grid grid-cols-3">
        <div className="text-base-300 text-start font-bold">{name}</div>
        <div className="text-base-300 text-center font-bold">{time}</div>
        <div className="text-base-300 text-end font-bold">
          {timersCount} timers
        </div>
      </div>
    </Link>
  );
};

export default SingleSeries;
