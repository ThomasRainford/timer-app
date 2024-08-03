"use client";

import { register } from "@/app/lib/actions/auth";
import { useFormState, useFormStatus } from "react-dom";

const RegisterForm = () => {
  const [errorMessage, dispatch] = useFormState(register, undefined);
  const { pending } = useFormStatus();

  return (
    <form action={dispatch}>
      <div className="form-control">
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
      <div className="form-control">
        <label className="label" htmlFor="confirm-password">
          <span className="label-text">Confirm Password</span>
        </label>
        <input
          id="confirm-password"
          type="password"
          name="confirm-password"
          placeholder="confirm password"
          className="input input-bordered bg-base-100 "
          required
        />
      </div>
      <div className="form-control mt-6">
        <button className="btn btn-primary" aria-disabled={pending}>
          Register
        </button>
      </div>
      <div
        className="flex h-8 items-end space-x-1"
        aria-live="polite"
        aria-atomic="true"
      >
        {errorMessage && (
          <>
            <p className="text-sm text-red-500">{errorMessage}</p>
          </>
        )}
      </div>
    </form>
  );
};

export default RegisterForm;
