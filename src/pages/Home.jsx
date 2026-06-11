import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { apiFetch } from "../context/api";
import ProductCard from "../components/ProductCard";

const heroSlides = [
  {
    img: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=1400&q=80",
    tag: "New Arrivals 2025",
    title: "Dress to Impress Every Single Day",
    sub: "Discover handpicked fashion for men, women, kids & babies.",
    link: "/products",
    btn: "Shop New Arrivals",
  },
  {
    img: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1400&q=80",
    tag: "Women's Collection",
    title: "Effortless Style for Every Occasion",
    sub: "From casual daywear to elegant evening looks — all in one place.",
    link: "/products?category=women",
    btn: "Shop Women",
  },
  {
    img: "https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=1400&q=80",
    tag: "Men's Essentials",
    title: "Bold. Sharp. Confident.",
    sub: "Upgrade your wardrobe with premium menswear built for modern life.",
    link: "/products?category=men",
    btn: "Shop Men",
  },
];

const categories = [
  { name: "Men", slug: "men", img: "https://images.unsplash.com/photo-1516257984-b1b4d707412e?w=600&q=80", desc: "Shirts, Pants, Jackets & More" },
  { name: "Women", slug: "women", img: "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=600&q=80", desc: "Dresses, Tops, Skirts & More" },
  { name: "Kids", slug: "kids", img: "https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?w=600&q=80", desc: "Playful & Comfy Styles" },
  { name: "Baby", slug: "baby", img: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=600&q=80", desc: "Soft & Safe Baby Clothing" },
];

const testimonials = [
  { name: "Priya S.", city: "Chennai", text: "Amazing quality! The fabric feels premium and delivery was super fast. I ordered 3 dresses and all fit perfectly.", stars: 5, img: "https://i.pravatar.cc/60?img=47" },
  { name: "Rahul M.", city: "Bangalore", text: "Best online fashion store I've tried. The men's collection is on point — slim fit shirts that actually look sharp.", stars: 5, img: "https://i.pravatar.cc/60?img=12" },
  { name: "Ananya K.", city: "Mumbai", text: "Ordered kids' clothes and they loved it! Trendify has such cute designs. Will definitely order again.", stars: 5, img: "https://i.pravatar.cc/60?img=32" },
  { name: "Vikram T.", city: "Delhi", text: "Coupon codes work great, saved ₹200 on my first order. The checkout process is smooth and quick.", stars: 4, img: "https://i.pravatar.cc/60?img=68" },
];

const brands = [
  "https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/Adidas_Logo.svg/200px-Adidas_Logo.svg.png",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/200px-Amazon_logo.svg.png",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/Logo_NIKE.svg/200px-Logo_NIKE.svg.png",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/H%26M-Logo.svg/200px-H%26M-Logo.svg.png",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/Zara_Logo.svg/200px-Zara_Logo.svg.png",
];

export default function Home() {
  const [slide, setSlide] = useState(0);
  const [featured, setFeatured] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setInterval(() => setSlide((s) => (s + 1) % heroSlides.length), 5000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    apiFetch("/products").then((data) => {
      if (Array.isArray(data)) setFeatured(data.slice(0, 8));
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  const s = heroSlides[slide];

  return (
    <main className="home">

      {/* HERO SLIDER */}
      <section className="hero-slider" style={{ backgroundImage: `url(${s.img})` }}>
        <div className="hero-overlay" />
        <div className="hero-content">
          <span className="hero-tag">{s.tag}</span>
          <h1>{s.title}</h1>
          <p>{s.sub}</p>
          <div className="hero-btns">
            <Link to={s.link} className="btn-primary">{s.btn}</Link>
            <Link to="/about" className="btn-outline">Our Story</Link>
          </div>
        </div>
        <div className="hero-dots">
          {heroSlides.map((_, i) => (
            <button key={i} className={`dot ${i === slide ? "active" : ""}`} onClick={() => setSlide(i)} />
          ))}
        </div>
      </section>

      {/* ANNOUNCEMENT BAR */}
      <div className="announcement-bar">
        <span>🔥 Use code <strong>TREND10</strong> for ₹10 off</span>
        <span>🚚 Free shipping on orders above ₹999</span>
        <span>↩️ Easy 7-day returns</span>
        <span>🎁 New arrivals every week</span>
      </div>

      {/* CATEGORIES */}
      <section className="section">
        <div className="section-header-center">
          <span className="section-tag">Collections</span>
          <h2>Shop by Category</h2>
          <p>Find the perfect style for every member of your family</p>
        </div>
        <div className="cat-grid">
          {categories.map((c) => (
            <Link key={c.slug} to={`/products?category=${c.slug}`} className="cat-card">
              <img src={c.img} alt={c.name} loading="lazy" />
              <div className="cat-overlay">
                <h3>{c.name}</h3>
                <p>{c.desc}</p>
                <span className="cat-btn">Explore →</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* FEATURED PRODUCTS */}
      <section className="section section-gray">
        <div className="section-header-center">
          <span className="section-tag">Trending Now</span>
          <h2>Featured Products</h2>
          <p>Handpicked styles that are flying off the shelves</p>
        </div>
        {loading ? (
          <div className="loading-grid">
            {[...Array(8)].map((_, i) => <div key={i} className="skeleton-card" />)}
          </div>
        ) : (
          <div className="products-grid">
            {featured.map((p) => <ProductCard key={p._id} product={p} />)}
          </div>
        )}
        <div className="center-btn">
          <Link to="/products" className="btn-primary">View All Products</Link>
        </div>
      </section>

      {/* BANNER SPLIT */}
      <section className="banner-split">
        <div className="banner-card" style={{ backgroundImage: "url(https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&q=80)" }}>
          <div className="banner-overlay" />
          <div className="banner-content">
            <span>New Season</span>
            <h3>Women's Collection</h3>
            <Link to="/products?category=women" className="btn-white">Shop Now →</Link>
          </div>
        </div>
        <div className="banner-card" style={{ backgroundImage: "url(https://images.unsplash.com/photo-1617137968427-85924c800a22?w=800&q=80)" }}>
          <div className="banner-overlay" />
          <div className="banner-content">
            <span>Fresh Styles</span>
            <h3>Men's Essentials</h3>
            <Link to="/products?category=men" className="btn-white">Shop Now →</Link>
          </div>
        </div>
      </section>

      {/* WHY TRENDIFY */}
      <section className="section">
        <div className="section-header-center">
          <span className="section-tag">Why Us</span>
          <h2>Why Choose Trendify?</h2>
        </div>
        <div className="why-grid">
          {[
            { icon: "https://cdn-icons-png.flaticon.com/512/679/679821.png", title: "Premium Quality", desc: "Every product is carefully curated for quality, comfort, and durability." },
            { icon: "https://cdn-icons-png.flaticon.com/512/1278/1278352.png", title: "Fast Delivery", desc: "Get your orders delivered in 3–5 business days, right to your doorstep." },
            { icon: "https://cdn-icons-png.flaticon.com/512/1041/1041728.png", title: "Easy Returns", desc: "Not happy? Return any item within 7 days for a full refund — no questions asked." },
            { icon: "https://cdn-icons-png.flaticon.com/512/196/196565.png", title: "Secure Payments", desc: "Shop with confidence using our fully encrypted and secure payment gateway." },
            { icon: "https://cdn-icons-png.flaticon.com/512/1041/1041916.png", title: "Exclusive Deals", desc: "Members get access to exclusive coupon codes, early sales, and flash offers." },
            { icon: "https://cdn-icons-png.flaticon.com/512/597/597177.png", title: "24/7 Support", desc: "Our customer support team is always ready to help you, any time of day." },
          ].map((w) => (
            <div key={w.title} className="why-card">
              <img src={w.icon} alt={w.title} />
              <h4>{w.title}</h4>
              <p>{w.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* OFFER BANNER */}
      <section className="offer-banner">
        <div className="offer-text">
          <h2>Up to 50% Off — Limited Time Only!</h2>
          <p>Use code <strong>STYLE50</strong> at checkout. Valid on selected items.</p>
          <Link to="/products" className="btn-primary">Grab the Deal</Link>
        </div>
        <img src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=600&q=80" alt="Sale" />
      </section>

      {/* TESTIMONIALS */}
      <section className="section section-gray">
        <div className="section-header-center">
          <span className="section-tag">Reviews</span>
          <h2>What Our Customers Say</h2>
          <p>Thousands of happy shoppers trust Trendify every day</p>
        </div>
        <div className="testimonials-grid">
          {testimonials.map((t) => (
            <div key={t.name} className="testimonial-card">
              <div className="stars">{"★".repeat(t.stars)}{"☆".repeat(5 - t.stars)}</div>
              <p>"{t.text}"</p>
              <div className="reviewer">
                <img src={t.img} alt={t.name} />
                <div>
                  <strong>{t.name}</strong>
                  <span>{t.city}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* BRANDS */}
      <section className="section brands-section">
        <div className="section-header-center">
          <span className="section-tag">Partners</span>
          <h2>Brands We Carry</h2>
        </div>
        <div className="brands-row">
          {brands.map((b, i) => (
            <div key={i} className="brand-logo">
              <img src={b} alt={`brand-${i}`} loading="lazy" />
            </div>
          ))}
        </div>
      </section>

      {/* BECOME SELLER CTA */}
      <section className="seller-cta">
        <div className="seller-cta-content">
          <h2>Start Selling on Trendify Today</h2>
          <p>Join over 5,000 sellers who grow their fashion business on our platform. Easy setup, no hidden fees.</p>
          <div className="seller-stats">
            <div><h3>5K+</h3><p>Active Sellers</p></div>
            <div><h3>50K+</h3><p>Happy Customers</p></div>
            <div><h3>1M+</h3><p>Products Sold</p></div>
          </div>
          <Link to="/become-seller" className="btn-primary">Become a Seller</Link>
        </div>
        <img src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&q=80" alt="Seller" />
      </section>

      {/* NEWSLETTER */}
      <section className="newsletter">
        <h2>Stay in Style — Subscribe to Our Newsletter</h2>
        <p>Get exclusive deals, new arrivals, and fashion tips delivered straight to your inbox.</p>
        <form className="newsletter-form" onSubmit={(e) => e.preventDefault()}>
          <input type="email" placeholder="Enter your email address" required />
          <button type="submit" className="btn-primary">Subscribe</button>
        </form>
      </section>
    </main>
  );
}
