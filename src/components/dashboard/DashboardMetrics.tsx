"use client";
import React from "react";
import { BoxIconLine, GroupIcon} from "@/icons";
export const DashboardMetrics = () => {
  return (
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6">
        {/* <!-- Metric Item Start --> */}
        <div
            className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
          
          {/* Üst kısım - Icon, Başlık ve Sayı yan yana */}
          <div className="flex items-center gap-4">
            <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
              <BoxIconLine className="text-gray-800 dark:text-white/90"/>
            </div>
            <div>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Ürünler
              </span>
              <h4 className="font-bold text-gray-800 text-title-sm dark:text-white/90">
                0
              </h4>
            </div>
          </div>
              
          {/* ��rün Durumları - Daha küçük */}
          <div className="mt-4 grid grid-cols-3 gap-1.5">
            {/* Onaylı */}
            <div className="bg-green-50 dark:bg-green-900/20 rounded-md p-1.5 border border-green-200 dark:border-green-800">
              <div className="min-w-0">
                <p className="text-xs font-medium text-green-700 dark:text-green-300 truncate">Onaylı</p>
                <p className="text-xs font-bold text-green-800 dark:text-green-200">0</p>
              </div>
            </div>
            {/* Onay Bekliyor */}
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-md p-1.5 border border-blue-200 dark:border-blue-800">
              <div className="min-w-0">
                <p className="text-xs font-medium text-blue-700 dark:text-blue-300 truncate">Bekliyor</p>
                <p className="text-xs font-bold text-blue-800 dark:text-blue-200">0</p>
              </div>
            </div>
            {/* Beklemede */}
            <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-md p-1.5 border border-yellow-200 dark:border-yellow-800">
              <div className="min-w-0">
                <p className="text-xs font-medium text-yellow-700 dark:text-yellow-300 truncate">Beklemede</p>
                <p className="text-xs font-bold text-yellow-800 dark:text-yellow-200">0</p>
              </div>
            </div>
            {/* Reddedildi */}
            <div className="bg-red-50 dark:bg-red-900/20 rounded-md p-1.5 border border-red-200 dark:border-red-800">
              <div className="min-w-0">
                <p className="text-xs font-medium text-red-700 dark:text-red-300 truncate">Reddedildi</p>
                <p className="text-xs font-bold text-red-800 dark:text-red-200">0</p>
              </div>
            </div>
            {/* Hata */}
            <div className="bg-orange-50 dark:bg-orange-900/20 rounded-md p-1.5 border border-orange-200 dark:border-orange-800">
              <div className="min-w-0">
                <p className="text-xs font-medium text-orange-700 dark:text-orange-300 truncate">Hata</p>
                <p className="text-xs font-bold text-orange-800 dark:text-orange-200">0</p>
              </div>
            </div>
            {/* İnaktif */}
            <div className="bg-gray-50 dark:bg-gray-800/50 rounded-md p-1.5 border border-gray-200 dark:border-gray-700">
              <div className="min-w-0">
                <p className="text-xs font-medium text-gray-700 dark:text-gray-300 truncate">İnaktif</p>
                <p className="text-xs font-bold text-gray-800 dark:text-gray-200">0</p>
              </div>
            </div>
          </div>
        </div>
        {/* <!-- Metric Item End --> */}
        
        {/* <!-- Metric Item Start --> */}
        <div
            className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
          
          {/* Üst kısım - Icon, Başlık ve Sayı yan yana */}
          <div className="flex items-center gap-4">
            <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
              <GroupIcon className="text-gray-800 size-6 dark:text-white/90"/>
            </div>
            <div>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Aktif Kurallar
              </span>
              <h4 className="font-bold text-gray-800 text-title-sm dark:text-white/90">
                0
              </h4>
            </div>
          </div>

          {/* Bir sonraki rapor zamanı */}
          <div className="mt-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3 border border-blue-200 dark:border-blue-800">
            <p className="text-xs font-medium text-blue-700 dark:text-blue-300 mb-1">
              Bir sonraki rapor zamanı:
            </p>
            <div className="text-sm font-bold text-blue-800 dark:text-blue-200">
              02:45:30
            </div>
          </div>
        </div>
        {/* <!-- Metric Item End --> */}
      </div>
  );
};