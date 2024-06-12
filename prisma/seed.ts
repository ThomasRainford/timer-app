import { Prisma, PrismaClient } from "@prisma/client";
import * as bcrypt from "bcryptjs";

const prisma = new PrismaClient();

const users = async (
  series: Prisma.SeriesCreateInput[]
): Promise<Prisma.UserCreateInput[]> => [
  {
    email: "user01@mail.com",
    password: await bcrypt.hash("password", 10),
    series: {
      create: series,
    },
  },
  {
    email: "user02@mail.com",
    password: await bcrypt.hash("password", 10),
    series: {
      create: series,
    },
  },
  {
    email: "user03@mail.com",
    password: await bcrypt.hash("password", 10),
    series: {
      create: series,
    },
  },
  {
    email: "user04@mail.com",
    password: await bcrypt.hash("password", 10),
    series: {
      create: series,
    },
  },
];

const timers = () => {
  const nextTimers = [
    {
      name: "Timer 1",
      colour: "red",
      position: 0,
      main: 10,
      interval: 5,
      repeat: 0,
    },
    {
      name: "Timer 2",
      colour: "green",
      position: 1,
      main: 15,
      interval: 5,
      repeat: 1,
    },
    {
      name: "Timer 3",
      colour: "blue",
      position: 2,
      main: 20,
      interval: 5,
      repeat: 0,
    },
    {
      name: "Timer 4",
      colour: "yellow",
      position: 3,
      main: 25,
      interval: 10,
      repeat: 2,
    },
  ];
  return nextTimers;
};

const series = () => {
  const series = [
    {
      name: "Series 1",
      colour: "red",
      timers: {
        create: timers(),
      },
    },
    {
      name: "Series 2",
      colour: "green",
      timers: {
        create: timers(),
      },
    },
  ];
  return series;
};

async function main() {
  console.log("Seed main function");
  const user01 = await prisma.user.upsert({
    where: { email: "user01@mail.com" },
    update: {},
    create: {
      email: "user01@mail.com",
      password: await bcrypt.hash("password", 10),
      series: {
        create: series(),
      },
    },
  });
  const user02 = await prisma.user.upsert({
    where: { email: "user02@mail.com" },
    update: {},
    create: {
      email: "user02@mail.com",
      password: await bcrypt.hash("password", 10),
      series: {
        create: series(),
      },
    },
  });
  const user03 = await prisma.user.upsert({
    where: { email: "user03@mail.com" },
    update: {},
    create: {
      email: "user03@mail.com",
      password: await bcrypt.hash("password", 10),
      series: {
        create: series(),
      },
    },
  });
  const user04 = await prisma.user.upsert({
    where: { email: "user04@mail.com" },
    update: {},
    create: {
      email: "user04@mail.com",
      password: await bcrypt.hash("password", 10),
      series: {
        create: series(),
      },
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
