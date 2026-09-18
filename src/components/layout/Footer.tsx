import { Link } from "react-router-dom";
import { useAppData } from "@/src/context/DataContext";
import { MapPin, Phone, Mail, Instagram, Facebook, Twitter, Linkedin } from "lucide-react";

export function Footer() {
  const { data: { siteConfig } } = useAppData();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#111C27] text-gray-300 pt-16 pb-24 md:pb-8">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-12">
          
          {/* Brand Col */}
          <div className="flex flex-col gap-6">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-10 h-10 bg-[#8B1E1E] text-white flex items-center justify-center font-oswald font-bold text-2xl rounded-sm">
                R
              </div>
              <div className="flex flex-col">
                <span className="font-oswald font-bold text-2xl tracking-wider text-white leading-none uppercase">
                  Rudra
                </span>
                <span className="font-inter font-semibold text-xs tracking-[0.2em] text-[#F4C522] leading-none mt-1">
                  PRECAST
                </span>
              </div>
            </Link>
            <p className="text-gray-400">
              {siteConfig.description}
            </p>
            <div className="flex gap-4 mt-2">
              <a href={siteConfig.socialLinks.facebook} className="w-10 h-10 bg-white/5 hover:bg-[#8B1E1E] flex items-center justify-center rounded-full transition-colors text-white">
                <Facebook size={18} />
              </a>
              <a href={siteConfig.socialLinks.instagram} className="w-10 h-10 bg-white/5 hover:bg-[#8B1E1E] flex items-center justify-center rounded-full transition-colors text-white">
                <Instagram size={18} />
              </a>
              <a href={siteConfig.socialLinks.linkedin} className="w-10 h-10 bg-white/5 hover:bg-[#8B1E1E] flex items-center justify-center rounded-full transition-colors text-white">
                <Linkedin size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-oswald text-xl uppercase mb-6 tracking-wide relative after:content-[''] after:absolute after:-bottom-2 after:left-0 after:w-10 after:h-0.5 after:bg-[#8B1E1E]">Quick Links</h3>
            <ul className="flex flex-col gap-3">
              {siteConfig.navLinks.slice(1).map((link) => (
                <li key={link.name}>
                  <Link to={link.href} className="hover:text-white transition-colors flex items-center gap-2">
                    <span className="text-[#8B1E1E] text-lg leading-none">›</span> {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Products */}
          <div>
            <h3 className="text-white font-oswald text-xl uppercase mb-6 tracking-wide relative after:content-[''] after:absolute after:-bottom-2 after:left-0 after:w-10 after:h-0.5 after:bg-[#8B1E1E]">Our Products</h3>
            <ul className="flex flex-col gap-3">
              <li><Link to="/products" className="hover:text-white transition-colors">RCC Compound Wall</Link></li>
              <li><Link to="/products" className="hover:text-white transition-colors">Pre-Stressed RCC Wall</Link></li>
              <li><Link to="/products" className="hover:text-white transition-colors">Folding Compound Wall</Link></li>
              <li><Link to="/products" className="hover:text-white transition-colors">Site Office</Link></li>
              <li><Link to="/products" className="hover:text-white transition-colors">Labour Quarters</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-oswald text-xl uppercase mb-6 tracking-wide relative after:content-[''] after:absolute after:-bottom-2 after:left-0 after:w-10 after:h-0.5 after:bg-[#8B1E1E]">Contact Us</h3>
            <ul className="flex flex-col gap-4">
              <li className="flex gap-3 items-start">
                <MapPin className="text-[#8B1E1E] shrink-0 mt-1" size={20} />
                <span className="text-sm">
                  {siteConfig.contact.address.line1}<br />
                  {siteConfig.contact.address.line2}<br />
                  {siteConfig.contact.address.line3}
                </span>
              </li>
              <li className="flex gap-3 items-center">
                <Phone className="text-[#8B1E1E] shrink-0" size={20} />
                <div className="flex flex-col">
                  {siteConfig.contact.phones.map((phone) => (
                    <a key={phone.number} href={`tel:${phone.number}`} className="hover:text-white transition-colors">
                      {phone.display}
                    </a>
                  ))}
                </div>
              </li>
              <li className="flex gap-3 items-center">
                <Mail className="text-[#8B1E1E] shrink-0" size={20} />
                <a href={`mailto:${siteConfig.contact.email}`} className="hover:text-white transition-colors">
                  {siteConfig.contact.email}
                </a>
              </li>
            </ul>
          </div>

        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-500">
          <p>© {currentYear} Rudra Precast. All Rights Reserved.</p>
          <div className="flex items-center gap-6">
            <Link to="#" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="#" className="hover:text-white transition-colors">Terms & Conditions</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
