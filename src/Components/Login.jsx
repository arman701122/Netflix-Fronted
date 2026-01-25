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

  /* ------------ LOGIN ------------ */
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await api.post("/login", { email, password });
      localStorage.setItem("token", res.data.token);
      navigate("/netflix-page");
    } catch (err) {
      setMessage(err.response?.data?.message || "Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  /* ------------ FORGOT ------------ */
  const handleForgot = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const res = await api.post("/forgot-password", { email });
      setMessage(res.data.message);
    } catch {
      setMessage("Unable to send reset link");
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">

      {/* HEADER */}
      <header className="px-6 py-4">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/7/7a/Logonetflix.png"
          alt="Netflix"
          className="h-6 sm:h-8"
        />
      </header>

      {/* LOGIN BOX */}
      <main className="flex-1 flex items-center justify-center px-4">
        <div className="w-full max-w-md bg-black/80 p-6 sm:p-8 rounded-md">

          <h2 className="text-2xl sm:text-3xl font-bold mb-6">
            {forgot ? "Reset Password" : "Sign In"}
          </h2>

          {message && (
            <p className="mb-4 text-sm text-red-500">
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 rounded bg-gray-800 focus:outline-none focus:ring-2 focus:ring-red-600"
            />

            {!forgot && (
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-3 rounded bg-gray-800 focus:outline-none focus:ring-2 focus:ring-red-600"
              />
            )}

            <button
              disabled={loading}
              className="w-full bg-red-600 hover:bg-red-700 py-3 rounded font-semibold transition"
            >
              {loading
                ? "Signing in..."
                : forgot
                ? "Send Reset Link"
                : "Sign In"}
            </button>
          </form>

          {/* TOGGLE */}
          <div className="mt-4 text-sm text-gray-400">
            <button
              onClick={() => setForgot(!forgot)}
              className="hover:underline"
            >
              {forgot ? "Back to Sign In" : "Forgot password?"}
            </button>
          </div>

          {/* SIGN UP */}
          {!forgot && (
            <p className="mt-6 text-sm text-gray-400">
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
      </main>

      {/* FOOTER */}
      <footer className="px-6 pb-6 text-xs text-gray-500">
        <div className="max-w-md mx-auto grid grid-cols-2 gap-3">
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
