// components/auth/CustomerLogos.tsx
import { memo } from 'react';

interface CustomerLogosProps {
  testimonialText: string;
  logoCount: number;
}

const CustomerLogos = memo(function CustomerLogos({ 
  testimonialText, 
  logoCount 
}: CustomerLogosProps) {
  return (
    <div className="mt-12 pt-8 border-t border-gray-200">
      <p className="text-center text-gray-500 font-semibold text-sm mb-6">
        {testimonialText}
      </p>
      <div className="flex items-center justify-center space-x-8 opacity-60">
        {Array.from({ length: logoCount }).map((_, index) => (
          <div 
            key={index} 
            className="w-12 h-8 bg-gray-300 rounded animate-pulse"
            aria-label={`Partner logo ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
});

export default CustomerLogos;