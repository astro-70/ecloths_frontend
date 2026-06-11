import { Link } from "react-router-dom";

const benefits = [
  { icon: "🌍", title: "Reach Millions", desc: "Access Trendify's growing base of 50,000+ active fashion shoppers across India." },
  { icon: "💰", title: "Zero Listing Fees", desc: "List unlimited products for free. We only earn when you earn — no hidden charges." },
  { icon: "📊", title: "Seller Dashboard", desc: "Track your sales, manage inventory, and view analytics all from one powerful dashboard." },
  { icon: "🚚", title: "Fulfillment Support", desc: "Use our logistics partners for fast, reliable delivery at negotiated rates." },
  { icon: "🎯", title: "Marketing Tools", desc: "Get featured in our campaigns, flash sales, and homepage banners to boost visibility." },
  { icon: "🤝", title: "Dedicated Support", desc: "Every seller gets a dedicated account manager to help you grow faster." },
];

const steps = [
  { step: "01", title: "Create Account", desc: "Sign up as a seller on Trendify in under 5 minutes." },
  { step: "02", title: "List Products", desc: "Upload your products with images, descriptions, and pricing." },
  { step: "03", title: "Start Selling", desc: "Go live immediately and start receiving orders from day one." },
  { step: "04", title: "Get Paid", desc: "Receive weekly payouts directly to your bank account." },
];

export default function BecomeSeller() {
  return (
    <main>
      <section className="page-hero" style={{ backgroundImage: "url(https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1400&q=80)" }}>
        <div className="page-hero-overlay" />
        <div className="page-hero-content">
          <span className="section-tag">Seller Program</span>
          <h1>Grow Your Fashion Business with Trendify</h1>
          <p>Join 5,000+ sellers already reaching millions of customers across India.</p>
          <Link to="#apply" className="btn-primary">Apply Now — It's Free</Link>
        </div>
      </section>

      <section className="section section-gray">
        <div className="section-header-center">
          <span className="section-tag">Why Sell Here</span>
          <h2>Everything You Need to Succeed</h2>
        </div>
        <div className="why-grid">
          {benefits.map((b) => (
            <div key={b.title} className="why-card">
              <span style={{ fontSize: 36 }}>{b.icon}</span>
              <h4>{b.title}</h4>
              <p>{b.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="section-header-center">
          <span className="section-tag">Process</span>
          <h2>How It Works</h2>
          <p>Start selling in just 4 simple steps</p>
        </div>
        <div className="how-steps">
          {steps.map((s) => (
            <div key={s.step} className="how-step">
              <div className="step-number">{s.step}</div>
              <h4>{s.title}</h4>
              <p>{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section section-gray" id="apply">
        <div className="seller-form-layout">
          <div className="seller-form-info">
            <h2>Ready to Start Selling?</h2>
            <p>Fill in your details and our team will get in touch within 48 hours to complete your onboarding.</p>
            <img src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=500&q=80" alt="Selling" />
          </div>
          <form className="seller-form" onSubmit={(e) => e.preventDefault()}>
            <h3>Seller Application</h3>
            <label>Business / Brand Name</label>
            <input placeholder="Your brand name" required />
            <label>Contact Email</label>
            <input type="email" placeholder="business@email.com" required />
            <label>Phone Number</label>
            <input type="tel" placeholder="+91 98765 43210" required />
            <label>Category</label>
            <select required>
              <option value="">Select category</option>
              <option>Men's Fashion</option>
              <option>Women's Fashion</option>
              <option>Kids Clothing</option>
              <option>Baby Clothing</option>
              <option>All Categories</option>
            </select>
            <label>Tell us about your products</label>
            <textarea rows={4} placeholder="Describe your products, quality, and what makes your brand unique..." required />
            <button type="submit" className="btn-primary btn-full">Submit Application →</button>
          </form>
        </div>
      </section>
    </main>
  );
}
