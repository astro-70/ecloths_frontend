import { useState } from "react";
import { apiFetch } from "../context/api";
import { useNavigate } from "react-router-dom";

export default function ForgotPassword() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [msg, setMsg] = useState("");

  const sendOtp = async () => {
    const data = await apiFetch("/users/send-otp", { method: "POST", body: JSON.stringify({ email }) });
    setMsg(data.message);
    if (data.message === "OTP sent") setStep(2);
  };

  const verifyOtp = async () => {
    const data = await apiFetch("/users/verify-otp", { method: "POST", body: JSON.stringify({ email, otp }) });
    setMsg(data.message);
    if (data.message === "OTP verified") setStep(3);
  };

  const changePassword = async () => {
    const data = await apiFetch("/users/change-password", { method: "POST", body: JSON.stringify({ email, newPassword }) });
    setMsg(data.message);
    if (data.message === "Password updated") navigate("/login");
  };

  return (
    <main className="auth-page">
      <div className="auth-form">
        <h1>Reset Password</h1>
        {msg && <p className="info">{msg}</p>}
        {step === 1 && (
          <>
            <input placeholder="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <button className="btn-primary" onClick={sendOtp}>Send OTP</button>
          </>
        )}
        {step === 2 && (
          <>
            <input placeholder="Enter OTP" value={otp} onChange={(e) => setOtp(e.target.value)} />
            <button className="btn-primary" onClick={verifyOtp}>Verify OTP</button>
          </>
        )}
        {step === 3 && (
          <>
            <input placeholder="New Password" type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
            <button className="btn-primary" onClick={changePassword}>Update Password</button>
          </>
        )}
      </div>
    </main>
  );
}
