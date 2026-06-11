import { useState } from "react";
import { apiFetch } from "../context/api";
import { useNavigate, Link } from "react-router-dom";

export default function Signup() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const data = await apiFetch("/users/signup", { method: "POST", body: JSON.stringify(form) });
    setLoading(false);
    if (data.userId) {
      navigate("/login");
    } else {
      setError(data.message || "Signup failed");
    }
  };

  return (
    <div className="auth-fullpage">
      <div className="auth-image-panel">
        <img src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=900&q=80" alt="Fashion" />
        <div className="auth-image-overlay">
          <Link to="/" className="auth-logo">⚡ Trendify</Link>
          <h2>Join the Fashion Revolution.</h2>
          <p>Thousands of styles, unbeatable prices, and fast delivery — waiting just for you.</p>
        </div>
      </div>
      <div className="auth-form-panel">
        <div className="auth-form-box">
          <Link to="/" className="back-home">← Back to Home</Link>
          <h1>Create Account</h1>
          <p className="auth-sub">Join Trendify and start shopping today</p>
          {error && <p className="error">{error}</p>}
          <form onSubmit={handleSubmit}>
            <label>Full Name</label>
            <input placeholder="Your full name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
            <label>Email Address</label>
            <input type="email" placeholder="you@example.com" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
            <label>Password</label>
            <input type="password" placeholder="Create a strong password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required />
            <button type="submit" className="btn-primary btn-full" disabled={loading}>
              {loading ? "Creating account..." : "Create Account"}
            </button>
          </form>
          <p className="auth-switch">Already have an account? <Link to="/login">Sign In</Link></p>
          <p className="auth-terms">By signing up, you agree to our <Link to="/terms">Terms</Link> & <Link to="/privacy-policy">Privacy Policy</Link></p>
        </div>
      </div>
    </div>
  );
}
