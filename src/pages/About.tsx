import { SectionHeading } from "@/src/components/ui/SectionHeading";
import { useAppData } from "@/src/context/DataContext";

export function About() {
  const { data: { siteConfig } } = useAppData();
  return (
    <div className="py-20 bg-white">
      <div className="container mx-auto px-4 md:px-6 max-w-5xl">
        <SectionHeading title={`ABOUT ${siteConfig.name.toUpperCase()}`} subtitle="Pioneers in high-quality precast concrete manufacturing." align="center" />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-16 items-center">
          <div>
            <img src="https://images.unsplash.com/photo-1428515613728-6b4607e44363?auto=format&fit=crop&q=80&w=800" alt="Factory" className="rounded-xl shadow-lg" />
          </div>
          <div>
            <h3 className="text-2xl font-bold font-oswald text-[#1A2A3A] mb-4">OUR STORY</h3>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Based in Hubballi, Karnataka, Rudra Precast has established itself as a trusted name in the precast concrete industry. We specialize in engineering and manufacturing robust precast walls, site offices, and labour quarters.
            </p>
            <p className="text-gray-600 leading-relaxed mb-6">
              Our state-of-the-art manufacturing facility ensures that every panel and post we produce meets strict quality standards. We believe in providing solutions that are not only strong and durable but also cost-effective and rapidly deployable.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-20">
          <div className="bg-gray-50 p-10 rounded-2xl border border-gray-100">
            <h3 className="text-2xl font-bold font-oswald text-[#1A2A3A] mb-4 text-center">OUR MISSION</h3>
            <p className="text-gray-600 text-center leading-relaxed">
              To deliver superior quality precast concrete products that accelerate construction timelines, reduce costs, and provide uncompromising security and durability to our clients' projects.
            </p>
          </div>
          <div className="bg-gray-50 p-10 rounded-2xl border border-gray-100">
            <h3 className="text-2xl font-bold font-oswald text-[#1A2A3A] mb-4 text-center">OUR VISION</h3>
            <p className="text-gray-600 text-center leading-relaxed">
              To be the leading precast manufacturer in India, recognized for our commitment to engineering excellence, innovation, and unwavering reliability in the construction sector.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
