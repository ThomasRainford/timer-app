import { PlayIcon, PlusIcon } from "@/app/components/icons";
import Timers from "@/app/components/timers/timers";
import TimersHeading from "@/app/components/timers/timers-heading";
import { Colour } from "@/app/components/util";
import prisma from "@/app/lib/db";
import { auth } from "@/auth";
import Link from "next/link";

interface Props {
  params: {
    id: string;
  };
}

const Series = async ({ params }: Props) => {
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
    return (
      <div className="flex flex-col align-middle justify-center h-[80%] w-full px-4 overflow-y-hidden">
        <h2 className="text-2xl font-bold text-center mb-4">
          No series found!
        </h2>
      </div>
    );
  }

  const id = series?.id;
  const name = series?.name;
  const colour = series?.colour as Colour;
  const timers = series?.timers.sort((a, b) => {
    return a.position - b.position;
  });
  return (
    <div className="flex flex-col md:self-center px-2 md:px-0 md:w-[90%] lg:w-[75%] mt-2 overflow-y-hidden">
      <div>
        <TimersHeading id={id} name={name} colour={colour} />
      </div>
      <div className="divider divider-primary mt-5 text-xl">Timers</div>
      <div className="mb-2 flex justify-between">
        <div>
          <Link
            className="btn btn-primary btn-sm w-full text-md"
            href={`/series/${id}/timers/create`}
          >
            <PlusIcon size={6} />
            Create New Timer
          </Link>
        </div>
        <div>
          <Link
            className="btn btn-success btn-sm w-full text-md"
            href={`/series/${id}/run`}
          >
            <PlayIcon size={6} />
            Run series
          </Link>
        </div>
      </div>
      <div className="overflow-y-auto">
        <Timers timers={timers} seriesId={id} />
      </div>
    </div>
  );
};

export default Series;
