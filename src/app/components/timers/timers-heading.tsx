import Link from "next/link";
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
    <div className={`flex justify-between p-4 ${dislayColour} rounded`}>
      <div className="flex flex-row">
        <Link
          className={`btn btn-outline btn-square btn-sm ${btnHoverColour}`}
          href={"/series"}
        >
          <svg
            className="h-5 w-5 text-base-300"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" />
            <line x1="5" y1="12" x2="19" y2="12" />
            <line x1="5" y1="12" x2="11" y2="18" />
            <line x1="5" y1="12" x2="11" y2="6" />
          </svg>
        </Link>
        <div className={`invisible btn btn-outline btn-square btn-sm`}></div>
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
