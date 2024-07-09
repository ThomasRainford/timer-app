import { auth } from "@/auth";
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
        <button className="btn btn-primary w-full md:w-[30%] text-md">
          <svg
            className="h-6 w-6"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            stroke-width="2"
            stroke="currentColor"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" />
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          Create New Series
        </button>
      </div>
      <div className="grid grid-col-1 md:grid-cols-2 lg:grid-cols-3 gap-2 w-full overflow-y-auto">
        {[...series].map((s, i) => (
          <SingleSeries key={s.id} series={s} index={i} />
        ))}
      </div>
    </div>
  );
};

export default Series;
