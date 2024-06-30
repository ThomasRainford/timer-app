"use client";

import { buttonHoverColours, supprtedColours } from "@/app/components/util";
import { ChangeEvent, useState } from "react";

interface Props {
  id: number;
  name: string;
  colour: string;
}

const EditSeriesModal = ({ id, name, colour }: Props) => {
  const [selectedColour, setSelectedColour] = useState(
    supprtedColours[colour as keyof typeof supprtedColours]
  );

  const btnHoverColour =
    buttonHoverColours[colour as keyof typeof buttonHoverColours];
  const modalId = "edit_series_modal_" + id;
  const colours = Object.keys(supprtedColours).map((c) => {
    return c.charAt(0).toUpperCase() + c.slice(1);
  });

  const initialColourSelect = colour.charAt(0).toUpperCase() + colour.slice(1);

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const colour = e.target.value;
    const selectedColourDisplay =
      supprtedColours[
        (colour.charAt(0).toLowerCase() +
          colour.slice(1)) as keyof typeof supprtedColours
      ];
    setSelectedColour(selectedColourDisplay);
  };

  return (
    <>
      <div className="tooltip tooltip-right" data-tip="Edit series">
        <button
          className={`btn btn-outline btn-square btn-sm ${btnHoverColour}`}
          onClick={() => (document.getElementById(modalId) as any)?.showModal()}
        >
          <svg
            className="h-5 w-5 text-base-300"
            viewBox="0 0 24 24"
            stroke-width="2"
            stroke="currentColor"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" />
            <path d="M9 7 h-3a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-3" />
            <path d="M9 15h3l8.5 -8.5a1.5 1.5 0 0 0 -3 -3l-8.5 8.5v3" />
            <line x1="16" y1="5" x2="19" y2="8" />
          </svg>
        </button>
      </div>
      <dialog id={modalId} className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-lg text-accent">{`Edit ${name}?`}</h3>
          <div className="mt-2">
            <form>
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
                  defaultValue={name}
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
                  onChange={handleChange}
                >
                  <option disabled selected>
                    Colour
                  </option>
                  {colours.map((colour) => (
                    <option key={colour}>{colour}</option>
                  ))}
                </select>
              </div>
            </form>
          </div>
          <div className={`w-full h-[20px] ${selectedColour} mt-1`} />
          <div className="flex justify-end mt-4">
            <div>
              <button className="btn btn-primary">Confirm</button>
            </div>
            <div className="modal-action mt-0 ml-4">
              <form method="dialog">
                <button className="btn outline">Cancel</button>
              </form>
            </div>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default EditSeriesModal;
