import { useState } from "react";
import api from "../api/axios";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const register = async () => {
    await api.post("/auth/register", {
      firstName,
      lastName,
      email,
      password,
    });

    navigate("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">

      <div className="w-full max-w-md bg-white shadow-md rounded-2xl p-8 space-y-5">

        <div className="text-center">
          <h1 className="text-2xl font-semibold">Create Account</h1>
          <p className="text-sm text-gray-500">Start your AI CV journey</p>
        </div>

        <input className="input" placeholder="First Name" onChange={(e)=>setFirstName(e.target.value)} />
        <input className="input" placeholder="Last Name" onChange={(e)=>setLastName(e.target.value)} />
        <input className="input" placeholder="Email" onChange={(e)=>setEmail(e.target.value)} />
        <input className="input" placeholder="Password" type="password" onChange={(e)=>setPassword(e.target.value)} />

        <button
          onClick={register}
          className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800"
        >
          Create Account
        </button>

        <p className="text-sm text-center text-gray-500">
          Already have account?{" "}
          <Link className="text-black font-medium" to="/">
            Sign in
          </Link>
        </p>

      </div>
    </div>
  );
}