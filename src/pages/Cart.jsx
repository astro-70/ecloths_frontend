import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";

export default function Cart() {
  const { cart, removeFromCart, total } = useCart();

  if (cart.length === 0)
    return (
      <main className="page-container">
        <h1>Your Cart</h1>
        <p>Your cart is empty. <Link to="/products">Shop now</Link></p>
      </main>
    );

  return (
    <main className="page-container">
      <h1>Your Cart</h1>
      <div className="cart-list">
        {cart.map((item, i) => (
          <div key={i} className="cart-item">
            <img src={item.images?.[0] || "/placeholder.jpg"} alt={item.name} />
            <div>
              <h3>{item.name}</h3>
              <p>{item.color} | {item.size}</p>
              <p>₹{item.price} × {item.quantity}</p>
            </div>
            <button onClick={() => removeFromCart(item._id)}>Remove</button>
          </div>
        ))}
      </div>
      <div className="cart-summary">
        <h3>Total: ₹{total}</h3>
        <Link to="/checkout" className="btn-primary">Proceed to Checkout</Link>
      </div>
    </main>
  );
}
