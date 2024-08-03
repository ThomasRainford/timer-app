import { auth } from "@/auth";
import Link from "next/link";
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
    <div className="flex flex-col justify-center overflow-y-hidden px-4 mt-2">
      <div className="mb-4">
        <Link
          className="btn btn-primary w-full md:w-[30%] text-md"
          href={"/series/create"}
        >
          <PlusIcon size={6} />
          Create New Series
        </Link>
      </div>
      <div className="grid grid-col-1 md:grid-cols-2 lg:grid-cols-3 gap-2 w-full overflow-y-auto pb-4">
        {[...series].map((s, i) => (
          <SingleSeries key={s.id} series={s} index={i} />
        ))}
      </div>
    </div>
  );
};

export default Series;
