import prisma from "@/app/lib/db";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export const dynamic = "force-dynamic"; // defaults to auto

const SeriesFormSchema = z.object({
  id: z.number(),
  name: z.string(),
  colour: z.string(),
});

const EditSeries = SeriesFormSchema.omit({ id: true });

export async function PUT(
  request: Request,
  { params }: { params: { id: number } }
) {
  const id = params.id;
  const formData = await request.formData();
  const validatedFields = EditSeries.safeParse({
    name: formData.get("name"),
    colour: formData.get("colour"),
  });
  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return new Response(
      JSON.stringify({
        errors: validatedFields.error.flatten().fieldErrors,
        message: "Missing Fields. Failed to Edit Series.",
      }),
      { status: 400 }
    );
  }
  // Prepare data for insertion into the database
  const { name, colour } = validatedFields.data;
  // Update series.
  try {
    const data = await prisma.series.update({
      where: { id: Number(id) },
      data: { name, colour },
    });
    revalidatePath("/series", "page");
    return Response.json({ data });
  } catch (error) {
    console.log(error);
    return new Response(
      JSON.stringify({ message: "Database Error: Failed to Edit Series." }),
      {
        status: 400,
      }
    );
  }
}
