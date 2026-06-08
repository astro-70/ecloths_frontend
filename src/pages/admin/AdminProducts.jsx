import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { apiFetch } from "../../context/api";
import { Link } from "react-router-dom";

const empty = { name: "", description: "", price: "", category: "men", images: "", colors: "", sizes: "", stock: "" };

export default function AdminProducts() {
  const { token } = useAuth();
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState(empty);
  const [editId, setEditId] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const load = () => apiFetch("/products").then(setProducts);
  useEffect(() => { load(); }, []);

  const save = async (e) => {
    e.preventDefault();
    const body = {
      ...form,
      price: Number(form.price),
      stock: Number(form.stock),
      images: form.images.split(",").map((s) => s.trim()),
      colors: form.colors.split(",").map((s) => s.trim()),
      sizes: form.sizes.split(",").map((s) => s.trim()),
    };
    if (editId) {
      await apiFetch(`/products/${editId}`, { method: "PUT", body: JSON.stringify(body) }, token);
    } else {
      await apiFetch("/products", { method: "POST", body: JSON.stringify(body) }, token);
    }
    setForm(empty);
    setEditId(null);
    setShowForm(false);
    load();
  };

  const remove = async (id) => {
    if (!confirm("Delete this product?")) return;
    await apiFetch(`/products/${id}`, { method: "DELETE" }, token);
    load();
  };

  const edit = (p) => {
    setForm({ ...p, images: p.images.join(", "), colors: p.colors.join(", "), sizes: p.sizes.join(", ") });
    setEditId(p._id);
    setShowForm(true);
    window.scrollTo(0, 0);
  };

  return (
    <div className="admin-layout">
      <aside className="admin-sidebar">
        <div className="sidebar-brand">⚡ Trendify Admin</div>
        <nav className="sidebar-nav">
          <Link to="/admin" className="sidebar-link">🏠 Dashboard</Link>
          <Link to="/admin/products" className="sidebar-link active">📦 Products</Link>
          <Link to="/admin/orders" className="sidebar-link">🧾 Orders</Link>
          <Link to="/admin/users" className="sidebar-link">👤 Users</Link>
          <Link to="/admin/coupons" className="sidebar-link">🎟️ Coupons</Link>
          <Link to="/" className="sidebar-link">🛍️ View Store</Link>
        </nav>
      </aside>

      <main className="admin-main">
        <div className="admin-header">
          <h1>📦 Manage Products</h1>
          <button className="btn-primary" onClick={() => { setForm(empty); setEditId(null); setShowForm(!showForm); }}>
            {showForm ? "✕ Cancel" : "+ Add Product"}
          </button>
        </div>

        {showForm && (
          <form className="admin-form-card" onSubmit={save}>
            <h3>{editId ? "Edit Product" : "Add New Product"}</h3>
            <div className="form-grid">
              <input placeholder="Product Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
              <input placeholder="Price (₹)" type="number" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} required />
              <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}>
                {["men", "women", "kids", "baby"].map((c) => <option key={c}>{c}</option>)}
              </select>
              <input placeholder="Stock" type="number" value={form.stock} onChange={(e) => setForm({ ...form, stock: e.target.value })} />
              <input placeholder="Image URLs (comma separated)" value={form.images} onChange={(e) => setForm({ ...form, images: e.target.value })} className="full-width" />
              <input placeholder="Colors (e.g. Red, Blue)" value={form.colors} onChange={(e) => setForm({ ...form, colors: e.target.value })} />
              <input placeholder="Sizes (e.g. S, M, L)" value={form.sizes} onChange={(e) => setForm({ ...form, sizes: e.target.value })} />
              <textarea placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="full-width" rows={3} />
            </div>
            <button type="submit" className="btn-primary">{editId ? "Update Product" : "Add Product"}</button>
          </form>
        )}

        <div className="products-admin-grid">
          {products.map((p) => (
            <div key={p._id} className="product-admin-card">
              <img src={p.images?.[0] || "https://via.placeholder.com/200"} alt={p.name} />
              <div className="product-admin-info">
                <h4>{p.name}</h4>
                <span className="cat-badge">{p.category}</span>
                <p className="product-admin-price">₹{p.price}</p>
                <p className="product-admin-stock">Stock: {p.stock}</p>
              </div>
              <div className="product-admin-actions">
                <button className="edit-btn" onClick={() => edit(p)}>✏️ Edit</button>
                <button className="delete-btn" onClick={() => remove(p._id)}>🗑️ Delete</button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
