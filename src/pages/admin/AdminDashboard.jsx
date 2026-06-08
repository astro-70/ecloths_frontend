import { useAuth } from "../../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { apiFetch } from "../../context/api";

export default function AdminDashboard() {
  const { user, token } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState({ products: 0, orders: 0, users: 0, coupons: 0, revenue: 0 });
  const [recentOrders, setRecentOrders] = useState([]);

  useEffect(() => {
    if (!user?.isAdmin) navigate("/login");
  }, [user]);

  useEffect(() => {
    const load = async () => {
      const [products, orders, users, coupons] = await Promise.all([
        apiFetch("/products"),
        apiFetch("/orders", {}, token),
        apiFetch("/users", {}, token),
        apiFetch("/coupons"),
      ]);
      const revenue = Array.isArray(orders)
        ? orders.reduce((sum, o) => sum + (o.totalAmount || 0), 0)
        : 0;
      setStats({
        products: Array.isArray(products) ? products.length : 0,
        orders: Array.isArray(orders) ? orders.length : 0,
        users: Array.isArray(users) ? users.length : 0,
        coupons: Array.isArray(coupons) ? coupons.length : 0,
        revenue,
      });
      setRecentOrders(Array.isArray(orders) ? orders.slice(0, 5) : []);
    };
    if (user?.isAdmin) load();
  }, [user, token]);

  const cards = [
    { label: "Total Products", value: stats.products, icon: "📦", color: "#4361ee", link: "/admin/products" },
    { label: "Total Orders", value: stats.orders, icon: "🧾", color: "#f72585", link: "/admin/orders" },
    { label: "Total Users", value: stats.users, icon: "👤", color: "#4cc9f0", link: "/admin/users" },
    { label: "Active Coupons", value: stats.coupons, icon: "🎟️", color: "#7209b7", link: "/admin/coupons" },
    { label: "Total Revenue", value: `₹${stats.revenue.toLocaleString()}`, icon: "💰", color: "#06d6a0", link: "/admin/orders" },
  ];

  return (
    <div className="admin-layout">
      <aside className="admin-sidebar">
        <div className="sidebar-brand">⚡ Trendify Admin</div>
        <nav className="sidebar-nav">
          <Link to="/admin" className="sidebar-link active">🏠 Dashboard</Link>
          <Link to="/admin/products" className="sidebar-link">📦 Products</Link>
          <Link to="/admin/orders" className="sidebar-link">🧾 Orders</Link>
          <Link to="/admin/users" className="sidebar-link">👤 Users</Link>
          <Link to="/admin/coupons" className="sidebar-link">🎟️ Coupons</Link>
          <Link to="/" className="sidebar-link">🛍️ View Store</Link>
        </nav>
      </aside>

      <main className="admin-main">
        <div className="admin-header">
          <div>
            <h1>Dashboard</h1>
            <p>Welcome back, <strong>{user?.name}</strong> 👋</p>
          </div>
        </div>

        <div className="stats-grid">
          {cards.map((c) => (
            <Link to={c.link} key={c.label} className="stat-card" style={{ borderTop: `4px solid ${c.color}` }}>
              <div className="stat-icon" style={{ background: c.color + "20", color: c.color }}>{c.icon}</div>
              <div>
                <p className="stat-label">{c.label}</p>
                <h2 className="stat-value">{c.value}</h2>
              </div>
            </Link>
          ))}
        </div>

        <div className="admin-section">
          <div className="section-header">
            <h2>Recent Orders</h2>
            <Link to="/admin/orders" className="view-all">View All →</Link>
          </div>
          <table className="admin-table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Amount</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.length === 0 ? (
                <tr><td colSpan={4} style={{ textAlign: "center", padding: "20px", color: "#888" }}>No orders yet</td></tr>
              ) : (
                recentOrders.map((o) => (
                  <tr key={o._id}>
                    <td>#{o._id.slice(-6).toUpperCase()}</td>
                    <td>{o.userId?.name || "N/A"}</td>
                    <td>₹{o.totalAmount}</td>
                    <td><span className={`status status-${o.status}`}>{o.status}</span></td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="quick-links">
          <Link to="/admin/products" className="quick-card">
            <span>📦</span>
            <p>Add Product</p>
          </Link>
          <Link to="/admin/coupons" className="quick-card">
            <span>🎟️</span>
            <p>Add Coupon</p>
          </Link>
          <Link to="/admin/orders" className="quick-card">
            <span>🧾</span>
            <p>Manage Orders</p>
          </Link>
          <Link to="/admin/users" className="quick-card">
            <span>👤</span>
            <p>Manage Users</p>
          </Link>
        </div>
      </main>
    </div>
  );
}
