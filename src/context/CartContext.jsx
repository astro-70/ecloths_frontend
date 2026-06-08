import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  const addToCart = (product, color, size) => {
    setCart((prev) => {
      const exists = prev.find(
        (i) => i._id === product._id && i.color === color && i.size === size
      );
      if (exists) {
        return prev.map((i) =>
          i._id === product._id && i.color === color && i.size === size
            ? { ...i, quantity: i.quantity + 1 }
            : i
        );
      }
      return [...prev, { ...product, color, size, quantity: 1 }];
    });
  };

  const removeFromCart = (id) => setCart((prev) => prev.filter((i) => i._id !== id));

  const clearCart = () => setCart([]);

  const total = cart.reduce((sum, i) => sum + i.price * i.quantity, 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, total }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
