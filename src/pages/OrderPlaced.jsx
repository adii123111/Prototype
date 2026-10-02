import { Link, useLocation, Navigate } from "react-router-dom";

export default function OrderPlaced() {
  const { state } = useLocation();
  if (!state?.order) return <Navigate to="/" />;
  const o = state.order;
  return (
    <div className="center">
      <div className="tick">✓</div>
      <h1>Order placed</h1>
      <p>Reference <b>{o.ref}</b>. We will call {o.details.phone} to confirm.</p>
      <p>Delivery within 24 hours · {o.details.slot} · {o.method === "COD" ? "Pay cash on delivery" : "Pay by UPI QR"}</p>
      <p className="total">₹{o.total.toLocaleString("en-IN")}</p>
      <Link className="btn" to="/">Order more flowers</Link>
    </div>
  );
}
