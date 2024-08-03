"use client";

import { State, createSeries } from "@/app/lib/actions/actions";
import Link from "next/link";
import { ChangeEvent, useState } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { Colour, randomColour, supprtedColours } from "../../util";

const CreateSeriesForm = () => {
  const [selectedColour, setSelectedColour] = useState<Colour>(randomColour());
  const colours = Object.keys(supprtedColours).map((c) => {
    return c.charAt(0).toUpperCase() + c.slice(1);
  });
  const initialColourSelect =
    selectedColour.charAt(0).toUpperCase() + selectedColour.slice(1);
  const selectedColourDisplay = selectedColour
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
  let initialState = { message: null, errors: undefined } as State;
  const [state, dispatch] = useFormState<State>(
    createSeries as any,
    initialState
  );
  const { pending } = useFormStatus();

  const nameError = state.errors?.name;
  const colourError = state.errors?.colour;

  return (
    <form action={dispatch} id="create-series-form" className="w-full">
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
          onChange={handleColourChange}
          defaultValue={initialColourSelect}
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
            form={`create-series-form`}
            className="btn btn-primary"
            aria-disabled={pending}
          >
            Confirm
          </button>
        </div>
        <div className="mt-0 ml-4">
          <Link className="btn outline" href={"/series"}>
            Cancel
          </Link>
        </div>
      </div>
    </form>
  );
};

export default CreateSeriesForm;
