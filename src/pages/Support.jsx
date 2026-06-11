import { Link } from "react-router-dom";

export default function Support() {
  return (
    <main>
      <section className="page-hero" style={{ backgroundImage: "url(https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=1400&q=80)" }}>
        <div className="page-hero-overlay" />
        <div className="page-hero-content">
          <span className="section-tag">Help & Support</span>
          <h1>How Can We Help You?</h1>
          <p>Search our help center or browse topics below to get the answers you need.</p>
        </div>
      </section>

      <section className="section">
        <div className="support-topics">
          {[
            { icon: "📦", title: "Order Tracking", desc: "Track your current orders and view delivery status in real-time.", link: "/orders" },
            { icon: "↩️", title: "Returns & Refunds", desc: "Learn about our 7-day return policy and how to initiate a refund.", link: "/faq" },
            { icon: "🚚", title: "Shipping Info", desc: "Standard 3–5 days. Express 1–2 days. Free above ₹999.", link: "/faq" },
            { icon: "💳", title: "Payment Issues", desc: "Facing payment failure or charge issues? Get it resolved fast.", link: "/contact" },
            { icon: "👤", title: "Account Help", desc: "Reset password, update profile, or manage your account settings.", link: "/profile" },
            { icon: "🎟️", title: "Coupons & Offers", desc: "How to apply coupons, check validity, and find the best deals.", link: "/faq" },
          ].map((t) => (
            <Link key={t.title} to={t.link} className="support-topic-card">
              <span className="support-icon">{t.icon}</span>
              <h4>{t.title}</h4>
              <p>{t.desc}</p>
              <span className="topic-arrow">→</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="section section-gray">
        <div className="support-contact-row">
          <div className="support-contact-card">
            <img src="https://cdn-icons-png.flaticon.com/512/2111/2111629.png" alt="Email" />
            <h4>Email Support</h4>
            <p>Send us your query and we'll respond within 24 hours on business days.</p>
            <a href="mailto:support@trendify.com" className="btn-primary">support@trendify.com</a>
          </div>
          <div className="support-contact-card">
            <img src="https://cdn-icons-png.flaticon.com/512/597/597177.png" alt="Chat" />
            <h4>Live Chat</h4>
            <p>Chat with our support agents in real-time for immediate assistance.</p>
            <Link to="/contact" className="btn-primary">Start Chat</Link>
          </div>
          <div className="support-contact-card">
            <img src="https://cdn-icons-png.flaticon.com/512/724/724664.png" alt="FAQ" />
            <h4>Browse FAQs</h4>
            <p>Find instant answers to the most commonly asked questions.</p>
            <Link to="/faq" className="btn-primary">View FAQs</Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section-header-center">
          <h2>Our Policies at a Glance</h2>
        </div>
        <div className="policy-cards">
          {[
            { title: "Return Policy", img: "https://cdn-icons-png.flaticon.com/512/1041/1041728.png", points: ["Returns accepted within 7 days", "Items must be unused", "Refund in 5–7 business days", "Free return pickup available"] },
            { title: "Shipping Policy", img: "https://cdn-icons-png.flaticon.com/512/679/679821.png", points: ["Free shipping above ₹999", "Standard: 3–5 days", "Express: 1–2 days", "Track orders in real-time"] },
            { title: "Payment Policy", img: "https://cdn-icons-png.flaticon.com/512/196/196565.png", points: ["UPI, Cards, Net Banking", "100% secure & encrypted", "EMI options available", "No hidden charges"] },
          ].map((p) => (
            <div key={p.title} className="policy-card">
              <img src={p.img} alt={p.title} />
              <h4>{p.title}</h4>
              <ul>
                {p.points.map((pt) => <li key={pt}>✓ {pt}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
