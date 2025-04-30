import { TimeDetails } from "../../util";

interface Props {
  timeDetails: TimeDetails;
}

const Time = ({ timeDetails }: Props) => {
  const { hours, minutes, seconds } = timeDetails;

  let timeString = seconds.toString();
  const secondsString = seconds < 10 ? `0${seconds}` : timeString;
  const minutesString = minutes < 10 ? `0${minutes}` : minutes.toString();
  timeString =
    hours > 0
      ? `${hours}:${minutesString}:${secondsString}`
      : `${minutes}:${secondsString}`;

  return <>{timeString}</>;
};

export default Time;
