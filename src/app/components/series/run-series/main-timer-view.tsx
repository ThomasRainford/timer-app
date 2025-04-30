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
  actionBtnHoverColour: string;
  countTimeDetails: ReturnType<typeof getTimeFromSeconds>;
  nextTimerRunDetails: {
    type: "main" | "interval";
    time: ReturnType<typeof getTimeFromSeconds> | "End";
    name?: string;
    colour?: string;
  };
  onRestart: () => void;
  onPauseResume: () => void;
  onSkip: () => void;
}

const MainTimerView = ({
  name,
  nextName,
  isPaused,
  mainColour,
  actionBtnHoverColour,
  countTimeDetails,
  nextTimerRunDetails,
  onRestart,
  onPauseResume,
  onSkip,
}: Props) => (
  <div className="flex flex-col grow h-full px-2 md:px-4 lg:px-6 pb-2">
    <div
      className={`${mainColour} grow w-full flex justify-center items-center rounded-t-md`}
    >
      <div className="h-full w-full flex flex-col mx-4">
        <div className="mt-4">
          <h5 className="text-xl pb-2 text-center text-base-300">{name}</h5>
        </div>
        <div className="h-full w-full flex flex-col justify-center items-center mb-[15%] md:mb-[50px]">
          <div className="text-base-300">
            <MainTime timeDetails={countTimeDetails} />
          </div>
          <div className="flex flex-row justify-evenly w-[275px] pt-5">
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
            <div className="flex items-center">
              <TimerActionButton
                icon={<SkipIcon className="text-base-300" size={6} />}
                onClick={onSkip}
                hoverColour={actionBtnHoverColour}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    {nextTimerRunDetails.type === "main" ? (
      <div
        className={`${nextTimerRunDetails.colour}  flex flex-col justify-start items-center rounded-b-md`}
      >
        <div className="h-full">
          <div className="mt-1 pb-4">
            <h5 className="text-lg text-center text-base-300">
              Next: {nextTimerRunDetails.name}
            </h5>
          </div>
          <div className="pb-2">
            <h3 className="text-6xl text-center font-mono text-base-300">
              {typeof nextTimerRunDetails.time === "string" ? (
                <div>{nextTimerRunDetails.time}</div>
              ) : (
                <Time timeDetails={nextTimerRunDetails.time} />
              )}
            </h3>
          </div>
        </div>
      </div>
    ) : (
      <div className="bg-base-200 flex flex-col justify-center items-center rounded-b-md">
        <div className="h-full">
          <div className="pb-5" style={{ visibility: "hidden" }}>
            <h5 className="text-lg text-center text-base-300">Next:</h5>
          </div>
          <div className="pb-2">
            <h3 className="text-6xl text-center font-mono">
              {typeof nextTimerRunDetails.time === "string" ? (
                <div>{nextTimerRunDetails.time}</div>
              ) : (
                <Time timeDetails={nextTimerRunDetails.time} />
              )}
            </h3>
          </div>
        </div>
      </div>
    )}
  </div>
);

export default MainTimerView;
