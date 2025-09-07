// components/auth/FeatureSlider.tsx
import { memo } from 'react';
import FeatureCard from './FeatureCard';

interface Feature {
  icon: string;
  title: string;
  description: string;
  color?: string;
  stats?: string;
}

interface FeatureSliderProps {
  features: Feature[];
  currentFeature: number;
  onFeatureChange: (index: number) => void;
  variant?: 'signin' | 'signup';
}

const FeatureSlider = memo(function FeatureSlider({ 
  features, 
  currentFeature, 
  onFeatureChange,
  variant = 'signin'
}: FeatureSliderProps) {
  return (
    <>
      {/* Feature Cards */}
      <div className="relative h-96">
        {features.map((feature, index) => (
          <FeatureCard
            key={index}
            feature={feature}
            isActive={index === currentFeature}
            variant={variant}
          />
        ))}
      </div>

      {/* Feature Indicators */}
      <div className="flex justify-center space-x-3 mt-8">
        {features.map((_, index) => (
          <button
            key={index}
            onClick={() => onFeatureChange(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentFeature 
                ? 'bg-gray-900 scale-125' 
                : 'bg-gray-300 hover:bg-gray-500'
            }`}
            aria-label={`Feature ${index + 1}`}
          />
        ))}
      </div>
    </>
  );
});

export default FeatureSlider;