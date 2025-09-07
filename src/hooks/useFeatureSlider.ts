// hooks/useFeatureSlider.ts
import { useState, useEffect, useCallback } from 'react';

export const useFeatureSlider = (totalFeatures: number, interval: number = 3500) => {
  const [currentFeature, setCurrentFeature] = useState(0);

  // ✅ useCallback ile memoize edin
  const goToFeature = useCallback((index: number) => {
    setCurrentFeature(index);
  }, []); // Boş dependency array çünkü sadece setState kullanıyor

  // Auto-slide effect
  useEffect(() => {
    if (totalFeatures <= 1) return;

    const slideInterval = setInterval(() => {
      setCurrentFeature(current => (current + 1) % totalFeatures);
    }, interval);

    return () => clearInterval(slideInterval);
  }, [totalFeatures, interval]);

  return { 
    currentFeature, 
    goToFeature 
  };
};