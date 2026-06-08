export default function Contact() {
  return (
    <main className="page-container">
      <h1>Contact Us</h1>
      <p>Email: support@trendify.com</p>
      <p>We typically respond within 24 hours.</p>
      <form className="auth-form">
        <input placeholder="Your Name" />
        <input placeholder="Your Email" type="email" />
        <textarea placeholder="Your message..." rows={5} />
        <button type="submit" className="btn-primary">Send Message</button>
      </form>
    </main>
  );
}
