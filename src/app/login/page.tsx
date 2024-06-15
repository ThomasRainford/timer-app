import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Login",
};

const Login = () => {
  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="card shrink-0 w-full max-w-sm shadow-3xl bg-base-100">
        <div className="flex justify-center mt-2">
          <div className="bg-base-100 rounded-full p-3">
            <svg
              className="h-16 w-16 text-accent"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />{" "}
              <circle cx="12" cy="7" r="4" />
            </svg>
          </div>
        </div>
        <div className="prose flex justify-center mt-2">
          <h2>Log in.</h2>
        </div>
        <form className="card-body">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              placeholder="email"
              className="input input-bordered bg-base-100 "
              required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
              placeholder="password"
              className="input input-bordered bg-base-100 "
              required
            />
          </div>
          <div className="form-control mt-6">
            <button className="btn btn-primary">Login</button>
          </div>
        </form>
        <div className="prose pl-4 pb-4">
          <p className="text-sm">
            Not registered? <Link href={"/register"}>Create account</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
