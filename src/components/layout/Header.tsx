"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function Header() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="border-b border-gray-200 bg-white/95 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-black rounded-lg flex items-center justify-center mr-2 sm:mr-3 shadow-sm">
              <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
            <span className="text-lg sm:text-xl font-black text-gray-900">
              PriceSyncPro
            </span>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              href="/"
              className={`font-medium transition-colors ${
                pathname === "/" 
                  ? "text-gray-900" 
                  : "text-gray-700 hover:text-gray-900"
              }`}
            >
              Ana Sayfa
            </Link>
            <Link
              href="/pricing"
              className={`font-medium transition-colors ${
                pathname === "/pricing" 
                  ? "text-gray-900" 
                  : "text-gray-700 hover:text-gray-900"
              }`}
            >
              Fiyatlandırma
            </Link>
            <Link 
              href="/contact" 
              className={`font-medium transition-colors ${
                pathname === "/contact" 
                  ? "text-gray-900" 
                  : "text-gray-700 hover:text-gray-900"
              }`}
            >
              İletişim
            </Link>
          </nav>
          
          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Link
              href="/dashboard"
              className="text-gray-700 hover:text-gray-900 font-semibold transition-colors"
            >
              Müşteri Paneli
            </Link>
            <Link
              href="/signup"
              className="bg-gray-900 text-white px-6 py-2.5 rounded-lg font-semibold hover:bg-black transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              Ücretsiz Başla
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMobileMenu}
            className="md:hidden p-2 rounded-lg text-gray-700 hover:text-gray-900 hover:bg-gray-100 transition-colors"
            aria-label="Menüyü aç/kapat"
          >
            {isMobileMenuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4">
            <nav className="flex flex-col space-y-4">
              <Link
                href="/"
                className={`font-medium transition-colors ${
                  pathname === "/" 
                    ? "text-gray-900" 
                    : "text-gray-700 hover:text-gray-900"
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Ana Sayfa
              </Link>
              <Link
                href="/pricing"
                className={`font-medium transition-colors ${
                  pathname === "/pricing" 
                    ? "text-gray-900" 
                    : "text-gray-700 hover:text-gray-900"
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Fiyatlandırma
              </Link>
              <Link 
                href="/contact" 
                className={`font-medium transition-colors ${
                  pathname === "/contact" 
                    ? "text-gray-900" 
                    : "text-gray-700 hover:text-gray-900"
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                İletişim
              </Link>
              <div className="flex flex-col space-y-3 pt-4 border-t border-gray-200">
                <Link
                  href="/signin"
                  className="text-gray-700 hover:text-gray-900 font-semibold transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Giriş Yap
                </Link>
                <Link
                  href="/signup"
                  className="bg-gray-900 text-white px-6 py-2.5 rounded-lg font-semibold hover:bg-black transition-all duration-200 text-center"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Ücretsiz Başla
                </Link>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
