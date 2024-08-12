"use client";

import { closestCenter, DndContext, DragEndEvent } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { Timer } from "@prisma/client";
import { useState } from "react";
import DraggableTimers from "./draggable-timers";

interface Props {
  timers: Timer[];
  seriesId: number;
}

const Timers = ({ timers, seriesId }: Props) => {
  const [items, setItems] = useState(timers);

  const updateTimerPosition = async (seriesId: number, timers: Timer[]) => {
    const response = await fetch(`/api/series/${seriesId}/timer`, {
      method: "PUT",
      body: JSON.stringify(timers),
    });
    console.log(response, await response.json());
  };

  const handleDragEnd = async (event: DragEndEvent) => {
    if (!event.collisions) return;
    const active = event.active?.id as number;
    const over = event.over?.id as number;
    let newTimers = items;
    setItems((items) => {
      const oldIndex = items.findIndex(
        (timer) => timer.position === active - 1
      );
      const newIndex = items.findIndex((timer) => timer.position === over - 1);
      const newItems = [...items];
      newItems.splice(oldIndex, 1);
      newItems.splice(newIndex, 0, items[oldIndex]);
      const newItemsPositions = newItems.map((item, i) => ({
        ...item,
        position: i,
      }));
      newTimers = newItemsPositions;
      return newItemsPositions;
    });
    // Update the timers positions.
    await updateTimerPosition(seriesId, newTimers);
  };

  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
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
