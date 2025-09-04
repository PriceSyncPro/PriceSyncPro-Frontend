// components/ui/Avatar.tsx
import React from 'react';

interface AvatarProps {
  name: string;
  src?: string; // src prop'u eklendi
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export default function Avatar({ name, src, size = 'md', className = '' }: AvatarProps) {
  // Renk paleti
  const colors = [
    'bg-red-500',
    'bg-blue-500',
    'bg-green-500',
    'bg-yellow-500',
    'bg-purple-500',
    'bg-pink-500',
    'bg-indigo-500',
    'bg-teal-500',
    'bg-orange-500',
    'bg-cyan-500'
  ];

  // İsmin harflerinin ASCII değerlerinin toplamını al
  let sum = 0;
  for (let i = 0; i < name.length; i++) {
    sum += name.charCodeAt(i);
  }

  // Toplam değere göre renk seç
  const bgColor = colors[sum % colors.length];

  // Boyut sınıfları
  const sizeClasses = {
    sm: 'h-8 w-8 text-sm',
    md: 'h-11 w-11 text-lg',
    lg: 'h-16 w-16 text-2xl'
  };

  // İsmin ilk harfini al
  const initial = name ? name.charAt(0).toUpperCase() : '?';

  // Eğer src varsa resmi göster, yoksa initial'ı göster
  if (src) {
    return (
      <div className={`overflow-hidden rounded-full ${sizeClasses[size]} ${className}`}>
        <img
          src={src}
          alt={name}
          className="h-full w-full object-cover"
          onError={(e) => {
            // Resim yüklenemezse fallback olarak initial'ı göster
            const target = e.target as HTMLImageElement;
            target.style.display = 'none';
            if (target.nextSibling) {
              (target.nextSibling as HTMLElement).style.display = 'flex';
            }
          }}
        />
        <div
          className={`h-full w-full flex items-center justify-center ${bgColor} text-white font-bold`}
          style={{ display: 'none' }}
        >
          {initial}
        </div>
      </div>
    );
  }

  return (
    <div
      className={`overflow-hidden rounded-full flex items-center justify-center ${bgColor} text-white font-bold ${sizeClasses[size]} ${className}`}
    >
      {initial}
    </div>
  );
}