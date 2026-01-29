import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api/axios";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await api.post("/register", { email, password });
      navigate("/login");
    } catch (err) {
      setMessage(err.response?.data?.message || "Error");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <form onSubmit={handleRegister} className="bg-slate-900 p-8 rounded w-96">
        <h2 className="text-2xl mb-4">Sign Up</h2>

        {message && <p className="text-red-400">{message}</p>}

        <input
          type="email"
          placeholder="Email"
          className="w-full p-3 mb-3 bg-slate-800"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 mb-4 bg-slate-800"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="w-full bg-red-600 py-3 rounded">
          Register
        </button>

        <p className="mt-4 text-sm">
          Already have account?{" "}
          <Link to="/login" className="text-red-400">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}
