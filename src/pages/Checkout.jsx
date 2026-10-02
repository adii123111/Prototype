import { useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";
import { useAuth } from "../context/AuthContext.jsx";

export default function Checkout() {
  const { items, details, setDetails } = useCart();
  const { user } = useAuth();
  const nav = useNavigate();
  const [f, setF] = useState(details || { name: user.name, phone: user.phone, address: "", city: "", pin: "", slot: "Morning (6 - 10 AM)", notes: "" });
  const [err, setErr] = useState("");
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value });
  if (!items.length) return <Navigate to="/cart" />;

  const next = (e) => {
    e.preventDefault();
    if (!/^[6-9]\d{9}$/.test(f.phone)) return setErr("Enter a valid 10-digit mobile number.");
    if (f.address.trim().length < 8) return setErr("Enter your full delivery address.");
    if (!f.city.trim()) return setErr("Enter your city.");
    if (!/^[1-9]\d{5}$/.test(f.pin)) return setErr("Enter a valid 6-digit pincode.");
    setDetails(f);
    nav("/payment");
  };

  return (
    <form className="narrow form" onSubmit={next}>
      <h1>Delivery details</h1>
      <label>Full name<input value={f.name} onChange={set("name")} /></label>
      <label>Phone<input value={f.phone} onChange={set("phone")} maxLength={10} inputMode="numeric" /></label>
      <label>Address<textarea rows={2} value={f.address} onChange={set("address")} placeholder="House/shop no, street, area, landmark" /></label>
      <div className="two">
        <label>City<input value={f.city} onChange={set("city")} /></label>
        <label>Pincode<input value={f.pin} onChange={set("pin")} maxLength={6} inputMode="numeric" /></label>
      </div>
      <label>Delivery slot
        <select value={f.slot} onChange={set("slot")}><option>Morning (6 - 10 AM)</option><option>Midday (10 AM - 2 PM)</option><option>Evening (2 - 7 PM)</option></select>
      </label>
      <label>Notes (optional)<textarea rows={2} value={f.notes} onChange={set("notes")} /></label>
      {err && <p className="err">{err}</p>}
      <button className="btn">Continue to payment</button>
    </form>
  );
}
