import { CircleArrowIcon, PauseIcon, PlayIcon } from "../../icons";
import { getTimeFromSeconds } from "../../util";
import Time from "./time";
import TimerActionButton from "./timer-action-button";

interface Props {
  name: string;
  nextName: string;
  isPaused: boolean;
  mainColour: string;
  actionBtnHoverColour: string;
  countTimeDetails: ReturnType<typeof getTimeFromSeconds>;
  nextIntervalTimeDetails: ReturnType<typeof getTimeFromSeconds> | "End";
  onRestart: () => void;
  onPauseResume: () => void;
}

const MainTimerView = ({
  name,
  nextName,
  isPaused,
  mainColour,
  actionBtnHoverColour,
  countTimeDetails,
  nextIntervalTimeDetails,
  onRestart,
  onPauseResume,
}: Props) => (
  <div className="flex flex-col grow px-2 md:px-4 lg:px-6">
    <div
      className={`${mainColour} h-[80%] w-full flex justify-center items-center rounded-t-md`}
    >
      <div className="h-full w-full flex flex-col mx-4">
        <div className="mt-4">
          <h5 className="text-xl pb-2 text-center text-base-300">{name}</h5>
        </div>
        <div className="h-full w-full flex flex-col justify-center items-center mb-[15%] md:mb-[50px]">
          <div className="flex flex-row justify-around w-full">
            <h1 className="text-9xl text-center w-full text-base-300 font-mono">
              <Time timeDetails={countTimeDetails} />
            </h1>
          </div>
          <div className="flex flex-row justify-evenly w-full pt-5 md:w-[550px]">
            <div className="flex items-center">
              <TimerActionButton
                icon={<CircleArrowIcon className="text-base-300" size={6} />}
                onClick={onRestart}
                hoverColour={actionBtnHoverColour}
              />
            </div>
            <div className="flex items-center">
              <TimerActionButton
                icon={
                  !isPaused ? (
                    <PauseIcon className="text-base-300" size={6} />
                  ) : (
                    <PlayIcon className="text-base-300" size={6} />
                  )
                }
                onClick={onPauseResume}
                hoverColour={actionBtnHoverColour}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="bg-base-200 h-[20%] flex flex-col justify-center items-center rounded-b-md">
      <div className="h-full">
        <div className="pb-5" style={{ visibility: "hidden" }}>
          <h5 className="text-lg text-center text-base-300">
            Next: {nextName}
          </h5>
        </div>
        <div>
          <h3 className="text-6xl text-center font-mono">
            {typeof nextIntervalTimeDetails === "string" ? (
              <div>{nextIntervalTimeDetails}</div>
            ) : (
              <Time timeDetails={nextIntervalTimeDetails} />
            )}
          </h3>
        </div>
      </div>
    </div>
  </div>
);

export default MainTimerView;
