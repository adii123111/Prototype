import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth, OWNER } from "../context/AuthContext.jsx";

export default function Login() {
  const { login } = useAuth();
  const nav = useNavigate();
  const [mode, setMode] = useState("client"); // "client" | "owner"
  const [f, setF] = useState({ name: "", phone: "", password: "" });
  const [err, setErr] = useState("");
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value });
  const pick = (m) => { setMode(m); setErr(""); setF({ name: "", phone: "", password: "" }); };

  const submit = (e) => {
    e.preventDefault();
    if (mode === "owner") {
      if (f.name.trim() !== OWNER.id || f.password !== OWNER.password || f.phone.trim() !== OWNER.phone)
        return setErr("ID, phone or password is incorrect.");
      login({ role: "owner", name: OWNER.id, phone: OWNER.phone });
      return nav("/admin");
    }
    // Client: any name or details are accepted in the prototype.
    login({ role: "client", name: f.name.trim() || "Guest", phone: f.phone.trim() });
    nav("/");
  };

  return (
    <div className="login">
      <div className="login-art">🌹<h1>Fresh flowers,<br />in bulk, in 24 hours.</h1></div>
      <form className="box" onSubmit={submit}>
        <div className="seg">
          <button type="button" className={mode === "client" ? "on" : ""} onClick={() => pick("client")}>Client</button>
          <button type="button" className={mode === "owner" ? "on" : ""} onClick={() => pick("owner")}>Owner</button>
        </div>
        <h2>{mode === "owner" ? "Owner login" : "Client login"}</h2>
        <label>{mode === "owner" ? "Owner ID" : "Name"}<input value={f.name} onChange={set("name")} /></label>
        <label>Mobile number<input value={f.phone} onChange={set("phone")} inputMode="numeric" /></label>
        <label>Password<input type="password" value={f.password} onChange={set("password")} /></label>
        {err && <p className="err">{err}</p>}
        <button className="btn">Log in</button>
        <p className="muted">{mode === "owner" ? "Only the shop owner can open the orders window." : "Demo: enter anything to continue."}</p>
      </form>
    </div>
  );
}
