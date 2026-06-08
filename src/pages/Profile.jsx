import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { apiFetch } from "../context/api";

export default function Profile() {
  const { user, token, login } = useAuth();
  const [form, setForm] = useState({ name: user?.name || "", email: user?.email || "" });
  const [msg, setMsg] = useState("");

  const handleUpdate = async (e) => {
    e.preventDefault();
    const data = await apiFetch(`/users/${user.id}`, { method: "PUT", body: JSON.stringify(form) }, token);
    if (data._id) {
      login({ ...user, name: data.name, email: data.email }, token);
      setMsg("Profile updated!");
    }
  };

  if (!user) return <p className="page-container">Please login.</p>;

  return (
    <main className="page-container">
      <h1>My Profile</h1>
      <form className="auth-form" onSubmit={handleUpdate}>
        {msg && <p className="info">{msg}</p>}
        <input placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
        <input placeholder="Email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
        <button type="submit" className="btn-primary">Update Profile</button>
      </form>
    </main>
  );
}
