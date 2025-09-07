'use client';

import Link from 'next/link';
import { memo, useCallback } from 'react';

interface QuickStartStep {
  id: number;
  title: string;
  description: string;
  href?: string;
  icon: React.ReactNode;
  isClickable: boolean;
}

const steps: QuickStartStep[] = [
  {
    id: 1,
    title: "Ürün Ekle",
    description: "İlk ürününüzü ekleyin",
    href: "/dashboard/add-product",
    isClickable: true,
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
      </svg>
    )
  },
  {
    id: 2,
    title: "Kural Oluştur",
    description: "Fiyat takip kurallarınızı belirleyin",
    isClickable: false,
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    )
  },
  {
    id: 3,
    title: "Raporlarını Al",
    description: "Detaylı analiz ve raporlarınızı görüntüleyin",
    isClickable: false,
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
      </svg>
    )
  }
];

const QuickStartStep = memo(({ step, index }: { step: QuickStartStep; index: number }) => {
  const handleClick = useCallback(() => {
    if (step.isClickable && step.href) {
      console.log(`Quick start step clicked: ${step.title}`);
    }
  }, [step.isClickable, step.href, step.title]);

  const stepContent = (
    <div className={`relative flex items-center space-x-4 p-5 rounded-xl transition-all duration-300 ${
      step.isClickable 
        ? 'hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 cursor-pointer group hover:shadow-md hover:shadow-blue-100/50' 
        : 'cursor-default opacity-60'
    }`}>
      {/* Step number with gradient background */}
      <div className={`relative w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold shadow-lg transition-all duration-300 ${
        step.isClickable 
          ? 'bg-gradient-to-br from-blue-500 to-blue-600 text-white group-hover:from-blue-600 group-hover:to-blue-700 group-hover:scale-110 group-hover:shadow-xl' 
          : 'bg-gradient-to-br from-gray-300 to-gray-400 text-gray-600'
      }`}>
        {step.id}
        {step.isClickable && (
          <div className="absolute inset-0 rounded-full bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        )}
      </div>

      {/* Connecting line for non-last items */}
      {index < steps.length - 1 && (
        <div className="absolute left-9 top-16 w-0.5 h-8 bg-gradient-to-b from-gray-200 to-transparent" />
      )}

      {/* Content */}
      <div className="flex-grow">
        <h3 className={`font-bold text-base mb-2 transition-colors duration-300 ${
          step.isClickable 
            ? 'text-gray-900 group-hover:text-blue-700' 
            : 'text-gray-500'
        }`}>
          {step.title}
        </h3>
        <p className="text-gray-600 text-sm leading-relaxed">
          {step.description}
        </p>
      </div>

      {/* Icon with subtle animation */}
      <div className={`transition-all duration-300 ${
        step.isClickable 
          ? 'text-gray-400 group-hover:text-blue-600 group-hover:scale-110' 
          : 'text-gray-300'
      }`}>
        {step.icon}
      </div>

      {/* Click indicator for clickable items */}
      {step.isClickable && (
        <div className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300">
          <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      )}
    </div>
  );

  if (step.isClickable && step.href) {
    return (
      <Link href={step.href} onClick={handleClick} className="block">
        {stepContent}
      </Link>
    );
  }

  return stepContent;
});

QuickStartStep.displayName = 'QuickStartStep';

const QuickStart = memo(() => {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300">
      {/* Status Banner */}
      <div className="bg-gradient-to-r from-amber-50 to-orange-50 border-b border-amber-100 px-6 py-4">
        <div className="flex items-center space-x-3">
          <div className="w-2 h-2 bg-amber-400 rounded-full animate-pulse" />
          <p className="text-amber-800 text-sm font-medium">
            Henüz bir ürününüz yok
          </p>
        </div>
      </div>

      {/* Header */}
      <div className="px-6 pt-6 pb-2">
        <div className="text-center">
          <div className="inline-flex items-center space-x-2 px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm font-medium mb-3">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            <span>Hızlı Başlangıç</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            3 Basit Adım
          </h2>
          <p className="text-gray-600">
            Piyasa takibi bu kadar kolay
          </p>
        </div>
      </div>

      {/* Steps */}
      <div className="px-6 py-4">
        <div className="space-y-2">
          {steps.map((step, index) => (
            <QuickStartStep
              key={step.id}
              step={step}
              index={index}
            />
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="bg-gray-50 px-6 py-4 border-t border-gray-100">
        <div className="flex items-center justify-center space-x-4">
          <div className="flex items-center text-xs text-gray-500">
            <div className="w-2 h-2 bg-green-400 rounded-full mr-2" />
            <span>Ortalama kurulum: 2 dk</span>
          </div>
          <div className="w-1 h-1 bg-gray-300 rounded-full" />
          <div className="text-xs text-gray-500">
            24/7 destek
          </div>
        </div>
      </div>
    </div>
  );
});

QuickStart.displayName = 'QuickStart';

export { QuickStart };