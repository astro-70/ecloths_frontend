import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { apiFetch } from "../../context/api";

export default function AdminUsers() {
  const { token } = useAuth();
  const [users, setUsers] = useState([]);

  const load = () => apiFetch("/users", {}, token).then(setUsers);
  useEffect(() => { load(); }, []);

  const remove = async (id) => {
    await apiFetch(`/users/${id}`, { method: "DELETE" }, token);
    load();
  };

  return (
    <main className="page-container">
      <h1>Manage Users</h1>
      <table className="admin-table">
        <thead><tr><th>Name</th><th>Email</th><th>Admin</th><th>Actions</th></tr></thead>
        <tbody>
          {users.map((u) => (
            <tr key={u._id}>
              <td>{u.name}</td>
              <td>{u.email}</td>
              <td>{u.isAdmin ? "✅" : "—"}</td>
              <td><button onClick={() => remove(u._id)}>Delete</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}
