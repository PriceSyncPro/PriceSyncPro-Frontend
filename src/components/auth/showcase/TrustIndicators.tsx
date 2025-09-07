// components/auth/TrustIndicators.tsx
import { memo } from 'react';

interface TrustIndicator {
  value: string;
  label: string;
}

interface TrustIndicatorsProps {
  indicators: TrustIndicator[];
}

const TrustIndicators = memo(function TrustIndicators({ indicators }: TrustIndicatorsProps) {
  return (
    <div className="grid grid-cols-3 gap-6 mt-12">
      {indicators.map((indicator, index) => (
        <div key={index} className="text-center">
          <div className="text-3xl font-black text-gray-900 mb-1">
            {indicator.value}
          </div>
          <div className="text-gray-600 font-semibold text-sm">
            {indicator.label}
          </div>
        </div>
      ))}
    </div>
  );
});

export default TrustIndicators;