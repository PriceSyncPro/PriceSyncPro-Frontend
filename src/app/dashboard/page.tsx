import type { Metadata } from "next";
import { EcommerceMetrics } from "@/components/ecommerce/EcommerceMetrics";
import PriceTrackingChart from "@/components/charts/PriceTrackingChart";
import SalesPerformanceChart from "@/components/charts/SalesPerformanceChart";
import CategoryDistributionChart from "@/components/charts/CategoryDistributionChart";
import React from "react";
import AuthGuard from "@/utils/components/AuthGuard";

export const metadata: Metadata = {
  title: "Dashboard | PriceSyncPro - Fiyat Takip ve Analiz Platformu",
  description: "PriceSyncPro ile ürün fiyatlarınızı takip edin, analiz edin ve rekabet avantajı elde edin. Gelişmiş dashboard ile tüm verilerinizi tek yerden yönetin.",
};

export default function Dashboard() {
  return (
      <AuthGuard requireAuth={true} redirectTo="/signin">
          <div className="grid grid-cols-12 gap-4 md:gap-6">
              {/* Metrics */}
              <div className="col-span-12">
                  <EcommerceMetrics/>
              </div>

              {/* Price Tracking Chart */}
              <div className="col-span-12 xl:col-span-8">
                  <PriceTrackingChart/>
              </div>

              {/* Category Distribution */}
              <div className="col-span-12 xl:col-span-4">
                  <CategoryDistributionChart/>
              </div>

              {/* Sales Performance Chart */}
              <div className="col-span-12">
                  <SalesPerformanceChart/>
              </div>
          </div>
      </AuthGuard>

  );
}
