"use client";

interface Props {
  id: number;
  modalId: string;
}

const DeleteTimerForm = ({ id, modalId }: Props) => {
  // const deleteInvoiceWithId = deleteSeries.bind(null, id);
  // const initialState = { message: null, errors: undefined };
  // const [state, dispatch] = useFormState<State>(
  //   deleteInvoiceWithId,
  //   initialState
  // );

  // useEffect(() => {
  //   if (state.message) {
  //     (document.getElementById(modalId) as any)?.close();
  //   }
  // }, [modalId, state.errors, state.message]);

  return (
    <form>
      <button className="btn btn-error">Delete</button>
    </form>
  );
};

export default DeleteTimerForm;
