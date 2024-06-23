import { auth } from "@/auth";
import SingleSeries from "../components/single-series";
import prisma from "../lib/db";

const Series = async () => {
  const session = await auth();
  const userEmail = session?.user?.email || undefined;
  const user = await prisma.user.findUnique({
    where: { email: userEmail },
  });
  const series = await prisma.series.findMany({
    where: {
      ownerId: user?.id,
    },
    include: {
      timers: true,
    },
  });

  return (
    <div className="flex justify-center ">
      <div className="grid grid-col-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full px-4 sticky overflow-y-scroll overscroll-contain">
        {series.map((s, i) => (
          <SingleSeries key={s.id} series={s} index={i} />
        ))}
      </div>
    </div>
  );
};

export default Series;
