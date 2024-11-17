import { ChangeEvent, useState } from "react";
import { Colour, supprtedColours } from "../components/util";

interface UseColoursProps {
  initialColour: Colour;
}

const useColours = ({ initialColour }: UseColoursProps) => {
  const [selectedColour, setSelectedColour] = useState<Colour>(initialColour);

  const colours = Object.keys(supprtedColours).map((c) => {
    return c.charAt(0).toUpperCase() + c.slice(1);
  });

  const initialDisplayColour =
    selectedColour.charAt(0).toUpperCase() + selectedColour.slice(1);

  const selectedDisplayColour = selectedColour
    ? supprtedColours[
        (selectedColour.charAt(0).toLowerCase() +
          selectedColour.slice(1)) as Colour
      ]
    : "";

  const handleColourChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    const colour = value.charAt(0).toLowerCase() + value.slice(1);
    setSelectedColour(colour as Colour);
  };

  return {
    colours,
    initialDisplayColour,
    selectedDisplayColour,
    handleColourChange,
  };
};

export default useColours;
