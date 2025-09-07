// components/auth/SignUpForm.tsx
"use client";

import { useState, useCallback } from "react";
import { useAuth } from "@/context/AuthContext";
import { useFormValidation } from "@/hooks/useFormValidation";
import { usePhoneValidation } from "@/hooks/useTelephoneValidation";
import { useFeatureSlider } from "@/hooks/useFeatureSlider";
import { signUpValidationRules } from "@/utils/validation-rules/signupValidationRules";
import { SIGNUP_BENEFITS } from "@/utils/constants/signUpBenefits";
import AlertMessage from "@/components/auth/AlertMessage";
import AuthShowcase from "@/components/auth/showcase/AuthShowcase";
import FormField from "@/components/form/FormField";
import InputWithIcon from "@/components/form/form-elements/InputWithIcon";
import PhoneInput from "@/components/form/input/PhoneInput";
import Checkbox from "@/components/form/input/Checkbox";
import Button from "@/components/ui/button/Button";
import { EyeCloseIcon, EyeIcon } from "@/icons";
import Link from "next/link";

export interface SignUpFormData extends Record<string, string> {
  email: string;
  userName: string;
  password: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
}

export default function SignUpForm() {
  // Form state
  const [formData, setFormData] = useState<SignUpFormData>({
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
  
  // Hooks
  const { register, loading, error, success } = useAuth();
  const { cleanPhoneForAPI, validatePhoneNumber } = usePhoneValidation();
  const { currentFeature, goToFeature } = useFeatureSlider(SIGNUP_BENEFITS.length, 3500);
  
  // Form validation
  const { 
    isValid, 
    errors, 
    touchField, 
    validateAndSetFieldError,
    markSubmitAttempted,
    touched,
    attemptedSubmit
  } = useFormValidation(formData, signUpValidationRules);

  // Memoized handlers
  const handleInputChange = useCallback((field: keyof SignUpFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Eğer field'a daha önce dokunulduysa, real-time validation yap
    if (touched[field] || attemptedSubmit) {
      validateAndSetFieldError(field, value);
    }
  }, [touched, attemptedSubmit, validateAndSetFieldError]);

  const handlePhoneChange = useCallback((value: string) => {
    handleInputChange('phoneNumber', value);
  }, [handleInputChange]);

  const togglePassword = useCallback(() => {
    setShowPassword(prev => !prev);
  }, []);

  // Field blur handler
  const handleFieldBlur = useCallback((fieldName: keyof SignUpFormData) => {
    touchField(fieldName);
    validateAndSetFieldError(fieldName, formData[fieldName]);
  }, [touchField, validateAndSetFieldError, formData]);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Submit attempt'i işaretle (bu tüm hataları gösterecek)
    markSubmitAttempted();
    
    if (!isChecked) {
      alert("Kullanım koşullarını kabul etmelisiniz.");
      return;
    }

    if (!validatePhoneNumber(formData.phoneNumber)) {
      alert("Lütfen geçerli bir telefon numarası girin.");
      return;
    }
    
    if (!isValid) {
      alert("Lütfen form hatalarını düzeltin.");
      return;
    }
    
    try {
      const submitData = {
        ...formData,
        phoneNumber: cleanPhoneForAPI(formData.phoneNumber)
      };
      
      await register(submitData);
    } catch (err) {
      console.error("Kayıt hatası:", err);
    }
  }, [isChecked, validatePhoneNumber, formData, isValid, cleanPhoneForAPI, register, markSubmitAttempted]);

  // Icons
  const UserIcon = () => (
    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
  );

  const EmailIcon = () => (
    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  );

  const PhoneIcon = () => (
    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
    </svg>
  );

  const LockIcon = () => (
    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
    </svg>
  );

  return (
    <div className="min-h-screen bg-white flex flex-col lg:flex-row">
      {/* Sol Taraf - Form */}
      <div className="flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-8">
        <div className="w-full max-w-md">
          {/* Logo Section */}
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

          {/* Form */}
          <div className="bg-white border border-gray-200 rounded-2xl shadow-xl p-6 sm:p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Alert Messages */}
              {error && <AlertMessage type="error" message={error} />}
              {success && <AlertMessage type="success" message={success} />}

              {/* Ad ve Soyad */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormField 
                  label="Ad" 
                  error={errors.firstName}
                  required
                >
                  <InputWithIcon
                    icon={<UserIcon />}
                    name="firstName"
                    placeholder="Adınız"
                    value={formData.firstName}
                    onChange={(e) => handleInputChange('firstName', e.target.value)}
                    onBlur={() => handleFieldBlur('firstName')}
                    error={errors.firstName}
                    required
                  />
                </FormField>

                <FormField 
                  label="Soyad" 
                  error={errors.lastName}
                  required
                >
                  <InputWithIcon
                    icon={<UserIcon />}
                    name="lastName"
                    placeholder="Soyadınız"
                    value={formData.lastName}
                    onChange={(e) => handleInputChange('lastName', e.target.value)}
                    onBlur={() => handleFieldBlur('lastName')}
                    error={errors.lastName}
                    required
                  />
                </FormField>
              </div>

              {/* Kullanıcı Adı */}
              <FormField 
                label="Kullanıcı Adı" 
                error={errors.userName}
                required
              >
                <InputWithIcon
                  icon={<UserIcon />}
                  name="userName"
                  placeholder="kullaniciadi"
                  value={formData.userName}
                  onChange={(e) => handleInputChange('userName', e.target.value)}
                  onBlur={() => handleFieldBlur('userName')}
                  error={errors.userName}
                  required
                />
              </FormField>

              {/* E-posta */}
              <FormField 
                label="E-posta" 
                error={errors.email}
                required
              >
                <InputWithIcon
                  icon={<EmailIcon />}
                  type="email"
                  name="email"
                  placeholder="ornek@email.com"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  onBlur={() => handleFieldBlur('email')}
                  error={errors.email}
                  required
                />
              </FormField>

              {/* Telefon */}
              <FormField 
                label="Telefon" 
                error={errors.phoneNumber}
                required
              >
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <div className="w-5 h-5 text-gray-400 group-focus-within:text-gray-900 transition-colors">
                      <PhoneIcon />
                    </div>
                  </div>
                  <PhoneInput
                    className="w-full h-12 pl-12 pr-4 bg-gray-50 border-2 border-gray-200 rounded-xl text-gray-900 placeholder-gray-500 focus:border-gray-900 focus:bg-white transition-all font-medium"
                    value={formData.phoneNumber}
                    onChange={handlePhoneChange}
                    onBlur={() => handleFieldBlur('phoneNumber')}
                    error={errors.phoneNumber}
                    required
                  />
                </div>
              </FormField>

              {/* Şifre */}
              <FormField 
                label="Şifre" 
                error={errors.password}
                required
              >
                <InputWithIcon
                  icon={<LockIcon />}
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  onBlur={() => handleFieldBlur('password')}
                  error={errors.password}
                  required
                  rightElement={
                    <button
                      type="button"
                      onClick={togglePassword}
                      className="text-gray-400 hover:text-gray-900 transition-colors"
                    >
                      {showPassword ? (
                        <EyeIcon className="w-5 h-5" />
                      ) : (
                        <EyeCloseIcon className="w-5 h-5" />
                      )}
                    </button>
                  }
                />
              </FormField>

              {/* Kullanım Koşulları */}
              <div className="flex items-start space-x-3">
                <Checkbox
                  checked={isChecked}
                  onChange={setIsChecked}
                />
                <p className="text-gray-700 font-medium text-sm">
                  <Link href="/terms" className="text-gray-900 hover:text-gray-600 font-semibold transition-colors">
                    Kullanım Koşulları
                  </Link>{" "}
                  ve{" "}
                  <Link href="/privacy" className="text-gray-900 hover:text-gray-600 font-semibold transition-colors">
                    Gizlilik Politikası
                  </Link>
                  &apos;nı kabul ediyorum
                </p>
              </div>

              {/* Submit Button */}
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

      {/* Sağ Taraf - Benefits Showcase */}
      <AuthShowcase
        features={SIGNUP_BENEFITS}
        currentFeature={currentFeature}
        onFeatureChange={goToFeature}
        brandInfo={{
          name: "PriceSyncPro",
          tagline: "E-ticaret fiyat takibinde lider platform"
        }}
        trustIndicators={[
          { value: "10K+", label: "Aktif Kullanıcı" },
          { value: "5M+", label: "Takip Edilen Ürün" },
          { value: "99.9%", label: "Platform Uptime" }
        ]}
        testimonialText="10,000+ İşletmenin Güvendiği Platform"
        logoCount={4}
      />
    </div>
  );
}