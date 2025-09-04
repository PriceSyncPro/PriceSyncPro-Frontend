"use client";

import React, { useEffect, useRef } from 'react';
import { useAnnounceWarning } from '@/hooks/useAnnounceWarning';

const DefaultAnnouncements: React.FC = () => {
  const { announceWarning } = useAnnounceWarning();
  const hasAddedDefault = useRef(false);

  useEffect(() => {
    // Sadece bir kez çalışsın
    if (!hasAddedDefault.current) {
      announceWarning(
        "Bilgilerinizi tamamlamanız gerekmektedir",
        "Hesabınızı tam olarak kullanabilmek için profil bilgilerinizi güncelleyin",
        "/dashboard/(others-pages)/profile"
      );
      hasAddedDefault.current = true;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Boş dependency array - sadece mount'ta çalışır

  return null; // Bu komponent görsel bir şey render etmez
};

export default DefaultAnnouncements;
