"use client";

import { createTimer } from "@/app/lib/actions/timer";
import { State } from "@/app/lib/actions/types";
import Link from "next/link";
import { ChangeEvent, useState } from "react";
import { useFormState } from "react-dom";
import FormInputError from "../../form/form-input-error";
import SubmitFormButton from "../../form/submit-form-button";
import { Colour, randomColour, supprtedColours } from "../../util";

interface Props {
  seriesId: number;
  lastPosition: number | undefined;
}

const CreateTimerForm = ({ seriesId, lastPosition }: Props) => {
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

  const createTimerWithId = createTimer.bind(null, seriesId, lastPosition);
  let initialState = { message: null, errors: undefined } as State;
  const [state, dispatch] = useFormState<State>(
    createTimerWithId as any,
    initialState
  );

  const nameError = state.errors?.name;
  const colourError = state.errors?.colour;
  const mainError = state.errors?.main;
  const limitError = state.errors?.limit;

  return (
    <form action={dispatch} id="create-timer-form" className="w-full">
      <div className="form-control">
        <label className="label" htmlFor="name">
          <span className="label-text text-lg">Name</span>
        </label>
        <input
          id="name"
          type="text"
          name="name"
          placeholder="Timer name"
          className="input input-bordered input-md bg-base-100"
          required
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
          {colourError?.map((message) => (
            <div key={message} className="mt-1">
              <FormInputError key={message} message={message} />
            </div>
          ))}
        </div>
      </div>
      <div className={`w-full h-[20px] ${selectedColourDisplay} mt-1`} />
      <div className="form-control">
        <label className="label" htmlFor="repeat">
          <span className="label-text text-lg">Repetitions</span>
          <span className="label-text-alt text-sm">(0 for none)</span>
        </label>
        <input
          id="repeat"
          type="number"
          name="repeat"
          className="input input-bordered input-md bg-base-100 "
          required
          min={0}
          max={10}
          step={1}
          defaultValue={0}
        />
      </div>
      <div className="form-control">
        <label className="label" htmlFor="interval">
          <span className="label-text text-lg">Interval</span>
          <span className="label-text-alt text-sm">
            (in seconds, 0 for no interval)
          </span>
        </label>
        <input
          id="interval"
          type="number"
          name="interval"
          className="input input-bordered input-md bg-base-100 "
          required
          min={0}
          step={5}
          defaultValue={0}
        />
      </div>
      <div className="form-control">
        <label className="label" htmlFor="main">
          <span className="label-text text-lg">Main</span>
          <span className="label-text-alt text-sm">(in seconds)</span>
        </label>
        <input
          id="main"
          type="number"
          name="main"
          className="input input-bordered input-md bg-base-100 "
          required
          min={0}
          step={5}
          defaultValue={0}
        />
        <div>
          {mainError?.map((message) => (
            <div key={message} className="mt-1">
              <FormInputError key={message} message={message} />
            </div>
          ))}
        </div>
      </div>
      <div
        className="flex h-8 items-end space-x-1"
        aria-live="polite"
        aria-atomic="true"
      >
        {limitError && (
          <div className="mt-1">
            <FormInputError message={limitError} />
          </div>
        )}
      </div>
      <div className="flex justify-end mt-4">
        <div>
          <SubmitFormButton
            form="create-timer-form"
            buttonText="Confirm"
            disabled={limitError !== undefined}
          />
        </div>
        <div className="mt-0 ml-4">
          <Link className="btn outline" href={`/series/${seriesId}`}>
            Cancel
          </Link>
        </div>
      </div>
    </form>
  );
};

export default CreateTimerForm;
