import EmptyStateAlert from "@/app/components/empty-state-alert";
import { PlayIcon, PlusIcon } from "@/app/components/icons";
import NoSeries from "@/app/components/series/no-series";
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
    return <NoSeries />;
  }

  const id = series?.id;
  const name = series?.name;
  const colour = series?.colour as Colour;
  const timers = series?.timers.sort((a, b) => {
    return a.position - b.position;
  });
  return (
    <div className="flrx flex-col h-auto overflow-y-hidden">
      <div className="flex flex-col h-full md:self-center md:w-[90%] lg:w-[75%] mt-2 overflow-y-hidden">
        <div>
          <TimersHeading id={id} name={name} colour={colour} />
        </div>
        <div className="divider divider-primary mt-5 text-xl">Timers</div>
        <div className="mb-3 flex justify-between">
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
              className={`btn btn-success btn-sm w-full text-md ${
                timers.length === 0 ? "btn-disabled" : ""
              }`}
              href={`/series/${id}/run`}
            >
              <PlayIcon size={5} />
              Run series
            </Link>
          </div>
        </div>
        {timers.length > 0 ? (
          <div className="overflow-y-auto">
            <Timers timers={timers} seriesId={id} />
          </div>
        ) : (
          <div className="mt-4">
            <EmptyStateAlert text="Create timers to run the series." />
          </div>
        )}
      </div>
    </div>
  );
};

export default Series;
