"use client";

import { deleteTimer, State } from "@/app/lib/actions";
import { useEffect } from "react";
import { useFormState } from "react-dom";

interface Props {
  id: number;
  seriesId: number;
  modalId: string;
}

const DeleteTimerForm = ({ id, seriesId, modalId }: Props) => {
  const deleteTimerWithId = deleteTimer.bind(null, id, seriesId);
  const initialState = { message: null, errors: undefined };
  const [state, dispatch] = useFormState<State>(
    deleteTimerWithId,
    initialState
  );

  useEffect(() => {
    if (state.message) {
      (document.getElementById(modalId) as any)?.close();
    }
  }, [modalId, state.errors, state.message]);

  return (
    <form action={dispatch}>
      <button className="btn btn-error">Delete</button>
    </form>
  );
};

export default DeleteTimerForm;
