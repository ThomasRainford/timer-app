import useThemeToggle from "@/app/hooks/useThemeToggle";
import { act, renderHook } from "@testing-library/react";

describe("useThemeToggle Hook", () => {
  const key = "theme";
  const defaultTheme = "dark";
  const otherTheme = "light";

  const mockSetAttribute = jest.fn();

  beforeEach(() => {
    // Clear local storage before each test
    localStorage.clear();
    // Mock document.querySelector to set data-theme attribute
    document.querySelector = jest.fn().mockReturnValue({
      setAttribute: mockSetAttribute,
    }) as any;
  });

  it("should initialize with default theme if local storage is empty", () => {
    const { result } = renderHook(() =>
      useThemeToggle({ key, otherTheme, defaultTheme })
    );

    const [theme] = result.current;

    expect(theme).toBe(defaultTheme);
    expect(localStorage.getItem(key)).toBe(defaultTheme);
    expect(mockSetAttribute).toHaveBeenCalledWith("data-theme", defaultTheme);
  });

  it("should initialize with theme from local storage if it exists", () => {
    localStorage.setItem(key, otherTheme);
    const { result } = renderHook(() =>
      useThemeToggle({ key, otherTheme, defaultTheme })
    );

    const [theme] = result.current;

    expect(theme).toBe(otherTheme);
    expect(localStorage.getItem(key)).toBe(otherTheme);
  });

  it("should toggle to other theme when handleToggle is called", () => {
    const { result } = renderHook(() =>
      useThemeToggle({ key, otherTheme, defaultTheme })
    );

    const [, handleToggle] = result.current;

    act(() => {
      handleToggle({ target: { checked: true } });
    });

    const [themeAfterToggle] = result.current;

    expect(themeAfterToggle).toBe(otherTheme);
    expect(localStorage.getItem(key)).toBe(otherTheme);
    expect(mockSetAttribute).toHaveBeenCalledWith("data-theme", otherTheme);
  });

  it("should toggle back to default theme when handleToggle is called", () => {
    const { result } = renderHook(() =>
      useThemeToggle({ key, otherTheme, defaultTheme })
    );

    const [, handleToggle] = result.current;

    // First toggle to other theme
    act(() => {
      handleToggle({ target: { checked: true } });
    });

    // Then toggle back to default theme
    act(() => {
      handleToggle({ target: { checked: false } });
    });

    const [themeAfterToggleBack] = result.current;

    expect(themeAfterToggleBack).toBe(defaultTheme);
    expect(localStorage.getItem(key)).toBe(defaultTheme);
    expect(mockSetAttribute).toHaveBeenCalledWith("data-theme", defaultTheme);
  });

  it("should update document data-theme attribute on theme change", () => {
    const { result } = renderHook(() =>
      useThemeToggle({ key, otherTheme, defaultTheme })
    );

    const [, handleToggle] = result.current;

    act(() => {
      handleToggle({ target: { checked: true } });
    });

    expect(mockSetAttribute).toHaveBeenCalledWith("data-theme", otherTheme);
  });
});
