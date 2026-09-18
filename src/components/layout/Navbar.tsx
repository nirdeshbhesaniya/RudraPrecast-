import { Link, useLocation } from "react-router-dom";
import { useAppData } from "@/src/context/DataContext";
import { Phone, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "@/src/lib/utils";
import { Button } from "../ui/Button";

export function Navbar() {
  const { data: { siteConfig } } = useAppData();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => { document.body.style.overflow = "unset"; };
  }, [isOpen]);

  return (
    <header 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-gray-100 bg-white",
        isScrolled ? "py-3 shadow-sm" : "py-5"
      )}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          
          {/* Logo */}
          <Link to="/" className="flex flex-col items-start gap-0.5 z-50 group">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 md:w-10 md:h-10 bg-[#8B1E1E] text-white flex items-center justify-center font-oswald font-bold text-xl md:text-2xl rounded-sm">
                R
              </div>
              <div className="flex flex-col">
                <span className="font-oswald font-bold text-xl md:text-2xl tracking-wider text-[#1A2A3A] leading-none uppercase group-hover:text-[#8B1E1E] transition-colors">
                  Rudra
                </span>
                <span className="font-inter font-semibold text-xs tracking-[0.2em] text-[#8B1E1E] leading-none mt-1">
                  PRECAST
                </span>
              </div>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {siteConfig.navLinks.map((link) => (
              <Link 
                key={link.name} 
                to={link.href}
                className={cn(
                  "text-sm font-semibold tracking-wide transition-colors hover:text-[#8B1E1E]",
                  location.pathname === link.href ? "text-[#8B1E1E]" : "text-[#1A2A3A]"
                )}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center gap-4">
            <a href={`tel:${siteConfig.contact.phones[0].number}`} className="flex items-center gap-2 text-[#1A2A3A] font-medium hover:text-[#8B1E1E] transition-colors">
              <Phone size={18} className="text-[#8B1E1E]" />
              <span>{siteConfig.contact.phones[0].display}</span>
            </a>
            <Link to="/contact">
              <Button size="sm">GET FREE QUOTE</Button>
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="lg:hidden z-50 p-2 text-[#1A2A3A]"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav Overlay */}
      <div 
        className={cn(
          "fixed inset-0 bg-white z-40 lg:hidden transition-transform duration-300 ease-in-out flex flex-col pt-24 px-6",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <nav className="flex flex-col gap-6">
          {siteConfig.navLinks.map((link) => (
            <Link 
              key={link.name} 
              to={link.href}
              className={cn(
                "text-2xl font-oswald uppercase tracking-wider",
                location.pathname === link.href ? "text-[#8B1E1E]" : "text-[#1A2A3A]"
              )}
            >
              {link.name}
            </Link>
          ))}
        </nav>
        
        <div className="mt-12 flex flex-col gap-4">
          <a href={`tel:${siteConfig.contact.phones[0].number}`} className="flex items-center gap-3 text-lg font-medium text-[#1A2A3A] p-4 bg-gray-50 rounded-lg">
            <Phone className="text-[#8B1E1E]" />
            Call: {siteConfig.contact.phones[0].display}
          </a>
          <Link to="/contact" className="w-full">
            <Button className="w-full text-lg h-14">GET FREE QUOTE</Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
