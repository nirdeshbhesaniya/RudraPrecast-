import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

interface LightboxProps {
  isOpen: boolean;
  images: string[];
  currentIndex: number;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export function Lightbox({ isOpen, images, currentIndex, onClose, onNavigate }: LightboxProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onNavigate((currentIndex - 1 + images.length) % images.length);
      if (e.key === "ArrowRight") onNavigate((currentIndex + 1) % images.length);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, currentIndex, images.length, onClose, onNavigate]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center backdrop-blur-sm"
        >
          {/* Close button */}
          <button 
            onClick={onClose}
            className="absolute top-6 right-6 z-[110] text-white/70 hover:text-white bg-black/20 hover:bg-black/40 rounded-full p-2 transition-all"
          >
            <X size={32} />
          </button>

          {/* Navigation Prev */}
          {images.length > 1 && (
            <button 
              onClick={(e) => { e.stopPropagation(); onNavigate((currentIndex - 1 + images.length) % images.length); }}
              className="absolute left-6 z-[110] text-white/70 hover:text-white bg-black/20 hover:bg-black/40 rounded-full p-3 transition-all"
            >
              <ChevronLeft size={36} />
            </button>
          )}

          {/* Main Image Container */}
          <div 
            className="relative w-full h-full flex items-center justify-center p-4 md:p-12"
            onClick={onClose} // Click outside to close
          >
            <motion.img 
              key={currentIndex}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              src={images[currentIndex]} 
              alt="Gallery Image" 
              className="max-w-full max-h-full object-contain drop-shadow-2xl rounded-sm"
              onClick={(e) => e.stopPropagation()} // Prevent close when clicking image
            />
          </div>

          {/* Navigation Next */}
          {images.length > 1 && (
            <button 
              onClick={(e) => { e.stopPropagation(); onNavigate((currentIndex + 1) % images.length); }}
              className="absolute right-6 z-[110] text-white/70 hover:text-white bg-black/20 hover:bg-black/40 rounded-full p-3 transition-all"
            >
              <ChevronRight size={36} />
            </button>
          )}

          {/* Counter */}
          {images.length > 1 && (
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/80 font-inter tracking-widest text-sm bg-black/40 px-4 py-2 rounded-full">
              {currentIndex + 1} / {images.length}
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
