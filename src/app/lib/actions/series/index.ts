"use server";

import { State } from "@/app/lib/actions/types";
import prisma from "@/app/lib/db";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

// Maximum number of series per user.
const SERIES_LIMIT = 5;

const SeriesFormSchema = z.object({
  id: z.number(),
  name: z.string(),
  colour: z.string(),
});

const EditSeries = SeriesFormSchema.omit({ id: true });

export async function editSeries(id: number, _: State, formData: FormData) {
  let formColour = formData.get("colour") as string;
  formColour = formColour.charAt(0).toLowerCase() + formColour.slice(1);
  const validatedFields = EditSeries.safeParse({
    name: formData.get("name"),
    colour: formColour,
  });
  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Edit Series.",
    };
  }
  // Prepare data for insertion into the database
  const { name, colour } = validatedFields.data;
  // Update series.
  try {
    await prisma.series.update({
      where: { id },
      data: { name, colour },
    });
  } catch (error) {
    console.error(error);
    return {
      message: "Database Error: Failed to Edit Series.",
    };
  }
  // Revalidate the cache for the series page.
  revalidatePath(`/series/${id}`);
  return { message: "Edited Series." };
}

export async function deleteSeries(id: number) {
  try {
    await prisma.series.delete({
      where: { id },
    });
  } catch (error) {
    console.error(error);
    return {
      message: "Database Error: Failed to Delete Series.",
    };
  }
  redirect("/series");
  return { message: "Deleted Series." };
}

export async function createSeries(_: State, formData: FormData) {
  // Validate user is logged in.
  const session = await auth();
  const userId = Number(session?.user?.id);
  if (!userId) {
    return {
      message: "You must be logged in to create a series.",
    };
  }
  // Check if series limit has been reached for this user.
  const seriesCount = await prisma.series.count({
    where: { ownerId: userId },
  });
  if (seriesCount < SERIES_LIMIT) {
    return {
      errors: {
        limit: `You have reached the limit of ${SERIES_LIMIT} series.`,
      },
    };
  }
  // Process form data.
  let formColour = formData.get("colour") as string;
  formColour = formColour.charAt(0).toLowerCase() + formColour.slice(1);
  const validatedFields = EditSeries.safeParse({
    name: formData.get("name"),
    colour: formColour,
  });
  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Create Series.",
    };
  }
  // Prepare data for insertion into the database
  const { name, colour } = validatedFields.data;
  // Create series.
  try {
    await prisma.series.create({
      data: { name, colour, ownerId: userId },
    });
  } catch (error) {
    console.error(error);
    return {
      message: "Database Error: Failed to Create Series.",
    };
  }
  // Revalidate the cache for the series page.
  revalidatePath("/series");
  redirect("/series");
  return { message: "Created Series." };
}
