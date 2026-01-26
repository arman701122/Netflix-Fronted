import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import { Link } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [forgot, setForgot] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

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
    <div className="min-h-screen bg-[url('bg-netflix.jpg')] bg-cover bg-center flex flex-col">
      <div className="bg-black/70 min-h-screen flex flex-col">

        {/* HEADER */}
       
<header className="px-6 py-6">
  <Link to="/">
    <img
      src="https://upload.wikimedia.org/wikipedia/commons/7/7a/Logonetflix.png"
      alt="Netflix"
      className="h-10 cursor-pointer"
    />
  </Link>
</header>

        {/* LOGIN CARD */}
        <main className="flex-1 flex items-center justify-center px-4">
          <div className="w-full max-w-md bg-black/80 p-8 rounded-md shadow-xl">

            <h2 className="text-3xl font-bold mb-6 text-white">
              {forgot ? "Reset Password" : "Sign In"}
            </h2>

            {message && (
              <div className="mb-4 text-sm text-red-500 bg-red-500/10 p-3 rounded">
                {message}
              </div>
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
                className="w-full px-4 py-3 rounded bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-600"
              />

              {!forgot && (
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full px-4 py-3 rounded bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-600"
                />
              )}

              <button
                disabled={loading}
                className="w-full bg-red-600 hover:bg-red-700 py-3 rounded font-semibold text-white transition disabled:opacity-60"
              >
                {loading
                  ? "Please wait..."
                  : forgot
                  ? "Send Reset Link"
                  : "Sign In"}
              </button>
            </form>

            <div className="flex justify-between items-center mt-4 text-sm text-gray-400">
              <label className="flex items-center gap-2">
                <input type="checkbox" className="accent-red-600" />
                Remember me
              </label>

              <button
                onClick={() => setForgot(!forgot)}
                className="hover:underline"
              >
                {forgot ? "Back to Sign In" : "Forgot password?"}
              </button>
            </div>

            {!forgot && (
              <p className="mt-8 text-sm text-gray-400">
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
       
      </div>
    </div>
  );
}
