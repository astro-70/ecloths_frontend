import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { apiFetch } from "../context/api";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await apiFetch("/users/login", { method: "POST", body: JSON.stringify(form) });
    if (data.token) {
      login(data.user, data.token);
      navigate(data.user.isAdmin ? "/admin" : "/");
    } else {
      setError(data.message || "Login failed");
    }
  };

  return (
    <main className="auth-page">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h1>Login to Trendify</h1>
        {error && <p className="error">{error}</p>}
        <input placeholder="Email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
        <input placeholder="Password" type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required />
        <button type="submit" className="btn-primary">Login</button>
        <p><Link to="/forgot-password">Forgot Password?</Link></p>
        <p>Don't have an account? <Link to="/signup">Sign Up</Link></p>
      </form>
    </main>
  );
}
