import { useState } from "react";
import { apiFetch } from "../context/api";
import { useNavigate, Link } from "react-router-dom";

export default function Signup() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await apiFetch("/users/signup", { method: "POST", body: JSON.stringify(form) });
    if (data.userId) {
      navigate("/login");
    } else {
      setError(data.message || "Signup failed");
    }
  };

  return (
    <main className="auth-page">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h1>Create Account</h1>
        {error && <p className="error">{error}</p>}
        <input placeholder="Full Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
        <input placeholder="Email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
        <input placeholder="Password" type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required />
        <button type="submit" className="btn-primary">Sign Up</button>
        <p>Already have an account? <Link to="/login">Login</Link></p>
      </form>
    </main>
  );
}
