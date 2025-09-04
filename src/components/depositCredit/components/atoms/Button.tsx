import React from "react";
import { Button as ShadcnButton } from "@/components/ui/button";
import { LucideIcon } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  isLoading?: boolean;
  icon?: LucideIcon;
}

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors disabled:opacity-50 disabled:pointer-events-none",
  {
    variants: {
      variant: {
        default: "bg-green-600 text-white hover:bg-green-700",
        outline: "border border-green-200 text-green-700 hover:bg-green-50",
        ghost: "text-green-700 hover:bg-green-100",
      },
      size: {
        default: "h-10 py-2 px-4",
        sm: "h-9 px-3 rounded-md",
        lg: "h-11 px-8 rounded-md",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export const Button: React.FC<ButtonProps> = ({ 
  className,
  children,
  isLoading,
  disabled,
  icon: Icon,
  variant,
  size,
  ...props 
}) => {
  return (
    <ShadcnButton
      className={buttonVariants({ variant, size, className })}
      disabled={isLoading || disabled}
      {...props}
    >
      {isLoading ? (
        <>İşleniyor...</>
      ) : (
        <>
          {children}
          {Icon && <Icon className="ml-2 h-4 w-4" />}
        </>
      )}
    </ShadcnButton>
  );
};
