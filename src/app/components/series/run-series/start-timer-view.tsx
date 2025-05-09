import { CircleArrowIcon, PauseIcon, PlayIcon, SkipIcon } from "../../icons";
import { getTimeFromSeconds } from "../../util";
import MainTime from "./main-timer";
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
  onSkip: () => void;
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
  onSkip,
}: Props) => {
  return (
    <div className="flex flex-col grow h-full pb-2">
      <div
        className={`bg-base-200 grow w-full flex justify-center items-center rounded-t-md`}
      >
        <div className="h-full w-full flex flex-col mx-4">
          <div className="mt-4">
            <h5 className="text-xl pb-2 text-center ml-3">Starting in...</h5>
          </div>
          <div className="h-full w-full flex flex-col justify-center items-center mb-[15%] md:mb-[50px]">
            <div>
              <MainTime timeDetails={countTimeDetails} />
            </div>
            <div className="flex flex-row justify-evenly w-[275px] pt-5">
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
              <div className="flex items-center">
                <TimerActionButton
                  icon={<SkipIcon size={6} />}
                  onClick={onSkip}
                  hoverColour={"bg-base-200"}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className={`${mainColour}  flex flex-col justify-start items-center rounded-b-md`}
      >
        <div className="h-full">
          <div className="mt-1 pb-4">
            <h5 className="text-lg text-center text-base-300">
              Next: {nextName}
            </h5>
          </div>
          <div className="pb-2">
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
