"use client";

import { authenticate } from "@/app/lib/actions/auth";
import { useFormState } from "react-dom";
import FormInputError from "../form/form-input-error";
import SubmitFormButton from "../form/submit-form-button";

const LoginForm = () => {
  const [errorMessage, dispatch] = useFormState(authenticate, undefined);

  return (
    <form action={dispatch} id="login-form">
      <div className="form-control mb-4">
        <label className="label" htmlFor="email">
          <span className="label-text">Email</span>
        </label>
        <input
          id="email"
          type="email"
          name="email"
          placeholder="email"
          className="input input-bordered bg-base-100"
          required
        />
      </div>
      <div className="form-control">
        <label className="label" htmlFor="password">
          <span className="label-text">Password</span>
        </label>
        <input
          id="password"
          type="password"
          name="password"
          placeholder="password"
          className="input input-bordered bg-base-100"
          required
          minLength={6}
        />
      </div>
      <div className="flex mt-4" aria-live="polite" aria-atomic="true">
        {errorMessage && <FormInputError message={errorMessage} />}
      </div>
      <div className="form-control mt-6">
        <SubmitFormButton form="login-form" buttonText="Login" />
      </div>
    </form>
  );
};

export default LoginForm;
