"use client";

import React, { useState } from 'react';
import { X, AlertTriangle } from 'lucide-react';

interface ProfileWarningProps {
  onClose?: () => void;
}

const ProfileWarning: React.FC<ProfileWarningProps> = ({ onClose }) => {
  const [isVisible, setIsVisible] = useState(true);

  const handleClose = () => {
    setIsVisible(false);
    if (onClose) {
      onClose();
    }
  };

  const handleCompleteProfile = () => {
    // Profil tamamlama sayfasına yönlendirme
    window.location.href = '/dashboard/(others-pages)/profile';
  };

  if (!isVisible) return null;

  return (
    <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4 mx-4 md:mx-6 rounded-r-lg shadow-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <AlertTriangle className="h-5 w-5 text-yellow-400 mr-3" />
          <div>
            <p className="text-sm font-medium text-yellow-800">
              Bilgilerinizi tamamlamanız gerekmektedir.
            </p>
            <p className="text-xs text-yellow-700 mt-1">
              Hesabınızı tam olarak kullanabilmek için profil bilgilerinizi güncelleyin.
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={handleCompleteProfile}
            className="bg-yellow-400 hover:bg-yellow-500 text-yellow-900 px-3 py-1 rounded text-sm font-medium transition-colors duration-200"
          >
            Tıklayınız
          </button>
          <button
            onClick={handleClose}
            className="text-yellow-400 hover:text-yellow-600 transition-colors duration-200"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileWarning;
