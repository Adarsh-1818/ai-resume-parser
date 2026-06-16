import { useState } from "react";
import api from "../api/axios";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const login = async () => {
    const res = await api.post("/auth/login", { email, password });
    localStorage.setItem("token", res.data.token);
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">

      <div className="w-full max-w-md bg-white shadow-md rounded-2xl p-8 space-y-6">

        <div className="text-center space-y-1">
          <h1 className="text-2xl font-semibold">AI Resume Parser</h1>
          <p className="text-sm text-gray-500">Sign in to continue</p>
        </div>

        <input
          placeholder="Email"
          className="w-full border border-gray-200 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-gray-300"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border border-gray-200 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-gray-300"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={login}
          className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition"
        >
          Sign In
        </button>

        <div className="text-sm text-center text-gray-500">
          No account?{" "}
          <Link to="/register" className="text-black font-medium">
            Create account
          </Link>
        </div>

      </div>
    </div>
  );
}