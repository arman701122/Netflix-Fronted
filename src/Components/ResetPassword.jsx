import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/axios";

export default function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);

  const handleReset = async (e) => {
    e.preventDefault();
    setMessage("");

    if (password.length < 6) {
      return setMessage("Password must be at least 6 characters");
    }

    if (password !== confirmPassword) {
      return setMessage("Passwords do not match");
    }

    setLoading(true);

    try {
      const res = await api.post(`/reset-password/${token}`, { password });
      setSuccess(true);
      setMessage(res.data.message);

      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err) {
      setMessage(err.response?.data?.message || "Invalid or expired link");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4 text-white">
      <div className="w-full max-w-md bg-black/80 p-8 rounded border border-gray-700">
        
        {/* LOGO */}
        <h1 className="text-2xl font-bold text-red-600 text-center mb-6">
          NETFLIX
        </h1>

        <h2 className="text-xl font-semibold mb-6 text-center">
          Reset Password
        </h2>

        {message && (
          <p
            className={`text-center mb-4 text-sm ${
              success ? "text-green-500" : "text-red-500"
            }`}
          >
            {message}
          </p>
        )}

        <form onSubmit={handleReset} className="space-y-4">
          <input
            type="password"
            placeholder="New password"
            className="w-full px-4 py-3 bg-gray-800 rounded focus:outline-none focus:ring-2 focus:ring-red-600"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={loading || success}
            required
          />

          <input
            type="password"
            placeholder="Confirm new password"
            className="w-full px-4 py-3 bg-gray-800 rounded focus:outline-none focus:ring-2 focus:ring-red-600"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            disabled={loading || success}
            required
          />

          <button
            disabled={loading || success}
            className="w-full bg-red-600 hover:bg-red-700 py-3 rounded font-semibold transition disabled:opacity-60"
          >
            {loading ? "Resetting..." : "Reset Password"}
          </button>
        </form>

        <p className="mt-6 text-xs text-gray-400 text-center">
          This link will expire shortly for security reasons.
        </p>
      </div>
    </div>
  );
}
