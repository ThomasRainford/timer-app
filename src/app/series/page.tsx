import { auth } from "@/auth";
import Link from "next/link";
import EmptyStateAlert from "../components/empty-state-alert";
import { PlusIcon } from "../components/icons";
import SingleSeries from "../components/series/single-series";
import prisma from "../lib/db";

const Series = async () => {
  const session = await auth();
  const userEmail = session?.user?.email || undefined;
  const user = await prisma.user.findUnique({
    where: { email: userEmail },
  });
  const series = await prisma.series.findMany({
    orderBy: {
      id: "asc",
    },
    where: {
      ownerId: user?.id,
    },
    include: {
      timers: true,
    },
  });

  return (
    <>
      <div className="mb-4">
        <Link
          className="btn btn-primary w-full md:w-[30%] text-md"
          href={"/series/create"}
        >
          <PlusIcon size={6} />
          Create New Series
        </Link>
      </div>
      {series.length > 0 ? (
        <div className="grid grid-col-1 md:grid-cols-2 lg:grid-cols-3 gap-2 w-full overflow-y-auto pb-4">
          {series.map((s, i) => (
            <SingleSeries key={s.id} series={s} index={i} />
          ))}
        </div>
      ) : (
        <div className="mt-4">
          <EmptyStateAlert text={"Create a series to get started."} />
        </div>
      )}
    </>
  );
};

export default Series;
