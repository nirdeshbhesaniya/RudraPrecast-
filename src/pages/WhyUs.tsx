import { SectionHeading } from "@/src/components/ui/SectionHeading";
import { ShieldCheck, Clock, IndianRupee, Layers, CloudSun, Wrench } from "lucide-react";
import { useAppData } from "@/src/context/DataContext";

const features = [
  { icon: ShieldCheck, title: "STRONG & DURABLE", desc: "Manufactured with high-grade concrete (M30/M40) and reinforced high yield strength steel for maximum structural integrity. Built to last generations." },
  { icon: Clock, title: "QUICK INSTALLATION", desc: "Precast panels allow for rapid assembly, significantly reducing project completion time. We can install upwards of 100-150 running feet per day." },
  { icon: IndianRupee, title: "COST EFFECTIVE", desc: "Highly economical compared to traditional brickwork. Saves on material, transport, and labour costs, with almost zero long-term maintenance required." },
  { icon: Wrench, title: "LOW MAINTENANCE", desc: "Unlike brick walls that require regular painting and plastering, our precast products require practically zero maintenance and retain their finish for decades." },
  { icon: CloudSun, title: "WEATHER RESISTANT", desc: "Engineered to withstand extreme weather conditions, including heavy rain, harsh sun, and high winds without deteriorating or weakening." },
  { icon: Layers, title: "COMPLETE PROJECT SUPPORT", desc: "From initial site measurement and quotation to manufacturing, transportation, and final installation, our expert team handles everything end-to-end." },
];

export function WhyUs() {
  const { data: { siteConfig } } = useAppData();
  return (
    <div className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 md:px-6">
        <SectionHeading 
          title="WHY CHOOSE RUDRA PRECAST?" 
          subtitle="We combine superior engineering with rapid deployment to deliver the best value for your construction projects."
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16 max-w-6xl mx-auto">
          {features.map((feature, idx) => (
            <div key={idx} className="bg-white border border-gray-100 p-10 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 group">
              <div className="w-16 h-16 bg-[#FDFDFD] border border-gray-100 group-hover:bg-[#8B1E1E] group-hover:border-[#8B1E1E] rounded-xl flex items-center justify-center mb-8 transition-colors duration-300 shadow-sm">
                <feature.icon size={32} className="text-[#1A2A3A] group-hover:text-white transition-colors duration-300" />
              </div>
              <h3 className="text-2xl font-bold font-oswald text-[#1A2A3A] mb-4 group-hover:text-[#8B1E1E] transition-colors">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
