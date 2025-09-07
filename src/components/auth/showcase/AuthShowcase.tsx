// components/auth/AuthShowcase.tsx
import { memo } from 'react';
import BrandSection from './BrandSection';
import FeatureSlider from './FeatureSlider';
import TrustIndicators from './TrustIndicators';
import CustomerLogos from './CustomerLogos';

// Types
interface Feature {
  icon: string;
  title: string;
  description: string;
  color?: string; // SignUp için isteğe bağlı
  stats?: string; // SignIn için isteğe bağlı
}

interface TrustIndicator {
  value: string;
  label: string;
}

interface BrandInfo {
  name: string;
  tagline: string;
  logoIcon?: React.ReactNode;
}

interface AuthShowcaseProps {
  features: Feature[];
  currentFeature: number;
  onFeatureChange: (index: number) => void;
  brandInfo: BrandInfo;
  trustIndicators: TrustIndicator[];
  testimonialText: string;
  logoCount: number;
  variant?: 'signin' | 'signup'; // Hangi sayfada olduğunu belirtir
}

const AuthShowcase = memo(function AuthShowcase({
  features,
  currentFeature,
  onFeatureChange,
  brandInfo,
  trustIndicators,
  testimonialText,
  logoCount,
  variant = 'signin'
}: AuthShowcaseProps) {
  return (
    <div className="hidden lg:flex flex-1 items-center justify-center p-8 bg-gray-50">
      <div className="max-w-lg w-full">
        <BrandSection 
          brandInfo={brandInfo}
          variant={variant}
        />
        
        <FeatureSlider 
          features={features}
          currentFeature={currentFeature}
          onFeatureChange={onFeatureChange}
          variant={variant}
        />
        
        <TrustIndicators indicators={trustIndicators} />
        
        <CustomerLogos 
          testimonialText={testimonialText}
          logoCount={logoCount}
        />
      </div>
    </div>
  );
});

export default AuthShowcase;