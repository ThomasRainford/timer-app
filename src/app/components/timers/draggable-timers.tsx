import { Timer as PrismaTimer } from "@prisma/client";
import Timer from "./timer";

interface Props {
  timers: PrismaTimer[];
}

const DraggableTimers = ({ timers }: Props) => {
  return (
    <div>
      {timers.map((timer) => {
        return (
          <Timer key={timer.id} timer={timer} timerCount={timers.length} />
        );
      })}
    </div>
  );
};

export default DraggableTimers;
