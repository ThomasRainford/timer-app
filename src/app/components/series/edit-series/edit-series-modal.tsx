"use client";

import { Colour, buttonHoverColours } from "@/app/components/util";
import { PencilIcon } from "../../icons";
import EditSeriesForm from "./edit-series-form";

interface Props {
  id: number;
  name: string;
  colour: Colour;
}

const EditSeriesModal = ({ id, name, colour }: Props) => {
  const btnHoverColour = buttonHoverColours[colour];
  const modalId = "edit_series_modal_" + id;

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
      <dialog id={modalId} className="modal modal-top sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-lg text-accent">{`Edit ${name}?`}</h3>
          <div className="mt-2">
            <EditSeriesForm
              modalId={modalId}
              id={id}
              initialName={name}
              initialColour={colour}
            />
          </div>
        </div>
      </dialog>
    </>
  );
};

export default EditSeriesModal;
