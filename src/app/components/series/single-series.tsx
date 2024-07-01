import { Prisma } from "@prisma/client";
import { supprtedColours, supprtedHoverColours } from "../util";
import DeleteSeriesModal from "./delete-series-modal";
import EditSeriesModal from "./edit-series/edit-series-modal";

interface Props {
  series: Prisma.SeriesGetPayload<{ include: { timers: true } }>;
  index: number;
}

const SingleSeries = ({ series, index }: Props) => {
  const id = series.id;
  const name = series.name;
  const timersCount = series.timers.length;
  const totalTime = series.timers.reduce((acc, curr) => {
    return acc + curr.main + curr.interval;
  }, 0);
  const colour = series.colour;

  const dislayColour = supprtedColours[colour as keyof typeof supprtedColours];
  const hoverColour =
    supprtedHoverColours[colour as keyof typeof supprtedHoverColours];

  return (
    <div
      className={`flex flex-col ${dislayColour} ${hoverColour} cursor-pointer rounded-md p-2`}
    >
      <div className="flex justify-between">
        <EditSeriesModal
          id={id}
          name={name}
          colour={colour as keyof typeof supprtedColours}
        />
        <DeleteSeriesModal id={id} name={name} colour={colour} />
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
