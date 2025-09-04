import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Input } from "../atoms/Input";
import { Button } from "../atoms/Button";
import { Typography } from "../atoms/Typography";
import { Icon } from "../atoms/Icon";
import { Gift, CheckCircle, XCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface CouponInputProps {
  couponCode: string;
  setCouponCode: (code: string) => void;
  verifyCoupon: () => void;
  status: 'valid' | 'invalid' | null;
  isVerifying: boolean;
  description?: string;
  className?: string;
}

export const CouponInput: React.FC<CouponInputProps> = ({
  couponCode,
  setCouponCode,
  verifyCoupon,
  status,
  isVerifying,
  description,
  className,
}) => {
  return (
    <div className={`p-5 border-2 rounded-lg border-green-500 bg-green-50 dark:bg-green-900/20 dark:border-green-800 ${className}`}>
      <Typography variant="subtitle" className="flex items-center mb-3">
        <Icon icon={Gift} size="sm" className="mr-2 text-green-600 dark:text-green-400" />
        Kupon Kodunuzu Girin
      </Typography>

      <div className="flex space-x-2">
        <Input
          value={couponCode}
          onChange={(e) => setCouponCode(e.target.value)}
          placeholder="Kupon kodunu buraya yazın"
          disabled={isVerifying || status === 'valid'}
        />
        <Button
          onClick={verifyCoupon}
          disabled={!couponCode || isVerifying || status === 'valid'}
          variant={status === 'valid' ? "outline" : "default"}
          isLoading={isVerifying}
        >
          {status === 'valid' ? "Doğrulandı" : "Doğrula"}
        </Button>
      </div>

      <AnimatePresence>
        {status === 'valid' && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Alert className="mt-4 bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 border-green-200 dark:border-green-900">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
                <AlertDescription className="font-medium">
                  Kupon geçerli: {description || "İndirim uygulandı"}
                </AlertDescription>
              </div>
            </Alert>
          </motion.div>
        )}

        {status === 'invalid' && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Alert className="mt-4 bg-red-50 text-red-800 dark:bg-red-900/30 dark:text-red-300 border-red-200 dark:border-red-900">
              <div className="flex items-center gap-2">
                <XCircle className="h-4 w-4" />
                <AlertDescription>
                  Geçersiz kupon kodu. Lütfen kontrol edip tekrar deneyin.
                </AlertDescription>
              </div>
            </Alert>
          </motion.div>
        )}
      </AnimatePresence>

      <Typography variant="small" className="mt-4">
        Örnek kuponlar: BONUS50, EXTRA100, FREE500
      </Typography>
    </div>
  );
};
