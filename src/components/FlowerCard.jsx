import { Link } from "react-router-dom";

export default function FlowerCard({ f }) {
  return (
    <Link to={`/flower/${f.id}`} className="fcard">
      <div className="fcard-img">{f.emoji}</div>
      <h3>{f.name}</h3>
      <p className="muted">{f.tag}</p>
      <p><b>₹{f.price}</b> per {f.unit} <span className="muted">· min {f.min}</span></p>
    </Link>
  );
}
