"use client";

import useColours from "@/app/hooks/use-colours";
import { editSeries } from "@/app/lib/actions/series";
import { State } from "@/app/lib/actions/types";
import { useState } from "react";
import { useFormState } from "react-dom";
import ColourDisplay from "../../form/ColourDisplay";
import FormInputError from "../../form/form-input-error";
import SubmitFormButton from "../../form/submit-form-button";
import { Colour } from "../../util";

interface Props {
  modalId: string;
  id: number;
  initialName: string;
  initialColour: Colour;
}

const EditSeriesForm = ({ modalId, id, initialName, initialColour }: Props) => {
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const {
    colours,
    initialDisplayColour,
    selectedDisplayColour,
    handleColourChange,
  } = useColours({ initialColour });

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
      <div className="form-control mb-3">
        <label className="label" htmlFor="name">
          <span className="label-text text-md">Name</span>
        </label>
        <input
          id="name"
          type="text"
          name="name"
          placeholder="Series name"
          className="input input-bordered input-md bg-base-100 w-[100%]"
          required
          defaultValue={initialName}
        />
        <div>
          {nameError?.map((message) => (
            <div key={message} className="mt-1">
              <FormInputError key={message} message={message} />
            </div>
          ))}
        </div>
      </div>
      <div className="form-control">
        <label className="label" htmlFor="colour">
          <span className="label-text text-md">Colour</span>
        </label>
        <select
          id="colour"
          name="colour"
          className="select select-bordered select-md bg-base-100 w-[100%]"
          defaultValue={initialDisplayColour}
          onChange={handleColourChange}
        >
          <option disabled>Colour</option>
          {colours.map((colour) => (
            <option key={colour}>{colour}</option>
          ))}
        </select>
        <div>
          {colourError?.map((message) => (
            <div key={message} className="mt-1">
              <FormInputError key={message} message={message} />
            </div>
          ))}
        </div>
      </div>
      <ColourDisplay colour={selectedDisplayColour} />
      <div className="flex justify-end mt-4">
        <div>
          <SubmitFormButton
            form={`edit-series-form-${id}`}
            buttonText="Confirm"
            onClick={() => {
              setHasSubmitted(true);
            }}
          />
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
