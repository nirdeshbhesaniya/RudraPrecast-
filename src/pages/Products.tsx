import { SectionHeading } from "@/src/components/ui/SectionHeading";
import { useAppData } from "@/src/context/DataContext";
import { ProductCard } from "@/src/components/ui/ProductCard";

export function Products() {
  const { data: { products } } = useAppData();
  return (
    <div className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 md:px-6">
        <SectionHeading 
          title="OUR PRECAST SOLUTIONS" 
          subtitle="Explore our comprehensive range of high-strength precast concrete products designed for rapid deployment and maximum durability."
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 mt-16">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}
