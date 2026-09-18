import { useAppData } from "@/src/context/DataContext";
import { Star, Quote } from "lucide-react";
import { SectionHeading } from "./SectionHeading";
import { motion } from "motion/react";

export function TestimonialsSection() {
  const { data: { testimonials } } = useAppData();

  if (!testimonials || testimonials.length === 0) return null;

  return (
    <section className="py-20 bg-gray-50 relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <SectionHeading 
          title="CLIENT REVIEWS" 
          subtitle="What our partners and customers say about our precast solutions."
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
          {testimonials.map((testimonial, i) => (
            <motion.div 
              key={testimonial.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className="bg-white p-8 rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.04)] border border-gray-100 relative flex flex-col h-full"
            >
              <div className="absolute top-6 right-8 text-gray-100">
                <Quote size={60} className="rotate-180" />
              </div>
              
              <div className="flex items-center gap-1 mb-6 relative z-10">
                {[...Array(5)].map((_, idx) => (
                  <Star 
                    key={idx} 
                    size={20} 
                    className={idx < testimonial.rating ? "fill-[#F4C522] text-[#F4C522]" : "text-gray-200 fill-gray-200"} 
                  />
                ))}
              </div>
              
              <p className="text-gray-600 mb-8 italic relative z-10 flex-grow">
                "{testimonial.review}"
              </p>
              
              <div className="flex items-center gap-4 mt-auto relative z-10 pt-6 border-t border-gray-50">
                <div className="w-12 h-12 rounded-full overflow-hidden bg-[#1A2A3A] flex items-center justify-center shrink-0 shadow-sm border-2 border-white">
                  {testimonial.image ? (
                    <img src={testimonial.image} alt={testimonial.author} className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-white font-bold text-lg">{testimonial.author.charAt(0)}</span>
                  )}
                </div>
                <div>
                  <h4 className="font-bold text-[#1A2A3A] text-sm uppercase tracking-wide">{testimonial.author}</h4>
                  <p className="text-xs text-gray-500 font-medium">{testimonial.company}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
