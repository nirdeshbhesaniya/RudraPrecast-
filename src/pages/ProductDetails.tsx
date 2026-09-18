import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useAppData } from "@/src/context/DataContext";
import { Button } from "@/src/components/ui/Button";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import { Lightbox } from "@/src/components/ui/Lightbox";

export function ProductDetails() {
  const { data: { products, siteConfig } } = useAppData();
  const { slug } = useParams();
  const product = products.find(p => p.slug === slug);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  if (!product) {
    return (
      <div className="py-40 text-center">
        <h2 className="text-3xl font-bold mb-4">Product Not Found</h2>
        <Link to="/products"><Button>Back to Products</Button></Link>
      </div>
    );
  }

  const allImages = [product.image, ...product.gallery];

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const whatsappMessage = encodeURIComponent(`Hello, I am interested in ${product.name} and would like more details/quotation.`);
  const whatsappLink = `https://wa.me/${siteConfig.contact.whatsapp}?text=${whatsappMessage}`;

  return (
    <div className="py-12 bg-white">
      <div className="container mx-auto px-4 md:px-6 max-w-6xl">
        <Link to="/products" className="inline-flex items-center gap-2 text-gray-500 hover:text-[#8B1E1E] transition-colors mb-8 font-semibold text-sm tracking-wider uppercase">
          <ArrowLeft size={16} /> Back to Products
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Images */}
          <div className="flex flex-col gap-4">
            <div 
              className="aspect-[4/3] rounded-2xl overflow-hidden bg-gray-100 cursor-pointer"
              onClick={() => openLightbox(0)}
            >
              <img src={product.image} alt={product.name} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
            </div>
            {product.gallery.length > 0 && (
              <div className="grid grid-cols-2 gap-4">
                {product.gallery.map((img, idx) => (
                  <div 
                    key={idx} 
                    className="aspect-[4/3] rounded-xl overflow-hidden bg-gray-100 cursor-pointer"
                    onClick={() => openLightbox(idx + 1)}
                  >
                    <img src={img} alt={`${product.name} Gallery ${idx}`} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Details */}
          <div>
            <h1 className="text-4xl md:text-5xl font-bold font-oswald text-[#1A2A3A] mb-4">{product.name}</h1>
            <p className="text-xl text-gray-600 mb-8">{product.overview}</p>

            <div className="flex flex-wrap gap-2 mb-10">
              {product.applications.map((app, idx) => (
                <span key={idx} className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-[#1A2A3A] bg-gray-100 px-2 py-1 sm:px-3 sm:py-1.5 rounded-sm">
                  {app}
                </span>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Link to={`/contact?product=${product.slug}`} className="w-full sm:flex-1">
                <Button size="lg" className="w-full">REQUEST QUOTE</Button>
              </Link>
              <a href={whatsappLink} target="_blank" rel="noreferrer" className="w-full sm:flex-1">
                <Button size="lg" variant="outline" className="w-full">WHATSAPP US</Button>
              </a>
            </div>

            <div className="mb-12">
              <h3 className="text-2xl font-bold font-oswald text-[#1A2A3A] mb-6 uppercase tracking-wide border-b border-gray-100 pb-3">Key Benefits</h3>
              <ul className="flex flex-col gap-4">
                {product.keyBenefits.map((benefit, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <CheckCircle2 className="text-[#8B1E1E] shrink-0 mt-0.5" size={20} />
                    <span className="text-gray-700">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-2xl font-bold font-oswald text-[#1A2A3A] mb-6 uppercase tracking-wide border-b border-gray-100 pb-3">Specifications</h3>
              <div className="border border-gray-200 rounded-lg overflow-hidden">
                <table className="w-full text-left text-sm text-gray-600">
                  <tbody className="divide-y divide-gray-200">
                    {Object.entries(product.specifications).map(([key, value], idx) => (
                      <tr key={idx} className={idx % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                        <th className="px-6 py-4 font-semibold text-[#1A2A3A] w-1/3">{key}</th>
                        <td className="px-6 py-4">{value as React.ReactNode}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Lightbox 
        isOpen={lightboxOpen} 
        images={allImages} 
        currentIndex={lightboxIndex}
        onClose={() => setLightboxOpen(false)}
        onNavigate={setLightboxIndex}
      />
    </div>
  );
}
