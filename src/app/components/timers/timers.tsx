"use client";

import { editTimers } from "@/app/lib/actions/timer";
import { closestCenter, DndContext, DragEndEvent } from "@dnd-kit/core";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { Timer } from "@prisma/client";
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
    setItems(timers);
  }, [timers]);

  const updateTimersPosition = async (seriesId: number, timers: Timer[]) => {
    return await editTimers(seriesId, timers);
  };

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;
    const activeId = active?.id as number;
    const overId = over?.id as number;
    if (!over || activeId === overId) return;
    setItems((prevItems) => {
      const oldIndex = prevItems.findIndex(
        (item) => item.position === activeId - 1
      );
      const newIndex = prevItems.findIndex(
        (item) => item.position === overId - 1
      );
      const newItems = [...prevItems];
      const [movedItem] = newItems.splice(oldIndex, 1);
      newItems.splice(newIndex, 0, movedItem);
      // Update positions.
      const updatedItems = newItems.map((item, index) => ({
        ...item,
        position: index,
      }));
      updateTimersPosition(seriesId, updatedItems);
      return updatedItems;
    });
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
