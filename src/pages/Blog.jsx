import { Link } from "react-router-dom";

const posts = [
  {
    img: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=600&q=80",
    tag: "Style Guide",
    title: "10 Must-Have Wardrobe Essentials for Every Woman in 2025",
    excerpt: "Building a versatile wardrobe doesn't have to be expensive. We break down the 10 essential pieces every woman needs this year — from the perfect white shirt to the ideal pair of straight-leg jeans.",
    author: "Sana Priya",
    date: "June 5, 2025",
    readTime: "6 min read",
  },
  {
    img: "https://images.unsplash.com/photo-1516257984-b1b4d707412e?w=600&q=80",
    tag: "Men's Fashion",
    title: "How to Dress Smart Casual: The Ultimate Guide for Men",
    excerpt: "Smart casual is the most versatile dress code — but it's also the most misunderstood. Learn how to nail the perfect smart casual look for every occasion, from office meetings to weekend brunches.",
    author: "Arjun Raj",
    date: "May 28, 2025",
    readTime: "8 min read",
  },
  {
    img: "https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?w=600&q=80",
    tag: "Kids Fashion",
    title: "Back to School Fashion: Dressing Kids for Comfort & Style",
    excerpt: "School season is here! Find out how to build a practical yet stylish school wardrobe for your kids without breaking the bank. Tips on fabrics, fit, and mixing & matching.",
    author: "Meha Nathan",
    date: "May 20, 2025",
    readTime: "5 min read",
  },
  {
    img: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=600&q=80",
    tag: "Trend Report",
    title: "Summer 2025 Fashion Trends You Need to Know About",
    excerpt: "From bold floral prints to pastel co-ords, summer 2025 is all about color, comfort, and confidence. We round up the top trends spotted on runways and street style across India.",
    author: "Sana Priya",
    date: "May 12, 2025",
    readTime: "7 min read",
  },
  {
    img: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=600&q=80",
    tag: "Baby Fashion",
    title: "The Complete Guide to Baby Clothing Sizes & Fabrics",
    excerpt: "Choosing the right clothing for your baby can be overwhelming. This guide explains everything from sizing charts to the safest fabrics for newborns, so you can shop with confidence.",
    author: "Arjun Raj",
    date: "April 30, 2025",
    readTime: "4 min read",
  },
  {
    img: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&q=80",
    tag: "Seller Tips",
    title: "5 Strategies to 10x Your Fashion Sales on Trendify",
    excerpt: "Top Trendify sellers share their secrets: the right product photos, pricing strategies, how to use discount codes, and why fast response time to buyer questions increases conversions by 30%.",
    author: "Meha Nathan",
    date: "April 22, 2025",
    readTime: "9 min read",
  },
];

export default function Blog() {
  return (
    <main>
      <section className="page-hero" style={{ backgroundImage: "url(https://images.unsplash.com/photo-1445205170230-053b83016050?w=1400&q=80)" }}>
        <div className="page-hero-overlay" />
        <div className="page-hero-content">
          <span className="section-tag">Fashion Blog</span>
          <h1>Style Tips, Trends & More</h1>
          <p>Inspiration, advice, and stories from the world of fashion — curated by the Trendify team.</p>
        </div>
      </section>

      <section className="section">
        <div className="blog-featured">
          <div className="blog-featured-img">
            <img src={posts[0].img} alt={posts[0].title} />
            <span className="blog-tag">{posts[0].tag}</span>
          </div>
          <div className="blog-featured-content">
            <p className="blog-meta">{posts[0].author} · {posts[0].date} · {posts[0].readTime}</p>
            <h2>{posts[0].title}</h2>
            <p>{posts[0].excerpt}</p>
            <Link to="/blog" className="btn-primary">Read Article →</Link>
          </div>
        </div>
      </section>

      <section className="section section-gray">
        <div className="section-header-center">
          <span className="section-tag">Latest Posts</span>
          <h2>From Our Blog</h2>
        </div>
        <div className="blog-grid">
          {posts.slice(1).map((p) => (
            <div key={p.title} className="blog-card">
              <div className="blog-card-img">
                <img src={p.img} alt={p.title} loading="lazy" />
                <span className="blog-tag">{p.tag}</span>
              </div>
              <div className="blog-card-content">
                <p className="blog-meta">{p.author} · {p.readTime}</p>
                <h4>{p.title}</h4>
                <p>{p.excerpt.slice(0, 100)}...</p>
                <Link to="/blog" className="read-more">Read More →</Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="newsletter">
        <h2>Never Miss a Style Update</h2>
        <p>Subscribe and get our latest blog posts, trend reports, and exclusive offers delivered weekly.</p>
        <form className="newsletter-form" onSubmit={(e) => e.preventDefault()}>
          <input type="email" placeholder="Enter your email" required />
          <button type="submit" className="btn-primary">Subscribe</button>
        </form>
      </section>
    </main>
  );
}
