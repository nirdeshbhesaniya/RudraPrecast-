import { useState } from "react";
import { SectionHeading } from "@/src/components/ui/SectionHeading";
import { useAppData } from "@/src/context/DataContext";
import { MapPin } from "lucide-react";
import { cn } from "@/src/lib/utils";
import { Lightbox } from "@/src/components/ui/Lightbox";

const categories = ["ALL", "COMPOUND WALLS", "INDUSTRIAL", "RESIDENTIAL", "SITE OFFICE"];

export function Projects() {
  const { data: { projects } } = useAppData();
  const [activeCategory, setActiveCategory] = useState("ALL");
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const filteredProjects = activeCategory === "ALL" 
    ? projects 
    : projects.filter(p => p.category === activeCategory);

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  return (
    <div className="py-20 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <SectionHeading 
          title="OUR PROJECTS" 
          subtitle="Explore our portfolio of successfully completed precast installations across Karnataka."
        />

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={cn(
                "px-5 py-2 rounded-full text-sm font-semibold tracking-wider transition-colors",
                activeCategory === cat 
                  ? "bg-[#1A2A3A] text-white" 
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, idx) => (
            <div 
              key={project.id} 
              className="group relative rounded-xl overflow-hidden bg-gray-100 aspect-[4/3] cursor-pointer"
              onClick={() => openLightbox(idx)}
            >
              <img 
                src={project.image} 
                alt={project.title} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                <span className="text-[#F4C522] text-xs font-bold tracking-wider mb-2">{project.category}</span>
                <h3 className="text-white font-oswald text-2xl font-bold mb-1">{project.title}</h3>
                <div className="flex items-center gap-1.5 text-gray-300 text-sm">
                  <MapPin size={14} /> {project.location}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <Lightbox 
        isOpen={lightboxOpen} 
        images={filteredProjects.map(p => p.image)} 
        currentIndex={lightboxIndex}
        onClose={() => setLightboxOpen(false)}
        onNavigate={setLightboxIndex}
      />
    </div>
  );
}
