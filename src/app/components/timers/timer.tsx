"ues client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Timer } from "@prisma/client";
import { DotSquareIcon } from "../icons";
import { Colour, supprtedColours } from "../util";
import DeleteTimerModal from "./delete-timer/delete-timer-modal";
import EditTimerModal from "./edit-timer/edit-timer-modal";

interface Props {
  timer: Timer;
}

const TimerComponent = ({ timer }: Props) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: timer.position + 1 });

  const containerStyle = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  const dragHandleStyle = {
    ...containerStyle,
    cursor: "grab",
  };

  const name = timer.name;
  const colour = timer.colour as Colour;
  const mainTime = timer.main;
  const intervalTime = timer.interval;
  const repetitions = timer.repeat;
  const position = timer.position;
  const dislayColour = supprtedColours[colour];

  const formatRepititions = (repetitions: number) => {
    if (repetitions === 1) {
      return "Once";
    } else if (repetitions === 2) {
      return "Twice";
    } else {
      return `${repetitions} times`;
    }
  };

  return (
    <div
      ref={setNodeRef}
      style={containerStyle}
      className={`flex flex-col ${dislayColour} rounded-md py-2 px-4 mb-2`}
    >
      <div className="grid grid-cols-3">
        <div></div>
        <h6 className="text-base-300 text-sm font-bold text-center">
          {intervalTime > 0 ? `${intervalTime} sec.` : "No Interval"}
        </h6>
        <div className="flex justify-end">
          <div>
            <EditTimerModal timer={timer} />
          </div>
          <div className="ml-2">
            <DeleteTimerModal timer={timer} />
          </div>
        </div>
      </div>
      <div className="text-base-300 text-xl font-bold text-center mt-6 mb-6">
        <h3>{mainTime} sec.</h3>
      </div>
      <div className="grid grid-cols-3">
        <div className="text-base-300 text-start font-bold">{name}</div>
        <div>
          <h6 className={`text-base-300 text-sm font-bold text-center`}>
            {repetitions > 0
              ? `Repeat ${formatRepititions(repetitions)}`
              : "No Repeat"}
          </h6>
        </div>
        <div className="flex flex-row justify-end">
          <div
            className="flex flex-col justify-center align-middle"
            style={dragHandleStyle}
            {...attributes}
            {...listeners}
          >
            <DotSquareIcon size={5} />
          </div>
          <div className="text-base-300 text-end font-bold ml-2">
            {position + 1}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimerComponent;
