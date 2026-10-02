import { flowers } from "../data/flowers.js";
import FlowerCard from "../components/FlowerCard.jsx";

export default function Home() {
  return (
    <>
      <section className="hero">
        <h1>Order flowers by the hundred.</h1>
        <p>Pick a flower, set your quantity, and we deliver within 24 hours.</p>
      </section>
      <div className="grid">{flowers.map((f) => <FlowerCard key={f.id} f={f} />)}</div>
    </>
  );
}
