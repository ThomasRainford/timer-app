// ThemeController.test.tsx
import ThemeController from "@/app/components/navbar/theme-controller";
import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";

// Mock the useThemeToggle hook
jest.mock("@/app/hooks/useThemeToggle", () => ({
  __esModule: true,
  default: jest.fn(),
}));

// Mock the icons to avoid errors during rendering
jest.mock("../../src/app/components/icons", () => ({
  MoonIcon: ({ size }: { size: number }) => (
    <svg data-testid="moon-icon" width={size} height={size} />
  ),
  SunIcon: ({ size }: { size: number }) => (
    <svg data-testid="sun-icon" width={size} height={size} />
  ),
}));

describe("ThemeController Component", () => {
  let mockUseThemeToggle: jest.Mock;

  beforeEach(() => {
    mockUseThemeToggle = require("@/app/hooks/useThemeToggle").default;
  });

  it("should render correctly with dark theme by default", () => {
    // Mock the hook to return dark theme by default
    mockUseThemeToggle.mockReturnValue(["dark", jest.fn()]);

    render(<ThemeController />);

    const checkbox = screen.getByRole("checkbox") as HTMLInputElement;
    const moonIcon = screen.getByTestId("moon-icon");
    const sunIcon = screen.getByTestId("sun-icon");

    // Assertions
    expect(checkbox).toBeInTheDocument();
    expect(checkbox.checked).toBe(false); // 'dark' theme means checkbox is unchecked
    expect(moonIcon).toBeInTheDocument();
    expect(sunIcon).toBeInTheDocument();
  });

  it("should render correctly with light theme", () => {
    // Mock the hook to return light theme
    mockUseThemeToggle.mockReturnValue(["light", jest.fn()]);

    render(<ThemeController />);

    const checkbox = screen.getByRole("checkbox") as HTMLInputElement;

    // Assertions
    expect(checkbox.checked).toBe(true); // 'light' theme means checkbox is checked
  });

  it("should call handleToggle when checkbox is clicked", () => {
    const handleToggle = jest.fn();
    // Mock the hook to return dark theme by default
    mockUseThemeToggle.mockReturnValue(["dark", handleToggle]);

    render(<ThemeController />);

    const checkbox = screen.getByRole("checkbox") as HTMLInputElement;

    // Simulate user clicking the checkbox to toggle theme
    fireEvent.click(checkbox);

    // Assertions
    expect(handleToggle).toHaveBeenCalledTimes(1);
  });
});
