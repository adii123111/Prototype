import { useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";
import { priceItems } from "./Cart.jsx";

export default function Payment() {
  const { items, details, clearCart } = useCart();
  const nav = useNavigate();
  const [method, setMethod] = useState("COD");
  if (!items.length || !details) return <Navigate to="/cart" />;

  const rows = priceItems(items);
  const total = rows.reduce((s, r) => s + r.amount, 0);

  const placeOrder = () => {
    const order = {
      ref: "PB" + Date.now().toString(36).toUpperCase(),
      placedAt: new Date().toISOString(),
      method, total, details,
      items: rows.map((r) => ({ name: r.name, qty: r.qty, unit: r.unit, amount: r.amount })),
    };
    // Real project: await fetch("/api/orders", { method: "POST", body: JSON.stringify(order) })
    // The owner then sees it in an admin dashboard. Here we only keep it in the browser.
    const all = JSON.parse(localStorage.getItem("pb_orders") || "[]");
    localStorage.setItem("pb_orders", JSON.stringify([order, ...all]));
    clearCart();
    nav("/order-placed", { state: { order } });
  };

  return (
    <div className="narrow">
      <h1>Payment</h1>
      <p className="muted">Deliver to {details.name}, {details.address}, {details.city} - {details.pin}</p>
      <label className={"opt " + (method === "COD" ? "on" : "")}>
        <input type="radio" checked={method === "COD"} onChange={() => setMethod("COD")} /> Cash on delivery
      </label>
      <label className={"opt " + (method === "QR" ? "on" : "")}>
        <input type="radio" checked={method === "QR"} onChange={() => setMethod("QR")} /> Pay by UPI QR
      </label>
      {method === "QR" && <div className="qr">QR code goes here<br /><span className="muted">(to be added later)</span></div>}
      <p className="total">Amount to pay: ₹{total.toLocaleString("en-IN")}</p>
      <button className="btn" onClick={placeOrder}>Place order</button>
    </div>
  );
}
