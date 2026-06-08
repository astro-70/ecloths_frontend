import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { apiFetch } from "../../context/api";
import { Link } from "react-router-dom";

export default function AdminUsers() {
  const { token } = useAuth();
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");

  const load = () => apiFetch("/users", {}, token).then(setUsers);
  useEffect(() => { load(); }, []);

  const remove = async (id) => {
    if (!confirm("Delete this user?")) return;
    await apiFetch(`/users/${id}`, { method: "DELETE" }, token);
    load();
  };

  const filtered = users.filter((u) =>
    u.name.toLowerCase().includes(search.toLowerCase()) ||
    u.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="admin-layout">
      <aside className="admin-sidebar">
        <div className="sidebar-brand">⚡ Trendify Admin</div>
        <nav className="sidebar-nav">
          <Link to="/admin" className="sidebar-link">🏠 Dashboard</Link>
          <Link to="/admin/products" className="sidebar-link">📦 Products</Link>
          <Link to="/admin/orders" className="sidebar-link">🧾 Orders</Link>
          <Link to="/admin/users" className="sidebar-link active">👤 Users</Link>
          <Link to="/admin/coupons" className="sidebar-link">🎟️ Coupons</Link>
          <Link to="/" className="sidebar-link">🛍️ View Store</Link>
        </nav>
      </aside>

      <main className="admin-main">
        <div className="admin-header">
          <h1>👤 Manage Users</h1>
          <input
            className="search-input"
            placeholder="🔍 Search users..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="users-count">Total: {filtered.length} users</div>

        <table className="admin-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Joined</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((u, i) => (
              <tr key={u._id}>
                <td>{i + 1}</td>
                <td>
                  <div className="user-avatar-row">
                    <div className="user-avatar">{u.name.charAt(0).toUpperCase()}</div>
                    {u.name}
                  </div>
                </td>
                <td>{u.email}</td>
                <td>
                  <span className={`role-badge ${u.isAdmin ? "role-admin" : "role-user"}`}>
                    {u.isAdmin ? "Admin" : "Customer"}
                  </span>
                </td>
                <td>{new Date(u.createdAt).toLocaleDateString()}</td>
                <td>
                  {!u.isAdmin && (
                    <button className="delete-btn" onClick={() => remove(u._id)}>🗑️ Delete</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </div>
  );
}
