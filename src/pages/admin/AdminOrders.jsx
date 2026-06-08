import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { apiFetch } from "../../context/api";

export default function AdminOrders() {
  const { token } = useAuth();
  const [orders, setOrders] = useState([]);

  const load = () => apiFetch("/orders", {}, token).then(setOrders);
  useEffect(() => { load(); }, []);

  const updateStatus = async (id, status) => {
    await apiFetch(`/orders/${id}`, { method: "PUT", body: JSON.stringify({ status }) }, token);
    load();
  };

  return (
    <main className="page-container">
      <h1>Manage Orders</h1>
      <table className="admin-table">
        <thead><tr><th>Order ID</th><th>Customer</th><th>Total</th><th>Status</th><th>Update</th></tr></thead>
        <tbody>
          {orders.map((o) => (
            <tr key={o._id}>
              <td>#{o._id.slice(-6).toUpperCase()}</td>
              <td>{o.userId?.name || "N/A"}</td>
              <td>₹{o.totalAmount}</td>
              <td><span className={`status status-${o.status}`}>{o.status}</span></td>
              <td>
                <select value={o.status} onChange={(e) => updateStatus(o._id, e.target.value)}>
                  {["pending", "processing", "shipped", "delivered", "cancelled"].map((s) => (
                    <option key={s}>{s}</option>
                  ))}
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}
