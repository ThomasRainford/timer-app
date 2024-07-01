"use server";

import { signIn } from "@/auth";
import { Prisma } from "@prisma/client";
import * as bcrypt from "bcryptjs";
import { AuthError } from "next-auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import prisma from "./db";

const SeriesFormSchema = z.object({
  id: z.number(),
  name: z.string(),
  colour: z.string(),
});

const EditSeries = SeriesFormSchema.omit({ id: true });

// This is temporary until @types/react-dom is updated
export type State = {
  errors?: {
    name?: string[];
    colour?: string[];
  };
  message?: string | null;
};

export async function authenticate(_: string | undefined, formData: FormData) {
  try {
    await signIn("credentials", formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return "Invalid credentials.";
        default:
          return "Something went wrong.";
      }
    }
    throw error;
  }
}

export async function register(_: string | undefined, formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const confirmPassword = formData.get("confirm-password") as string;
  if (password !== confirmPassword) {
    return "Passwords do not match.";
  }
  try {
    await prisma.user.create({
      data: {
        email,
        password: await bcrypt.hash(password, 10),
      },
    });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        console.error(
          "There is a unique constraint violation, a new user cannot be created with this email"
        );
      }
    }
    return "This email has already been registered.";
  }
  try {
    await signIn("credentials", formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return "Invalid credentials.";
        default:
          return "Something went wrong.";
      }
    }
    throw error;
  }
  redirect("/series");
}

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
  revalidatePath("/series");
  return { message: "Updated Series." };
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
  revalidatePath("/series");
  return { message: "Deleted Series." };
}
