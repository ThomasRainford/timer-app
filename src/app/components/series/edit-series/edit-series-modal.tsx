"use client";

import {
  Colour,
  buttonHoverColours,
  supprtedColours,
} from "@/app/components/util";
import { ChangeEvent, useState } from "react";
import EditSeriesForm from "./edit-series-form";

interface Props {
  id: number;
  name: string;
  colour: Colour;
}

const EditSeriesModal = ({ id, name, colour }: Props) => {
  const [newName, setNewName] = useState(name);
  const [selectedColour, setSelectedColour] =
    useState<keyof typeof supprtedColours>(colour);

  const btnHoverColour =
    buttonHoverColours[colour as keyof typeof buttonHoverColours];
  const modalId = "edit_series_modal_" + id;

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewName(e.target.value);
  };

  const handleColourChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    const colour = value.charAt(0).toLowerCase() + value.slice(1);
    setSelectedColour(colour as Colour);
  };

  return (
    <>
      <div className="tooltip tooltip-right" data-tip="Edit series">
        <button
          className={`btn btn-outline btn-square btn-sm ${btnHoverColour}`}
          onClick={() => {
            (document.getElementById(modalId) as any)?.showModal();
          }}
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
            <EditSeriesForm
              modalId={modalId}
              id={id}
              initialName={name}
              initialColour={colour}
              selectedColour={selectedColour}
            />
          </div>
        </div>
      </dialog>
    </>
  );
};

export default EditSeriesModal;
