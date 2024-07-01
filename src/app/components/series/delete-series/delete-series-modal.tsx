"use client";

import { Colour, buttonHoverColours } from "@/app/components/util";
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
      <div className="tooltip tooltip-left" data-tip="Delete series">
        <button
          className={`btn btn-outline btn-square btn-sm ${btnHoverColour}`}
          onClick={() => (document.getElementById(modalId) as any)?.showModal()}
        >
          <svg
            className="h-5 w-5 text-base-300 float-end"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            stroke-width="2"
            stroke="currentColor"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" />
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      </div>
      <dialog id={modalId} className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-lg text-accent">{`Delete ${name}?`}</h3>
          <p className="py-4">Are you sure you want to delete this series?</p>
          <div className="flex justify-end mt-4">
            <DeleteSeriesForm id={id} />
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
