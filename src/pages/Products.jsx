import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import { apiFetch } from "../context/api";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const category = searchParams.get("category") || "";

  useEffect(() => {
    apiFetch(`/products${category ? `?category=${category}` : ""}`).then(setProducts);
  }, [category]);

  return (
    <main className="page-container">
      <h1>Shop All Products</h1>
      <div className="filter-bar">
        {["", "men", "women", "kids", "baby"].map((c) => (
          <button
            key={c}
            className={`filter-btn ${category === c ? "active" : ""}`}
            onClick={() => setSearchParams(c ? { category: c } : {})}
          >
            {c ? c.charAt(0).toUpperCase() + c.slice(1) : "All"}
          </button>
        ))}
      </div>
      <div className="products-grid">
        {products.length === 0 ? (
          <p>No products found.</p>
        ) : (
          products.map((p) => <ProductCard key={p._id} product={p} />)
        )}
      </div>
    </main>
  );
}
