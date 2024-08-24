import ThemeController from "@/app/components/navbar/theme-controller";
import { fireEvent, render, screen } from "@testing-library/react";

describe("ThemeController", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test("renders correctly with default dark theme", () => {
    render(<ThemeController />);
    const checkbox = screen.getByRole("checkbox");

    expect(checkbox).toBeInTheDocument();
    expect(checkbox).not.toBeChecked();
    expect(document.querySelector("html")).toHaveAttribute(
      "data-theme",
      "dark"
    );
  });

  test("sets theme to light when the checkbox is checked", () => {
    render(<ThemeController />);
    const checkbox = screen.getByRole("checkbox");

    // Initially, it should be dark mode.
    expect(checkbox).not.toBeChecked();
    expect(document.querySelector("html")).toHaveAttribute(
      "data-theme",
      "dark"
    );
    // Change to light mode.
    fireEvent.click(checkbox);

    expect(checkbox).toBeChecked();
    expect(document.querySelector("html")).toHaveAttribute(
      "data-theme",
      "light"
    );
    expect(localStorage.getItem("theme")).toBe("light");
  });

  test("toggles back to dark theme when unchecked", () => {
    render(<ThemeController />);
    const checkbox = screen.getByRole("checkbox");
    // Change to light mode.
    fireEvent.click(checkbox);
    expect(checkbox).toBeChecked();
    // Toggle back to dark mode.
    fireEvent.click(checkbox);

    expect(checkbox).not.toBeChecked();
    expect(document.querySelector("html")).toHaveAttribute(
      "data-theme",
      "dark"
    );
    expect(localStorage.getItem("theme")).toBe("dark");
  });

  test("applies the theme from localStorage on initial render", () => {
    localStorage.setItem("theme", "light");
    render(<ThemeController />);
    const checkbox = screen.getByRole("checkbox");

    expect(checkbox).toBeChecked();
    expect(document.querySelector("html")).toHaveAttribute(
      "data-theme",
      "light"
    );
  });
});
