export default function BecomeSeller() {
  return (
    <main className="page-container">
      <h1>Become a Seller</h1>
      <p>Join Trendify's growing marketplace and reach thousands of customers.</p>
      <form className="auth-form">
        <input placeholder="Business Name" />
        <input placeholder="Email" type="email" />
        <input placeholder="Phone" type="tel" />
        <textarea placeholder="Tell us about your products..." rows={4} />
        <button type="submit" className="btn-primary">Submit Application</button>
      </form>
    </main>
  );
}
