import SectionHeader from "../components/SectionHeader";
import ProductCard from "../components/ProductCard";
import { menProducts, womenProducts } from "../data/products";
import "./FeaturedPerfumes.css";

function FeaturedPerfumes() {
  // Display specific 6 perfumes: 3 men + 3 women
  const menFeatured = menProducts.filter((p) => 
    ["m2", "m4", "m9"].includes(p.id)
  );
  
  const womenFeatured = womenProducts.filter((p) => 
    ["w17", "w19", "w21"].includes(p.id)
  );
  
  const allFeatured = [...menFeatured, ...womenFeatured];

  return (
    <section className="featured-perfumes">
      <div className="featured-perfumes__container">
        <SectionHeader
          eyebrow="TryToStaySane"
          title="Best Sellers & New Arrivals"
          description="Best-selling favorites and brand new arrivals — all in one place."
        />
        <div className="featured-perfumes__grid">
          {allFeatured.map((product) => (
            <ProductCard 
              key={product.id} 
              product={product}
              showHoverActions={true}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default FeaturedPerfumes;
