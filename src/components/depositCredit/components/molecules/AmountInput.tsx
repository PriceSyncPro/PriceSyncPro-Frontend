import React from 'react';
import { Input } from '@/components/ui/input';
import { DollarSign } from 'lucide-react';
import {Label} from "@radix-ui/react-menu";

interface AmountInputProps {
    amount: string;
    setAmount: (amount: string) => void;
    setCardError: (error: string | null) => void;
    error: string | null;
}

export const AmountInput: React.FC<AmountInputProps> = ({ amount, setAmount, error, setCardError }) => {
    // Girişin geçerli olup olmadığını kontrol eden fonksiyon
    const validateAmount = (value: string): boolean => {
        const numValue = parseFloat(value);
        if (value === '' || isNaN(numValue)) {
            // Boş değer veya geçersiz sayı
            setCardError(null);
            return true;
        } else if (numValue < 1) {
            // Minimum değerden küçük
            setCardError("En az 1₺ yükleme yapabilirsiniz");
            return false;
        } else if (numValue > 1000) {
            // Maksimum değerden büyük
            setCardError("En fazla 1000₺ yükleyebilirsiniz");
            return false;
        } else {
            // Değer sınırlar içinde
            setCardError(null);
            return true;
        }
    };

    // Değer değiştiğinde çağrılacak fonksiyon
    const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        setAmount(newValue);
        validateAmount(newValue);
    };

    // Input'tan çıkıldığında çağrılacak fonksiyon
    const handleBlur = () => {
        const numValue = parseFloat(amount);
        if (amount !== '' && !isNaN(numValue)) {
            if (numValue < 1) {
                setAmount('1');
                setCardError(null);
            } else if (numValue > 1000) {
                // Maksimum değer aşıldığında değeri düzeltmiyoruz,
                // hata mesajını göstermeye devam ediyoruz
                setCardError("En fazla 1000₺ yükleyebilirsiniz");
            }
        }
    };

    return (
        <div className="space-y-2">
            <Label className="flex items-center">
                <DollarSign className="mr-1.5 h-4 w-4 text-green-600" />
                Yüklenecek Tutar
            </Label>
            <div className="relative">
                <Input
                    id="amount"
                    type="number"
                    value={amount}
                    onChange={handleAmountChange}
                    onBlur={handleBlur}
                    className={`pl-8 ${error && error.includes('1000') ? 'border-red-500 focus:ring-red-500' : ''}`}
                    placeholder="0.00"
                    min="1"
                    max="1000"
                    step="0.01"
                />
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">₺</span>
            </div>
        </div>
    );
};
