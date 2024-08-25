import { authenticate, register } from "@/app/lib/actions/auth";
import prisma from "@/app/lib/db";
import { signIn } from "@/auth";
import * as bcrypt from "bcryptjs";
import { AuthError } from "next-auth";
import { redirect } from "next/navigation";

// Mock the modules
jest.mock("@/app/lib/db", () => ({
  user: {
    count: jest.fn(),
    create: jest.fn(),
  },
}));

jest.mock("@/auth", () => ({
  signIn: jest.fn(),
}));

jest.mock("bcryptjs", () => ({
  hash: jest.fn(),
}));

jest.mock("next/navigation", () => ({
  redirect: jest.fn(),
}));

describe("Auth server actions tests", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
  });

  describe("authenticate", () => {
    it("should call signIn with credentials and formData", async () => {
      const formData = new FormData();
      formData.append("email", "test@mail.com");
      formData.append("password", "password");

      await authenticate(undefined, formData);

      expect(signIn).toHaveBeenCalledWith("credentials", formData);
    });

    it('should return "Invalid credentials." on AuthError with type "CredentialsSignin"', async () => {
      const formData = new FormData();
      formData.append("email", "test@example.com");
      formData.append("password", "password");

      (signIn as jest.Mock).mockRejectedValue(
        new AuthError("CredentialsSignin")
      );

      const result = await authenticate(undefined, formData);

      expect(result).toBe("Invalid credentials.");
    });

    it('should return "Something went wrong." on error', async () => {
      const formData = new FormData();
      formData.append("email", "test@example.com");
      formData.append("password", "password");

      (signIn as jest.Mock).mockRejectedValue(new AuthError("Error"));

      const result = await authenticate(undefined, formData);

      expect(result).toBe("Something went wrong.");
    });

    it("should throw error if non-AuthError occurs", async () => {
      const formData = new FormData();
      formData.append("email", "test@example.com");
      formData.append("password", "password");

      const error = new Error("Some error");
      (signIn as jest.Mock).mockRejectedValue(error);

      await expect(authenticate(undefined, formData)).rejects.toThrow(
        "Some error"
      );
    });
  });

  describe("register", () => {
    it('should return "User limit has been reached." if user count is greater than or equal to 100', async () => {
      (prisma.user.count as jest.Mock).mockResolvedValue(100);

      const formData = new FormData();
      const result = await register(undefined, formData);

      expect(result).toBe("User limit has been reached.");
    });

    it('should return "Passwords do not match." if passwords do not match', async () => {
      (prisma.user.count as jest.Mock).mockResolvedValue(4);

      const formData = new FormData();
      formData.append("email", "test@example.com");
      formData.append("password", "password");
      formData.append("confirm-password", "different-password");

      const result = await register(undefined, formData);

      expect(result).toBe("Passwords do not match.");
    });

    it("should create a user with hashed password", async () => {
      (prisma.user.count as jest.Mock).mockResolvedValue(4);
      (bcrypt.hash as jest.Mock).mockResolvedValue("hashed_password");
      (signIn as jest.Mock).mockResolvedValue(undefined);

      const formData = new FormData();
      formData.append("email", "test@example.com");
      formData.append("password", "password");
      formData.append("confirm-password", "password");

      await register(undefined, formData);

      expect(bcrypt.hash).toHaveBeenCalledWith("password", 10);
      expect(prisma.user.create).toHaveBeenCalledWith({
        data: {
          email: "test@example.com",
          password: "hashed_password",
        },
      });
      expect(signIn).toHaveBeenCalledWith("credentials", formData);
      expect(redirect).toHaveBeenCalledWith("/series");
    });
  });
});
