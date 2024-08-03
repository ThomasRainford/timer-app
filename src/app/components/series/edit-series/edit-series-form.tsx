"use client";

import { Colour, supprtedColours } from "@/app/components/util";
import { editSeries } from "@/app/lib/actions/series";
import { State } from "@/app/lib/actions/types";
import { ChangeEvent, useState } from "react";
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
  const [hasSubmitted, setHasSubmitted] = useState(false);
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
  let initialState = { message: null, errors: undefined };
  const [state, dispatch] = useFormState<State>(
    editSeriesWithId as any,
    initialState
  );

  const nameError = state.errors?.name;
  const colourError = state.errors?.colour;

  if (hasSubmitted && state.message) {
    (document.getElementById(modalId) as any)?.close();
    setHasSubmitted(false);
  }

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
        <div>
          {nameError ? (
            <span className="text-error text-sm">{nameError}</span>
          ) : null}
        </div>
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
        <div>
          {colourError ? (
            <span className="text-error text-sm">{colourError}</span>
          ) : null}
        </div>
      </div>

      <div className={`w-full h-[20px] ${selectedColourDisplay} mt-1`} />
      <div className="flex justify-end mt-4">
        <div>
          <button
            type="submit"
            form={`edit-series-form-${id}`}
            className="btn btn-primary"
            onClick={() => {
              setHasSubmitted(true);
            }}
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
