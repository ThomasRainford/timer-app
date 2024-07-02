"use client";

import { Colour, supprtedColours } from "@/app/components/util";
import { editSeries } from "@/app/lib/actions";
import { ChangeEvent } from "react";
import { useFormState } from "react-dom";

interface Props {
  modalId: string;
  id: number;
  initialName: string;
  initialColour: string;
  selectedColour: Colour;
  handleColourChange: (e: ChangeEvent<HTMLSelectElement>) => void;
}

const EditSeriesForm = ({
  modalId,
  id,
  initialName,
  initialColour,
  selectedColour,
  handleColourChange,
}: Props) => {
  const colours = Object.keys(supprtedColours).map((c) => {
    return c.charAt(0).toUpperCase() + c.slice(1);
  });
  const initialColourSelect =
    initialColour.charAt(0).toUpperCase() + initialColour.slice(1);
  const selectedColourDisplay =
    supprtedColours[
      (selectedColour.charAt(0).toLowerCase() +
        selectedColour.slice(1)) as Colour
    ];

  const editSeriesWithId = editSeries.bind(null, id);

  const initialState = { message: null, errors: {} };
  const [state, dispatch] = useFormState(editSeriesWithId as any, initialState);

  return (
    <form action={dispatch} id={`edit-series-form-${id}`}>
      <div className="form-control">
        <label className="label" htmlFor="name">
          <span className="label-text text-lg">Name</span>
        </label>
        <input
          id="name"
          type="text"
          name="name"
          placeholder="Series name"
          className="input input-bordered input-md bg-base-100"
          required
          defaultValue={initialName}
        />
      </div>
      <div className="form-control">
        <label className="label" htmlFor="colour">
          <span className="label-text text-lg">Colour</span>
        </label>
        <select
          id="colour"
          name="colour"
          className="select select-bordered select-md bg-base-100"
          defaultValue={initialColourSelect}
          onChange={handleColourChange}
        >
          <option disabled>Colour</option>
          {colours.map((colour) => (
            <option key={colour}>{colour}</option>
          ))}
        </select>
      </div>
      <div className={`w-full h-[20px] ${selectedColourDisplay} mt-1`} />
      <div className="flex justify-end mt-4">
        <div>
          <button
            type="submit"
            form={`edit-series-form-${id}`}
            className="btn btn-primary"
          >
            Confirm
          </button>
        </div>
        <div className="mt-0 ml-4">
          <button
            className="btn outline"
            onClick={(e) => {
              e.preventDefault();
              (document.getElementById(modalId) as any)?.close();
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    </form>
  );
};

export default EditSeriesForm;
