import { CircleArrowIcon, PauseIcon, PlayIcon } from "../../icons";
import { getTimeFromSeconds } from "../../util";
import Time from "./time";
import TimerActionButton from "./timer-action-button";

interface Props {
  name: string;
  isPaused: boolean;
  mainTimeDetails: ReturnType<typeof getTimeFromSeconds>;
  countTimeDetails: ReturnType<typeof getTimeFromSeconds>;
  mainColour: string;
  onRestart: () => void;
  onPauseResume: () => void;
}

const IntervalTimerView = ({
  name,
  isPaused,
  mainTimeDetails,
  countTimeDetails,
  mainColour,
  onRestart,
  onPauseResume,
}: Props) => (
  <div className="flex flex-col flex-grow px-2">
    <div className="bg-base-200 h-[80%] w-full flex justify-center items-center rounded-t-md">
      <div className="h-full w-full flex flex-col mx-4">
        <div className="mt-4">
          <h5 className="text-xl pb-2 text-center">{"Interval"}</h5>
        </div>
        <div className="h-full w-full flex flex-col justify-center items-center mb-[15%] md:mb-[50px]">
          <div className="flex flex-row justify-around w-full">
            <h1 className="text-9xl text-center w-full font-mono">
              <Time timeDetails={countTimeDetails} />
            </h1>
          </div>
          <div className="flex flex-row justify-evenly w-full pt-5 md:w-[550px]">
            <div className="flex items-center">
              <TimerActionButton
                icon={<CircleArrowIcon size={6} />}
                onClick={onRestart}
                hoverColour={"bg-base-200"}
              />
            </div>
            <div className="flex items-center">
              <TimerActionButton
                icon={
                  !isPaused ? <PauseIcon size={6} /> : <PlayIcon size={6} />
                }
                onClick={onPauseResume}
                hoverColour={"bg-base-200"}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      className={`${mainColour} h-[20%] flex flex-col justify-start items-center rounded-b-md`}
    >
      <div className="h-full">
        <div className="mt-1 pb-4">
          <h5 className="text-lg text-center text-base-300">Next: {name}</h5>
        </div>
        <div>
          <h3 className="text-6xl text-center text-base-300">
            <Time timeDetails={mainTimeDetails} />
          </h3>
        </div>
      </div>
    </div>
  </div>
);

export default IntervalTimerView;
