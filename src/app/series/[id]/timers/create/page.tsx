import CreateTimerForm from "@/app/components/timers/create-timer/create-timer-form";
import prisma from "@/app/lib/db";
import { auth } from "@/auth";

interface Props {
  params: {
    id: string;
  };
}

const Create = async ({ params }: Props) => {
  const paramId = Number(params.id);
  const session = await auth();
  const userEmail = session?.user?.email || undefined;
  const user = await prisma.user.findUnique({
    where: { email: userEmail },
  });
  const series = await prisma.series.findFirst({
    orderBy: {
      id: "asc",
    },
    where: {
      ownerId: user?.id,
      id: paramId,
    },
    include: {
      timers: true,
    },
  });

  if (!series) {
    throw new Error("No series found.");
  }

  const timers = series?.timers.sort((a, b) => {
    return a.position - b.position;
  });
  const lastTimerPosition =
    !timers || timers.length === 0 ? 1 : timers[timers.length - 1].position;

  return (
    <div className="flex flex-col justify-center items-center bg-base-200 m-3 p-3 py-4 rounded h-full md:h-auto">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-base-content">Create Timer</h1>
      </div>
      <div className="w-full md:w-[70%] lg:w-[50%] ">
        <CreateTimerForm
          seriesId={series?.id}
          lastPosition={lastTimerPosition}
        />
      </div>
    </div>
  );
};

export default Create;
