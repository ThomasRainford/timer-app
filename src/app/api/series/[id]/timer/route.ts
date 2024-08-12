import prisma from "@/app/lib/db";
import { Timer } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const paramSeriesId = Number(params.id);
  const timers = (await request.json()) as Pick<Timer, "id" | "position">[];
  let results;
  await prisma.$transaction(async (tx) => {
    // Update timer.
    try {
      const updatePromises = timers.map((timer) => {
        return tx.timer.update({
          where: { id: timer.id, seriesId: paramSeriesId },
          data: { position: timer.position },
        });
      });
      results = await Promise.all(updatePromises);
    } catch (error) {
      console.error(error);
      return NextResponse.json({
        status: 400,
        message: "Database Error: Failed to Edit Timer.",
      });
    }
    revalidatePath(`/series/${paramSeriesId}`);
  });
  return NextResponse.json({
    status: 200,
    message: "Successfully edited Timer.",
    timers: results || [],
  });
}
