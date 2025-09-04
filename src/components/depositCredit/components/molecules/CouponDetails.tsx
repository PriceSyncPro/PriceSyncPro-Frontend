import React from "react";
import { motion } from "framer-motion";
import { Typography } from "../atoms/Typography";
import { Coupon } from "../../../../utils/types/Coupon";

interface CouponDetailsProps {
  couponCode: string;
  coupon: Coupon;
}

export const CouponDetails: React.FC<CouponDetailsProps> = ({ couponCode, coupon }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="mt-6 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-900/50"
    >
      <Typography variant="subtitle" className="mb-3 text-green-800 dark:text-green-300">
        Kupon Detayları
      </Typography>

      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <Typography variant="small" className="text-gray-600 dark:text-gray-400">
            Kod:
          </Typography>
          <span className="font-medium px-2 py-1 bg-white dark:bg-gray-800 rounded border border-green-200 dark:border-green-900/50 text-green-600 dark:text-green-400">
            {couponCode}
          </span>
        </div>

        <div className="flex justify-between items-center">
          <Typography variant="small" className="text-gray-600 dark:text-gray-400">
            Değer:
          </Typography>
          <span className="font-medium text-green-600 dark:text-green-400">
            {coupon.type === 'fixed'
              ? `${coupon.discount} ₺`
              : `%${coupon.discount}`}
          </span>
        </div>

        <div className="flex justify-between items-center">
          <Typography variant="small" className="text-gray-600 dark:text-gray-400">
            Açıklama:
          </Typography>
          <span className="font-medium">{coupon.description}</span>
        </div>
      </div>
    </motion.div>
  );
};
