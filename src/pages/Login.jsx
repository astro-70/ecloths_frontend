import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { apiFetch } from "../context/api";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const data = await apiFetch("/users/login", { method: "POST", body: JSON.stringify(form) });
    setLoading(false);
    if (data.token) {
      login(data.user, data.token);
      navigate(data.user.isAdmin ? "/admin" : "/");
    } else {
      setError(data.message || "Login failed");
    }
  };

  return (
    <div className="auth-fullpage">
      <div className="auth-image-panel">
        <img src="https://images.unsplash.com/photo-1483985988355-763728e1935b?w=900&q=80" alt="Fashion" />
        <div className="auth-image-overlay">
          <Link to="/" className="auth-logo">⚡ Trendify</Link>
          <h2>Your Style, Your Story.</h2>
          <p>Discover the latest fashion trends for everyone in the family — all in one place.</p>
        </div>
      </div>
      <div className="auth-form-panel">
        <div className="auth-form-box">
          <Link to="/" className="back-home">← Back to Home</Link>
          <h1>Welcome Back</h1>
          <p className="auth-sub">Sign in to your Trendify account</p>
          {error && <p className="error">{error}</p>}
          <form onSubmit={handleSubmit}>
            <label>Email Address</label>
            <input type="email" placeholder="you@example.com" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
            <label>Password</label>
            <input type="password" placeholder="Enter your password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required />
            <div className="auth-row">
              <Link to="/forgot-password" className="forgot-link">Forgot Password?</Link>
            </div>
            <button type="submit" className="btn-primary btn-full" disabled={loading}>
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>
          <p className="auth-switch">Don't have an account? <Link to="/signup">Create one</Link></p>
          <div className="auth-divider"><span>OR</span></div>
          <div className="demo-creds">
            <p>🔑 Demo Admin</p>
            <code>admin@trendify.com / admin123</code>
          </div>
        </div>
      </div>
    </div>
  );
}
