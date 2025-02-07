"use client";

import { authenticate } from "@/app/lib/actions/auth";
import { useFormState } from "react-dom";
import LoginButton from "./login-button";

const LoginForm = () => {
  const [errorMessage, dispatch] = useFormState(authenticate, undefined);

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
      <div className="form-control mt-6">
        <LoginButton />
      </div>
      <div className="flex mt-4" aria-live="polite" aria-atomic="true">
        {errorMessage && (
          <>
            <div role="alert" className="alert alert-error">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 shrink-0 stroke-current"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>{errorMessage}</span>
            </div>
          </>
        )}
      </div>
    </form>
  );
};

export default LoginForm;
