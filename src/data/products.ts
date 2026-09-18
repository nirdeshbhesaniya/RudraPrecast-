export type Product = {
  id: string;
  slug: string;
  name: string;
  shortDescription: string;
  applications: string[];
  image: string;
  gallery: string[];
  overview: string;
  keyBenefits: string[];
  specifications: Record<string, string>;
  featured?: boolean;
};

export const products: Product[] = [
  {
    id: "p1",
    slug: "rcc-compound-wall",
    name: "RCC Compound Wall",
    shortDescription: "Heavy-duty reinforced concrete compound walls for maximum security.",
    applications: ["Industrial", "Commercial", "Residential"],
    image: "https://images.unsplash.com/photo-1531834685032-c34bf0d84c77?auto=format&fit=crop&q=80&w=800",
    gallery: [
      "https://images.unsplash.com/photo-1531834685032-c34bf0d84c77?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&q=80&w=1200"
    ],
    overview: "Our standard RCC Compound Walls are engineered for high impact resistance and long-lasting security. Ideal for enclosing large industrial complexes or securing residential boundaries with zero compromise on strength.",
    keyBenefits: [
      "High impact resistance",
      "Zero maintenance required",
      "Weather-proof finish",
      "Fast installation process"
    ],
    specifications: {
      "Material": "Reinforced Cement Concrete",
      "Height": "4ft to 10ft (Customizable)",
      "Width": "Contact us for specifications",
      "Thickness": "Contact us for specifications",
      "Concrete Grade": "M30 / M40",
      "Reinforcement": "High Yield Strength Deformed Bars",
      "Finish": "Smooth / Textured",
      "Customization": "Available upon request",
      "Installation": "Provided by expert team",
      "Warranty": "Contact us for specifications"
    }
  },
  {
    id: "p2",
    slug: "pre-stressed-rcc-wall",
    name: "Pre-Stressed RCC Wall",
    shortDescription: "Advanced pre-stressed technology for thinner yet stronger panels.",
    applications: ["Large Estates", "High-Security Zones"],
    image: "https://images.unsplash.com/photo-1518458028785-8fbcd101ebb9?auto=format&fit=crop&q=80&w=800",
    gallery: [
      "https://images.unsplash.com/photo-1518458028785-8fbcd101ebb9?auto=format&fit=crop&q=80&w=1200"
    ],
    overview: "Utilizing modern pre-stressing techniques, these walls offer superior tensile strength while maintaining a slimmer profile, reducing transportation and material costs without sacrificing durability.",
    keyBenefits: [
      "Superior tensile strength",
      "Reduced panel weight",
      "Cost-effective for long boundaries",
      "Crack-resistant technology"
    ],
    specifications: {
      "Material": "Pre-Stressed Concrete",
      "Height": "6ft to 12ft",
      "Thickness": "Contact us for specifications",
      "Wire Type": "High Tensile Carbon Steel",
      "Concrete Grade": "M40+",
      "Installation": "Provided by expert team"
    }
  },
  {
    id: "p3",
    slug: "folding-compound-wall",
    name: "Folding Compound Wall",
    shortDescription: "Versatile and aesthetically pleasing folding panels for dynamic spaces.",
    applications: ["Residential", "Parks", "Institutions"],
    image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&q=80&w=800",
    gallery: [
      "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&q=80&w=1200"
    ],
    overview: "Folding compound walls offer a unique aesthetic with interlocking joints. They are particularly popular for residential societies and institutions where visual appeal is as important as security.",
    keyBenefits: [
      "Aesthetic interlocking design",
      "Easy to relocate if needed",
      "Excellent finish quality",
      "Varied texture options"
    ],
    specifications: {
      "Material": "Precast Concrete",
      "Height": "Contact us for specifications",
      "Design": "Folding/Interlocking Pattern",
      "Finish": "Premium Textured",
      "Installation": "Provided by expert team"
    }
  },
  {
    id: "p4",
    slug: "precast-compound-wall",
    name: "Precast Compound Wall",
    shortDescription: "Standard precast panels for rapid boundary construction.",
    applications: ["Agricultural Land", "Empty Plots", "Temporary Boundaries"],
    image: "https://images.unsplash.com/photo-1428515613728-6b4607e44363?auto=format&fit=crop&q=80&w=800",
    gallery: [
      "https://images.unsplash.com/photo-1428515613728-6b4607e44363?auto=format&fit=crop&q=80&w=1200"
    ],
    overview: "The most cost-effective and rapid solution for securing large plots of land. Manufactured in our controlled environment, ensuring consistent quality and rapid deployment on-site.",
    keyBenefits: [
      "Highly cost-effective",
      "Extremely fast installation",
      "Consistent factory quality",
      "Re-usable panels"
    ],
    specifications: {
      "Material": "Precast Concrete",
      "Height": "4ft to 8ft",
      "Concrete Grade": "M30",
      "Installation": "Provided by expert team"
    }
  },
  {
    id: "p5",
    slug: "site-office",
    name: "Site Office",
    shortDescription: "Durable, relocatable precast concrete site offices for projects.",
    applications: ["Construction Sites", "Remote Operations"],
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800",
    gallery: [
      "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1200"
    ],
    overview: "Replace fragile portable cabins with our solid precast site offices. They provide better temperature control, extreme durability, and can be dismantled and relocated to your next project.",
    keyBenefits: [
      "Superior thermal insulation",
      "Theft and weather resistant",
      "Fully relocatable",
      "Professional appearance"
    ],
    specifications: {
      "Material": "Precast Concrete Panels",
      "Dimensions": "Contact us for specifications",
      "Roofing": "Insulated Roofing Available",
      "Doors/Windows": "Standard Steel/Aluminium",
      "Installation": "Provided by expert team"
    }
  },
  {
    id: "p6",
    slug: "labour-quarter",
    name: "Labour Quarter",
    shortDescription: "Safe, solid, and quickly assembled housing for site workers.",
    applications: ["Large Construction Projects", "Factories"],
    image: "https://images.unsplash.com/photo-1493606371202-6275828f90f3?auto=format&fit=crop&q=80&w=800",
    gallery: [
      "https://images.unsplash.com/photo-1493606371202-6275828f90f3?auto=format&fit=crop&q=80&w=1200"
    ],
    overview: "Ensure the safety and comfort of your workforce with our precast labour quarters. Faster to build than brick-and-mortar, and significantly safer than temporary sheet structures.",
    keyBenefits: [
      "Rapid mass construction",
      "Fire and weather resistant",
      "Hygienic and easy to clean",
      "Cost-effective for large teams"
    ],
    specifications: {
      "Material": "Precast Concrete",
      "Layout": "Customizable multi-room configurations",
      "Ventilation": "Built-in provisions",
      "Installation": "Provided by expert team"
    }
  }
];
