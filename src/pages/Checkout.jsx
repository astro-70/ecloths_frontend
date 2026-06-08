import { useState } from "react";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { apiFetch } from "../context/api";
import { useNavigate } from "react-router-dom";

export default function Checkout() {
  const { cart, total, clearCart } = useCart();
  const { user, token } = useAuth();
  const navigate = useNavigate();
  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState(0);
  const [address, setAddress] = useState({ street: "", city: "", state: "", zip: "", country: "" });
  const [msg, setMsg] = useState("");

  const applyCoupon = async () => {
    const data = await apiFetch(`/coupons/validate/${coupon}`);
    if (data.discount) {
      setDiscount(data.discount);
      setMsg(`Coupon applied! ₹${data.discount} off`);
    } else {
      setMsg(data.message || "Invalid coupon");
    }
  };

  const placeOrder = async () => {
    if (!user) return navigate("/login");
    const order = {
      userId: user.id,
      items: cart.map((i) => ({ productId: i._id, quantity: i.quantity, color: i.color, size: i.size, price: i.price })),
      totalAmount: total - discount,
      couponCode: coupon,
      discount,
      shippingAddress: address,
    };
    await apiFetch("/orders", { method: "POST", body: JSON.stringify(order) }, token);
    clearCart();
    navigate("/orders");
  };

  return (
    <main className="page-container">
      <h1>Checkout</h1>
      <div className="checkout-grid">
        <div className="checkout-address">
          <h3>Shipping Address</h3>
          {["street", "city", "state", "zip", "country"].map((field) => (
            <input
              key={field}
              placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
              value={address[field]}
              onChange={(e) => setAddress({ ...address, [field]: e.target.value })}
            />
          ))}
        </div>
        <div className="checkout-summary">
          <h3>Order Summary</h3>
          {cart.map((i, idx) => (
            <div key={idx} className="checkout-item">
              <span>{i.name}</span>
              <span>₹{i.price * i.quantity}</span>
            </div>
          ))}
          <div className="coupon-row">
            <input placeholder="Coupon code" value={coupon} onChange={(e) => setCoupon(e.target.value)} />
            <button onClick={applyCoupon}>Apply</button>
          </div>
          {msg && <p className="coupon-msg">{msg}</p>}
          <h3>Total: ₹{total - discount}</h3>
          <button className="btn-primary" onClick={placeOrder}>Place Order</button>
        </div>
      </div>
    </main>
  );
}
