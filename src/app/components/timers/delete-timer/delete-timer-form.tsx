"use client";

import { deleteTimer } from "@/app/lib/actions/timer";
import { State } from "@/app/lib/actions/types";
import { useEffect } from "react";
import { useFormState } from "react-dom";
import DeleteFormButton from "../../form/delete-form-button";

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
      <DeleteFormButton />
    </form>
  );
};

export default DeleteTimerForm;
