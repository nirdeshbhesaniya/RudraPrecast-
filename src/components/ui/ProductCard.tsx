import { Link } from "react-router-dom";
import { Product } from "@/src/data/products";
import { ArrowRight } from "lucide-react";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="group bg-white rounded-xl overflow-hidden border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] transition-all duration-300 flex flex-col h-full">
      <div className="relative h-64 overflow-hidden">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>
      <div className="p-6 md:p-8 flex flex-col flex-1">
        <h3 className="text-2xl font-oswald font-bold text-[#1A2A3A] mb-3 group-hover:text-[#8B1E1E] transition-colors">{product.name}</h3>
        <p className="text-gray-600 mb-6 flex-1 line-clamp-3 leading-relaxed">
          {product.shortDescription}
        </p>
        
        <div className="flex flex-wrap gap-2 mb-8">
          {product.applications.slice(0, 3).map((app, idx) => (
            <span key={idx} className="text-xs font-semibold uppercase tracking-wider text-[#1A2A3A] bg-gray-100 px-3 py-1.5 rounded-sm">
              {app}
            </span>
          ))}
        </div>

        <div className="mt-auto flex items-center justify-between border-t border-gray-100 pt-6">
          <Link 
            to={`/products/${product.slug}`}
            className="inline-flex items-center gap-2 text-[#1A2A3A] font-semibold hover:text-[#8B1E1E] transition-colors group/link"
          >
            VIEW DETAILS
            <ArrowRight size={18} className="transition-transform group-hover/link:translate-x-1" />
          </Link>
          <Link 
            to={`/contact?product=${product.slug}`}
            className="text-sm font-semibold uppercase tracking-wider text-white bg-[#8B1E1E] hover:bg-[#6A1616] px-5 py-2.5 rounded-sm transition-colors"
          >
            GET QUOTE
          </Link>
        </div>
      </div>
    </div>
  );
}
