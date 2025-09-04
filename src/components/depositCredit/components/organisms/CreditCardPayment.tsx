// components/organisms/CreditCardPayment.tsx
import React, { useState } from 'react';
import { CreditCard, Calendar, User, Lock, Shield, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { AmountInput } from "@/components/depositCredit/components/molecules/AmountInput";
import { motion } from 'framer-motion';

interface CreditCardPaymentProps {
    amount: string;
    setAmount: (amount: string) => void;
    handlePayment: () => Promise<void>;
    setCardError: (error: string | null) => void;
    isProcessing: boolean;
    error: string | null;
}

export const CreditCardPayment: React.FC<CreditCardPaymentProps> = ({
                                                                        amount,
                                                                        setAmount,
                                                                        handlePayment,
                                                                        isProcessing,
                                                                        setCardError,
                                                                        error
                                                                    }) => {
    const [cardNumber, setCardNumber] = useState('');
    const [cardholderName, setCardholderName] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [cvv, setCvv] = useState('');
    const [focused, setFocused] = useState<string | null>(null);

    // Kredi kartı numarası formatlaması
    const formatCardNumber = (value: string) => {
        const input = value.replace(/\D/g, '');
        const formatted = input.substring(0, 16).match(/.{1,4}/g)?.join(' ') || '';
        return formatted;
    };

    // Son kullanma tarihi formatlaması (MM/YY)
    const formatExpiryDate = (value: string) => {
        const input = value.replace(/\D/g, '');
        let formatted = input;
        if (input.length > 2) {
            formatted = `${input.substring(0, 2)}/${input.substring(2, 4)}`;
        }
        return formatted;
    };

    // Formu kontrol et
    const isFormValid = () => {
        return (
            amount &&
            cardNumber.replace(/\s/g, '').length === 16 &&
            cardholderName.length > 0 &&
            expiryDate.length === 5 &&
            cvv.length >= 3
        );
    };

    // Kart tipini belirleme
    const getCardType = () => {
        const number = cardNumber.replace(/\s/g, '');
        if (number.startsWith('4')) return 'visa';
        if (/^5[1-5]/.test(number)) return 'mastercard';
        if (/^3[47]/.test(number)) return 'amex';
        return 'generic';
    };

    const cardType = getCardType();

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
        >
            <div className="grid md:grid-cols-2 gap-8">

                {/* Sol Taraf - Form Alanları */}
                <div className="space-y-5">
                    <AmountInput
                        amount={amount}
                        setAmount={setAmount}
                        error={error}
                        setCardError={setCardError}
                    />

                    <div className="space-y-2">
                        <Label htmlFor="cardNumber" className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300">
                            <CreditCard className="mr-1.5 h-4 w-4 text-blue-600" />
                            Kart Numarası
                        </Label>
                        <Input
                            id="cardNumber"
                            value={cardNumber}
                            onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                            onFocus={() => setFocused('cardNumber')}
                            onBlur={() => setFocused(null)}
                            placeholder="1234 5678 9012 3456"
                            maxLength={19}
                            className="rounded-lg border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="cardholderName" className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300">
                            <User className="mr-1.5 h-4 w-4 text-blue-600" />
                            Kart Üzerindeki İsim
                        </Label>
                        <Input
                            id="cardholderName"
                            value={cardholderName}
                            onChange={(e) => setCardholderName(e.target.value.toUpperCase())}
                            onFocus={() => setFocused('cardholderName')}
                            onBlur={() => setFocused(null)}
                            placeholder="AD SOYAD"
                            className="rounded-lg border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="expiryDate" className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300">
                                <Calendar className="mr-1.5 h-4 w-4 text-blue-600" />
                                Son Kullanma
                            </Label>
                            <Input
                                id="expiryDate"
                                value={expiryDate}
                                onChange={(e) => setExpiryDate(formatExpiryDate(e.target.value))}
                                onFocus={() => setFocused('expiryDate')}
                                onBlur={() => setFocused(null)}
                                placeholder="AA/YY"
                                maxLength={5}
                                className="rounded-lg border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="cvv" className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300">
                                <Lock className="mr-1.5 h-4 w-4 text-blue-600" />
                                CVV
                            </Label>
                            <Input
                                id="cvv"
                                type="text"
                                inputMode="numeric"
                                value={cvv}
                                onChange={(e) => setCvv(e.target.value.replace(/\D/g, '').substring(0, 4))}
                                onFocus={() => setFocused('cvv')}
                                onBlur={() => setFocused(null)}
                                placeholder="***"
                                maxLength={4}
                                className="rounded-lg border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                    </div>

                    {error && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md text-sm flex items-start"
                        >
                            <div className="mr-2 mt-0.5 flex-shrink-0">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <div>{error}</div>
                        </motion.div>
                    )}

                    <Button
                        onClick={handlePayment}
                        disabled={!isFormValid() || isProcessing}
                        className={`w-full gap-2 text-base py-5 rounded-lg transition-all duration-200 ${
                            isFormValid() && !isProcessing
                                ? 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-md hover:shadow-lg'
                                : 'bg-gray-400'
                        }`}
                    >
                        {isProcessing ? (
                            <>
                                <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                İşleniyor...
                            </>
                        ) : (
                            <>
                                {isFormValid() ? `${amount}₺ Yükle` : 'Yükleme Yap'}
                            </>
                        )}
                    </Button>

                    <div className="grid grid-cols-2 gap-2 text-xs text-gray-600 dark:text-gray-400 mt-2">
                        <div className="flex items-center">
                            <Check className="h-3 w-3 text-green-500 mr-1" />
                            Anında İşlem
                        </div>
                        <div className="flex items-center">
                            <Check className="h-3 w-3 text-green-500 mr-1" />
                            3D Secure Koruması
                        </div>
                        <div className="flex items-center">
                            <Check className="h-3 w-3 text-green-500 mr-1" />
                            Komisyon Yok
                        </div>
                        <div className="flex items-center">
                            <Check className="h-3 w-3 text-green-500 mr-1" />
                            SSL Şifreleme
                        </div>
                    </div>
                </div>
                {/* Sağ Taraf - Kart Görselleştirme */}
                <div className="flex flex-col justify-start space-y-6">
                    <div className="relative h-52 w-full perspective">
                        <motion.div
                            className={`w-full h-full rounded-xl shadow-lg p-6 flex flex-col justify-between bg-gradient-to-br ${
                                cardType === 'visa' ? 'from-blue-600 to-blue-900' :
                                    cardType === 'mastercard' ? 'from-red-500 to-red-800' :
                                        cardType === 'amex' ? 'from-green-600 to-green-900' :
                                            'from-gray-700 to-gray-900'
                            }`}
                            animate={{ rotateY: focused === 'cvv' ? 180 : 0 }}
                            transition={{ duration: 0.4 }}
                        >
                            {/* Ön Yüz */}
                            <div className={`absolute inset-0 p-6 flex flex-col justify-between backface-hidden ${focused === 'cvv' ? 'hidden' : 'block'}`}>
                                <div className="flex justify-between items-start">
                                    <div className="h-10 w-auto px-2 bg-opacity-80 bg-white rounded-md flex items-center justify-center">
                                        <span className="text-xl font-bold text-gray-800">
                                            {cardType === 'visa' ? 'VISA' :
                                                cardType === 'mastercard' ? 'MC' :
                                                    cardType === 'amex' ? 'AMEX' :
                                                        'CARD'}
                                        </span>
                                    </div>
                                    <CreditCard className="h-8 w-8 text-white opacity-70" />
                                </div>

                                <div className="mt-4">
                                    <div className={`text-gray-200 text-sm mb-1 transition-all ${focused === 'cardNumber' ? 'text-white font-medium' : ''}`}>Kart Numarası</div>
                                    <div className={`text-white text-xl tracking-wider font-medium transition-all ${focused === 'cardNumber' ? 'text-yellow-200 scale-105' : ''}`}>
                                        {cardNumber || '•••• •••• •••• ••••'}
                                    </div>
                                </div>

                                <div className="flex justify-between">
                                    <div>
                                        <div className={`text-gray-200 text-xs mb-1 transition-all ${focused === 'cardholderName' ? 'text-white font-medium' : ''}`}>Kart Sahibi</div>
                                        <div className={`text-white font-medium transition-all ${focused === 'cardholderName' ? 'text-yellow-200' : ''}`}>
                                            {cardholderName || 'AD SOYAD'}
                                        </div>
                                    </div>
                                    <div>
                                        <div className={`text-gray-200 text-xs mb-1 transition-all ${focused === 'expiryDate' ? 'text-white font-medium' : ''}`}>Son Kul.</div>
                                        <div className={`text-white font-medium transition-all ${focused === 'expiryDate' ? 'text-yellow-200' : ''}`}>
                                            {expiryDate || 'AA/YY'}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Arka Yüz */}
                            <div className={`absolute inset-0 backface-hidden rotate-y-180 ${focused === 'cvv' ? 'block' : 'hidden'}`}>
                                <div className="h-12 bg-gray-800 w-full mt-6"></div>
                                <div className="px-6 mt-4">
                                    <div className="flex justify-between items-center bg-white h-10 rounded-md px-4">
                                        <div className="text-gray-800 font-medium">CVV</div>
                                        <div className="text-gray-800 font-mono">{cvv ? '•'.repeat(cvv.length) : '•••'}</div>
                                    </div>
                                    <div className="mt-6 text-xs text-gray-300 text-right">
                                        Güvenlik kodu kartın arkasındadır
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Kart Altı Güvenlik Öğeleri ve Logolar */}
                    <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                        <div className="flex items-center justify-center text-xs text-gray-600 dark:text-gray-400 mb-3">
                            <Shield className="h-4 w-4 mr-1.5 text-green-600" />
                            <span>Güvenli ve şifrelenmiş ödeme</span>
                        </div>

                        <div className="flex items-center justify-center space-x-3">
                            <div className="h-8 w-12 bg-blue-600 rounded-md flex items-center justify-center text-white font-bold text-xs">VISA</div>
                            <div className="h-8 w-12 rounded-md flex items-center justify-center">
                                <div className="flex">
                                    <div className="h-5 w-5 bg-red-500 rounded-full -mr-2"></div>
                                    <div className="h-5 w-5 bg-yellow-400 rounded-full opacity-80"></div>
                                </div>
                            </div>
                            <div className="h-8 w-12 bg-green-600 rounded-md flex items-center justify-center text-white font-bold text-xs">AMEX</div>
                            <div className="h-8 w-12 bg-gray-800 rounded-md flex items-center justify-center text-white font-bold text-xs">TROY</div>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};
