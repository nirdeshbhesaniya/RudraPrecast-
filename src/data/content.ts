export const projects = [
  {
    id: "pj1",
    title: "Industrial Estate Boundary",
    location: "Hubballi, Karnataka",
    category: "INDUSTRIAL",
    product: "Pre-Stressed RCC Wall",
    image: "https://images.unsplash.com/photo-1587293852726-70cdb56c2866?auto=format&fit=crop&q=80&w=800",
    description: "Project details will be added here."
  },
  {
    id: "pj2",
    title: "Residential Society Enclosure",
    location: "Dharwad, Karnataka",
    category: "RESIDENTIAL",
    product: "Folding Compound Wall",
    image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&q=80&w=800",
    description: "Project details will be added here."
  },
  {
    id: "pj3",
    title: "Commercial Logistics Hub",
    location: "Belagavi, Karnataka",
    category: "COMPOUND WALLS",
    product: "RCC Compound Wall",
    image: "https://images.unsplash.com/photo-1428515613728-6b4607e44363?auto=format&fit=crop&q=80&w=800",
    description: "Project details will be added here."
  },
  {
    id: "pj4",
    title: "Highway Construction Camp",
    location: "Pune-Bengaluru Highway",
    category: "SITE OFFICE",
    product: "Precast Site Office & Labour Quarters",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800",
    description: "Project details will be added here."
  },
  {
    id: "pj5",
    title: "Factory Perimeter Securing",
    location: "Hubballi Industrial Area",
    category: "INDUSTRIAL",
    product: "RCC Compound Wall",
    image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&q=80&w=800",
    description: "Project details will be added here."
  },
  {
    id: "pj6",
    title: "Agricultural Land Fencing",
    location: "Rural Dharwad",
    category: "COMPOUND WALLS",
    product: "Precast Compound Wall",
    image: "https://images.unsplash.com/photo-1531834685032-c34bf0d84c77?auto=format&fit=crop&q=80&w=800",
    description: "Project details will be added here."
  }
];

export type Testimonial = {
  id: string;
  author: string;
  company: string;
  review: string;
  rating: number; // 1-5
  image: string; // empty string if none
};

export const testimonials: Testimonial[] = [
  {
    id: "t1",
    author: "Rahul Desai",
    company: "Desai Developers",
    review: "Rudra Precast delivered exceptional compound walls for our entire residential layout in Hubballi. The speed of installation and finish quality saved us weeks of labor. Highly recommend!",
    rating: 5,
    image: ""
  },
  {
    id: "t2",
    author: "Sneha Kulkarni",
    company: "Kulkarni Farms",
    review: "We needed a secure and tall boundary for our farm outside Dharwad. The folding compound walls from Rudra were incredibly sturdy and cost-effective compared to traditional brickwork.",
    rating: 5,
    image: ""
  },
  {
    id: "t3",
    author: "Vikram Reddy",
    company: "VR Logistics Hub",
    review: "Excellent service from quotation to installation. The team is professional, and their pre-stressed RCC walls are industrial-grade tough. We are very satisfied with the result.",
    rating: 4,
    image: ""
  }
];

export const faqs = [
  {
    question: "What is a precast compound wall?",
    answer: "A precast compound wall is constructed using concrete panels and posts that are manufactured in a controlled factory environment. Once cured and finished, these components are transported to the site and quickly assembled, providing a robust boundary much faster than traditional brick walls."
  },
  {
    question: "What types of compound walls do you provide?",
    answer: "We manufacture and install a variety of walls including standard RCC Compound Walls, Pre-Stressed RCC Walls, Folding Compound Walls, and general Precast Compound Walls tailored for different security and aesthetic needs."
  },
  {
    question: "What heights and sizes are available?",
    answer: "Our compound walls typically range from 4ft to 10ft in height above ground level. Custom dimensions can be accommodated depending on the scale and specific requirements of your project."
  },
  {
    question: "Do you provide installation?",
    answer: "Yes, we provide complete end-to-end services. Our experienced installation teams ensure that the posts are securely set and panels are perfectly aligned for maximum strength and durability."
  },
  {
    question: "Do you provide transportation?",
    answer: "Yes, we handle the logistics and safe transportation of the precast materials from our manufacturing facility in Hubballi directly to your project site."
  },
  {
    question: "Can products be customized?",
    answer: "Yes, certain customizations regarding height, panel thickness, and textured finishes can be provided based on project requirements. Please contact our sales team to discuss specifics."
  },
  {
    question: "Which areas do you serve?",
    answer: "We primarily serve Hubballi, Dharwad, Belagavi, and surrounding regions in Karnataka along the Pune-Bengaluru corridor. For large projects, we can expand our service radius."
  },
  {
    question: "How can I request a quotation?",
    answer: "You can request a quotation by filling out the 'Get Quote' form on our website, messaging us directly on WhatsApp, or calling our contact numbers. Please provide details like product type, length required, and site location."
  },
  {
    question: "How long does installation take?",
    answer: "Installation time depends on the total running length and site conditions. However, precast wall installation is significantly faster than traditional masonry, often covering upwards of 100-150 running feet per day under normal conditions."
  },
  {
    question: "What information is required for a quotation?",
    answer: "To provide an accurate estimate, we typically need to know: the type of wall required, desired height above ground, total running length, site location, and whether you need transportation and installation services."
  }
];
