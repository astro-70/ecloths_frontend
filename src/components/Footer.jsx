import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-grid">
        <div>
          <h3>Trendify</h3>
          <p>Your one-stop fashion destination for men, women, kids, and babies.</p>
        </div>
        <div>
          <h4>Quick Links</h4>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/support">Support</Link></li>
            <li><Link to="/contact">Contact Us</Link></li>
            <li><Link to="/faq">FAQ</Link></li>
            <li><Link to="/privacy-policy">Privacy Policy</Link></li>
            <li><Link to="/terms">Terms &amp; Conditions</Link></li>
          </ul>
        </div>
        <div>
          <h4>Account</h4>
          <ul>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/signup">Sign Up</Link></li>
            <li><Link to="/become-seller">Become a Seller</Link></li>
            <li><Link to="/products">Add a Product</Link></li>
          </ul>
        </div>
        <div>
          <h4>Contact</h4>
          <p>Email: support@trendify.com</p>
          <p>Built with ❤️ by your team</p>
        </div>
      </div>
      <p className="footer-bottom">© {new Date().getFullYear()} Trendify. All rights reserved.</p>
    </footer>
  );
}
