import {
  createTimer,
  deleteTimer,
  editTimer,
  editTimers,
} from "@/app/lib/actions/timer";
import prisma from "@/app/lib/db";
import { auth } from "@/auth";
import { Timer } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

jest.mock("@/app/lib/db", () => ({
  timer: {
    update: jest.fn(),
    delete: jest.fn(),
    count: jest.fn(),
    create: jest.fn(),
    findMany: jest.fn(),
  },
  $transaction: jest.fn(),
}));

jest.mock("@/auth", () => ({
  auth: jest.fn(),
}));

jest.mock("next/cache", () => ({
  revalidatePath: jest.fn(),
}));

jest.mock("next/navigation", () => ({
  redirect: jest.fn(),
}));

describe("Timers server actions tests", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("editTimer", () => {
    it("should update timer if form validation passes", async () => {
      const formData = new FormData();
      formData.append("name", "Valid Name");
      formData.append("colour", "Red");
      formData.append("repeat", "1");
      formData.append("interval", "2");
      formData.append("main", "3");

      (prisma.timer.update as jest.Mock).mockResolvedValueOnce({});

      const result = await editTimer(1, 1, {}, formData);

      expect(prisma.timer.update).toHaveBeenCalledWith({
        where: { id: 1 },
        data: {
          name: "Valid Name",
          colour: "red",
          repeat: 1,
          interval: 2,
          main: 3,
        },
      });
      expect(result.message).toBe("Created Timer.");
    });

    it("should return a database error message if update fails", async () => {
      const formData = new FormData();
      formData.append("name", "Valid Name");
      formData.append("colour", "Red");
      formData.append("repeat", "1");
      formData.append("interval", "2");
      formData.append("main", "3");

      (prisma.timer.update as jest.Mock).mockRejectedValueOnce(
        new Error("Database error")
      );

      const result = await editTimer(1, 1, {}, formData);

      expect(result.message).toBe("Database Error: Failed to Edit Timer.");
    });

    it("should return errors if form validation fails", async () => {
      const formData = new FormData();
      formData.append("colour", "Red");
      formData.append("repeat", "1");
      formData.append("interval", "2");
      formData.append("main", "3");

      const result = await editTimer(1, 1, {}, formData);

      expect(result.errors).toBeDefined();
      expect(result.message).toBe("Missing Fields. Failed to Edit Timer.");
    });
  });

  describe("editTimers", () => {
    it("should update multiple timers in a transaction", async () => {
      const timers = [
        { id: 1, position: 0 },
        { id: 2, position: 1 },
      ];
      const mockTransaction = jest
        .fn()
        .mockImplementation(async (fn) => fn(prisma));
      (prisma.$transaction as jest.Mock).mockImplementation(mockTransaction);
      (prisma.timer.update as jest.Mock).mockResolvedValueOnce({});

      const result = await editTimers(1, timers as Timer[]);

      expect(prisma.$transaction).toHaveBeenCalled();
      expect(prisma.timer.update).toHaveBeenCalledTimes(2);
      expect(result.message).toBe("Successfully edited Timers.");
    });

    it("should return a database error message if updating timers fails", async () => {
      const timers = [{ id: 1, position: 0 }];
      const mockTransaction = jest.fn().mockImplementation(async () => {
        return {
          message: "Database Error: Failed to Edit Timers.",
        };
      });
      (prisma.$transaction as jest.Mock).mockImplementation(mockTransaction);

      const result = await editTimers(1, timers as Timer[]);

      expect(result.message).toBe("Database Error: Failed to Edit Timers.");
    });
  });

  describe("deleteTimer", () => {
    it("should delete the timer and update remaining timers positions", async () => {
      const mockTransaction = jest
        .fn()
        .mockImplementation(async (fn) => fn(prisma));
      (prisma.$transaction as jest.Mock).mockImplementation(mockTransaction);
      (prisma.timer.delete as jest.Mock).mockResolvedValueOnce({});
      (prisma.timer.findMany as jest.Mock).mockResolvedValueOnce([
        { id: 2, position: 1 },
        { id: 3, position: 2 },
      ]);
      (prisma.timer.update as jest.Mock).mockResolvedValue({});

      const result = await deleteTimer(1, 1);

      expect(prisma.$transaction).toHaveBeenCalled();
      expect(prisma.timer.delete).toHaveBeenCalledWith({ where: { id: 1 } });
      expect(prisma.timer.findMany).toHaveBeenCalledWith({
        where: { seriesId: 1 },
        orderBy: { position: "asc" },
      });
      //expect(prisma.timer.update).toHaveBeenCalledTimes(2); // Expect the update to be called for each timer
      // expect(prisma.timer.update).toHaveBeenNthCalledWith(1, {
      //   where: { id: 2 },
      //   data: { position: 0 },
      // });
      // expect(prisma.timer.update).toHaveBeenNthCalledWith(2, {
      //   where: { id: 3 },
      //   data: { position: 1 },
      // });
      expect(result.message).toBe("Deleted Timer.");
    });

    it("should return a database error message if deletion fails", async () => {
      const mockTransaction = jest.fn().mockImplementation(async () => {
        return {
          message: "Database Error: Failed to Delete Timer.",
        };
      });
      (prisma.$transaction as jest.Mock).mockImplementation(mockTransaction);

      const result = await deleteTimer(1, 1);

      expect(result.message).toBe("Database Error: Failed to Delete Timer.");
    });
  });

  describe("createTimer", () => {
    it("should return a message if the user is not logged in", async () => {
      (auth as jest.Mock).mockResolvedValueOnce(null);

      const formData = new FormData();
      formData.append("name", "New Timer");
      formData.append("colour", "Blue");

      const result = await createTimer(1, 0, {}, formData);

      expect(result.message).toBe("You must be logged in to create a timer.");
    });

    it("should return an error if the timer limit is reached", async () => {
      (auth as jest.Mock).mockResolvedValueOnce({ user: { id: "1" } });
      (prisma.timer.count as jest.Mock).mockResolvedValueOnce(20);

      const formData = new FormData();
      formData.append("name", "New Timer");
      formData.append("colour", "Blue");

      const result = await createTimer(1, 0, {}, formData);

      expect(result.errors).toEqual({
        limit: "You have reached the limit of 20 timers.",
      });
    });

    it("should create a new timer if validation passes and limit is not reached", async () => {
      (auth as jest.Mock).mockResolvedValueOnce({ user: { id: "1" } });
      (prisma.timer.count as jest.Mock).mockResolvedValueOnce(5);
      (prisma.timer.create as jest.Mock).mockResolvedValueOnce({});

      const formData = new FormData();
      formData.append("name", "New Timer");
      formData.append("colour", "Blue");
      formData.append("repeat", "1");
      formData.append("interval", "1");
      formData.append("main", "1");

      const result = await createTimer(1, 0, {}, formData);

      expect(prisma.timer.create).toHaveBeenCalledWith({
        data: {
          name: "New Timer",
          colour: "blue",
          repeat: 1,
          interval: 1,
          main: 1,
          position: 1,
          seriesId: 1,
        },
      });
      expect(revalidatePath).toHaveBeenCalledWith("/series/1");
      expect(redirect).toHaveBeenCalledWith("/series/1");
      expect(result.message).toBe("Created Timer.");
    });

    it("should return a database error message if timer creation fails", async () => {
      (auth as jest.Mock).mockResolvedValueOnce({ user: { id: "1" } });
      (prisma.timer.count as jest.Mock).mockResolvedValueOnce(5);
      (prisma.timer.create as jest.Mock).mockRejectedValueOnce(
        new Error("Database error")
      );

      const formData = new FormData();
      formData.append("name", "New Timer");
      formData.append("colour", "Blue");
      formData.append("repeat", "1");
      formData.append("interval", "1");
      formData.append("main", "1");

      const result = await createTimer(1, 0, {}, formData);

      expect(result.message).toBe("Database Error: Failed to Create Timer.");
    });
  });
});
