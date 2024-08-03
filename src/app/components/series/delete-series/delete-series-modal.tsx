"use client";

import { Colour, buttonHoverColours } from "@/app/components/util";
import { BinIcon } from "../../icons";
import DeleteSeriesForm from "./delete-series-form";

interface Props {
  id: number;
  name: string;
  colour: Colour;
}

const DeleteSeriesModal = ({ id, name, colour }: Props) => {
  const btnHoverColour = buttonHoverColours[colour];

  const modalId = "delete_series_modal_" + id;

  return (
    <>
      <div className="tooltip tooltip-left" data-tip="Delete Series">
        <button
          className={`btn btn-outline btn-square btn-sm ${btnHoverColour}`}
          onClick={() => (document.getElementById(modalId) as any)?.showModal()}
        >
          <BinIcon size={5} />
        </button>
      </div>
      <dialog id={modalId} className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-lg text-accent">{`Delete ${name}?`}</h3>
          <p className="py-4">Are you sure you want to delete this series?</p>
          <div className="flex justify-end mt-4">
            <DeleteSeriesForm id={id} modalId={modalId} />
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

export default DeleteSeriesModal;
