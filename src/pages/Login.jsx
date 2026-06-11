import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { apiFetch } from "../context/api";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [tab, setTab] = useState("login");
  const [loginForm, setLoginForm] = useState({ email: "", password: "" });
  const [signupForm, setSignupForm] = useState({ name: "", email: "", password: "", confirm: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(""); setSuccess("");
    setLoading(true);
    const data = await apiFetch("/users/login", { method: "POST", body: JSON.stringify(loginForm) });
    setLoading(false);
    if (data.token) {
      login(data.user, data.token);
      navigate(data.user.isAdmin ? "/admin" : "/");
    } else {
      setError(data.message || "Login failed. Check your credentials.");
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setError(""); setSuccess("");
    if (signupForm.password !== signupForm.confirm) return setError("Passwords do not match.");
    if (signupForm.password.length < 6) return setError("Password must be at least 6 characters.");
    setLoading(true);
    const data = await apiFetch("/users/signup", { method: "POST", body: JSON.stringify({ name: signupForm.name, email: signupForm.email, password: signupForm.password }) });
    setLoading(false);
    if (data.userId) {
      setSuccess("Account created! Please sign in.");
      setTab("login");
      setLoginForm({ email: signupForm.email, password: "" });
      setSignupForm({ name: "", email: "", password: "", confirm: "" });
    } else {
      setError(data.message || "Signup failed.");
    }
  };

  const images = {
    login: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=900&q=80",
    signup: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=900&q=80",
  };

  return (
    <div className="auth-fullpage">
      {/* Left image panel */}
      <div className="auth-image-panel">
        <img src={images[tab]} alt="Fashion" />
        <div className="auth-image-overlay">
          <Link to="/" className="auth-logo">⚡ Trendify</Link>
          {tab === "login" ? (
            <>
              <h2>Your Style, Your Story.</h2>
              <p>Discover the latest fashion trends for everyone in the family — all in one place.</p>
            </>
          ) : (
            <>
              <h2>Join the Fashion Revolution.</h2>
              <p>Thousands of styles, unbeatable prices, and fast delivery — waiting just for you.</p>
            </>
          )}
        </div>
      </div>

      {/* Right form panel */}
      <div className="auth-form-panel">
        <div className="auth-form-box">
          <Link to="/" className="back-home">← Back to Home</Link>

          {/* Tab switcher */}
          <div className="auth-tabs">
            <button className={`auth-tab ${tab === "login" ? "active" : ""}`} onClick={() => { setTab("login"); setError(""); setSuccess(""); }}>Sign In</button>
            <button className={`auth-tab ${tab === "signup" ? "active" : ""}`} onClick={() => { setTab("signup"); setError(""); setSuccess(""); }}>Create Account</button>
          </div>

          {error && <p className="error">{error}</p>}
          {success && <p className="info">{success}</p>}

          {/* LOGIN FORM */}
          {tab === "login" && (
            <>
              <p className="auth-sub">Welcome back! Sign in to continue shopping.</p>
              <form onSubmit={handleLogin}>
                <label>Email Address</label>
                <input type="email" placeholder="you@example.com" value={loginForm.email} onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })} required />
                <label>Password</label>
                <input type="password" placeholder="Enter your password" value={loginForm.password} onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })} required />
                <div className="auth-row">
                  <Link to="/forgot-password" className="forgot-link">Forgot Password?</Link>
                </div>
                <button type="submit" className="btn-primary btn-full" disabled={loading}>
                  {loading ? "Signing in..." : "Sign In →"}
                </button>
              </form>
              <p className="auth-switch">New to Trendify? <button className="link-btn" onClick={() => { setTab("signup"); setError(""); }}>Create a free account</button></p>
              <div className="auth-divider"><span>Demo Credentials</span></div>
              <div className="demo-creds">
                <p>🔑 Admin Login</p>
                <code>admin@trendify.com / admin123</code>
              </div>
            </>
          )}

          {/* SIGNUP FORM */}
          {tab === "signup" && (
            <>
              <p className="auth-sub">Join Trendify — it's free and takes 30 seconds.</p>
              <form onSubmit={handleSignup}>
                <label>Full Name</label>
                <input placeholder="Your full name" value={signupForm.name} onChange={(e) => setSignupForm({ ...signupForm, name: e.target.value })} required />
                <label>Email Address</label>
                <input type="email" placeholder="you@example.com" value={signupForm.email} onChange={(e) => setSignupForm({ ...signupForm, email: e.target.value })} required />
                <label>Password</label>
                <input type="password" placeholder="At least 6 characters" value={signupForm.password} onChange={(e) => setSignupForm({ ...signupForm, password: e.target.value })} required />
                <label>Confirm Password</label>
                <input type="password" placeholder="Re-enter your password" value={signupForm.confirm} onChange={(e) => setSignupForm({ ...signupForm, confirm: e.target.value })} required />
                <button type="submit" className="btn-primary btn-full" disabled={loading}>
                  {loading ? "Creating account..." : "Create Account →"}
                </button>
              </form>
              <p className="auth-switch">Already have an account? <button className="link-btn" onClick={() => { setTab("login"); setError(""); }}>Sign in</button></p>
              <p className="auth-terms">By signing up, you agree to our <Link to="/terms">Terms</Link> & <Link to="/privacy-policy">Privacy Policy</Link>.</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
