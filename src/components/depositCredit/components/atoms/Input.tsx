import React from "react";
import { Input as ShadcnInput } from "@/components/ui/input";
import { cn } from "../../utils/cn";

export const Input: React.FC<React.InputHTMLAttributes<HTMLInputElement>> = ({ className, ...props }) => {
  return (
    <ShadcnInput 
      className={cn(
        "border-green-200 focus:border-green-500 focus:ring-green-500 dark:border-green-900/50",
        className
      )} 
      {...props} 
    />
  );
};
