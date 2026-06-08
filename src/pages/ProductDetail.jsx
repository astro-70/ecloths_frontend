import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { apiFetch } from "../context/api";
import { useCart } from "../context/CartContext";

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const { addToCart } = useCart();

  useEffect(() => {
    apiFetch(`/products/${id}`).then(setProduct);
  }, [id]);

  if (!product) return <p className="loading">Loading...</p>;

  return (
    <main className="page-container product-detail">
      <div className="product-detail-image">
        <img src={product.images?.[0] || "/placeholder.jpg"} alt={product.name} />
      </div>
      <div className="product-detail-info">
        <h1>{product.name}</h1>
        <p className="price">₹{product.price}</p>
        <p>{product.description}</p>

        {product.colors?.length > 0 && (
          <div>
            <h4>Color</h4>
            <div className="options">
              {product.colors.map((c) => (
                <button
                  key={c}
                  className={`option-btn ${selectedColor === c ? "active" : ""}`}
                  onClick={() => setSelectedColor(c)}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
        )}

        {product.sizes?.length > 0 && (
          <div>
            <h4>Size</h4>
            <div className="options">
              {product.sizes.map((s) => (
                <button
                  key={s}
                  className={`option-btn ${selectedSize === s ? "active" : ""}`}
                  onClick={() => setSelectedSize(s)}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}

        <button
          className="btn-primary"
          onClick={() => addToCart(product, selectedColor, selectedSize)}
        >
          Add to Cart
        </button>
      </div>
    </main>
  );
}
