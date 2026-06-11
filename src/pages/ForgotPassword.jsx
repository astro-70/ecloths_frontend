import { useState } from "react";
import { apiFetch } from "../context/api";
import { useNavigate, Link } from "react-router-dom";

export default function ForgotPassword() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const sendOtp = async () => {
    setLoading(true);
    const data = await apiFetch("/users/send-otp", { method: "POST", body: JSON.stringify({ email }) });
    setLoading(false);
    setMsg(data.message);
    if (data.message === "OTP sent") setStep(2);
  };

  const verifyOtp = async () => {
    setLoading(true);
    const data = await apiFetch("/users/verify-otp", { method: "POST", body: JSON.stringify({ email, otp }) });
    setLoading(false);
    setMsg(data.message);
    if (data.message === "OTP verified") setStep(3);
  };

  const changePassword = async () => {
    setLoading(true);
    const data = await apiFetch("/users/change-password", { method: "POST", body: JSON.stringify({ email, newPassword }) });
    setLoading(false);
    setMsg(data.message);
    if (data.message === "Password updated") navigate("/login");
  };

  const steps = ["Enter Email", "Verify OTP", "New Password"];

  return (
    <div className="auth-fullpage">
      <div className="auth-image-panel">
        <img src="https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=900&q=80" alt="Fashion" />
        <div className="auth-image-overlay">
          <Link to="/" className="auth-logo">⚡ Trendify</Link>
          <h2>Reset Your Password</h2>
          <p>We'll send a one-time password to your email to verify your identity.</p>
        </div>
      </div>
      <div className="auth-form-panel">
        <div className="auth-form-box">
          <Link to="/login" className="back-home">← Back to Login</Link>
          <h1>Forgot Password?</h1>
          <p className="auth-sub">No worries — we'll get you back in.</p>

          <div className="step-indicator">
            {steps.map((s, i) => (
              <div key={s} className={`step-dot ${i + 1 <= step ? "done" : ""}`}>
                <div className="step-circle">{i + 1 < step ? "✓" : i + 1}</div>
                <span>{s}</span>
              </div>
            ))}
          </div>

          {msg && <p className={msg.includes("sent") || msg.includes("verified") || msg.includes("updated") ? "info" : "error"}>{msg}</p>}

          {step === 1 && (
            <>
              <label>Email Address</label>
              <input type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />
              <button className="btn-primary btn-full" onClick={sendOtp} disabled={loading}>{loading ? "Sending..." : "Send OTP"}</button>
            </>
          )}
          {step === 2 && (
            <>
              <label>Enter OTP sent to {email}</label>
              <input placeholder="6-digit OTP" value={otp} onChange={(e) => setOtp(e.target.value)} maxLength={6} />
              <button className="btn-primary btn-full" onClick={verifyOtp} disabled={loading}>{loading ? "Verifying..." : "Verify OTP"}</button>
              <button className="btn-link" onClick={() => setStep(1)}>← Use different email</button>
            </>
          )}
          {step === 3 && (
            <>
              <label>New Password</label>
              <input type="password" placeholder="Create a new strong password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
              <button className="btn-primary btn-full" onClick={changePassword} disabled={loading}>{loading ? "Updating..." : "Update Password"}</button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
