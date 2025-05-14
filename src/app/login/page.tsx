import LoginForm from "@/app/components/login/login-form";
import { Metadata } from "next";
import Link from "next/link";
import { PersonIcon } from "../components/icons";

export const metadata: Metadata = {
  title: "Login",
};

const Login = () => {
  return (
    <div className="hero h-dvh bg-base-200">
      <div className="card shrink-0 sm:w-full max-w-sm shadow-3xl bg-base-100 mx-4 sm:mx-0">
        <div className="flex justify-center mt-2">
          <div className="bg-base-100 rounded-full p-3">
            <PersonIcon size={16} />
          </div>
        </div>
        <div className="flex justify-center mt-2 text-2xl font-bold">
          Log in.
        </div>
        <div className="card-body">
          <LoginForm />
        </div>
        <div className="prose pl-4 pb-4">
          <p className="text-sm opacity-60">
            Not registered?{" "}
            <Link className="hover:underline" href={"/register"}>
              Create account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
