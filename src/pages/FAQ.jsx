const faqs = [
  { q: "How do I track my order?", a: "Login and go to My Orders to see your order status." },
  { q: "What is the return policy?", a: "We accept returns within 7 days of delivery." },
  { q: "Are the coupon codes stackable?", a: "Only one coupon can be applied per order." },
  { q: "How do I become a seller?", a: "Visit the Become a Seller page and fill the form." },
];

export default function FAQ() {
  return (
    <main className="page-container">
      <h1>FAQ</h1>
      {faqs.map((f, i) => (
        <div key={i} className="faq-item">
          <h3>{f.q}</h3>
          <p>{f.a}</p>
        </div>
      ))}
    </main>
  );
}
