import { Link } from "react-router-dom";

export default function Home() {
  const categories = ["men", "women", "kids", "baby"];
  return (
    <main>
      <section className="hero">
        <div className="hero-content">
          <h1>Welcome to Trendify</h1>
          <p>Discover the latest fashion trends for everyone in the family.</p>
          <Link to="/products" className="btn-primary">Shop Now</Link>
        </div>
      </section>

      <section className="categories-section">
        <h2>Shop by Category</h2>
        <div className="categories-grid">
          {categories.map((cat) => (
            <Link key={cat} to={`/products?category=${cat}`} className="category-card">
              <div className="category-img">{cat.charAt(0).toUpperCase() + cat.slice(1)}</div>
              <span>{cat.charAt(0).toUpperCase() + cat.slice(1)}</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="features-section">
        <div className="feature">🚚 Free Shipping over ₹999</div>
        <div className="feature">↩️ Easy Returns</div>
        <div className="feature">🔒 Secure Payments</div>
        <div className="feature">🎁 Exclusive Offers</div>
      </section>

      <section className="cta-section">
        <h2>Sell on Trendify</h2>
        <p>Join thousands of sellers growing their fashion business.</p>
        <Link to="/become-seller" className="btn-secondary">Become a Seller</Link>
      </section>
    </main>
  );
}
