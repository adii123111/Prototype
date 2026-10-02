import { Link, useNavigate } from "react-router-dom";
import { flowers } from "../data/flowers.js";
import { useCart } from "../context/CartContext.jsx";

export const priceItems = (items) =>
  items.map((i) => { const f = flowers.find((x) => x.id === i.id); return { ...f, qty: i.qty, amount: f.price * i.qty }; });

export default function Cart() {
  const { items, removeItem } = useCart();
  const nav = useNavigate();
  const rows = priceItems(items);
  const total = rows.reduce((s, r) => s + r.amount, 0);

  if (!rows.length) return <div className="center"><h2>Your cart is empty</h2><Link className="btn" to="/">Browse flowers</Link></div>;
  return (
    <div className="narrow">
      <h1>Your cart</h1>
      {rows.map((r) => (
        <div className="line" key={r.id}>
          <span>{r.emoji} {r.name} × {r.qty} {r.unit}s</span>
          <span>₹{r.amount.toLocaleString("en-IN")} <button className="link" onClick={() => removeItem(r.id)}>Remove</button></span>
        </div>
      ))}
      <p className="total">Total: ₹{total.toLocaleString("en-IN")}</p>
      <div className="actions">
        <Link className="btn ghost" to="/">Add more flowers</Link>
        <button className="btn" onClick={() => nav("/checkout")}>Go to delivery</button>
      </div>
    </div>
  );
}
