import { TimeDetails } from "../../util";

interface Props {
  timeDetails: TimeDetails;
}

const Time = ({ timeDetails }: Props) => {
  const { minutes, seconds } = timeDetails;

  let timeString = seconds.toString();
  if (minutes > 0) {
    const secondsString = seconds < 10 ? `0${seconds}` : timeString;
    timeString = `${minutes}:${secondsString}`;
  }

  return (
    <div>
      <div>{timeString}</div>
    </div>
  );
};

export default Time;
