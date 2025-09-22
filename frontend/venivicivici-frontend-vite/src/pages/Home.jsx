import Hero from "../components/Hero";
import FeaturedProducts from "../components/FeaturedProducts";

export default function Home({ onAdd }) {
    return (
        <div style={{ padding: 16 }}>
            <Hero />
            <FeaturedProducts onAdd={onAdd} />

        </div>
    );
}
