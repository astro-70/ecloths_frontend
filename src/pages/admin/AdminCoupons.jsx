import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { apiFetch } from "../../context/api";

export default function AdminCoupons() {
  const { token } = useAuth();
  const [coupons, setCoupons] = useState([]);
  const [form, setForm] = useState({ code: "", discount: "" });

  const load = () => apiFetch("/coupons").then(setCoupons);
  useEffect(() => { load(); }, []);

  const create = async (e) => {
    e.preventDefault();
    await apiFetch("/coupons", { method: "POST", body: JSON.stringify({ ...form, discount: Number(form.discount) }) }, token);
    setForm({ code: "", discount: "" });
    load();
  };

  const remove = async (id) => {
    await apiFetch(`/coupons/${id}`, { method: "DELETE" }, token);
    load();
  };

  return (
    <main className="page-container">
      <h1>Manage Coupons</h1>
      <form className="admin-form" onSubmit={create}>
        <input placeholder="Code (e.g. TREND10)" value={form.code} onChange={(e) => setForm({ ...form, code: e.target.value })} required />
        <input placeholder="Discount amount (₹)" type="number" value={form.discount} onChange={(e) => setForm({ ...form, discount: e.target.value })} required />
        <button type="submit" className="btn-primary">Add Coupon</button>
      </form>
      <table className="admin-table">
        <thead><tr><th>Code</th><th>Discount</th><th>Actions</th></tr></thead>
        <tbody>
          {coupons.map((c) => (
            <tr key={c._id}>
              <td>{c.code}</td>
              <td>₹{c.discount}</td>
              <td><button onClick={() => remove(c._id)}>Delete</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}
