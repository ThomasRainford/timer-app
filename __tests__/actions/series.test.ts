import {
  createSeries,
  deleteSeries,
  editSeries,
} from "@/app/lib/actions/series";
import prisma from "@/app/lib/db";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

jest.mock("@/app/lib/db", () => ({
  series: {
    update: jest.fn(),
    delete: jest.fn(),
    count: jest.fn(),
    create: jest.fn(),
  },
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

describe("Server Actions", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("editSeries", () => {
    it("should update series if form validation passes", async () => {
      const formData = new FormData();
      formData.append("name", "Valid Name");
      formData.append("colour", "Red");

      (prisma.series.update as jest.Mock).mockResolvedValueOnce({});

      const result = await editSeries(1, {}, formData);

      expect(prisma.series.update).toHaveBeenCalledWith({
        where: { id: 1 },
        data: { name: "Valid Name", colour: "red" },
      });
      expect(result.message).toBe("Edited Series.");
    });

    it("should return a database error message if update fails", async () => {
      const formData = new FormData();
      formData.append("name", "Valid Name");
      formData.append("colour", "Red");

      (prisma.series.update as jest.Mock).mockRejectedValueOnce(
        new Error("Database error")
      );

      const result = await editSeries(1, {}, formData);

      expect(result.message).toBe("Database Error: Failed to Edit Series.");
    });

    it("should return errors if form validation fails", async () => {
      const formData = new FormData();
      formData.append("colour", "Red");

      const result = await editSeries(1, {}, formData);

      expect(result.errors).toBeDefined();
      expect(result.message).toBe("Missing Fields. Failed to Edit Series.");
    });
  });

  describe("deleteSeries", () => {
    it("should delete the series and redirect to /series", async () => {
      (prisma.series.delete as jest.Mock).mockResolvedValueOnce({});

      const result = await deleteSeries(1);

      expect(prisma.series.delete).toHaveBeenCalledWith({ where: { id: 1 } });
      expect(redirect).toHaveBeenCalledWith("/series");
      expect(result.message).toBe("Deleted Series.");
    });

    it("should return a database error message if delete fails", async () => {
      (prisma.series.delete as jest.Mock).mockRejectedValueOnce(
        new Error("Database error")
      );

      const result = await deleteSeries(1);

      expect(result.message).toBe("Database Error: Failed to Delete Series.");
    });
  });

  describe("createSeries", () => {
    it("should return a message if the user is not logged in", async () => {
      (auth as jest.Mock).mockResolvedValueOnce(null);

      const formData = new FormData();
      formData.append("name", "New Series");
      formData.append("colour", "Blue");

      const result = await createSeries({}, formData);

      expect(result.message).toBe("You must be logged in to create a series.");
    });

    it("should return an error if the user has reached the series limit", async () => {
      (auth as jest.Mock).mockResolvedValueOnce({ user: { id: "1" } });
      (prisma.series.count as jest.Mock).mockResolvedValueOnce(5);

      const formData = new FormData();
      formData.append("name", "New Series");
      formData.append("colour", "Blue");

      const result = await createSeries({}, formData);

      expect(result.errors).toEqual({
        limit: "You have reached the limit of 5 series.",
      });
    });

    it("should create a new series if validation passes and limit is not reached", async () => {
      (auth as jest.Mock).mockResolvedValueOnce({ user: { id: "1" } });
      (prisma.series.count as jest.Mock).mockResolvedValueOnce(3);
      (prisma.series.create as jest.Mock).mockResolvedValueOnce({});

      const formData = new FormData();
      formData.append("name", "New Series");
      formData.append("colour", "Blue");

      const result = await createSeries({}, formData);

      expect(prisma.series.create).toHaveBeenCalledWith({
        data: { name: "New Series", colour: "blue", ownerId: 1 },
      });
      expect(revalidatePath).toHaveBeenCalledWith("/series");
      expect(redirect).toHaveBeenCalledWith("/series");
      expect(result.message).toBe("Created Series.");
    });

    it("should return a database error message if series creation fails", async () => {
      (auth as jest.Mock).mockResolvedValueOnce({ user: { id: "1" } });
      (prisma.series.count as jest.Mock).mockResolvedValueOnce(3);
      (prisma.series.create as jest.Mock).mockRejectedValueOnce(
        new Error("Database error")
      );

      const formData = new FormData();
      formData.append("name", "New Series");
      formData.append("colour", "Blue");

      const result = await createSeries({}, formData);

      expect(result.message).toBe("Database Error: Failed to Create Series.");
    });
  });
});
