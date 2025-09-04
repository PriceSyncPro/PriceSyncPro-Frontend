"use client";
import React, { useState } from "react";
import { useModal } from "../../hooks/useModal";
import { Modal } from "../ui/modal";
import Button from "../ui/button/Button";
import Input from "../form/input/InputField";
import Label from "../form/Label";
import { User } from "@/utils/types/user";
import { UserService } from "@/utils/api/services/userService";

interface UserInfoCardProps {
  user: User | null;
}

export default function UserInfoCard({ user }: UserInfoCardProps) {
  const { isOpen, openModal, closeModal } = useModal();
  
  // Form state
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: ''
  });

  // fullName'i firstName ve lastName olarak ayır
  const getFirstName = () => {
    if (!user?.fullName) return '-';
    const nameParts = user.fullName.trim().split(' ');
    return nameParts[0] || '-';
  };

  const getLastName = () => {
    if (!user?.fullName) return '-';
    const nameParts = user.fullName.trim().split(' ');
    return nameParts.slice(1).join(' ') || '-';
  };

  // Initialize form data when modal opens
  const handleOpenModal = () => {
    setFormData({
      firstName: getFirstName(),
      lastName: getLastName(),
      email: user?.email || '',
      phoneNumber: user?.phoneNumber || ''
    });
    openModal();
  };

  // Format Turkish phone number
  const formatPhoneNumber = (value: string) => {
    // Remove all non-digit characters
    const digits = value.replace(/\D/g, '');
    
    // If starts with 90, remove it (country code)
    const cleanDigits = digits.startsWith('90') ? digits.slice(2) : digits;
    
    // Limit to 11 digits (0 + 10 digits)
    const limitedDigits = cleanDigits.slice(0, 11);
    
    // Format based on length
    if (limitedDigits.length === 0) return '';
    if (limitedDigits.length === 1) return limitedDigits;
    if (limitedDigits.length <= 4) return `${limitedDigits.slice(0, 1)} (${limitedDigits.slice(1)}`;
    if (limitedDigits.length <= 7) return `${limitedDigits.slice(0, 1)} (${limitedDigits.slice(1, 4)}) ${limitedDigits.slice(4)}`;
    if (limitedDigits.length <= 9) return `${limitedDigits.slice(0, 1)} (${limitedDigits.slice(1, 4)}) ${limitedDigits.slice(4, 7)} ${limitedDigits.slice(7)}`;
    
    // Full format: 0 (542) 630 97 20
    return `${limitedDigits.slice(0, 1)} (${limitedDigits.slice(1, 4)}) ${limitedDigits.slice(4, 7)} ${limitedDigits.slice(7, 9)} ${limitedDigits.slice(9)}`;
  };

  // Handle form field changes
  const handleInputChange = (field: string, value: string) => {
    let processedValue = value;
    
    // Apply phone number formatting for phoneNumber field
    if (field === 'phoneNumber') {
      processedValue = formatPhoneNumber(value);
    }
    
    setFormData(prev => ({
      ...prev,
      [field]: processedValue
    }));
  };

  // Check if a field has been modified
  const isFieldModified = (field: string, currentValue: string) => {
    const originalValues = {
      firstName: getFirstName(),
      lastName: getLastName(),
      email: user?.email || '',
      phoneNumber: user?.phoneNumber || ''
    };
    return currentValue !== originalValues[field as keyof typeof originalValues];
  };

  const handleSave = () => {
    // Get original values
    const originalValues = {
      firstName: getFirstName(),
      lastName: getLastName(),
      email: user?.email || '',
      phoneNumber: user?.phoneNumber || ''
    };

    // Find only the changed fields
    const changedFields: Record<string, string> = {};
    
    Object.keys(formData).forEach((field) => {
      const currentValue = formData[field as keyof typeof formData];
      const originalValue = originalValues[field as keyof typeof originalValues];
      
      if (currentValue !== originalValue) {
        changedFields[field] = currentValue;
      }
    });

    UserService.updateProfile(changedFields)
    
    closeModal();
  };

  return (
    <div className="p-5 border border-gray-200 rounded-2xl dark:border-gray-800 lg:p-6">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <h4 className="text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-6">
            Kişisel Bilgiler
          </h4>

          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-7 2xl:gap-x-32">
            <div>
              <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                Ad
              </p>
              <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                {getFirstName()}
              </p>
            </div>

            <div>
              <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                Soyad
              </p>
              <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                {getLastName()}
              </p>
            </div>

            <div>
              <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                E-posta adresi
              </p>
              <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                {user?.email || '-'}
              </p>
            </div>

            <div>
              <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                Telefon
              </p>
              <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                {user?.phoneNumber || '-'}
              </p>
            </div>

            <div className="col-span-1 lg:col-span-2">
              <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                Kullanıcı Adı
              </p>
              <p className="text-sm font-medium text-gray-800 dark:text-white/90 mb-1">
                {user?.userName || '-'}
              </p>
              <p className="text-xs text-gray-400 dark:text-gray-500 italic">
                Bu alan değiştirilemez
              </p>
            </div>

            <div>
              <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                E-posta Doğrulandı
              </p>
              <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                {user?.emailConfirmed ? 'Evet' : 'Hayır'}
              </p>
            </div>

            <div>
              <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                Kayıt Tarihi
              </p>
              <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                {user?.createAt ? new Date(user.createAt).toLocaleDateString('tr-TR') : '-'}
              </p>
            </div>
          </div>
        </div>

        <button
          onClick={handleOpenModal}
          className="flex w-full items-center justify-center gap-2 rounded-full border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200 lg:inline-flex lg:w-auto"
        >
          <svg
            className="fill-current"
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M15.0911 2.78206C14.2125 1.90338 12.7878 1.90338 11.9092 2.78206L4.57524 10.116C4.26682 10.4244 4.0547 10.8158 3.96468 11.2426L3.31231 14.3352C3.25997 14.5833 3.33653 14.841 3.51583 15.0203C3.69512 15.1996 3.95286 15.2761 4.20096 15.2238L7.29355 14.5714C7.72031 14.4814 8.11172 14.2693 8.42013 13.9609L15.7541 6.62695C16.6327 5.74827 16.6327 4.32365 15.7541 3.44497L15.0911 2.78206ZM12.9698 3.84272C13.2627 3.54982 13.7376 3.54982 14.0305 3.84272L14.6934 4.50563C14.9863 4.79852 14.9863 5.2734 14.6934 5.56629L14.044 6.21573L12.3204 4.49215L12.9698 3.84272ZM11.2597 5.55281L5.6359 11.1766C5.53309 11.2794 5.46238 11.4099 5.43238 11.5522L5.01758 13.5185L6.98394 13.1037C7.1262 13.0737 7.25666 13.003 7.35947 12.9002L12.9833 7.27639L11.2597 5.55281Z"
              fill=""
            />
          </svg>
          Düzenle
        </button>
      </div>

      <Modal isOpen={isOpen} onClose={closeModal} className="max-w-[700px] m-4">
        <div className="no-scrollbar relative w-full max-w-[700px] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11">
          <div className="px-2 pr-14">
            <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
              Kişisel Bilgileri Düzenle
            </h4>
            <p className="mb-6 text-sm text-gray-500 dark:text-gray-400 lg:mb-7">
              Profilinizi güncel tutmak için bilgilerinizi güncelleyin.
            </p>
          </div>
          <form className="flex flex-col">
            <div className="custom-scrollbar h-[300px] overflow-y-auto px-2 pb-3">
              <div className="mt-0">
                <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">
                  <div className="col-span-2">
                    <Label>Kullanıcı Adı</Label>
                    <Input type="text" defaultValue={user?.userName || '-'} disabled/>
                    <p className="mt-1 text-xs text-gray-400 dark:text-gray-500 italic">
                      Bu alan değiştirilemez
                    </p>
                  </div>
                  
                  <div className="col-span-2 lg:col-span-1">
                    <Label>Ad</Label>
                    <Input 
                      type="text" 
                      defaultValue={formData.firstName}
                      onChange={(e) => handleInputChange('firstName', e.target.value)}
                      className={isFieldModified('firstName', formData.firstName) ? 'border-blue-500 focus:border-blue-500' : ''}
                    />
                    {isFieldModified('firstName', formData.firstName) && (
                      <p className="mt-1 text-xs text-blue-500">
                        Bu alan değiştirildi
                      </p>
                    )}
                  </div>

                  <div className="col-span-2 lg:col-span-1">
                    <Label>Soyad</Label>
                    <Input 
                      type="text" 
                      defaultValue={formData.lastName}
                      onChange={(e) => handleInputChange('lastName', e.target.value)}
                      className={isFieldModified('lastName', formData.lastName) ? 'border-blue-500 focus:border-blue-500' : ''}
                    />
                    {isFieldModified('lastName', formData.lastName) && (
                      <p className="mt-1 text-xs text-blue-500">
                        Bu alan değiştirildi
                      </p>
                    )}
                  </div>

                  <div className="col-span-2 lg:col-span-1">
                    <Label>E-posta adresi</Label>
                    <Input 
                      type="text" 
                      defaultValue={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className={isFieldModified('email', formData.email) ? 'border-blue-500 focus:border-blue-500' : ''}
                    />
                    {isFieldModified('email', formData.email) && (
                      <p className="mt-1 text-xs text-blue-500">
                        Bu alan değiştirildi
                      </p>
                    )}
                  </div>

                  <div className="col-span-2 lg:col-span-1">
                    <Label>Telefon</Label>
                    <Input 
                      type="text" 
                      placeholder="0 (5XX) XXX XX XX"
                      defaultValue={formData.phoneNumber}
                      onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                      className={isFieldModified('phoneNumber', formData.phoneNumber) ? 'border-blue-500 focus:border-blue-500' : ''}
                    />
                    {isFieldModified('phoneNumber', formData.phoneNumber) && (
                      <p className="mt-1 text-xs text-blue-500">
                        Bu alan değiştirildi
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3 px-2 mt-6 lg:justify-end">
              <Button size="sm" variant="outline" onClick={closeModal}>
                Kapat
              </Button>
              <Button size="sm" onClick={handleSave}>
                Değişiklikleri Kaydet
              </Button>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
}
