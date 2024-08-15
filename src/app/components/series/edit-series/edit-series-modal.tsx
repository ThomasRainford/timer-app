"use client";

import { Colour, buttonHoverColours } from "@/app/components/util";
import { ChangeEvent, useState } from "react";
import { PencilIcon } from "../../icons";
import EditSeriesForm from "./edit-series-form";

interface Props {
  id: number;
  name: string;
  colour: Colour;
}

const EditSeriesModal = ({ id, name, colour }: Props) => {
  const [selectedColour, setSelectedColour] = useState<Colour>(colour);

  const btnHoverColour = buttonHoverColours[colour];
  const modalId = "edit_series_modal_" + id;

  const handleColourChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    const colour = value.charAt(0).toLowerCase() + value.slice(1);
    setSelectedColour(colour as Colour);
  };

  return (
    <>
      <div className="tooltip tooltip-left" data-tip="Edit series">
        <button
          className={`btn btn-outline btn-square btn-sm ${btnHoverColour}`}
          onClick={() => {
            (document.getElementById(modalId) as any)?.showModal();
          }}
        >
          <PencilIcon />
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
              handleColourChange={handleColourChange}
            />
          </div>
        </div>
      </dialog>
    </>
  );
};

export default EditSeriesModal;
