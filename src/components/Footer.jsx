import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-brand">
          <h3>⚡ Trendify</h3>
          <p>Your one-stop fashion destination for men, women, kids, and babies. Style for every story.</p>
          <div className="footer-social">
            <a href="#">📘</a><a href="#">📸</a><a href="#">🐦</a><a href="#">▶️</a>
          </div>
        </div>
        <div>
          <h4>Shop</h4>
          <ul>
            <li><Link to="/products?category=men">Men</Link></li>
            <li><Link to="/products?category=women">Women</Link></li>
            <li><Link to="/products?category=kids">Kids</Link></li>
            <li><Link to="/products?category=baby">Baby</Link></li>
            <li><Link to="/products">All Products</Link></li>
          </ul>
        </div>
        <div>
          <h4>Company</h4>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/blog">Blog</Link></li>
            <li><Link to="/become-seller">Become a Seller</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>
        <div>
          <h4>Support</h4>
          <ul>
            <li><Link to="/support">Help Center</Link></li>
            <li><Link to="/faq">FAQ</Link></li>
            <li><Link to="/orders">Track Order</Link></li>
            <li><Link to="/privacy-policy">Privacy Policy</Link></li>
            <li><Link to="/terms">Terms & Conditions</Link></li>
          </ul>
        </div>
        <div>
          <h4>Contact</h4>
          <p>📧 support@trendify.com</p>
          <p>📍 KK Nagar, Coimbatore</p>
          <p>🕐 Mon–Sat: 9am – 7pm</p>
          <div className="footer-badges">
            <span>🔒 Secure</span>
            <span>🚚 Fast Delivery</span>
            <span>↩️ Easy Returns</span>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} Trendify. All rights reserved. Built with ❤️ in India.</p>
        <div className="footer-payments">
          <span>💳 Cards</span><span>📱 UPI</span><span>🏦 Net Banking</span>
        </div>
      </div>
    </footer>
  );
}
