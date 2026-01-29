import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Eye, EyeOff, ArrowRight, Mail, Lock, Github, Twitter, Chrome } from "lucide-react";
import api from "../api/axios";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [forgot, setForgot] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [language, setLanguage] = useState("en");

  useEffect(() => {
    const savedEmail = localStorage.getItem("preLoginEmail");
    if (savedEmail) {
      setEmail(savedEmail);
      localStorage.removeItem("preLoginEmail");
    }
  }, []);

  // ---------------- LOGIN ----------------
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await api.post("/login", {
        email,
        password,
      });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      navigate("/dashboard", { replace: true });
    } catch (err) {
      setMessage(
        err.response?.data?.message ||
          (language === "en"
            ? "Invalid email or password"
            : "ईमेल या पासवर्ड गलत है")
      );
    } finally {
      setLoading(false);
    }
  };

  // ---------------- FORGOT PASSWORD ----------------
  const handleForgot = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      await api.post("/forgot-password", { email });

      setMessage(
        language === "en"
          ? "Reset link sent to your email"
          : "रीसेट लिंक आपके ईमेल पर भेजा गया"
      );
    } catch {
      setMessage(
        language === "en"
          ? "Unable to send reset link"
          : "रीसेट लिंक भेजने में समस्या"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
<div
  className="min-h-screen text-white flex flex-col bg-cover bg-center relative"
  style={{ backgroundImage: "url('/bg-netflix.jpg')" }}
>
  {/* DARK OVERLAY */}
    <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-slate-900/70 to-slate-950/90"></div>

  {/* HEADER */}
  <header className="fixed top-0 w-full z-50 bg-slate-900/80 backdrop-blur-xl border-b border-slate-700/40">
    <div className="flex items-center justify-between px-6 py-4">
      <Link to="/" className="flex items-center">
        <img
          src="/Logonetflix.png"
          alt="Netflix"
          className="h-10 sm:h-12 object-contain"
          draggable="false"
        />
      </Link>

      <select
        value={language}
        onChange={(e) => setLanguage(e.target.value)}
        className="bg-slate-800 border border-slate-600 rounded px-3 py-2 text-sm focus:outline-none"
      >
        <option value="en">English</option>
        <option value="hi">हिंदी</option>
      </select>
    </div>
  </header>

   {/* CONTENT */}
  <main className="relative z-10 flex-1 flex items-center justify-center px-4 pt-32 pb-12">
    <div className="w-full max-w-md bg-slate-900/80 border border-slate-700/50 rounded-2xl p-8 shadow-2xl backdrop-blur">

      <h2 className="text-3xl font-black mb-2">
        {forgot
          ? language === "en"
            ? "Reset Password"
            : "पासवर्ड रीसेट करें"
          : language === "en"
          ? "Sign In"
          : "साइन इन करें"}
      </h2>

      <p className="text-sm text-gray-400 mb-6">
        {forgot
          ? language === "en"
            ? "Enter your email to receive reset link"
            : "रीसेट लिंक पाने के लिए ईमेल डालें"
          : language === "en"
          ? "Welcome back"
          : "वापसी पर स्वागत है"}
      </p>

      {message && (
        <div className="mb-4 p-3 text-sm rounded bg-red-500/10 border border-red-500/40">
          {message}
        </div>
      )}

      <form
        onSubmit={forgot ? handleForgot : handleLogin}
        className="space-y-4"
      >
        {/* EMAIL */}
        <div className="relative">
          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="w-full pl-12 pr-4 py-3 rounded bg-slate-800 border border-slate-600 focus:border-red-400 outline-none"
          />
        </div>

        {/* PASSWORD */}
        {!forgot && (
          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
            <input
              type={showPassword ? "text" : "password"}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full pl-12 pr-12 py-3 rounded bg-slate-800 border border-slate-600 focus:border-red-400 outline-none"
            />
            <button
              type="button"
              onClick={() => setShowPassword((p) => !p)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-red-400 transition"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        )}

        {/* BUTTON */}
        <button
          disabled={loading}
          className="w-full bg-gradient-to-r from-red-600 to-red-700 py-3 rounded font-bold flex items-center justify-center gap-2 disabled:opacity-50 hover:from-red-500 hover:to-red-600 transition"
        >
          {loading ? "Please wait..." : forgot ? "Send Reset Link" : "Sign In"}
          <ArrowRight size={18} />
        </button>
      </form>

      {/* LINKS */}
      <div className="mt-6 text-sm text-center">
        <button
          onClick={() => {
            setForgot(!forgot);
            setMessage("");
          }}
          className="text-red-400 hover:underline"
        >
          {forgot ? "← Back to Sign In" : "Forgot password?"}
        </button>

        {!forgot && (
          <>
            <p className="mt-4 text-gray-400">
              Don't have an account?{" "}
              <span
                onClick={() => navigate("/signup")}
                className="text-red-400 cursor-pointer hover:text-red-300"
              >
                Sign up
              </span>
            </p>

            <div className="mt-6 flex justify-center gap-4">
              <a className="bg-slate-800 p-3 rounded-full hover:bg-slate-700"><Chrome size={20} /></a>
              <a className="bg-slate-800 p-3 rounded-full hover:bg-slate-700"><Mail size={20} /></a>
              <a className="bg-slate-800 p-3 rounded-full hover:bg-slate-700"><Twitter size={20} /></a>
              <a className="bg-slate-800 p-3 rounded-full hover:bg-slate-700"><Github size={20} /></a>
            </div>
          </>
        )}
      </div>
    </div>
  </main>
</div>

  );
}