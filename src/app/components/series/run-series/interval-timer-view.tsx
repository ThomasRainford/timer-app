import { getTimeFromSeconds } from "../../util";
import Time from "./Time";

interface Props {
  name: string;
  mainTimeDetails: ReturnType<typeof getTimeFromSeconds>;
  countTimeDetails: ReturnType<typeof getTimeFromSeconds>;
  mainColour: string;
}

const IntervalTimerView = ({
  name,
  mainTimeDetails,
  countTimeDetails,
  mainColour,
}: Props) => (
  <div className="flex flex-col flex-grow">
    <div className="bg-base-200 h-[80%] w-full flex justify-center items-center">
      <h1 className="text-9xl text-center">
        <Time timeDetails={countTimeDetails} />
      </h1>
    </div>
    <div
      className={`${mainColour} h-[20%] flex flex-col justify-start items-center`}
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
