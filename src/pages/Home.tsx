import { ArrowRight, ShieldCheck, Clock, IndianRupee, Layers, CloudSun, Wrench, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { useAppData } from "@/src/context/DataContext";
import { ProductCard } from "@/src/components/ui/ProductCard";
import { SectionHeading } from "@/src/components/ui/SectionHeading";
import { Button } from "@/src/components/ui/Button";
import { CostCalculator } from "@/src/components/ui/CostCalculator";
import { TestimonialsSection } from "@/src/components/ui/TestimonialsSection";

const features = [
  { icon: ShieldCheck, title: "STRONG & DURABLE", desc: "Manufactured with high-grade concrete and reinforced steel for maximum structural integrity." },
  { icon: Clock, title: "QUICK INSTALLATION", desc: "Precast panels allow for rapid assembly, significantly reducing project completion time." },
  { icon: IndianRupee, title: "COST EFFECTIVE", desc: "Economical compared to traditional brickwork with lower maintenance and labour costs." },
  { icon: Wrench, title: "LOW MAINTENANCE", desc: "Our products require practically zero maintenance and retain their finish for decades." },
  { icon: CloudSun, title: "WEATHER RESISTANT", desc: "Engineered to withstand extreme weather conditions, including heavy rain and harsh sun." },
  { icon: Layers, title: "COMPLETE PROJECT SUPPORT", desc: "From site measurement to final installation, we handle everything." },
];

export function Home() {
  const { data: { siteConfig, products, projects } } = useAppData();
  const featuredProducts = products.filter(p => p.featured);
  const whatsappMessage = encodeURIComponent("Hello Rudra Precast, I would like to request a free quote for my project.");
  const whatsappLink = `https://wa.me/${siteConfig.contact.whatsapp}?text=${whatsappMessage}`;

  return (
    <div className="flex flex-col">
      {/* HERO SECTION */}
      <section className="relative min-h-[90vh] flex items-center bg-[#FDFDFD] overflow-hidden">
        {/* Abstract Background Element */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-[#1A2A3A] transform translate-x-1/4 skew-x-12 hidden lg:block z-0"></div>
        <div className="absolute top-0 right-0 w-full h-full bg-[#1A2A3A]/90 lg:hidden z-0"></div>
        
        <div className="container mx-auto px-4 md:px-6 relative z-10 grid lg:grid-cols-2 gap-12 items-center py-20 lg:py-0">
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl text-center lg:text-left pt-12 lg:pt-0"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 lg:bg-[#1A2A3A]/5 text-[#1A2A3A] rounded-full text-sm font-bold tracking-wider mb-8">
              <span className="w-2 h-2 rounded-full bg-[#8B1E1E]"></span>
              PREMIUM PRECAST MANUFACTURER
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold font-oswald text-white lg:text-[#1A2A3A] uppercase tracking-tight leading-[1.1] mb-6">
              STRONGER BOUNDARIES. <br/>
              <span className="text-[#F4C522] lg:text-[#8B1E1E]">BUILT TO LAST.</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-300 lg:text-gray-600 mb-10 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Premium RCC & Precast Solutions for Residential, Industrial and Commercial Projects in Karnataka.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link to="/contact">
                <Button size="lg" className="w-full sm:w-auto h-14 text-lg">
                  GET FREE QUOTE
                </Button>
              </Link>
              <a href={whatsappLink} target="_blank" rel="noreferrer">
                <Button size="lg" variant="outline" className="w-full sm:w-auto h-14 text-lg border-white/30 text-white hover:bg-white/10 lg:border-[#1A2A3A] lg:text-[#1A2A3A] lg:hover:bg-transparent">
                  WHATSAPP US
                </Button>
              </a>
            </div>

            <div className="mt-12 flex flex-wrap items-center justify-center lg:justify-start gap-4 sm:gap-8 text-sm font-semibold uppercase tracking-wider text-gray-300 lg:text-gray-500">
              <div className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-[#F4C522] rounded-full"></div> RCC Walls</div>
              <div className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-[#F4C522] rounded-full"></div> Site Offices</div>
              <div className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-[#F4C522] rounded-full"></div> Labour Quarters</div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="w-full mt-10 lg:mt-0 relative z-10"
          >
            <CostCalculator />
          </motion.div>

        </div>
      </section>

      {/* TRUST SECTION */}
      <section className="py-16 bg-[#1A2A3A]">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-white/10">
            <div className="px-4">
              <h4 className="text-white font-oswald text-2xl md:text-3xl mb-2">Quality-Focused</h4>
              <p className="text-gray-400 text-sm md:text-base uppercase tracking-wider">Manufacturing</p>
            </div>
            <div className="px-4">
              <h4 className="text-white font-oswald text-2xl md:text-3xl mb-2">Professional</h4>
              <p className="text-gray-400 text-sm md:text-base uppercase tracking-wider">Installation</p>
            </div>
            <div className="px-4">
              <h4 className="text-white font-oswald text-2xl md:text-3xl mb-2">Reliable</h4>
              <p className="text-gray-400 text-sm md:text-base uppercase tracking-wider">Project Support</p>
            </div>
            <div className="px-4">
              <h4 className="text-white font-oswald text-2xl md:text-3xl mb-2">Built For</h4>
              <p className="text-gray-400 text-sm md:text-base uppercase tracking-wider">Long-Term Use</p>
            </div>
          </div>
        </div>
      </section>

      {/* PRODUCTS SECTION */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <SectionHeading 
            title="OUR PRECAST SOLUTIONS" 
            subtitle="Reliable precast solutions designed for strength, durability and faster construction."
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 mt-16">
            {products.slice(0, 6).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="text-center mt-16">
            <Link to="/products">
              <Button variant="outline" size="lg">VIEW ALL PRODUCTS</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#F4C522] opacity-5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#8B1E1E] opacity-5 rounded-full blur-3xl"></div>
        
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <SectionHeading 
            title="WHY CHOOSE RUDRA PRECAST?" 
            align="center"
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
            {features.map((feature, idx) => (
              <div key={idx} className="bg-white border border-gray-100 p-8 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 group">
                <div className="w-14 h-14 bg-gray-50 group-hover:bg-[#8B1E1E] rounded-lg flex items-center justify-center mb-6 transition-colors duration-300">
                  <feature.icon size={28} className="text-[#1A2A3A] group-hover:text-white transition-colors duration-300" />
                </div>
                <div className="text-gray-300 font-oswald text-4xl font-bold absolute top-6 right-8 opacity-50 group-hover:opacity-10 transition-opacity">
                  0{idx + 1}
                </div>
                <h3 className="text-xl font-bold font-oswald text-[#1A2A3A] mb-4">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-24 bg-[#1A2A3A] text-white overflow-hidden">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-oswald tracking-tight mb-4 uppercase">
              HOW IT WORKS
            </h2>
            <div className="h-1.5 w-20 bg-[#F4C522] mx-auto"></div>
          </div>

          <div className="relative max-w-5xl mx-auto">
            {/* Line for desktop */}
            <div className="hidden lg:block absolute top-1/2 left-0 w-full h-0.5 bg-white/20 -translate-y-1/2 z-0"></div>
            {/* Line for mobile */}
            <div className="lg:hidden absolute left-8 top-0 bottom-0 w-0.5 bg-white/20 z-0"></div>

            <div className="flex flex-col lg:flex-row gap-12 lg:gap-0 justify-between relative z-10">
              {[
                { step: "01", title: "Share Requirement" },
                { step: "02", title: "Site Measurement" },
                { step: "03", title: "Quotation" },
                { step: "04", title: "Manufacturing" },
                { step: "05", title: "Installation" },
              ].map((item, idx) => (
                <div key={idx} className="flex flex-row lg:flex-col items-center gap-6 lg:gap-6 relative">
                  <div className="w-16 h-16 rounded-full bg-[#8B1E1E] flex items-center justify-center font-oswald font-bold text-2xl border-4 border-[#1A2A3A] shadow-xl shrink-0">
                    {item.step}
                  </div>
                  <h4 className="text-lg font-bold uppercase tracking-wider text-center max-w-[120px]">{item.title}</h4>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <TestimonialsSection />

      {/* FINAL CTA */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="bg-[#FDFDFD] border border-gray-200 rounded-3xl p-10 md:p-16 lg:p-20 text-center max-w-5xl mx-auto shadow-2xl relative overflow-hidden">
            {/* Subtle background pattern */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#1A2A3A 2px, transparent 2px)', backgroundSize: '30px 30px' }}></div>
            
            <div className="relative z-10">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold font-oswald text-[#1A2A3A] uppercase tracking-tight mb-6">
                BUILD YOUR BOUNDARY WITH CONFIDENCE.
              </h2>
              <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
                Tell us about your project and our team will help you with the right precast solution.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/contact">
                  <Button size="lg" className="w-full sm:w-auto h-14 text-lg">
                    GET FREE QUOTE
                  </Button>
                </Link>
                <a href={whatsappLink} target="_blank" rel="noreferrer">
                  <Button size="lg" variant="whatsapp" className="w-full sm:w-auto h-14 text-lg flex items-center gap-2">
                    <MessageCircle size={20} />
                    WHATSAPP US
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
