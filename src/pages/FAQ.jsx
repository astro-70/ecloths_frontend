import { useState } from "react";
import { Link } from "react-router-dom";

const faqs = [
  { q: "How do I track my order?", a: "Once logged in, go to My Account → My Orders. Each order shows its current status: Pending, Processing, Shipped, or Delivered. You'll also receive email updates at each stage." },
  { q: "What is the return & refund policy?", a: "We accept returns within 7 days of delivery. Items must be unused and in original packaging. Once we receive the item, the refund is processed within 5–7 business days to your original payment method." },
  { q: "How long does delivery take?", a: "Standard delivery takes 3–5 business days. Express delivery (available at checkout) delivers in 1–2 business days. Free standard shipping on all orders above ₹999." },
  { q: "Can I apply multiple coupon codes?", a: "Only one coupon code can be applied per order. We recommend using the highest-value code available. New users can use TREND10 for ₹10 off their first order." },
  { q: "How do I change or cancel my order?", a: "Orders can be cancelled within 2 hours of placement. Go to My Orders and click Cancel. After 2 hours, the order may already be packed and cannot be cancelled, but you can return it post-delivery." },
  { q: "Are the product sizes accurate?", a: "Yes. Each product has a detailed size chart available on the product detail page. We recommend checking the size chart before ordering, especially for kids' clothing." },
  { q: "Is my payment information secure?", a: "Absolutely. All payments are processed through encrypted, PCI-DSS compliant gateways. We never store your card details on our servers." },
  { q: "How do I become a seller on Trendify?", a: "Visit the Become a Seller page, fill in your business details, and our team will review your application within 48 hours. Once approved, you can start listing your products." },
  { q: "Do you ship internationally?", a: "Currently we ship across India. International shipping is coming soon in 2025. Subscribe to our newsletter to get notified when it launches." },
  { q: "How do I contact customer support?", a: "You can reach us via email at support@trendify.com, through the Contact page, or via live chat on our website. We respond within 24 hours on business days." },
];

export default function FAQ() {
  const [open, setOpen] = useState(null);
  return (
    <main>
      <section className="page-hero" style={{ backgroundImage: "url(https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1400&q=80)" }}>
        <div className="page-hero-overlay" />
        <div className="page-hero-content">
          <span className="section-tag">Help Center</span>
          <h1>Frequently Asked Questions</h1>
          <p>Find answers to the most common questions about shopping on Trendify.</p>
        </div>
      </section>

      <section className="section">
        <div className="faq-layout">
          <div className="faq-sidebar">
            <h4>Quick Links</h4>
            <ul>
              <li><Link to="/support">Support Center</Link></li>
              <li><Link to="/contact">Contact Us</Link></li>
              <li><Link to="/orders">Track Order</Link></li>
              <li><Link to="/become-seller">Become a Seller</Link></li>
            </ul>
          </div>
          <div className="faq-list">
            {faqs.map((f, i) => (
              <div key={i} className={`faq-accordion ${open === i ? "open" : ""}`} onClick={() => setOpen(open === i ? null : i)}>
                <div className="faq-question">
                  <span>{f.q}</span>
                  <span className="faq-arrow">{open === i ? "▲" : "▼"}</span>
                </div>
                {open === i && <div className="faq-answer">{f.a}</div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="support-cta-bar">
        <h3>Still have questions?</h3>
        <p>Our support team is here to help you 24/7.</p>
        <Link to="/contact" className="btn-primary">Contact Us</Link>
      </section>
    </main>
  );
}
