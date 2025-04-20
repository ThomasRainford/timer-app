import { ArrowLeftIcon } from "@/app/components/icons";
import NoSeries from "@/app/components/series/no-series";
import RunPageContent from "@/app/components/series/run-series/run-page-content";
import prisma from "@/app/lib/db";
import { auth } from "@/auth";
import Link from "next/link";

interface Props {
  params: {
    id: string;
  };
}

const Run = async ({ params }: Props) => {
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
  const seriesName = series.name;
  return (
    <div className="flex flex-col grow my-2 md:my-4 lg:my-6">
      <div className="flex justify-center align-middle w-[100%]">
        <div className="flex flex-row items-center ml-4 md:ml-6 lg:ml-8">
          <Link
            className={`btn btn-outline btn-square btn-sm`}
            href={`/series/${series.id}`}
          >
            <ArrowLeftIcon className="h-5 w-5" />
          </Link>
        </div>
        <div className="text-center py-2 text-2xl font-bold w-[100%]">
          {seriesName}
        </div>
        <div>
          <div
            className={`invisible btn btn-outline btn-square btn-sm mr-4`}
          ></div>
        </div>
      </div>
      <RunPageContent series={series} />
    </div>
  );
};

export default Run;
