import { useState } from "react";
import { SectionHeading } from "@/src/components/ui/SectionHeading";
import { useAppData } from "@/src/context/DataContext";
import { ChevronDown } from "lucide-react";
import { cn } from "@/src/lib/utils";

export function FAQ() {
  const { data: { faqs } } = useAppData();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="py-20 bg-white">
      <div className="container mx-auto px-4 md:px-6 max-w-4xl">
        <SectionHeading 
          title="FREQUENTLY ASKED QUESTIONS" 
          subtitle="Find answers to common questions about our precast products, manufacturing process, and installation services."
        />
        
        <div className="mt-16 flex flex-col gap-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div 
                key={idx} 
                className={cn(
                  "border rounded-xl transition-all duration-300 overflow-hidden",
                  isOpen ? "border-[#1A2A3A] bg-gray-50 shadow-sm" : "border-gray-200 bg-white hover:border-gray-300"
                )}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full flex items-center justify-between p-6 text-left"
                >
                  <span className="font-semibold text-[#1A2A3A] text-lg pr-8">{faq.question}</span>
                  <div className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-transform duration-300",
                    isOpen ? "bg-[#1A2A3A] text-white rotate-180" : "bg-gray-100 text-gray-500"
                  )}>
                    <ChevronDown size={20} />
                  </div>
                </button>
                <div 
                  className={cn(
                    "overflow-hidden transition-all duration-300",
                    isOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
                  )}
                >
                  <div className="p-6 pt-0 text-gray-600 leading-relaxed border-t border-gray-100 mt-2">
                    {faq.answer}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
