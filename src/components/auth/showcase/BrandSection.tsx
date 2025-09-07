// components/auth/BrandSection.tsx
import { memo } from 'react';

interface BrandInfo {
  name: string;
  tagline: string;
  logoIcon?: React.ReactNode;
}

interface BrandSectionProps {
  brandInfo: BrandInfo;
  variant?: 'signin' | 'signup';
}

const BrandSection = memo(function BrandSection({ 
  brandInfo, 
  variant = 'signin' 
}: BrandSectionProps) {
  // Variant'a göre farklı icon göster
  const renderIcon = () => {
    if (brandInfo.logoIcon) {
      return brandInfo.logoIcon;
    }

    // Default iconlar
    if (variant === 'signup') {
      return (
        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
        </svg>
      );
    }

    // SignIn default icon
    return (
      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>
    );
  };

  return (
    <div className="text-center mb-12">
      <div className="inline-flex items-center justify-center w-16 h-16 bg-black rounded-2xl mb-6 shadow-lg">
        {renderIcon()}
      </div>
      <h2 className="text-4xl font-black text-gray-900 mb-4">
        {brandInfo.name}
      </h2>
      <p className="text-xl text-gray-600 font-medium">
        {brandInfo.tagline}
      </p>
    </div>
  );
});

export default BrandSection;