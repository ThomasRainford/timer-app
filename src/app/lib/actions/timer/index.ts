"use server";

import { State } from "@/app/lib/actions/types";
import prisma from "@/app/lib/db";
import { auth } from "@/auth";
import { Timer } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

// Maximum number of timers per series.
const TIMER_LIMIT = 20;

const TimerFormSchema = z.object({
  id: z.number(),
  name: z.string(),
  colour: z.string(),
  repeat: z.number().gte(0),
  interval: z.number().gte(0),
  main: z.number().gt(0),
});

const EditTimer = TimerFormSchema.omit({ id: true });

export async function editTimer(
  id: number,
  seriesId: number,
  _: State,
  formData: FormData
) {
  let formColour = formData.get("colour") as string;
  formColour = formColour.charAt(0).toLowerCase() + formColour.slice(1);
  const validatedFields = EditTimer.safeParse({
    name: formData.get("name"),
    colour: formColour,
    repeat: Number(formData.get("repeat")),
    interval: Number(formData.get("interval")),
    main: Number(formData.get("main")),
  });
  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Edit Timer.",
    };
  }
  // Prepare data for insertion into the database
  const { name, colour, repeat, interval, main } = validatedFields.data;
  // Update timer.
  try {
    await prisma.timer.update({
      where: { id },
      data: { name, colour, repeat, interval, main },
    });
  } catch (error) {
    return {
      message: "Database Error: Failed to Edit Timer.",
    };
  }
  // Revalidate the cache for the selected series page.
  revalidatePath(`/series/${seriesId}`);
  return { message: "Created Timer." };
}

export async function editTimers(seriesId: number, timers: Timer[]) {
  const result = await prisma.$transaction(async (tx) => {
    let results: { message: string } | Timer[];
    // Update the given timers for the series given by the id.
    // The series id is not needed but ensures the correct series
    // is provided for the given timers.
    try {
      const updatePromises = timers.map((timer) => {
        return tx.timer.update({
          where: { id: timer.id, seriesId },
          data: { position: timer.position },
        });
      });
      results = await Promise.all(updatePromises);
    } catch (error) {
      results = {
        message: "Database Error: Failed to Edit Timers.",
      };
    }
    return results;
  });
  if ("message" in result) {
    return {
      message: result?.message,
    };
  }
  // Revalidate the cache for the selected series page.
  revalidatePath(`/series/${seriesId}`);
  return {
    message: "Successfully edited Timers.",
    timers: result || [],
  };
}

export async function deleteTimer(id: number, seriesId: number) {
  const transaction = await prisma.$transaction(async (tx) => {
    // Delete timer.
    try {
      await tx.timer.delete({
        where: { id },
      });
    } catch (error) {
      return {
        message: "Database Error: Failed to Delete Timer.",
      };
    }
    // Update remaining timers positions.
    try {
      const timers = await tx.timer.findMany({
        where: { seriesId },
        orderBy: {
          position: "asc",
        },
      });
      timers.forEach(async (timer, index) => {
        await tx.timer.update({
          where: { id: timers[0].id },
          data: { position: 0 },
        });
      });
      return { message: "Deleted Timer." };
    } catch (error) {
      return {
        message: "Database Error: Failed to update timer position.",
      };
    }
  });
  revalidatePath(`/series/${seriesId}`);
  return transaction;
}

export async function createTimer(
  id: number,
  lastPosition: number,
  _: State,
  formData: FormData
) {
  // Validate user is logged in.
  const session = await auth();
  const userId = Number(session?.user?.id);
  if (!userId) {
    return {
      message: "You must be logged in to create a timer.",
    };
  }
  // Check if timer limit has been reached for this series.
  const timerCount = await prisma.timer.count({
    where: { seriesId: id },
  });
  if (timerCount >= TIMER_LIMIT) {
    return {
      errors: {
        limit: `You have reached the limit of ${TIMER_LIMIT} timers.`,
      },
    };
  }
  // Process form data.
  let formColour = formData.get("colour") as string;
  formColour = formColour.charAt(0).toLowerCase() + formColour.slice(1);
  const validatedFields = EditTimer.safeParse({
    name: formData.get("name"),
    colour: formColour,
    repeat: Number(formData.get("repeat")),
    interval: Number(formData.get("interval")),
    main: Number(formData.get("main")),
  });
  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Create Series.",
    };
  }
  // Prepare data for insertion into the database
  const { name, colour, repeat, interval, main } = validatedFields.data;
  // Create series.
  try {
    await prisma.timer.create({
      data: {
        name,
        colour,
        repeat,
        interval,
        main,
        position: lastPosition + 1,
        seriesId: id,
      },
    });
  } catch (error) {
    return {
      message: "Database Error: Failed to Create Timer.",
    };
  }
  // Revalidate the cache for the series page.
  revalidatePath(`/series/${id}`);
  redirect(`/series/${id}`);
  return { message: "Created Timer." };
}
