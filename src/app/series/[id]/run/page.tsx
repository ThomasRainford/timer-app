import NoSeries from "@/app/components/series/no-series";
import RunPageContent from "@/app/components/series/run-series/run-page-content";
import prisma from "@/app/lib/db";
import { auth } from "@/auth";

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
    <div>
      <div className="flex justify-center align-middle  w-[100%]">
        <div className="divider divider-primary text-2xl font-bold w-[100%]">
          {seriesName}
        </div>
      </div>
      <RunPageContent series={series} />
    </div>
  );
};

export default Run;
