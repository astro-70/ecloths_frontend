import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { apiFetch } from "../context/api";

export default function Wishlist() {
  return (
    <main className="page-container">
      <h1>My Wishlist</h1>
      <p>Items you've saved for later will appear here.</p>
    </main>
  );
}
