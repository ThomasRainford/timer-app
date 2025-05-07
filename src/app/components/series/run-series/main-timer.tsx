import { TimeDetails } from "../../util";
import Time from "./time";

interface Props {
  timeDetails: TimeDetails;
}

const MainTime = ({ timeDetails }: Props) => {
  return (
    <div className="flex flex-row justify-around">
      <h1 className="text-[18vw] sm:text-[15vw] md:text-[12vw] text-center font-mono">
        <Time timeDetails={timeDetails} />
      </h1>
    </div>
  );
};

export default MainTime;
