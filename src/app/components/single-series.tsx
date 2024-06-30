import { Prisma } from "@prisma/client";
import {
  buttonHoverColours,
  supprtedColours,
  supprtedHoverColours,
} from "./util";

interface Props {
  series: Prisma.SeriesGetPayload<{ include: { timers: true } }>;
  index: number;
}

const SingleSeries = ({ series, index }: Props) => {
  const name = series.name;
  const timersCount = series.timers.length;
  const totalTime = series.timers.reduce((acc, curr) => {
    return acc + curr.main + curr.interval;
  }, 0);
  const colour = series.colour;

  const dislayColour = supprtedColours[colour as keyof typeof supprtedColours];
  const hoverColour =
    supprtedHoverColours[colour as keyof typeof supprtedHoverColours];
  const btnHoverColour =
    buttonHoverColours[colour as keyof typeof buttonHoverColours];

  return (
    <div
      className={`flex flex-col ${dislayColour} ${hoverColour} cursor-pointer rounded-md p-2`}
    >
      <div className="flex justify-between">
        <div className="tooltip tooltip-right" data-tip="Edit series">
          <button
            className={`btn btn-outline btn-square btn-sm ${btnHoverColour}`}
          >
            <svg
              className="h-5 w-5 text-base-300"
              viewBox="0 0 24 24"
              stroke-width="2"
              stroke="currentColor"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" />
              <path d="M9 7 h-3a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-3" />
              <path d="M9 15h3l8.5 -8.5a1.5 1.5 0 0 0 -3 -3l-8.5 8.5v3" />
              <line x1="16" y1="5" x2="19" y2="8" />
            </svg>
          </button>
        </div>
        <div className="tooltip tooltip-left" data-tip="Delete series">
          <button
            className={`btn btn-outline btn-square btn-sm ${btnHoverColour}`}
          >
            <svg
              className="h-5 w-5 text-base-300 float-end"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              stroke-width="2"
              stroke="currentColor"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" />
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>
      </div>
      <div className="text-base-300 text-6xl text-center my-12">
        <h3>{index}</h3>
      </div>
      <div className="grid grid-cols-3">
        <div className="text-base-300 text-start font-bold">{name}</div>
        <div className="text-base-300 text-center font-bold">
          {totalTime} seconds
        </div>
        <div className="text-base-300 text-end font-bold">
          {timersCount} timers
        </div>
      </div>
    </div>
  );
};

export default SingleSeries;
