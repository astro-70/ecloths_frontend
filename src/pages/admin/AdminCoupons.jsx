import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { apiFetch } from "../../context/api";
import { Link } from "react-router-dom";

export default function AdminCoupons() {
  const { token } = useAuth();
  const [coupons, setCoupons] = useState([]);
  const [form, setForm] = useState({ code: "", discount: "" });

  const load = () => apiFetch("/coupons").then(setCoupons);
  useEffect(() => { load(); }, []);

  const create = async (e) => {
    e.preventDefault();
    await apiFetch("/coupons", { method: "POST", body: JSON.stringify({ ...form, discount: Number(form.discount) }) }, token);
    setForm({ code: "", discount: "" });
    load();
  };

  const remove = async (id) => {
    if (!confirm("Delete this coupon?")) return;
    await apiFetch(`/coupons/${id}`, { method: "DELETE" }, token);
    load();
  };

  return (
    <div className="admin-layout">
      <aside className="admin-sidebar">
        <div className="sidebar-brand">⚡ Trendify Admin</div>
        <nav className="sidebar-nav">
          <Link to="/admin" className="sidebar-link">🏠 Dashboard</Link>
          <Link to="/admin/products" className="sidebar-link">📦 Products</Link>
          <Link to="/admin/orders" className="sidebar-link">🧾 Orders</Link>
          <Link to="/admin/users" className="sidebar-link">👤 Users</Link>
          <Link to="/admin/coupons" className="sidebar-link active">🎟️ Coupons</Link>
          <Link to="/" className="sidebar-link">🛍️ View Store</Link>
        </nav>
      </aside>

      <main className="admin-main">
        <div className="admin-header">
          <h1>🎟️ Manage Coupons</h1>
        </div>

        <form className="admin-form-card" onSubmit={create}>
          <h3>Create New Coupon</h3>
          <div className="form-grid">
            <input
              placeholder="Coupon Code (e.g. TREND10)"
              value={form.code}
              onChange={(e) => setForm({ ...form, code: e.target.value.toUpperCase() })}
              required
            />
            <input
              placeholder="Discount Amount (₹)"
              type="number"
              value={form.discount}
              onChange={(e) => setForm({ ...form, discount: e.target.value })}
              required
            />
          </div>
          <button type="submit" className="btn-primary">+ Create Coupon</button>
        </form>

        <div className="coupons-grid">
          {coupons.map((c) => (
            <div key={c._id} className="coupon-card">
              <div className="coupon-left">
                <span className="coupon-icon">🎟️</span>
                <div>
                  <h3>{c.code}</h3>
                  <p>₹{c.discount} off on your order</p>
                </div>
              </div>
              <button className="delete-btn" onClick={() => remove(c._id)}>🗑️</button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
