import { useAuth } from "../../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function AdminDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user?.isAdmin) navigate("/login");
  }, [user]);

  return (
    <main className="page-container">
      <h1>Admin Dashboard</h1>
      <p>Welcome back, {user?.name}</p>
      <div className="admin-grid">
        <Link to="/admin/products" className="admin-card">📦 Manage Products</Link>
        <Link to="/admin/orders" className="admin-card">🧾 Manage Orders</Link>
        <Link to="/admin/users" className="admin-card">👤 Manage Users</Link>
        <Link to="/admin/coupons" className="admin-card">🎟️ Manage Coupons</Link>
      </div>
    </main>
  );
}
