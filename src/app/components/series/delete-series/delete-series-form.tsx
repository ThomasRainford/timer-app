import { deleteSeries } from "@/app/lib/actions";

interface Props {
  id: number;
}

const DeleteSeriesForm = ({ id }: Props) => {
  const deleteInvoiceWithId = deleteSeries.bind(null, id);

  return (
    <form action={deleteInvoiceWithId}>
      <button className="btn btn-error">Delete</button>
    </form>
  );
};

export default DeleteSeriesForm;
