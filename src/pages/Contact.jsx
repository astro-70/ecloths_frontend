import { useState } from "react";
import { Link } from "react-router-dom";

export default function Contact() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <main>
      <section className="page-hero" style={{ backgroundImage: "url(https://images.unsplash.com/photo-1423666639041-f56000c27a9a?w=1400&q=80)" }}>
        <div className="page-hero-overlay" />
        <div className="page-hero-content">
          <span className="section-tag">Get in Touch</span>
          <h1>Contact Us</h1>
          <p>We'd love to hear from you. Our team is always ready to help.</p>
        </div>
      </section>

      <section className="section">
        <div className="contact-layout">
          <div className="contact-info">
            <h2>Let's Talk</h2>
            <p>Whether you have a question about your order, need help with returns, or just want to say hello — we're here for you.</p>
            <div className="contact-details">
              <div className="contact-detail-item">
                <span>📧</span>
                <div>
                  <h4>Email</h4>
                  <p>support@trendify.com</p>
                  <small>We respond within 24 hours</small>
                </div>
              </div>
              <div className="contact-detail-item">
                <span>📍</span>
                <div>
                  <h4>Address</h4>
                  <p>KK Nagar, Coimbatore</p>
                  <small>Tamil Nadu, India — 641035</small>
                </div>
              </div>
              <div className="contact-detail-item">
                <span>🕐</span>
                <div>
                  <h4>Business Hours</h4>
                  <p>Mon – Sat: 9am – 7pm IST</p>
                  <small>Sunday: 10am – 4pm IST</small>
                </div>
              </div>
            </div>
            <div className="contact-social">
              <h4>Follow Us</h4>
              <div className="social-icons">
                <a href="#" className="social-btn">📘 Facebook</a>
                <a href="#" className="social-btn">📸 Instagram</a>
                <a href="#" className="social-btn">🐦 Twitter</a>
              </div>
            </div>
          </div>

          <div className="contact-form-box">
            {sent ? (
              <div className="contact-success">
                <span>✅</span>
                <h3>Message Sent!</h3>
                <p>Thank you for reaching out. We'll get back to you within 24 hours.</p>
                <button className="btn-primary" onClick={() => setSent(false)}>Send Another</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <h3>Send a Message</h3>
                <div className="contact-form-row">
                  <div>
                    <label>Full Name</label>
                    <input placeholder="Your name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
                  </div>
                  <div>
                    <label>Email</label>
                    <input type="email" placeholder="you@example.com" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
                  </div>
                </div>
                <label>Subject</label>
                <select value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} required>
                  <option value="">Select a topic</option>
                  <option>Order Issue</option>
                  <option>Return / Refund</option>
                  <option>Payment Problem</option>
                  <option>Product Inquiry</option>
                  <option>Seller Support</option>
                  <option>Other</option>
                </select>
                <label>Message</label>
                <textarea placeholder="Describe your issue or question in detail..." rows={5} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} required />
                <button type="submit" className="btn-primary btn-full">Send Message →</button>
              </form>
            )}
          </div>
        </div>
      </section>

      <section className="map-section">
        <iframe
          title="Trendify Location"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3916.265!2d76.9558!3d11.0168!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zS0sgTmFnYXIsIENvaW1iYXRvcmU!5e0!3m2!1sen!2sin!4v1"
          width="100%" height="350" style={{ border: 0 }} allowFullScreen loading="lazy"
        />
      </section>
    </main>
  );
}
