import { Timer } from "@prisma/client";
import { Colour, supprtedColours } from "../util";
import EditTimerModal from "./edit-timer/edit-timer-modal";

interface Props {
  timer: Timer;
}

const TimerComponent = ({ timer }: Props) => {
  const name = timer.name;
  const colour = timer.colour as Colour;
  const mainTime = timer.main;
  const intervalTime = timer.interval;
  const repetitions = timer.repeat;
  const position = timer.position;
  const dislayColour = supprtedColours[colour];

  return (
    <div>
      <div
        className={`flex flex-col ${dislayColour} cursor-pointer rounded-md py-2 px-4 mb-2`}
      >
        <div className="grid grid-cols-3">
          <div></div>
          <h6 className="text-base-300 text-sm font-bold text-center">
            {intervalTime > 0 ? `${intervalTime} sec.` : "No Interval"}
          </h6>
          <div className="flex justify-end">
            <EditTimerModal timer={timer} />
          </div>
        </div>
        <div className="text-base-300 text-xl font-bold text-center mt-6 mb-6">
          <h3>{mainTime} sec.</h3>
        </div>
        <div className="grid grid-cols-3">
          <div className="text-base-300 text-start font-bold">{name}</div>
          <div>
            <h6 className={`text-base-300 text-sm font-bold text-center`}>
              {repetitions > 0 ? `Repeat ${repetitions}` : "No Repeat"}
            </h6>
          </div>
          <div className="text-base-300 text-end font-bold">{position + 1}</div>
        </div>
      </div>
    </div>
  );
};

export default TimerComponent;
