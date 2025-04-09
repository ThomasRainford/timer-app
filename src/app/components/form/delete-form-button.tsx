import { useFormStatus } from "react-dom";

interface Props {
  buttonText?: string;
  buttonStyle?: string;
}

const DeleteFormButton = ({
  buttonText = "Delete",
  buttonStyle = "btn btn-error",
}: Props) => {
  const { pending } = useFormStatus();

  return (
    <button className={buttonStyle} aria-disabled={pending}>
      {pending ? (
        <span className="loading loading-spinner loading-xs mx-3"></span>
      ) : (
        buttonText
      )}
    </button>
  );
};

export default DeleteFormButton;
