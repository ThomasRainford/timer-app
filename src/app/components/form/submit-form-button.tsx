import { useFormStatus } from "react-dom";

interface Props {
  form: string;
  buttonText: string;
  buttonStyle?: string;
  disabled?: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const SubmitFormButton = ({
  form,
  buttonText,
  onClick,
  buttonStyle = "btn btn-primary",
  disabled = false,
}: Props) => {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      form={form}
      className={buttonStyle}
      aria-disabled={pending || disabled}
      onClick={onClick}
    >
      {pending ? (
        <span className="loading loading-spinner loading-xs"></span>
      ) : (
        buttonText
      )}
    </button>
  );
};

export default SubmitFormButton;
