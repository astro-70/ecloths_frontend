import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
  return (
    <div className="product-card">
      <Link to={`/products/${product._id}`}>
        <img src={product.images?.[0] || "/placeholder.jpg"} alt={product.name} />
        <div className="product-info">
          <h3>{product.name}</h3>
          <p className="category">{product.category}</p>
          <p className="price">₹{product.price}</p>
        </div>
      </Link>
    </div>
  );
}
