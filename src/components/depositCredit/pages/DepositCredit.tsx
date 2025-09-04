import React, { JSX, useState } from "react";
import { Gift, CreditCard } from "lucide-react";
import confetti from 'canvas-confetti';
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import { CouponRedemption } from "../components/organisms/CouponRedemption";
import { SuccessMessage } from "../components/organisms/SuccessMessage";
import { useCoupon } from "../hooks/useCoupon";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CreditCardPayment } from "../components/organisms/CreditCardPayment"; // Bu bileşeni oluşturacağız

export default function BalanceTopUpPage(): JSX.Element {

  // Tamamlanma durumu ve sonuç verileri
  const [isComplete, setIsComplete] = useState<boolean>(false);
  const [resultData, setResultData] = useState<{
    amount: string;
    transactionId: string;
    method: 'Kupon' | 'Kredi Kartı';
  } | null>(null);

  // Kredi kartı ile ödeme durumu
  const [cardAmount, setCardAmount] = useState<string>('');
  const [isCardProcessing, setIsCardProcessing] = useState<boolean>(false);
  const [cardError, setCardError] = useState<string | null>(null);

  // Kupon hook'unu kullanma
  const {
    couponCode,
    setCouponCode,
    couponStatus,
    isProcessing,
    error,
    redeemCoupon,
    resetCoupon
  } = useCoupon();

  // Konfeti efekti
  const triggerConfetti = () => {
    const duration = 3000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 9999 };
    function randomInRange(min: number, max: number) {
      return Math.random() * (max - min) + min;
    }
    const interval: NodeJS.Timeout = setInterval(function() {
      const timeLeft = animationEnd - Date.now();
      if (timeLeft <= 0) {
        return clearInterval(interval);
      }
      const particleCount = 50 * (timeLeft / duration);
      // Yeşil tonlarda konfetiler
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
        colors: ['#4ade80', '#22c55e', '#16a34a', '#15803d'],
      });
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
        colors: ['#4ade80', '#22c55e', '#16a34a', '#15803d'],
      });
    }, 250);
  };

  // Kuponu kullanma
  const handleRedeemCoupon = async (): Promise<void> => {
    try {
      const success = await redeemCoupon();
      if (success) {
        setResultData({
          amount: "100", // Bu değer gerçek API yanıtından gelmeli
          transactionId: Math.floor(Math.random() * 1000000000).toString(),
          method: 'Kupon'
        });
        setIsComplete(true);
        triggerConfetti();
      }
    } catch (err) {
      console.error("Kupon kullanımı sırasında hata:", err);
    }
  };

  // Kredi kartı ile ödeme
  const handleCardPayment = async (): Promise<void> => {
    if (!cardAmount || isNaN(Number(cardAmount)) || Number(cardAmount) <= 0) {
      setCardError("Lütfen geçerli bir tutar giriniz");
      return;
    }

    setIsCardProcessing(true);
    setCardError(null);

    try {
      // Burada gerçek kredi kartı ödeme API'sini çağırabilirsiniz
      // Şimdilik başarılı bir yanıt simüle ediyoruz
      await new Promise(resolve => setTimeout(resolve, 2000)); // Simüle edilmiş API çağrısı

      setResultData({
        amount: cardAmount,
        transactionId: Math.floor(Math.random() * 1000000000).toString(),
        method: 'Kredi Kartı'
      });

      setIsComplete(true);
      triggerConfetti();
    } catch (err) {
      console.error("Kredi kartı ödemesi sırasında hata:", err);
      setCardError("Ödeme işlemi sırasında bir hata oluştu. Lütfen daha sonra tekrar deneyin.");
    } finally {
      setIsCardProcessing(false);
    }
  };

  // Yeni işlem başlatma
  const handleNewTransaction = () => {
    setIsComplete(false);
    setResultData(null);
    resetCoupon();
    setCardAmount('');
    setCardError(null);
  };

  return (
      <div className="min-h-screen bg-gradient-to-b from-white to-green-50 dark:from-gray-900 dark:to-gray-900">
        <PageBreadcrumb pageTitle="Bakiye Yükleme" />
        <div className="space-y-6 container mx-auto px-4 pb-12">
          {!isComplete ? (
              <div className="max-w-3xl mx-auto">
                <div className="text-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Bakiye Yükleme</h2>
                  <p className="text-gray-600 dark:text-gray-300">Hesabınıza bakiye yüklemek için bir yöntem seçin</p>
                </div>

                <Tabs defaultValue="creditcard">
                  <TabsList className="grid w-full grid-cols-2 mb-8">
                    <TabsTrigger value="creditcard" className="flex items-center justify-center">
                      <CreditCard className="mr-2 h-4 w-4" />
                      Kredi Kartı
                    </TabsTrigger>
                    <TabsTrigger value="coupon" className="flex items-center justify-center">
                      <Gift className="mr-2 h-4 w-4" />
                      Kupon Kodu
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="coupon">
                    <CouponRedemption
                        couponCode={couponCode}
                        setCouponCode={setCouponCode}
                        redeemCoupon={handleRedeemCoupon}
                        couponStatus={couponStatus}
                        isProcessing={isProcessing}
                        error={error}
                    />
                  </TabsContent>

                  <TabsContent value="creditcard">
                    <CreditCardPayment
                        amount={cardAmount}
                        setAmount={setCardAmount}
                        handlePayment={handleCardPayment}
                        isProcessing={isCardProcessing}
                        setCardError={setCardError}
                        error={cardError}
                    />
                  </TabsContent>
                </Tabs>
              </div>
          ) : (
              <SuccessMessage
                  couponValue={resultData?.amount || "0"}
                  transactionId={resultData?.transactionId || ""}
                  date={new Date().toLocaleDateString()}
                  method={resultData?.method || "Kupon"}
                  onNewTransaction={handleNewTransaction}
              />
          )}
        </div>
      </div>
  );
};
