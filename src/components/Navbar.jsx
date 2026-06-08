import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import { useState } from "react";

export default function Navbar() {
  const { user, logout } = useAuth();
  const { cart } = useCart();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand">Trendify</Link>

      <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>☰</button>

      <ul className={`nav-links ${menuOpen ? "open" : ""}`}>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/products">Shop</Link></li>
        <li><Link to="/about">About Us</Link></li>
        <li><Link to="/support">Support</Link></li>
        <li><Link to="/contact">Contact</Link></li>
        <li><Link to="/faq">FAQ</Link></li>
      </ul>

      <div className="nav-actions">
        <Link to="/wishlist">♡</Link>
        <Link to="/cart" className="cart-icon">
          🛒 {cart.length > 0 && <span className="cart-count">{cart.length}</span>}
        </Link>
        {user ? (
          <div className="account-dropdown">
            <span className="account-btn">{user.name} ▾</span>
            <div className="dropdown-menu">
              <Link to="/profile">Profile</Link>
              <Link to="/orders">My Orders</Link>
              {user.isAdmin && <Link to="/admin">Admin Panel</Link>}
              <button onClick={handleLogout}>Logout</button>
            </div>
          </div>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/signup" className="btn-primary">Sign Up</Link>
          </>
        )}
      </div>
    </nav>
  );
}
