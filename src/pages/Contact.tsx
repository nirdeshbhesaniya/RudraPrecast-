import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { SectionHeading } from "@/src/components/ui/SectionHeading";
import { useAppData } from "@/src/context/DataContext";
import { Button } from "@/src/components/ui/Button";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

export function Contact() {
  const { data: { siteConfig } } = useAppData();
  const [searchParams] = useSearchParams();
  const productParam = searchParams.get("product");
  const subjectParam = searchParams.get("subject");
  const messageParam = searchParams.get("message");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    location: "",
    product: productParam || "",
    length: "",
    details: messageParam || ""
  });

  const { data, saveData } = useAppData();
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (productParam) {
      setFormData(prev => ({ ...prev, product: productParam }));
    }
    if (messageParam) {
      setFormData(prev => ({ ...prev, details: messageParam }));
    }
  }, [productParam, messageParam]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const newLead = {
      id: Math.random().toString(36).substring(2, 9),
      ...formData,
      createdAt: new Date().toISOString()
    };

    const updatedData = {
      ...data,
      leads: [newLead, ...(data.leads || [])]
    };

    await saveData(updatedData);
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 md:px-6 max-w-6xl">
        <SectionHeading 
          title="CONTACT & QUOTATION" 
          subtitle="Get in touch with us for a free estimate or to discuss your project requirements."
        />
        
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-12 mt-16">
          
          {/* Contact Info */}
          <div className="flex flex-col gap-8">
            <div className="bg-[#1A2A3A] p-8 rounded-2xl text-white shadow-xl">
              <h3 className="text-2xl font-oswald font-bold mb-8 uppercase tracking-wide">Contact Details</h3>
              
              <div className="flex flex-col gap-6">
                <div className="flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                    <Phone size={20} className="text-[#F4C522]" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400 font-semibold uppercase tracking-wider mb-1">Call Us</p>
                    {siteConfig.contact.phones.map(phone => (
                      <a key={phone.number} href={`tel:${phone.number}`} className="block text-lg hover:text-[#F4C522] transition-colors">{phone.display} ({phone.name})</a>
                    ))}
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                    <MapPin size={20} className="text-[#F4C522]" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400 font-semibold uppercase tracking-wider mb-1">Factory & Office</p>
                    <p className="text-lg text-gray-200">
                      {siteConfig.contact.address.line1}<br/>
                      {siteConfig.contact.address.line2}<br/>
                      {siteConfig.contact.address.line3}
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                    <Mail size={20} className="text-[#F4C522]" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400 font-semibold uppercase tracking-wider mb-1">Email</p>
                    <a href={`mailto:${siteConfig.contact.email}`} className="text-lg hover:text-[#F4C522] transition-colors">{siteConfig.contact.email}</a>
                  </div>
                </div>
                
                <div className="flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                    <Clock size={20} className="text-[#F4C522]" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400 font-semibold uppercase tracking-wider mb-1">Working Hours</p>
                    <p className="text-lg text-gray-200">{siteConfig.contact.workingHours}</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Google Map */}
            <div className="bg-gray-200 rounded-2xl h-64 overflow-hidden relative border border-gray-300">
              <iframe
                title="Company Location Map"
                width="100%"
                height="100%"
                frameBorder="0"
                style={{ border: 0 }}
                src={`https://maps.google.com/maps?q=${encodeURIComponent(
                  `${siteConfig.contact.address.line1} ${siteConfig.contact.address.line2} ${siteConfig.contact.address.line3}`
                )}&t=&z=14&ie=UTF8&iwloc=&output=embed`}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>

          {/* Form */}
          <div className="bg-white p-8 md:p-12 rounded-2xl shadow-xl border border-gray-100">
            <h3 className="text-3xl font-oswald font-bold text-[#1A2A3A] mb-8 uppercase">Request Free Quote</h3>
            
            {isSubmitted ? (
              <div className="bg-green-50 border border-green-200 text-green-800 p-8 rounded-xl text-center">
                <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                </div>
                <h4 className="text-2xl font-bold font-oswald mb-2">Thank you!</h4>
                <p>Your enquiry has been received. Our team will contact you shortly.</p>
                <Button className="mt-6" onClick={() => setIsSubmitted(false)}>Submit Another Request</Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="name" className="text-sm font-semibold text-gray-700 uppercase tracking-wider">Full Name *</label>
                    <input required type="text" id="name" name="name" value={formData.name} onChange={handleChange} className="h-12 px-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#8B1E1E] focus:border-transparent bg-gray-50 focus:bg-white transition-all" placeholder="Enter your name" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="phone" className="text-sm font-semibold text-gray-700 uppercase tracking-wider">Mobile Number *</label>
                    <input required type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} className="h-12 px-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#8B1E1E] focus:border-transparent bg-gray-50 focus:bg-white transition-all" placeholder="Enter 10-digit number" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="location" className="text-sm font-semibold text-gray-700 uppercase tracking-wider">Project Location *</label>
                    <input required type="text" id="location" name="location" value={formData.location} onChange={handleChange} className="h-12 px-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#8B1E1E] focus:border-transparent bg-gray-50 focus:bg-white transition-all" placeholder="City / Area" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="product" className="text-sm font-semibold text-gray-700 uppercase tracking-wider">Product Required *</label>
                    <select required id="product" name="product" value={formData.product} onChange={handleChange} className="h-12 px-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#8B1E1E] focus:border-transparent bg-gray-50 focus:bg-white transition-all">
                      <option value="">Select a product</option>
                      <option value="rcc-compound-wall">RCC Compound Wall</option>
                      <option value="pre-stressed-rcc-wall">Pre-Stressed RCC Wall</option>
                      <option value="folding-compound-wall">Folding Compound Wall</option>
                      <option value="precast-compound-wall">Precast Compound Wall</option>
                      <option value="site-office">Site Office</option>
                      <option value="labour-quarter">Labour Quarter</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="length" className="text-sm font-semibold text-gray-700 uppercase tracking-wider">Approximate Length / Area</label>
                  <input type="text" id="length" name="length" value={formData.length} onChange={handleChange} className="h-12 px-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#8B1E1E] focus:border-transparent bg-gray-50 focus:bg-white transition-all" placeholder="e.g. 500 running feet" />
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="details" className="text-sm font-semibold text-gray-700 uppercase tracking-wider">Additional Requirements</label>
                  <textarea id="details" name="details" value={formData.details} onChange={handleChange} rows={4} className="p-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#8B1E1E] focus:border-transparent bg-gray-50 focus:bg-white transition-all resize-none" placeholder="Tell us more about your project..."></textarea>
                </div>

                <Button type="submit" size="lg" className="w-full h-14 text-lg mt-2">
                  REQUEST FREE QUOTE
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
