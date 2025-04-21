"use client";

import { Colour, supprtedColours } from "@/app/components/util";
import { editTimer } from "@/app/lib/actions/timer";
import { State } from "@/app/lib/actions/types";
import { ChangeEvent, useState } from "react";
import { useFormState } from "react-dom";
import FormInputError from "../../form/form-input-error";
import SubmitFormButton from "../../form/submit-form-button";
import TimerInput from "../../form/timer-input";

interface Props {
  modalId: string;
  id: number;
  seriesId: number;
  initialName: string;
  initialColour: string;
  initialRepeat: number;
  initialInterval: number;
  initialMain: number;
  selectedColour: Colour;
  handleColourChange: (e: ChangeEvent<HTMLSelectElement>) => void;
}

const EditTimerForm = ({
  modalId,
  id,
  seriesId,
  initialName,
  initialColour,
  initialRepeat,
  initialInterval,
  initialMain,
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

  const editTimerWithId = editTimer.bind(null, id, seriesId);
  let initialState = { message: null, errors: undefined };
  const [state, dispatch] = useFormState<State>(
    editTimerWithId as any,
    initialState
  );
  const nameError = state.errors?.name;
  const colourError = state.errors?.colour;

  if (hasSubmitted && state.message) {
    (document.getElementById(modalId) as any)?.close();
    setHasSubmitted(false);
  }

  return (
    <form action={dispatch} id={`edit-timer-form-${id}`}>
      <div className="form-control mb-2">
        <label className="label" htmlFor="name">
          <span className="label-text text-md">Name</span>
        </label>
        <input
          id="name"
          type="text"
          name="name"
          placeholder="Timer name"
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
          defaultValue={initialColourSelect}
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
      <div className={`w-full h-[20px] ${selectedColourDisplay} mt-1 mb-2`} />
      <div className="form-control mb-2">
        <label className="label" htmlFor="repeat">
          <span className="label-text text-md">Repetitions</span>
          <span className="label-text-alt text-sm">(0 for none)</span>
        </label>
        <input
          id="repeat"
          type="number"
          name="repeat"
          className="input input-bordered input-md bg-base-100 w-[100%]"
          required
          defaultValue={initialRepeat}
          min={0}
          max={10}
          step={1}
        />
      </div>
      <div className="form-control">
        <label className="fieldset-label" htmlFor="interval">
          <span className="label-text text-md">Interval</span>
          <span className="label-text-alt text-sm">(0 for no interval)</span>
        </label>
        <TimerInput defaultValue={initialInterval} name={"interval"} />
      </div>
      <div className="form-control">
        <label className="fieldset-label" htmlFor="interval">
          <span className="label-text text-md">Main</span>
        </label>
        <TimerInput defaultValue={initialMain} name={"main"} />
      </div>
      <div className="flex justify-end mt-4">
        <div>
          <SubmitFormButton
            form={`edit-timer-form-${id}`}
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

export default EditTimerForm;
