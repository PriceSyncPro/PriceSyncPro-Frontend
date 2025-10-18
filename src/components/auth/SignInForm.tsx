"use client";
import Checkbox from "@/components/form/input/Checkbox";
import Input from "@/components/form/input/InputField";
import Label from "@/components/form/Label";
import Button from "@/components/ui/button/Button";
import { EyeCloseIcon, EyeIcon } from "@/icons";
import Link from "next/link";
import React, { useState, FormEvent, useCallback, useMemo } from "react";
import { useAuth } from "@/context/AuthContext";
import { useFormValidation } from "@/hooks/useFormValidation";
import AlertMessage from "./AlertMessage";

export default function SignInForm() {
  const [formData, setFormData] = useState({
    emailOrUserName: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const { login, error, loading, success } = useAuth();

  // Validation kuralları
  const validationRules = {
    emailOrUserName: {
      required: true,
      minLength: 3,
      custom: (value: string) => {
        if (value.includes('@')) {
          return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) || 'Geçerli e-posta giriniz';
        } else {
          return /^[a-zA-Z0-9_]+$/.test(value) || 'Geçerli kullanıcı adı giriniz';
        }
      }
    },
    password: {
      required: true,
      minLength: 3
    }
  };

  const { isValid } = useFormValidation(formData, validationRules);

  const handleInputChange = useCallback((field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  }, []);

  const handleSubmit = useCallback(async (e: FormEvent) => {
    e.preventDefault();
    if (!isValid) return;
    
    try {
      const loginSuccess = await login(formData);
      // Giriş başarılıysa formu temizle
      if (loginSuccess) {
        setFormData({
          emailOrUserName: '',
          password: ''
        });
        setShowPassword(false);
        setIsChecked(false);
      }
    } catch (err) {
      console.error("Giriş hatası:", err);
    }
  }, [login, formData, isValid]);

  const togglePassword = useCallback(() => {
    setShowPassword(prev => !prev);
  }, []);

  const buttonContent = useMemo(() => {
    if (loading) {
      return (
        <div className="flex items-center justify-center space-x-2">
          <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <span>Giriş yapılıyor...</span>
        </div>
      );
    }
    
    return (
      <div className="flex items-center justify-center space-x-2">
        <span>Giriş Yap</span>
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
        </svg>
      </div>
    );
  }, [loading]);

  // Giriş başarılı ise sadece success mesajını göster
  if (success) {
    return (
      <div className="h-screen bg-white flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-2xl mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="text-2xl font-black text-gray-900 mb-2">
              Giriş Başarılı!
            </h1>
            <p className="text-gray-600 font-medium mb-4">
              Dashboard`&apos;`a yönlendiriliyorsunuz...
            </p>
            <div className="flex items-center justify-center">
              <div className="w-8 h-8 border-2 border-gray-200 border-t-gray-800 rounded-full animate-spin"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen bg-white flex flex-col lg:flex-row overflow-hidden">
      {/* Sol Taraf - Giriş Formu */}
      <div className="flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-8">
        <div className="w-full max-w-md">
          {/* Logo Section */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-12 h-12 lg:w-16 lg:h-16 bg-black rounded-xl lg:rounded-2xl mb-4 shadow-lg">
              <svg className="w-6 h-6 lg:w-8 lg:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
            <h1 className="text-2xl lg:text-3xl font-black text-gray-900 mb-2">
              Tekrar Hoş Geldiniz
            </h1>
            <p className="text-gray-600 font-medium">
              PriceSyncPro hesabınıza giriş yapın
            </p>
          </div>

          {/* Giriş Formu */}
          <div className="bg-white border border-gray-200 rounded-2xl shadow-xl p-6 sm:p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Alert Messages */}
              {error && <AlertMessage type="error" message={error} />}

              {/* Username Field */}
              <div className="space-y-2">
                <Label className="text-gray-900 font-semibold text-sm">
                  Kullanıcı Adı veya E-posta
                </Label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <svg className="w-5 h-5 text-gray-400 group-focus-within:text-gray-900 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <Input
                    className="w-full h-12 pl-12 pr-4 bg-gray-50 border-2 border-gray-200 rounded-xl text-gray-900 placeholder-gray-500 focus:border-gray-900 focus:bg-white transition-all font-medium"
                    placeholder="kullanici@example.com"
                    type="text"
                    value={formData.emailOrUserName}
                    onChange={(e) => handleInputChange("emailOrUserName", e.target.value)}
                    required
                    disabled={loading}
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <Label className="text-gray-900 font-semibold text-sm">
                  Şifre
                </Label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <svg className="w-5 h-5 text-gray-400 group-focus-within:text-gray-900 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <Input
                    className="w-full h-12 pl-12 pr-12 bg-gray-50 border-2 border-gray-200 rounded-xl text-gray-900 placeholder-gray-500 focus:border-gray-900 focus:bg-white transition-all font-medium"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={(e) => handleInputChange("password", e.target.value)}
                    required
                    disabled={loading}
                  />
                  <button
                    type="button"
                    onClick={togglePassword}
                    disabled={loading}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-900 transition-colors disabled:opacity-50"
                  >
                    {showPassword ? (
                      <EyeIcon className="w-5 h-5" />
                    ) : (
                      <EyeCloseIcon className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
                <div className="flex items-center space-x-3">
                  <Checkbox
                    checked={isChecked}
                    onChange={setIsChecked}
                    disabled={loading}
                  />
                  <span className="text-gray-700 font-medium text-sm">
                    Beni hatırla
                  </span>
                </div>
                <Link
                  href="/reset-password"
                  className="text-gray-900 hover:text-gray-600 font-semibold transition-colors text-sm"
                >
                  Şifremi unuttum?
                </Link>
              </div>

              {/* Login Button */}
              <Button
                className="w-full h-12 bg-gray-900 hover:bg-black text-white font-bold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200 disabled:opacity-50 disabled:transform-none"
                type="submit"
                disabled={loading || !isValid}
              >
                {buttonContent}
              </Button>

              {/* Divider */}
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white text-gray-500 font-medium">
                    veya devam edin
                  </span>
                </div>
              </div>

              {/* Social Login */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  type="button"
                  disabled={loading}
                  className="flex items-center justify-center px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl text-gray-900 hover:bg-gray-100 hover:border-gray-300 transition-all font-semibold disabled:opacity-50"
                >
                  <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  Google
                </button>
                <button
                  type="button"
                  disabled={loading}
                  className="flex items-center justify-center px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl text-gray-900 hover:bg-gray-100 hover:border-gray-300 transition-all font-semibold disabled:opacity-50"
                >
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                  Facebook
                </button>
              </div>
            </form>

            {/* Sign Up Link */}
            <div className="text-center mt-6">
              <p className="text-gray-600 font-medium">
                Hesabınız yok mu?{" "}
                <Link
                  href="/signup"
                  className="text-gray-900 hover:text-gray-600 font-bold transition-colors"
                >
                  Ücretsiz kayıt olun
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
