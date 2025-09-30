// components/ui/Avatar.tsx
import React, { useState } from 'react';
import Image from 'next/image';

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

  const [imageError, setImageError] = useState(false);

  // Eğer src varsa ve resim yüklenebilirse resmi göster, yoksa initial'ı göster
  if (src && !imageError) {
    const sizeMap = {
      sm: 32,
      md: 44,
      lg: 64
    };
    
    return (
      <div className={`overflow-hidden rounded-full ${sizeClasses[size]} ${className}`}>
        <Image
          src={src}
          alt={name}
          width={sizeMap[size]}
          height={sizeMap[size]}
          className="h-full w-full object-cover"
          onError={() => setImageError(true)}
        />
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
