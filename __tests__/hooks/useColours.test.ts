import { Colour } from "@/app/components/util";
import useColours from "@/app/hooks/use-colours";
import { renderHook } from "@testing-library/react";
import { act } from "react";

jest.mock("@/app/components/util", () => ({
  supprtedColours: {
    red: "Red",
    blue: "Blue",
    green: "Green",
  },
}));

describe("useColours Hook", () => {
  const initialColour: Colour = "red";

  it("should initialize with the correct initial colour", () => {
    const { result } = renderHook(() => useColours({ initialColour }));

    const { initialDisplayColour, selectedDisplayColour } = result.current;

    expect(initialDisplayColour).toBe("Red");
    expect(selectedDisplayColour).toBe("Red");
  });

  it("should provide a list of colour options", () => {
    const { result } = renderHook(() => useColours({ initialColour }));

    const { colours } = result.current;

    expect(colours).toEqual(["Red", "Blue", "Green"]);
  });

  it("should update selected colour on handleColourChange", () => {
    const { result } = renderHook(() => useColours({ initialColour }));

    const { handleColourChange } = result.current;

    act(() => {
      handleColourChange({
        target: { value: "Blue" },
      } as React.ChangeEvent<HTMLSelectElement>);
    });

    expect(result.current.selectedDisplayColour).toBe("Blue");
  });

  it("should update selectedColour state correctly", () => {
    const { result } = renderHook(() => useColours({ initialColour }));

    act(() => {
      result.current.handleColourChange({
        target: { value: "Green" },
      } as React.ChangeEvent<HTMLSelectElement>);
    });

    expect(result.current.selectedDisplayColour).toBe("Green");
  });
});
