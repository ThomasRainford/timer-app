"use client";

import { deleteSeries } from "@/app/lib/actions/series";
import { State } from "@/app/lib/actions/types";
import { useEffect } from "react";
import { useFormState } from "react-dom";
import DeleteFormButton from "../../form/delete-form-button";

interface Props {
  id: number;
  modalId: string;
}

const DeleteSeriesForm = ({ id, modalId }: Props) => {
  const deleteSeriesWithId = deleteSeries.bind(null, id);
  const initialState = { message: null, errors: undefined };
  const [state, dispatch] = useFormState<State>(
    deleteSeriesWithId,
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

export default DeleteSeriesForm;
