import { useState } from 'react';
// import { Coupon } from '../types/coupon'; // Unused import removed
import CreditService from "@/utils/api/services/creditService";

export const useCoupon = () => {
  const [couponCode, setCouponCode] = useState<string>('');
  const [couponStatus, setCouponStatus] = useState<'valid' | 'invalid' | null>(null);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Kupon kodunu kullanarak kredi yükler
   * @returns Kupon kullanım durumu (başarılı/başarısız)
   */
  const redeemCoupon = async () => {
    if (!couponCode) return false;

    setIsProcessing(true);
    setError(null);

    try {
      // CreditService.redeem() fonksiyonu ile kuponu kullan
      const result = await CreditService.reedem(couponCode.toUpperCase());

      if (result.isSuccessful) {
        // Kupon başarıyla kullanıldı
        setCouponStatus('valid');
        return true;
      } else {
        setCouponStatus('invalid');
        setError(result.errorMessages?.[0] ?? 'Geçersiz kupon kodu veya kupon kullanılırken bir hata oluştu.');
        return false;
      }
    } catch (err) {
      setCouponStatus('invalid');
      setError(err instanceof Error ? err.message : 'Kupon kullanılırken bir hata oluştu.');
      console.error('Kupon kullanma hatası:', err);
      return false;
    } finally {
      setIsProcessing(false);
    }
  };

  /**
   * Kupon durumunu sıfırlar
   */
  const resetCoupon = () => {
    setCouponCode('');
    setCouponStatus(null);
    setError(null);
  };

  return {
    couponCode,
    setCouponCode,
    couponStatus,
    isProcessing,
    error,
    redeemCoupon,
    resetCoupon
  };
};
