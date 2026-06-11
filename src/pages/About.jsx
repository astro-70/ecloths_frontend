import { Link } from "react-router-dom";

const team = [
  { name: "Meha Nathan", role: "Founder & CEO", img: "https://i.pravatar.cc/200?img=47", bio: "Passionate about making fashion accessible to everyone across India." },
  { name: "Arjun Raj", role: "Head of Design", img: "https://i.pravatar.cc/200?img=12", bio: "10 years of fashion design experience. Curates every collection personally." },
  { name: "Sana Priya", role: "Customer Experience", img: "https://i.pravatar.cc/200?img=32", bio: "Ensures every Trendify customer has a 5-star shopping experience." },
];

const milestones = [
  { year: "2021", event: "Trendify was founded with just 50 products and a dream." },
  { year: "2022", event: "Crossed 10,000 orders and launched the Kids & Baby collections." },
  { year: "2023", event: "Onboarded 1,000+ sellers and launched the Seller Marketplace." },
  { year: "2024", event: "Reached 50,000 happy customers across 20+ Indian cities." },
  { year: "2025", event: "Launched the Trendify mobile app and international shipping." },
];

export default function About() {
  return (
    <main>
      {/* HERO */}
      <section className="page-hero" style={{ backgroundImage: "url(https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1400&q=80)" }}>
        <div className="page-hero-overlay" />
        <div className="page-hero-content">
          <span className="section-tag">Our Story</span>
          <h1>About Trendify</h1>
          <p>We started with a simple belief — fashion should be affordable, accessible, and fun for everyone.</p>
        </div>
      </section>

      {/* MISSION */}
      <section className="section">
        <div className="about-mission">
          <div className="about-mission-text">
            <span className="section-tag">Our Mission</span>
            <h2>Dressing India, One Family at a Time</h2>
            <p>Trendify was born out of a frustration with overpriced fashion and poor-quality clothing flooding the Indian market. We set out to build a platform that connects the best fashion brands and independent sellers directly with customers — cutting out the middleman and passing the savings to you.</p>
            <p>From premium cotton Oxford shirts for men, to elegant floral wrap dresses for women, fun dinosaur tees for kids, and ultra-soft onesies for babies — Trendify is the one destination that dresses your entire family with style and love.</p>
            <div className="about-stats">
              <div><h3>50K+</h3><p>Happy Customers</p></div>
              <div><h3>5K+</h3><p>Active Sellers</p></div>
              <div><h3>1M+</h3><p>Items Sold</p></div>
              <div><h3>4.8★</h3><p>Average Rating</p></div>
            </div>
          </div>
          <div className="about-mission-img">
            <img src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=700&q=80" alt="About Trendify" />
          </div>
        </div>
      </section>

      {/* VALUES */}
      <section className="section section-gray">
        <div className="section-header-center">
          <span className="section-tag">Our Values</span>
          <h2>What We Stand For</h2>
        </div>
        <div className="values-grid">
          {[
            { icon: "https://cdn-icons-png.flaticon.com/512/2583/2583434.png", title: "Quality First", desc: "Every product listed on Trendify passes our strict quality check. We never compromise on the material, stitching, or finish." },
            { icon: "https://cdn-icons-png.flaticon.com/512/3068/3068883.png", title: "Customer Obsession", desc: "We read every review, respond to every query, and make every decision with our customers' happiness in mind." },
            { icon: "https://cdn-icons-png.flaticon.com/512/2942/2942813.png", title: "Sustainability", desc: "We partner with eco-conscious brands and encourage the use of organic fabrics and sustainable packaging." },
            { icon: "https://cdn-icons-png.flaticon.com/512/1682/1682923.png", title: "Inclusivity", desc: "Fashion is for everybody. We offer sizes from XS to 5XL and styles for every age, shape, and taste." },
          ].map((v) => (
            <div key={v.title} className="value-card">
              <img src={v.icon} alt={v.title} />
              <h4>{v.title}</h4>
              <p>{v.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* TIMELINE */}
      <section className="section">
        <div className="section-header-center">
          <span className="section-tag">Journey</span>
          <h2>Our Milestones</h2>
        </div>
        <div className="timeline">
          {milestones.map((m, i) => (
            <div key={m.year} className={`timeline-item ${i % 2 === 0 ? "left" : "right"}`}>
              <div className="timeline-year">{m.year}</div>
              <div className="timeline-content">{m.event}</div>
            </div>
          ))}
        </div>
      </section>

      {/* TEAM */}
      <section className="section section-gray">
        <div className="section-header-center">
          <span className="section-tag">People</span>
          <h2>Meet the Team</h2>
          <p>The passionate people behind Trendify</p>
        </div>
        <div className="team-grid">
          {team.map((t) => (
            <div key={t.name} className="team-card">
              <img src={t.img} alt={t.name} />
              <h4>{t.name}</h4>
              <span>{t.role}</span>
              <p>{t.bio}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="about-cta">
        <h2>Ready to explore Trendify?</h2>
        <p>Shop thousands of styles or become a seller and grow your fashion brand with us.</p>
        <div className="hero-btns">
          <Link to="/products" className="btn-primary">Shop Now</Link>
          <Link to="/become-seller" className="btn-outline">Become a Seller</Link>
        </div>
      </section>
    </main>
  );
}
