import type { Metadata } from "next";
// import { DashboardMetrics } from "@/components/dashboard/DashboardMetrics";
import { QuickStart } from "@/components/dashboard/QuickStart";
import React from "react";
import PlatformBenefits from "@/components/dashboard/PlatformBenefits";
export const metadata: Metadata = {
  title: "Dashboard | PriceSyncPro - Fiyat Takip ve Analiz Platformu",
  description: "PriceSyncPro ile ürün fiyatlarınızı takip edin, analiz edin ve rekabet avantajı elde edin. Gelişmiş dashboard ile tüm verilerinizi tek yerden yönetin.",
};


export default function Dashboard() {
  return (
    <div className="space-y-6 md:space-y-8">
      {/* Quick Start - Ortalanmış */}
      <div className="flex justify-center">
        <div className="w-full max-w-4xl">
          <QuickStart />
        </div>
      </div>
      <PlatformBenefits />

    </div>
  );
}
