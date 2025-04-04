import Link from "next/link";
import { ArrowLeftIcon } from "../icons";
import DeleteSeriesModal from "../series/delete-series/delete-series-modal";
import EditSeriesModal from "../series/edit-series/edit-series-modal";
import { buttonHoverColours, Colour, supprtedColours } from "../util";

interface Props {
  id: number;
  name: string;
  colour: Colour;
}

const TimersHeading = ({ id, name, colour }: Props) => {
  const backgroundColour = supprtedColours;

  const dislayColour = backgroundColour[colour];
  const btnHoverColour = buttonHoverColours[colour];

  return (
    <div className={`flex justify-between py-3 px-4 ${dislayColour} rounded-sm`}>
      <div className="flex flex-row">
        <Link
          className={`btn btn-outline btn-square btn-sm ${btnHoverColour}`}
          href={"/series"}
        >
          <ArrowLeftIcon size={5} />
        </Link>
        <div
          className={`invisible btn btn-outline btn-square btn-sm ml-2`}
        ></div>
      </div>
      <div className="flex items-center ">
        <h1 className="text-xl font-bold text-base-300">{name}</h1>
      </div>
      <div className="flex flex-row">
        <div>
          <EditSeriesModal id={id} name={name} colour={colour} />
        </div>
        <div className="ml-2">
          <DeleteSeriesModal id={id} name={name} colour={colour} />
        </div>
      </div>
    </div>
  );
};

export default TimersHeading;
