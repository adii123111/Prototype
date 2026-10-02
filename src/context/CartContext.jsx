import { createContext, useContext, useState } from "react";
const CartContext = createContext(null);
export const useCart = () => useContext(CartContext);

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);       // [{ id, qty }]
  const [details, setDetails] = useState(null); // delivery details from the Checkout page

  const addToCart = (id, qty) =>
    setItems((p) => (p.some((i) => i.id === id) ? p.map((i) => (i.id === id ? { id, qty } : i)) : [...p, { id, qty }]));
  const removeItem = (id) => setItems((p) => p.filter((i) => i.id !== id));
  const clearCart = () => { setItems([]); setDetails(null); };

  return (
    <CartContext.Provider value={{ items, addToCart, removeItem, clearCart, count: items.length, details, setDetails }}>
      {children}
    </CartContext.Provider>
  );
}
