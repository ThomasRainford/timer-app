"use client";

import { Timer as PrismaTimer } from "@prisma/client";
import DraggableTimer from "./draggable-timer";
import Timer from "./timer";

interface Props {
  timers: PrismaTimer[];
}

const DraggableTimers = ({ timers }: Props) => {
  return (
    <div>
      {[...timers].map((timer) => {
        return (
          <DraggableTimer key={timer.id} id={timer.position + 1}>
            <Timer timer={timer} />
          </DraggableTimer>
        );
      })}
    </div>
  );
};

export default DraggableTimers;
