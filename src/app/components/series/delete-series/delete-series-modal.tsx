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
            className="h-5 w-5 text-base-300"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" />
            <line x1="4" y1="7" x2="20" y2="7" />
            <line x1="10" y1="11" x2="10" y2="17" />
            <line x1="14" y1="11" x2="14" y2="17" />
            <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
            <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
          </svg>
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
