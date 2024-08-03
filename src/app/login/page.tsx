import LoginForm from "@/app/components/login/login-form";
import { Metadata } from "next";
import Link from "next/link";
import { PersonIcon } from "../components/icons";

export const metadata: Metadata = {
  title: "Login",
};

const Login = () => {
  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="card shrink-0 w-full max-w-sm shadow-3xl bg-base-100">
        <div className="flex justify-center mt-2">
          <div className="bg-base-100 rounded-full p-3">
            <PersonIcon size={16} />
          </div>
        </div>
        <div className="prose flex justify-center mt-2">
          <h2>Log in.</h2>
        </div>
        <div className="card-body">
          <LoginForm />
        </div>
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
