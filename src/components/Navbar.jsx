import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import { useState } from "react";

export default function Navbar() {
  const { user, logout } = useAuth();
  const { cart } = useCart();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => { logout(); navigate("/login"); };
  const isActive = (path) => pathname === path ? "active-link" : "";

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand">⚡ Trendify</Link>
      <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>☰</button>
      <ul className={`nav-links ${menuOpen ? "open" : ""}`}>
        <li><Link to="/" className={isActive("/")}>Home</Link></li>
        <li><Link to="/products" className={isActive("/products")}>Shop</Link></li>
        <li><Link to="/about" className={isActive("/about")}>About</Link></li>
        <li><Link to="/blog" className={isActive("/blog")}>Blog</Link></li>
        <li><Link to="/support" className={isActive("/support")}>Support</Link></li>
        <li><Link to="/contact" className={isActive("/contact")}>Contact</Link></li>
      </ul>
      <div className="nav-actions">
        <Link to="/wishlist" title="Wishlist" className="nav-icon">♡</Link>
        <Link to="/cart" className="cart-icon nav-icon">
          🛒 {cart.length > 0 && <span className="cart-count">{cart.length}</span>}
        </Link>
        {user ? (
          <div className="account-dropdown">
            <span className="account-btn">
              <span className="nav-avatar">{user.name.charAt(0).toUpperCase()}</span>
              {user.name.split(" ")[0]} ▾
            </span>
            <div className="dropdown-menu">
              <Link to="/profile">👤 Profile</Link>
              <Link to="/orders">📦 My Orders</Link>
              <Link to="/wishlist">♡ Wishlist</Link>
              {user.isAdmin && <Link to="/admin">⚡ Admin Panel</Link>}
              <button onClick={handleLogout}>🚪 Logout</button>
            </div>
          </div>
        ) : (
          <>
            <Link to="/login" className="nav-login">Login</Link>
            <Link to="/signup" className="btn-primary">Sign Up</Link>
          </>
        )}
      </div>
    </nav>
  );
}
