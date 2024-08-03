"use server";

import { State } from "@/app/lib/actions/types";
import prisma from "@/app/lib/db";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

const TimerFormSchema = z.object({
  id: z.number(),
  name: z.string(),
  colour: z.string(),
  repeat: z.number(),
  interval: z.number(),
  main: z.number(),
});

const EditTimer = TimerFormSchema.omit({ id: true });

export async function editTimer(id: number, _: State, formData: FormData) {
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
    console.error(error);
    return {
      message: "Database Error: Failed to Edit Timer.",
    };
  }
  // Revalidate the cache for the selected series page.
  revalidatePath(`/series/${id}`);
  return { message: "Created Timer." };
}

export async function deleteTimer(id: number, seriesId: number) {
  prisma.$transaction(async (tx) => {
    // Delete timer.
    try {
      await tx.timer.delete({
        where: { id },
      });
    } catch (error) {
      console.error(error);
      return {
        message: "Database Error: Failed to Delete Timer.",
      };
    }
    // Update remaining timers positions.
    try {
      const timers = await tx.timer.findMany({ where: { seriesId } });
      console.log("timers", timers.length, " for series ", seriesId);
      timers.forEach(async (timer, index) => {
        await prisma.timer.update({
          where: { id: timer.id },
          data: { position: index },
        });
      });
    } catch (error) {
      console.error(error);
      return {
        message: "Database Error: Failed to update timer position.",
      };
    }
  });

  revalidatePath(`/series/${seriesId}`);
  return { message: "Deleted Timer." };
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
        position: lastPosition,
        seriesId: id,
      },
    });
  } catch (error) {
    console.error(error);
    return {
      message: "Database Error: Failed to Create Timer.",
    };
  }
  // Revalidate the cache for the series page.
  revalidatePath(`/series/${id}`);
  redirect(`/series/${id}`);
  return { message: "Created Timer." };
}
