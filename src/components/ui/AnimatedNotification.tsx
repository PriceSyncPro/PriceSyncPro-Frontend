"use client";
import React, { useEffect, useState, useCallback } from "react";

interface AnimatedNotificationProps {
  isVisible: boolean;
  type: "success" | "error";
  title: string;
  message: string;
  onClose: () => void;
  autoClose?: boolean;
  duration?: number;
}

export default function AnimatedNotification({
  isVisible,
  type,
  title,
  message,
  onClose,
  autoClose = true,
  duration = 3000
}: AnimatedNotificationProps) {
  const [show, setShow] = useState(false);
  const [animate, setAnimate] = useState(false);

  const handleClose = useCallback(() => {
    setAnimate(false);
    setTimeout(() => {
      setShow(false);
      onClose();
    }, 300);
  }, [onClose]);

  useEffect(() => {
    if (isVisible) {
      setShow(true);
      // Trigger animation after component mounts
      setTimeout(() => setAnimate(true), 50);
      
      if (autoClose) {
        const timer = setTimeout(() => {
          handleClose();
        }, duration);
        return () => clearTimeout(timer);
      }
    }
  }, [isVisible, autoClose, duration, handleClose]);

  if (!show) return null;

  const isSuccess = type === "success";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className={`absolute inset-0 bg-black transition-opacity duration-300 ${
          animate ? "bg-opacity-50" : "bg-opacity-0"
        }`}
        onClick={handleClose}
      />
      
      {/* Notification Card */}
      <div 
        className={`relative bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 p-8 max-w-md w-full mx-4 transform transition-all duration-300 ${
          animate 
            ? "scale-100 opacity-100 translate-y-0" 
            : "scale-95 opacity-0 translate-y-4"
        }`}
      >
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-200"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Icon */}
        <div className="text-center mb-6">
          <div 
            className={`inline-flex items-center justify-center w-20 h-20 rounded-full mb-4 ${
              isSuccess 
                ? "bg-green-100 dark:bg-green-900" 
                : "bg-red-100 dark:bg-red-900"
            } animate-bounce`}
          >
            {isSuccess ? (
              <svg 
                className="w-10 h-10 text-green-600 dark:text-green-400" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M5 13l4 4L19 7" 
                />
              </svg>
            ) : (
              <svg 
                className="w-10 h-10 text-red-600 dark:text-red-400" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M6 18L18 6M6 6l12 12" 
                />
              </svg>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="text-center">
          <h3 
            className={`text-2xl font-bold mb-3 ${
              isSuccess 
                ? "text-green-600 dark:text-green-400" 
                : "text-red-600 dark:text-red-400"
            }`}
          >
            {title}
          </h3>
          <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed mb-6">
            {message}
          </p>
        </div>

        {/* Action Button */}
        <div className="text-center">
          <button
            onClick={handleClose}
            className={`inline-flex items-center px-8 py-3 rounded-xl font-semibold text-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 ${
              isSuccess
                ? "bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800"
                : "bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800"
            }`}
          >
            Tamam
          </button>
        </div>

        {/* Progress Bar (for auto-close) */}
        {autoClose && (
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-200 dark:bg-gray-700 rounded-b-2xl overflow-hidden">
            <div 
              className={`h-full transition-all ease-linear ${
                isSuccess 
                  ? "bg-gradient-to-r from-green-500 to-green-600" 
                  : "bg-gradient-to-r from-red-500 to-red-600"
              }`}
              style={{
                width: animate ? "0%" : "100%",
                transitionDuration: animate ? `${duration}ms` : "0ms"
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
}
