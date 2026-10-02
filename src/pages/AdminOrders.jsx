import { useState } from "react";
import { sampleOrders } from "../data/sampleOrders.js";

const STATUSES = ["New", "Confirmed", "Out for delivery", "Delivered"];
const inr = (n) => "₹" + n.toLocaleString("en-IN");

export default function AdminOrders() {
  // Real orders placed by clients in this browser + the fake samples.
  const placed = JSON.parse(localStorage.getItem("pb_orders") || "[]").map((x) => ({ ...x, status: x.status || "New" }));
  const [orders, setOrders] = useState([...placed, ...sampleOrders]);
  const [filter, setFilter] = useState("Pending");

  const setStatus = (ref, status) => setOrders((p) => p.map((o) => (o.ref === ref ? { ...o, status } : o)));
  const pending = orders.filter((o) => o.status !== "Delivered");
  const shown = filter === "All" ? orders : filter === "Pending" ? pending : orders.filter((o) => o.status === filter);

  // "What do I need to pack today?" = total of each flower across pending orders.
  const pack = {};
  pending.forEach((o) => o.items.forEach((i) => { const k = i.name + " (" + i.unit + ")"; pack[k] = (pack[k] || 0) + i.qty; }));

  return (
    <div>
      <h1>Orders</h1>
      <div className="stats">
        <div><b>{orders.length}</b><span>Total orders</span></div>
        <div><b>{pending.length}</b><span>To deliver</span></div>
        <div><b>{inr(orders.reduce((s, o) => s + o.total, 0))}</b><span>Order value</span></div>
      </div>

      <div className="panel">
        <h3>To pack for pending orders</h3>
        {Object.keys(pack).length === 0 ? <p className="muted">Nothing pending.</p> :
          Object.entries(pack).map(([k, v]) => <span className="chip" key={k}>{v} × {k}</span>)}
      </div>

      <div className="seg" style={{ margin: "16px 0" }}>
        {["Pending", "All", ...STATUSES].map((s) => (
          <button key={s} className={filter === s ? "on" : ""} onClick={() => setFilter(s)}>{s}</button>
        ))}
      </div>

      {shown.length === 0 && <p className="muted">No orders in this view.</p>}
      {shown.map((o) => (
        <div className="order" key={o.ref}>
          <div className="order-head">
            <b>{o.ref}</b>
            <span className="muted">{new Date(o.placedAt).toLocaleString("en-IN")}</span>
            <select value={o.status} onChange={(e) => setStatus(o.ref, e.target.value)}>
              {STATUSES.map((s) => <option key={s}>{s}</option>)}
            </select>
          </div>
          <p className="deliver">
            Deliver {o.items.map((i) => `${i.qty} ${i.unit}s of ${i.name}`).join(" + ")} to
            <b> {o.details.address}, {o.details.city} - {o.details.pin}</b>
          </p>
          <p className="muted">
            {o.details.name} · <a href={"tel:" + o.details.phone}>{o.details.phone}</a> · {o.details.slot} · {o.method === "COD" ? "Cash on delivery" : "UPI QR"} · {inr(o.total)}
            {o.details.notes ? " · Note: " + o.details.notes : ""}
          </p>
        </div>
      ))}
    </div>
  );
}
