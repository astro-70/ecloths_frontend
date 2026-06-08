import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { apiFetch } from "../../context/api";

const empty = { name: "", description: "", price: "", category: "men", images: "", colors: "", sizes: "", stock: "" };

export default function AdminProducts() {
  const { token } = useAuth();
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState(empty);
  const [editId, setEditId] = useState(null);

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
    load();
  };

  const remove = async (id) => {
    await apiFetch(`/products/${id}`, { method: "DELETE" }, token);
    load();
  };

  const edit = (p) => {
    setForm({ ...p, images: p.images.join(", "), colors: p.colors.join(", "), sizes: p.sizes.join(", ") });
    setEditId(p._id);
  };

  return (
    <main className="page-container">
      <h1>Manage Products</h1>
      <form className="admin-form" onSubmit={save}>
        <input placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
        <input placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
        <input placeholder="Price" type="number" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} required />
        <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}>
          {["men", "women", "kids", "baby"].map((c) => <option key={c}>{c}</option>)}
        </select>
        <input placeholder="Image URLs (comma separated)" value={form.images} onChange={(e) => setForm({ ...form, images: e.target.value })} />
        <input placeholder="Colors (comma separated)" value={form.colors} onChange={(e) => setForm({ ...form, colors: e.target.value })} />
        <input placeholder="Sizes (comma separated)" value={form.sizes} onChange={(e) => setForm({ ...form, sizes: e.target.value })} />
        <input placeholder="Stock" type="number" value={form.stock} onChange={(e) => setForm({ ...form, stock: e.target.value })} />
        <button type="submit" className="btn-primary">{editId ? "Update" : "Add"} Product</button>
        {editId && <button type="button" onClick={() => { setForm(empty); setEditId(null); }}>Cancel</button>}
      </form>
      <table className="admin-table">
        <thead><tr><th>Name</th><th>Category</th><th>Price</th><th>Actions</th></tr></thead>
        <tbody>
          {products.map((p) => (
            <tr key={p._id}>
              <td>{p.name}</td>
              <td>{p.category}</td>
              <td>₹{p.price}</td>
              <td>
                <button onClick={() => edit(p)}>Edit</button>
                <button onClick={() => remove(p._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}
