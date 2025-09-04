"use client";
import React from "react";
import { ApexOptions } from "apexcharts";
import dynamic from "next/dynamic";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

export default function CategoryDistributionChart() {
  const options: ApexOptions = {
    chart: {
      fontFamily: "Outfit, sans-serif",
      type: "donut",
      height: 300,
    },
    colors: ["#465FFF", "#FF6B6B", "#4ECDC4", "#45B7D1", "#96CEB4"],
    labels: ["Elektronik", "Giyim", "Ev & Yaşam", "Spor", "Kitap"],
    legend: {
      show: true,
      position: "bottom",
      horizontalAlign: "center",
      fontFamily: "Outfit",
      fontSize: "14px",
      markers: {
        size: 8,
        shape: "circle" as const,
      },
    },
    plotOptions: {
      pie: {
        donut: {
          size: "70%",
          labels: {
            show: true,
            name: {
              show: true,
              fontSize: "16px",
              fontWeight: 600,
              color: "#374151",
              offsetY: -10,
            },
            value: {
              show: true,
              fontSize: "24px",
              fontWeight: 700,
              color: "#111827",
              offsetY: 10,
              formatter: (val: string) => `${val}%`,
            },
            total: {
              show: true,
              showAlways: false,
              label: "Toplam",
              fontSize: "16px",
              fontWeight: 600,
              color: "#6B7280",
              formatter: () => "100%",
            },
          },
        },
      },
    },
    dataLabels: {
      enabled: false,
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 300,
          },
          legend: {
            position: "bottom",
          },
        },
      },
    ],
    tooltip: {
      y: {
        formatter: (val: number) => `${val}%`,
      },
    },
  };

  const series = [35, 25, 20, 12, 8];

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-white/[0.03]">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
          Kategori Dağılımı
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Ürün kategorilerine göre dağılım
        </p>
      </div>
      <div className="flex justify-center">
        <ReactApexChart
          options={options}
          series={series}
          type="donut"
          height={300}
        />
      </div>
    </div>
  );
}
