import { CircleArrowIcon, PauseIcon, PlayIcon } from "../../icons";
import { getTimeFromSeconds } from "../../util";
import Time from "./time";
import TimerActionButton from "./timer-action-button";

interface Props {
  name: string;
  nextName: string;
  isPaused: boolean;
  mainColour: string;
  countTimeDetails: ReturnType<typeof getTimeFromSeconds>;
  mainTimeDetails: ReturnType<typeof getTimeFromSeconds>;
  onRestart: () => void;
  onPauseResume: () => void;
}

const StartTimerView = ({
  name,
  nextName,
  isPaused,
  mainColour,
  countTimeDetails,
  mainTimeDetails,
  onRestart,
  onPauseResume,
}: Props) => {
  return (
    <div className="flex flex-col grow px-2">
      <div
        className={`bg-base-200 h-[80%] w-full flex justify-center items-center rounded-t-md`}
      >
        <div className="h-full w-full flex flex-col mx-4">
          <div className="mt-4">
            <h5 className="text-xl pb-2 text-center ">Starting in...</h5>
          </div>
          <div className="h-full w-full flex flex-col justify-center items-center mb-[15%] md:mb-[50px]">
            <div className="flex flex-row justify-around w-full">
              <h1 className="text-9xl text-center w-full  font-mono">
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
            <h5 className="text-lg text-center text-base-300">
              Next: {nextName}
            </h5>
          </div>
          <div>
            <h3 className="text-6xl text-center font-mono text-base-300">
              <Time timeDetails={mainTimeDetails} />
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StartTimerView;
