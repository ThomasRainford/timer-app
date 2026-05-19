"use client";

import { deleteSeries } from "@/app/lib/actions/series";
import { State } from "@/app/lib/actions/types";
import { useActionState, useEffect } from "react";
import DeleteFormButton from "../../form/delete-form-button";

interface Props {
  id: number;
  modalId: string;
}

const DeleteSeriesForm = ({ id, modalId }: Props) => {
  const deleteSeriesWithId = deleteSeries.bind(null, id);
  const initialState = { message: null, errors: undefined };
  const [state, dispatch] = useActionState<State>(
    deleteSeriesWithId,
    initialState,
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
