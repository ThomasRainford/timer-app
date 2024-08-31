"use client";

import useColours from "@/app/hooks/useColours";
import { createSeries } from "@/app/lib/actions/series";
import { State } from "@/app/lib/actions/types";
import Link from "next/link";
import { useFormState, useFormStatus } from "react-dom";
import { randomColour } from "../../util";

const CreateSeriesForm = () => {
  const {
    colours,
    initialDisplayColour,
    selectedDisplayColour,
    handleColourChange,
  } = useColours({ initialColour: randomColour() });

  let initialState = { message: null, errors: undefined } as State;
  const [state, dispatch] = useFormState<State>(
    createSeries as any,
    initialState
  );
  const { pending } = useFormStatus();

  const nameError = state.errors?.name;
  const colourError = state.errors?.colour;
  const limitError = state.errors?.limit;

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
          defaultValue={initialDisplayColour}
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
      <div className={`w-full h-[20px] ${selectedDisplayColour} mt-1`} />
      <div
        className="flex h-8 items-end space-x-1"
        aria-live="polite"
        aria-atomic="true"
      >
        {limitError && (
          <>
            <p className="text-md text-red-500">{limitError}</p>
          </>
        )}
      </div>
      <div className="flex justify-end mt-4">
        <div>
          <button
            type="submit"
            form={`create-series-form`}
            className="btn btn-primary"
            disabled={pending || limitError !== undefined}
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
