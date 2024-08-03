"use client";

import { Colour, buttonHoverColours } from "@/app/components/util";
import { Timer } from "@prisma/client";
import { ChangeEvent, useState } from "react";
import { PencilIcon } from "../../icons";
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
          <PencilIcon size={5} />
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
              initialRepeat={repeat}
              initialInterval={interval}
              initialMain={main}
              selectedColour={selectedColour}
              handleColourChange={handleColourChange}
            />
          </div>
        </div>
      </dialog>
    </>
  );
};

export default EditTimerModal;
