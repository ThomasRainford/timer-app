"use client";

import { Colour, buttonHoverColours } from "@/app/components/util";
import { Timer } from "@prisma/client";
import { ChangeEvent, useState } from "react";
import EditTimerForm from "./edit-timer-form";

interface Props {
  timer: Timer;
}

const EditTimerModal = ({ timer }: Props) => {
  const { id, colour, name, repeat, interval, main } = timer;
  const [selectedColour, setSelectedColour] = useState<Colour>(
    colour as Colour
  );

  const btnHoverColour = buttonHoverColours[colour as Colour];
  const modalId = "edit_timer_modal_" + id;

  const handleColourChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    const colour = value.charAt(0).toLowerCase() + value.slice(1);
    setSelectedColour(colour as Colour);
  };

  return (
    <>
      <div className="tooltip tooltip-left" data-tip="Edit Timer">
        <button
          className={`btn btn-outline btn-square btn-sm ${btnHoverColour}`}
          onClick={() => {
            (document.getElementById(modalId) as any)?.showModal();
          }}
        >
          <svg
            className="h-5 w-5 text-base-300"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
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
            <EditTimerForm
              modalId={modalId}
              id={id}
              initialName={name}
              initialColour={colour}
              selectedColour={selectedColour}
              initialRepeat={repeat}
              initialInterval={interval}
              initialMain={main}
              handleColourChange={handleColourChange}
            />
          </div>
        </div>
      </dialog>
    </>
  );
};

export default EditTimerModal;
