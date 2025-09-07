// components/auth/FeatureCard.tsx
import { memo } from 'react';

interface Feature {
  icon: string;
  title: string;
  description: string;
  color?: string; // SignUp için gradient color
  stats?: string; // SignIn için stats
}

interface FeatureCardProps {
  feature: Feature;
  isActive: boolean;
  variant?: 'signin' | 'signup';
}

const FeatureCard = memo(function FeatureCard({ 
  feature, 
  isActive, 
  variant = 'signin' 
}: FeatureCardProps) {
  return (
    <div
      className={`absolute inset-0 transition-all duration-700 ease-in-out ${
        isActive
          ? 'opacity-100 transform translate-y-0 scale-100'
          : 'opacity-0 transform translate-y-10 scale-95'
      }`}
    >
      <div className="bg-white border border-gray-200 rounded-3xl p-8 h-full flex flex-col justify-center shadow-xl">
        {/* Icon Container */}
        <div className={`inline-flex items-center justify-center w-20 h-20 rounded-3xl mb-6 mx-auto border border-gray-200 ${
          variant === 'signup' && feature.color
            ? `bg-gradient-to-br ${feature.color}`
            : 'bg-gray-100'
        }`}>
          <span className={`text-3xl ${
            variant === 'signup' && feature.color ? 'text-white' : ''
          }`}>
            {feature.icon}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-2xl font-black text-gray-900 text-center mb-4">
          {feature.title}
        </h3>

        {/* Description */}
        <p className="text-gray-600 text-center text-lg leading-relaxed mb-4 font-medium">
          {feature.description}
        </p>

        {/* Bottom Section - Stats için SignIn, CTA için SignUp */}
        <div className="inline-flex items-center justify-center px-4 py-2 bg-gray-50 rounded-full mx-auto border border-gray-200">
          <span className="text-sm font-bold text-gray-900">
            {variant === 'signin' && feature.stats 
              ? feature.stats 
              : 'Ücretsiz Deneme'
            }
          </span>
        </div>
      </div>
    </div>
  );
});

export default FeatureCard;