import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { flowers } from "../data/flowers.js";
import { useCart } from "../context/CartContext.jsx";

export default function ProductDetail() {
  const { id } = useParams();
  const f = flowers.find((x) => x.id === id);
  const { addToCart } = useCart();
  const nav = useNavigate();
  const [qty, setQty] = useState(f ? f.min : 0);
  if (!f) return <p>Flower not found. <Link to="/">Back to shop</Link></p>;

  const valid = qty >= f.min;
  const add = (go) => { addToCart(f.id, qty); nav(go); };

  return (
    <div className="detail">
      <div className="detail-img">{f.emoji}</div>
      <div>
        <Link to="/" className="muted">Back to all flowers</Link>
        <h1>{f.name}</h1>
        <p className="price">₹{f.price} per {f.unit}</p>
        <p>{f.desc}</p>
        <p className="muted">Best for: {f.tag}. Minimum order {f.min} {f.unit}s.</p>
        <label>Quantity ({f.unit}s)
          <input type="number" min={f.min} value={qty} onChange={(e) => setQty(parseInt(e.target.value, 10) || 0)} />
        </label>
        {!valid && <p className="err">Minimum order is {f.min} {f.unit}s.</p>}
        <p className="total">Subtotal: ₹{(valid ? qty * f.price : 0).toLocaleString("en-IN")}</p>
        <div className="actions">
          <button className="btn ghost" disabled={!valid} onClick={() => add("/")}>Add to cart</button>
          <button className="btn" disabled={!valid} onClick={() => add("/checkout")}>Go to delivery</button>
        </div>
      </div>
    </div>
  );
}
