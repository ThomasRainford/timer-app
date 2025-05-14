import RegisterForm from "@/app/components/register/register-form";
import { Metadata } from "next";
import Link from "next/link";
import { PersonIcon } from "../components/icons";

export const metadata: Metadata = {
  title: "Register",
};

const Register = () => {
  return (
    <div className="hero min-h-dvh bg-base-200">
      <div className="card shrink-0 w-full max-w-sm shadow-3xl bg-base-100">
        <div className="flex justify-center mt-2">
          <div className="bg-base-100 rounded-full p-3">
            <PersonIcon size={16} />
          </div>
        </div>
        <div className="flex justify-center mt-2 text-2xl font-bold">
          Register
        </div>
        <div className="card-body">
          <RegisterForm />
        </div>
        <div className="prose pl-4 pb-4">
          <p className="text-sm opacity-60">
            Already registered?{" "}
            <Link className="hover:underline" href={"/login"}>
              Login here.
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
