import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { apiFetch } from "../../context/api";
import { Link } from "react-router-dom";

export default function AdminOrders() {
  const { token } = useAuth();
  const [orders, setOrders] = useState([]);
  const [filter, setFilter] = useState("");

  const load = () => apiFetch("/orders", {}, token).then(setOrders);
  useEffect(() => { load(); }, []);

  const updateStatus = async (id, status) => {
    await apiFetch(`/orders/${id}`, { method: "PUT", body: JSON.stringify({ status }) }, token);
    load();
  };

  const filtered = filter ? orders.filter((o) => o.status === filter) : orders;

  return (
    <div className="admin-layout">
      <aside className="admin-sidebar">
        <div className="sidebar-brand">⚡ Trendify Admin</div>
        <nav className="sidebar-nav">
          <Link to="/admin" className="sidebar-link">🏠 Dashboard</Link>
          <Link to="/admin/products" className="sidebar-link">📦 Products</Link>
          <Link to="/admin/orders" className="sidebar-link active">🧾 Orders</Link>
          <Link to="/admin/users" className="sidebar-link">👤 Users</Link>
          <Link to="/admin/coupons" className="sidebar-link">🎟️ Coupons</Link>
          <Link to="/" className="sidebar-link">🛍️ View Store</Link>
        </nav>
      </aside>

      <main className="admin-main">
        <div className="admin-header">
          <h1>🧾 Manage Orders</h1>
          <select className="filter-select" value={filter} onChange={(e) => setFilter(e.target.value)}>
            <option value="">All Status</option>
            {["pending", "processing", "shipped", "delivered", "cancelled"].map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
        </div>

        <div className="order-stats">
          {["pending", "processing", "shipped", "delivered", "cancelled"].map((s) => (
            <div key={s} className={`order-stat-chip status-${s}`} onClick={() => setFilter(filter === s ? "" : s)}>
              {s}: {orders.filter((o) => o.status === s).length}
            </div>
          ))}
        </div>

        <table className="admin-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Items</th>
              <th>Total</th>
              <th>Status</th>
              <th>Update Status</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr><td colSpan={6} style={{ textAlign: "center", padding: "20px", color: "#888" }}>No orders found</td></tr>
            ) : (
              filtered.map((o) => (
                <tr key={o._id}>
                  <td>#{o._id.slice(-6).toUpperCase()}</td>
                  <td>{o.userId?.name || "N/A"}<br /><small>{o.userId?.email || ""}</small></td>
                  <td>{o.items?.length} item(s)</td>
                  <td>₹{o.totalAmount}</td>
                  <td><span className={`status status-${o.status}`}>{o.status}</span></td>
                  <td>
                    <select className="status-select" value={o.status} onChange={(e) => updateStatus(o._id, e.target.value)}>
                      {["pending", "processing", "shipped", "delivered", "cancelled"].map((s) => (
                        <option key={s}>{s}</option>
                      ))}
                    </select>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </main>
    </div>
  );
}
