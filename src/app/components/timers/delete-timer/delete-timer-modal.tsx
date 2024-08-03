"use client";

import { Colour, buttonHoverColours } from "@/app/components/util";
import { Timer } from "@prisma/client";
import { BinIcon } from "../../icons";
import DeleteTimerForm from "./delete-timer-form";

interface Props {
  timer: Timer;
}

const DeleteTimerModal = ({ timer }: Props) => {
  const { id, name, colour, seriesId } = timer;
  const btnHoverColour = buttonHoverColours[colour as Colour];

  const modalId = "delete_timer_modal_" + id;

  return (
    <>
      <div className="tooltip tooltip-left" data-tip="Delete Timer">
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
          <p className="py-4">Are you sure you want to delete this timer?</p>
          <div className="flex justify-end mt-4">
            <DeleteTimerForm id={id} seriesId={seriesId} modalId={modalId} />
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

export default DeleteTimerModal;
