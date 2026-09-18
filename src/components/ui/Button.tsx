import * as React from "react"
import { cn } from "@/src/lib/utils"

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'whatsapp';
  size?: 'sm' | 'md' | 'lg' | 'icon';
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', asChild = false, ...props }, ref) => {
    
    const variants = {
      primary: 'bg-[#8B1E1E] text-white hover:bg-[#6A1616] border border-transparent shadow-sm', // Deep Red
      secondary: 'bg-[#1A2A3A] text-white hover:bg-[#111C27] border border-transparent shadow-sm', // Deep Navy Blue
      whatsapp: 'bg-[#25D366] text-white hover:bg-[#20bd5a] border border-transparent shadow-sm', 
      outline: 'bg-transparent text-[#1A2A3A] border-2 border-[#1A2A3A] hover:bg-[#1A2A3A] hover:text-white',
      ghost: 'bg-transparent hover:bg-gray-100 text-[#1A2A3A]',
    };

    const sizes = {
      sm: 'h-9 px-4 text-sm',
      md: 'h-12 px-6 text-base font-medium',
      lg: 'h-14 px-8 text-lg font-semibold',
      icon: 'h-12 w-12 flex justify-center items-center',
    };

    return (
      <button
        className={cn(
          "inline-flex items-center justify-center whitespace-nowrap rounded-md transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8B1E1E] disabled:pointer-events-none disabled:opacity-50",
          variants[variant],
          sizes[size],
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button }
