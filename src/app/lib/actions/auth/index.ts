"use server";

import prisma from "@/app/lib/db";
import { signIn } from "@/auth";
import { Prisma } from "@prisma/client";
import bcrypt from "bcryptjs";
import { AuthError } from "next-auth";
import { redirect } from "next/navigation";

// Maximum number of users that can register.
const USER_LIMIT = 100;

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
  // Check if user limit has been reached.
  const userCount = await prisma.user.count();
  if (userCount >= USER_LIMIT) {
    return "User limit has been reached.";
  }

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
