import { useFormStatus } from "react-dom";

const RegisterButton = () => {
  const { pending } = useFormStatus();

  return (
    <button className="btn btn-primary" aria-disabled={pending}>
      {pending ? (
        <span className="loading loading-spinner loading-xs"></span>
      ) : (
        "Register"
      )}
    </button>
  );
};

export default RegisterButton;
