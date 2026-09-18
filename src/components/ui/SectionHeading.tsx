import { cn } from "@/src/lib/utils";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
  className?: string;
}

export function SectionHeading({ title, subtitle, align = 'center', className }: SectionHeadingProps) {
  return (
    <div className={cn("mb-12", align === 'center' ? "text-center" : "text-left", className)}>
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#1A2A3A] tracking-tight mb-4 uppercase font-oswald">
        {title}
      </h2>
      {subtitle && (
        <p className={cn("text-lg text-gray-600 max-w-3xl", align === 'center' ? "mx-auto" : "")}>
          {subtitle}
        </p>
      )}
      <div className={cn("h-1.5 w-20 bg-[#F4C522] mt-6", align === 'center' ? "mx-auto" : "")}></div>
    </div>
  );
}
