"use client";
import Checkbox from "@/components/form/input/Checkbox";
import Input from "@/components/form/input/InputField";
import Label from "@/components/form/Label";
import Button from "@/components/ui/button/Button";
import { EyeCloseIcon, EyeIcon } from "@/icons";
import Link from "next/link";
import React, { useState, FormEvent, useEffect } from "react";
import { useAuth } from "@/utils/contexts/AuthContext";

export default function SignUpForm() {
  // Form state
  const [formData, setFormData] = useState({
    email: "",
    userName: "",
    password: "",
    firstName: "",
    lastName: "",
    phoneNumber: ""
  });
  
  // UI state
  const [showPassword, setShowPassword] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [currentBenefit, setCurrentBenefit] = useState(0);
  
  // Auth context
  const { register, loading, error, success } = useAuth();

  const benefits = [
    {
      icon: "💰",
      title: "Karlılığınızı Artırın",
      description: "Optimal fiyat stratejileri ile karlılığınızı %40'a kadar artırın",
      color: "from-green-400 to-emerald-500"
    },
    {
      icon: "⚡",
      title: "Anlık Bildirimler",
      description: "Rakip fiyat değişimlerinde anında bildirim alın ve harekete geçin",
      color: "from-yellow-400 to-orange-500"
    },
    {
      icon: "🎯",
      title: "Hassas Analiz",
      description: "AI destekli analitiklerle pazar trendlerini öngörün",
      color: "from-blue-400 to-purple-500"
    },
    {
      icon: "📈",
      title: "Satış Artışı",
      description: "Müşterilerimiz ortalama %35 satış artışı deneyimliyor",
      color: "from-pink-400 to-red-500"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBenefit((prev) => (prev + 1) % benefits.length);
    }, 3500);
    return () => clearInterval(interval);
  }, [benefits.length]);

  // Kullanıcı için görsel formatlama (0 ile başlar)
  const formatPhoneForDisplay = (value: string) => {
    // Sadece rakamları al
    const cleanValue = value.replace(/\D/g, '');
    
    if (!cleanValue) return '';
    
    // Eğer 5 ile başlıyorsa başına 0 ekle
    let phoneNumber = cleanValue;
    if (phoneNumber.startsWith('5') && phoneNumber.length >= 10) {
      phoneNumber = '0' + phoneNumber;
    }
    
    // Çift 0 kontrolü
    if (phoneNumber.startsWith('00')) {
      phoneNumber = phoneNumber.substring(1);
    }
    
    // Türkiye formatına göre formatla: 0 (5xx) xxx xx xx
    if (phoneNumber.length <= 1) {
      return phoneNumber;
    }
    
    if (phoneNumber.length <= 4) {
      if (phoneNumber.startsWith('0')) {
        return phoneNumber.length > 1 ? 
          `${phoneNumber.substring(0, 1)} (${phoneNumber.substring(1)}` : 
          phoneNumber;
      }
      return phoneNumber;
    }
    
    if (phoneNumber.length <= 7) {
      if (phoneNumber.startsWith('0')) {
        return `${phoneNumber.substring(0, 1)} (${phoneNumber.substring(1, 4)}) ${phoneNumber.substring(4)}`;
      }
      return phoneNumber;
    }
    
    if (phoneNumber.length <= 9) {
      if (phoneNumber.startsWith('0')) {
        return `${phoneNumber.substring(0, 1)} (${phoneNumber.substring(1, 4)}) ${phoneNumber.substring(4, 7)} ${phoneNumber.substring(7)}`;
      }
      return phoneNumber;
    }
    
    // Tam format: 0 (5xx) xxx xx xx
    if (phoneNumber.startsWith('0') && phoneNumber.length >= 10) {
      const maxLength = Math.min(phoneNumber.length, 11);
      const limitedNumber = phoneNumber.substring(0, maxLength);
      return `${limitedNumber.substring(0, 1)} (${limitedNumber.substring(1, 4)}) ${limitedNumber.substring(4, 7)} ${limitedNumber.substring(7, 9)} ${limitedNumber.substring(9, 11)}`;
    }
    
    return phoneNumber;
  };

  // API için temizle (0 olmadan)
  const cleanPhoneForAPI = (phoneNumber: string) => {
    const cleanNumber = phoneNumber.replace(/\D/g, '');
    // Eğer 0 ile başlıyorsa kaldır
    return cleanNumber.startsWith('0') ? cleanNumber.substring(1) : cleanNumber;
  };

  // Telefon numarası validasyonu
  const validatePhoneNumber = (phoneNumber: string) => {
    const cleanNumber = phoneNumber.replace(/\D/g, '');
    // 0 ile başlayan 11 haneli numara olmalı
    return cleanNumber.length === 11 && cleanNumber.startsWith('0') && cleanNumber.startsWith('05');
  };

  // Telefon input için özel handler
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    
    // Sadece rakam girişine izin ver ve maksimum 11 hane
    const cleanValue = value.replace(/\D/g, '');
    if (cleanValue.length <= 11) {
      const formattedPhone = formatPhoneForDisplay(value);
      setFormData(prev => ({
        ...prev,
        phoneNumber: formattedPhone
      }));
    }
  };

  // Telefon input'a focus olduğunda
  const handlePhoneFocus = () => {
    // Eğer boşsa 0 ile başlat
    if (!formData.phoneNumber) {
      setFormData(prev => ({
        ...prev,
        phoneNumber: "0 (5"
      }));
    }
  };

  // Telefon input'tan çıkıldığında
  const handlePhoneBlur = () => {
    // Eğer sadece "0 (" veya "0 (5" varsa temizle
    if (formData.phoneNumber === "0 (" || formData.phoneNumber === "0 (5") {
      setFormData(prev => ({
        ...prev,
        phoneNumber: ""
      }));
    }
  };

  // Telefon numarası için keydown handler
  const handlePhoneKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Backspace tuşu için özel işlem
    if (e.key === 'Backspace') {
      const currentValue = formData.phoneNumber;
      // Eğer "0 (" veya "0 (5" kaldıysa, tamamen temizle
      if (currentValue === "0 (" || currentValue === "0 (5" || currentValue === "0") {
        e.preventDefault();
        setFormData(prev => ({
          ...prev,
          phoneNumber: ""
        }));
      }
    }
  };

  // Form değişikliklerini işle (diğer alanlar için)
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Form gönderimi
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    if (!isChecked) {
      alert("Kullanım koşullarını kabul etmelisiniz.");
      return;
    }

    // Telefon numarası validasyonu
    if (!validatePhoneNumber(formData.phoneNumber)) {
      alert("Lütfen geçerli bir telefon numarası girin. (0 (5xx) xxx xx xx)");
      return;
    }
    
    try {
      // API'ye gönderilecek data - telefon numarası 0 olmadan
      const submitData = {
        ...formData,
        phoneNumber: cleanPhoneForAPI(formData.phoneNumber) // Başında 0 olmayan format
      };
      
      console.log("API'ye gönderilen data:", submitData);
      // Örnek: phoneNumber: "5551234567" (0 olmadan)
      
      await register(submitData);
    } catch (err) {
      console.error("Kayıt hatası:", err);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col lg:flex-row">
      {/* Sol Taraf - Kayıt Formu */}
      <div className="flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-8">
        <div className="w-full max-w-md">
          {/* Logo Section - Mobil ve Desktop */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-12 h-12 lg:w-16 lg:h-16 bg-black rounded-xl lg:rounded-2xl mb-4 shadow-lg">
              <svg className="w-6 h-6 lg:w-8 lg:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
              </svg>
            </div>
            <h1 className="text-2xl lg:text-3xl font-black text-gray-900 mb-2">
              Hesap Oluşturun
            </h1>
            <p className="text-gray-600 font-medium">
              PriceSyncPro&apos;ya katılın ve büyümeye başlayın
            </p>
          </div>

          {/* Kayıt Formu */}
          <div className="bg-white border border-gray-200 rounded-2xl shadow-xl p-6 sm:p-8">

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Alert Messages */}
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-xl text-sm font-medium">
                  <div className="flex items-center">
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    {error}
                  </div>
                </div>
              )}
              
              {success && (
                <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-xl text-sm font-medium">
                  <div className="flex items-center">
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    {success}
                  </div>
                </div>
              )}

              {/* Ad ve Soyad */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-gray-900 font-semibold text-sm">
                    Ad
                  </Label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <svg className="w-5 h-5 text-gray-400 group-focus-within:text-gray-900 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    <Input
                      className="w-full h-12 pl-12 pr-4 bg-gray-50 border-2 border-gray-200 rounded-xl text-gray-900 placeholder-gray-500 focus:border-gray-900 focus:bg-white transition-all font-medium"
                      type="text"
                      name="firstName"
                      placeholder="Adınız"
                      value={formData.firstName}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-gray-900 font-semibold text-sm">
                    Soyad
                  </Label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <svg className="w-5 h-5 text-gray-400 group-focus-within:text-gray-900 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    <Input
                      className="w-full h-12 pl-12 pr-4 bg-gray-50 border-2 border-gray-200 rounded-xl text-gray-900 placeholder-gray-500 focus:border-gray-900 focus:bg-white transition-all font-medium"
                      type="text"
                      name="lastName"
                      placeholder="Soyadınız"
                      value={formData.lastName}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Kullanıcı Adı */}
              <div className="space-y-2">
                <Label className="text-gray-900 font-semibold text-sm">
                  Kullanıcı Adı
                </Label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <svg className="w-5 h-5 text-gray-400 group-focus-within:text-gray-900 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <Input
                    className="w-full h-12 pl-12 pr-4 bg-gray-50 border-2 border-gray-200 rounded-xl text-gray-900 placeholder-gray-500 focus:border-gray-900 focus:bg-white transition-all font-medium"
                    type="text"
                    name="userName"
                    placeholder="kullaniciadi"
                    value={formData.userName}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              {/* E-posta */}
              <div className="space-y-2">
                <Label className="text-gray-900 font-semibold text-sm">
                  E-posta
                </Label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <svg className="w-5 h-5 text-gray-400 group-focus-within:text-gray-900 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <Input
                    className="w-full h-12 pl-12 pr-4 bg-gray-50 border-2 border-gray-200 rounded-xl text-gray-900 placeholder-gray-500 focus:border-gray-900 focus:bg-white transition-all font-medium"
                    type="email"
                    name="email"
                    placeholder="ornek@email.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              {/* Telefon Numarası */}
              <div className="space-y-2">
                <Label className="text-gray-900 font-semibold text-sm">
                  Telefon
                </Label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <svg className="w-5 h-5 text-gray-400 group-focus-within:text-gray-900 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <Input
                    className="w-full h-12 pl-12 pr-4 bg-gray-50 border-2 border-gray-200 rounded-xl text-gray-900 placeholder-gray-500 focus:border-gray-900 focus:bg-white transition-all font-medium"
                    type="tel"
                    name="phoneNumber"
                    placeholder="0 (5xx) xxx xx xx"
                    value={formData.phoneNumber}
                    onChange={handlePhoneChange}
                    onFocus={handlePhoneFocus}
                    onBlur={handlePhoneBlur}
                    onKeyDown={handlePhoneKeyDown}
                    maxLength={18}
                    required
                  />
                </div>
              </div>

              {/* Şifre */}
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
                    name="password"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-900 transition-colors"
                  >
                    {showPassword ? (
                      <EyeIcon className="w-5 h-5" />
                    ) : (
                      <EyeCloseIcon className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Kullanım Koşulları */}
              <div className="flex items-start space-x-3">
                <Checkbox
                  checked={isChecked}
                  onChange={setIsChecked}
                />
                <p className="text-gray-700 font-medium text-sm">
                  <span className="text-gray-900 hover:text-gray-600 font-semibold transition-colors cursor-pointer">
                    Kullanım Koşulları
                  </span>{" "}
                  ve{" "}
                  <span className="text-gray-900 hover:text-gray-600 font-semibold transition-colors cursor-pointer">
                    Gizlilik Politikası
                  </span>
                  &apos;nı kabul ediyorum
                </p>
              </div>

              {/* Register Button */}
              <Button
                className="w-full h-12 bg-gray-900 hover:bg-black text-white font-bold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200 disabled:opacity-50 disabled:transform-none"
                type="submit"
                disabled={loading}
              >
                {loading ? (
                  <div className="flex items-center justify-center space-x-2">
                    <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Kayıt yapılıyor...</span>
                  </div>
                ) : (
                  <div className="flex items-center justify-center space-x-2">
                    <span>Ücretsiz Hesap Oluştur</span>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </div>
                )}
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
                  className="flex items-center justify-center px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl text-gray-900 hover:bg-gray-100 hover:border-gray-300 transition-all font-semibold"
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
                  className="flex items-center justify-center px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl text-gray-900 hover:bg-gray-100 hover:border-gray-300 transition-all font-semibold"
                >
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                  Facebook
                </button>
              </div>
            </form>

            {/* Sign In Link */}
            <div className="text-center mt-6">
              <p className="text-gray-600 font-medium">
                Zaten hesabınız var mı?{" "}
                <Link
                  href="/signin"
                  className="text-gray-900 hover:text-gray-600 font-bold transition-colors"
                >
                  Giriş yapın
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Sağ Taraf - Feature Showcase - Sadece desktop'ta görünür */}
      <div className="hidden lg:flex flex-1 items-center justify-center p-8 bg-gray-50">
        <div className="max-w-lg w-full">
          {/* Brand Section */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-black rounded-2xl mb-6 shadow-lg">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
              </svg>
            </div>
            <h2 className="text-4xl font-black text-gray-900 mb-4">
              PriceSyncPro
            </h2>
            <p className="text-xl text-gray-600 font-medium">
              E-ticaret fiyat takibinde lider platform
            </p>
          </div>

          {/* Animated Feature Cards */}
          <div className="relative h-96">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className={`absolute inset-0 transition-all duration-700 ease-in-out ${
                  index === currentBenefit
                    ? 'opacity-100 transform translate-y-0 scale-100'
                    : index < currentBenefit
                    ? 'opacity-0 transform -translate-y-10 scale-95'
                    : 'opacity-0 transform translate-y-10 scale-95'
                }`}
              >
                <div className="bg-white border border-gray-200 rounded-3xl p-8 h-full flex flex-col justify-center shadow-xl">
                  <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-100 rounded-3xl mb-6 mx-auto border border-gray-200">
                    <span className="text-3xl">{benefit.icon}</span>
                  </div>
                  <h3 className="text-2xl font-black text-gray-900 text-center mb-4">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-600 text-center text-lg leading-relaxed mb-4 font-medium">
                    {benefit.description}
                  </p>
                  <div className="inline-flex items-center justify-center px-4 py-2 bg-gray-50 rounded-full mx-auto border border-gray-200">
                    <span className="text-sm font-bold text-gray-900">Ücretsiz Deneme</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Feature Indicators */}
          <div className="flex justify-center space-x-3 mt-8">
            {benefits.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentBenefit(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentBenefit 
                    ? 'bg-gray-900 scale-125' 
                    : 'bg-gray-300 hover:bg-gray-500'
                }`}
              />
            ))}
          </div>

          {/* Trust Indicators */}
          <div className="grid grid-cols-3 gap-6 mt-12">
            <div className="text-center">
              <div className="text-3xl font-black text-gray-900 mb-1">10K+</div>
              <div className="text-gray-600 font-semibold text-sm">Aktif Kullanıcı</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-black text-gray-900 mb-1">5M+</div>
              <div className="text-gray-600 font-semibold text-sm">Takip Edilen Ürün</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-black text-gray-900 mb-1">99.9%</div>
              <div className="text-gray-600 font-semibold text-sm">Platform Uptime</div>
            </div>
          </div>

          {/* Customer Logos */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <p className="text-center text-gray-500 font-semibold text-sm mb-6">
              10,000+ İşletmenin Güvendiği Platform
            </p>
            <div className="flex items-center justify-center space-x-8 opacity-60">
              <div className="w-12 h-8 bg-gray-300 rounded"></div>
              <div className="w-12 h-8 bg-gray-300 rounded"></div>
              <div className="w-12 h-8 bg-gray-300 rounded"></div>
              <div className="w-12 h-8 bg-gray-300 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
