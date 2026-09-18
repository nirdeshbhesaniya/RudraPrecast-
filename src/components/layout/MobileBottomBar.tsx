import { Link } from "react-router-dom";
import { useAppData } from "@/src/context/DataContext";
import { Phone, MessageCircle } from "lucide-react";
import { cn } from "@/src/lib/utils";
import { useEffect, useState } from "react";

export function MobileBottomBar() {
  const { data: { siteConfig } } = useAppData();
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY && window.scrollY > 100) {
        setIsVisible(false); // hide on scroll down
      } else {
        setIsVisible(true); // show on scroll up
      }
      setLastScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const whatsappMessage = encodeURIComponent("Hello Rudra Precast, I am interested in your precast products. I would like to get a quotation for my project.");
  const whatsappLink = `https://wa.me/${siteConfig.contact.whatsapp}?text=${whatsappMessage}`;
  const phoneLink = `tel:${siteConfig.contact.phones[0].number}`;

  return (
    <>
      {/* Floating WhatsApp Desktop */}
      <a 
        href={whatsappLink} 
        target="_blank" 
        rel="noreferrer"
        className="hidden md:flex fixed bottom-6 right-6 z-50 w-14 h-14 bg-[#25D366] text-white rounded-full items-center justify-center shadow-lg hover:bg-[#20bd5a] hover:-translate-y-1 transition-all duration-300"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle size={28} />
      </a>

      {/* Mobile Action Bar */}
      <div 
        className={cn(
          "md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-[0_-4px_12px_rgba(0,0,0,0.05)] transition-transform duration-300 flex h-16",
          isVisible ? "translate-y-0" : "translate-y-full"
        )}
      >
        <a 
          href={phoneLink}
          className="flex-1 flex flex-col items-center justify-center gap-1 text-[#1A2A3A] active:bg-gray-50 border-r border-gray-200"
        >
          <Phone size={20} />
          <span className="text-[10px] font-bold uppercase tracking-wider">Call</span>
        </a>
        <a 
          href={whatsappLink}
          target="_blank"
          rel="noreferrer"
          className="flex-1 flex flex-col items-center justify-center gap-1 text-[#25D366] active:bg-green-50 border-r border-gray-200"
        >
          <MessageCircle size={20} />
          <span className="text-[10px] font-bold uppercase tracking-wider">WhatsApp</span>
        </a>
        <Link 
          to="/contact"
          className="flex-1 flex flex-col items-center justify-center gap-1 bg-[#8B1E1E] text-white active:bg-[#6A1616]"
        >
          <span className="text-xs font-bold uppercase tracking-wider px-2 text-center leading-tight">Get<br/>Quote</span>
        </Link>
      </div>
    </>
  );
}
