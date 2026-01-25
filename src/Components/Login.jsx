import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [forgot, setForgot] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  /* ---------------- LOGIN ---------------- */
const handleLogin = async (e) => {
  e.preventDefault();
  setLoading(true);
  setMessage("");

  console.log("Trying login with:", { email, password }); // 🔹 add this

  try {
    const res = await api.post("/login", { email, password });
    console.log("Login response:", res.data); // 🔹 add this
    localStorage.setItem("token", res.data.token);
    navigate("/netflix-page"); // ✅ redirect
  } catch (err) {
    console.error("Login error:", err.response?.data); // 🔹 add this
    setMessage(err.response?.data?.message || "Login failed");
  } finally {
    setLoading(false);
  }
};


  /* ---------------- FORGOT PASSWORD ---------------- */
  const handleForgot = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const res = await api.post("/forgot-password", { email });
      setMessage(res.data.message);
    } catch {
      setMessage("Error sending reset link");
    }
  };

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center px-4 text-white">

      {/* LOGO */}
      <h1 className="text-3xl font-bold text-red-600 mb-8">
        NETFLIX
      </h1>

      {/* LOGIN CARD */}
      <div className="w-full max-w-md bg-black/80 p-8 rounded border border-gray-700">
        <h2 className="text-2xl font-bold mb-6 text-center">
          {forgot ? "Reset Password" : "Sign In"}
        </h2>

        {message && (
          <p className="text-center mb-4 text-red-500 text-sm">
            {message}
          </p>
        )}

        <form
          onSubmit={forgot ? handleForgot : handleLogin}
          className="space-y-4"
        >
          <input
            type="email"
            placeholder="Email address"
            className="w-full px-4 py-3 bg-gray-800 rounded focus:outline-none focus:ring-2 focus:ring-red-600"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          {!forgot && (
            <input
              type="password"
              placeholder="Password"
              className="w-full px-4 py-3 bg-gray-800 rounded focus:outline-none focus:ring-2 focus:ring-red-600"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          )}

          <button
            disabled={loading}
            className="w-full bg-red-600 hover:bg-red-700 py-3 rounded font-semibold transition"
          >
            {loading
              ? "Please wait..."
              : forgot
              ? "Send Reset Link"
              : "Sign In"}
          </button>
        </form>

        {/* TOGGLE */}
        <div className="mt-4 text-sm text-gray-400 text-center">
          <button
            onClick={() => setForgot(!forgot)}
            className="hover:underline"
          >
            {forgot ? "Back to Sign In" : "Forgot password?"}
          </button>
        </div>

        {/* SIGNUP */}
        {!forgot && (
          <p className="mt-6 text-gray-400 text-sm text-center">
            New to Netflix?{" "}
            <span
              onClick={() => navigate("/signup")}
              className="text-white hover:underline cursor-pointer"
            >
              Sign up now
            </span>
          </p>
        )}
      </div>

      {/* FOOTER */}
      <footer className="mt-10 text-xs text-gray-500 max-w-md text-center">
        <div className="grid grid-cols-2 gap-3">
          {[
            "FAQ",
            "Help Centre",
            "Terms of Use",
            "Privacy",
            "Cookie Preferences",
            "Corporate Information",
          ].map((item) => (
            <span key={item} className="hover:text-white cursor-pointer">
              {item}
            </span>
          ))}
        </div>
      </footer>
    </div>
  );
}
