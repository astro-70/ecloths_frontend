import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { apiFetch } from "../context/api";

export default function Orders() {
  const { user, token } = useAuth();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (user) apiFetch(`/orders/user/${user.id}`, {}, token).then(setOrders);
  }, [user]);

  if (!user) return <p className="page-container">Please login to view orders.</p>;

  return (
    <main className="page-container">
      <h1>My Orders</h1>
      {orders.length === 0 ? (
        <p>No orders yet.</p>
      ) : (
        orders.map((order) => (
          <div key={order._id} className="order-card">
            <div className="order-header">
              <span>Order #{order._id.slice(-6).toUpperCase()}</span>
              <span className={`status status-${order.status}`}>{order.status}</span>
            </div>
            {order.items.map((item, i) => (
              <div key={i} className="order-item">
                <span>{item.productId?.name || "Product"}</span>
                <span>Qty: {item.quantity}</span>
                <span>₹{item.price}</span>
              </div>
            ))}
            <p>Total: ₹{order.totalAmount}</p>
          </div>
        ))
      )}
    </main>
  );
}
