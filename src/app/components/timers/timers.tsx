"use client";

import { editTimers } from "@/app/lib/actions/timer";
import { closestCenter, DndContext, DragEndEvent } from "@dnd-kit/core";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { Timer } from "@/generated/prisma/client";
import { useEffect, useState } from "react";
import DraggableTimers from "./draggable-timers";

interface Props {
  timers: Timer[];
  seriesId: number;
}

const Timers = ({ timers, seriesId }: Props) => {
  const [items, setItems] = useState(timers);

  // Update items with new timers.
  useEffect(() => {
    setItems((curr) => {
      // Check if arrays have the same length and all items match
      const areArraysEqual =
        curr.length === timers.length &&
        curr.every(
          (currTimer, index) =>
            currTimer.id === timers[index].id &&
            currTimer.position === timers[index].position &&
            currTimer.colour == timers[index].colour &&
            currTimer.main === timers[index].main &&
            currTimer.interval === timers[index].interval &&
            currTimer.repeat === timers[index].repeat &&
            currTimer.name === timers[index].name &&
            currTimer.seriesId === timers[index].seriesId
        );
      return areArraysEqual ? curr : timers;
    });
  }, [timers]);

  const updateTimersPosition = async (seriesId: number, timers: Timer[]) => {
    return await editTimers(seriesId, timers);
  };

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;
    const activeId = active?.id as number;
    const overId = over?.id as number;
    if (!over || activeId === overId) return;
    const oldIndex = items.findIndex((item) => item.position === activeId - 1);
    const newIndex = items.findIndex((item) => item.position === overId - 1);
    const newItems = [...items];
    const [movedItem] = newItems.splice(oldIndex, 1);
    newItems.splice(newIndex, 0, movedItem);
    const updatedItems = newItems.map((item, index) => ({
      ...item,
      position: index,
    }));
    setItems(updatedItems);
    await updateTimersPosition(seriesId, updatedItems);
  };

  return (
    <DndContext
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
      modifiers={[restrictToVerticalAxis]}
    >
      <SortableContext
        items={items.map((timer) => ({ id: timer.position + 1 }))}
        strategy={verticalListSortingStrategy}
      >
        <DraggableTimers timers={items} />
      </SortableContext>
    </DndContext>
  );
};

export default Timers;
