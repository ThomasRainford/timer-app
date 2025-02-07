import { useFormStatus } from "react-dom";

const LoginButton = () => {
  const { pending } = useFormStatus();

  return (
    <button className="btn btn-primary" aria-disabled={pending}>
      {pending ? (
        <span className="loading loading-spinner loading-xs"></span>
      ) : (
        "Login"
      )}
    </button>
  );
};

export default LoginButton;
