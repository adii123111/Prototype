import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { useCart } from "../context/CartContext.jsx";

export default function Navbar() {
  const { user, logout } = useAuth();
  const { count } = useCart();
  const nav = useNavigate();
  const out = () => { logout(); nav("/login"); };
  return (
    <header className="nav">
      <Link to={user?.role === "owner" ? "/admin" : "/"} className="brand">Petal Bulk</Link>
      {user && (
        <nav>
          <span className="muted">{user.role === "owner" ? "Owner: " : "Hi, "}{user.name}</span>
          {user.role === "client" && <Link to="/cart" className="cartlink">Cart ({count})</Link>}
          <button className="link" onClick={out}>Log out</button>
        </nav>
      )}
    </header>
  );
}
