"use client";
import React from "react";
import { ApexOptions } from "apexcharts";
import dynamic from "next/dynamic";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

export default function PriceTrackingChart() {
  const options: ApexOptions = {
    legend: {
      show: true,
      position: "top",
      horizontalAlign: "left",
    },
    colors: ["#465FFF", "#FF6B6B", "#4ECDC4"],
    chart: {
      fontFamily: "Outfit, sans-serif",
      height: 350,
      type: "line",
      toolbar: {
        show: false,
      },
    },
    stroke: {
      curve: "smooth",
      width: [3, 3, 3],
    },
    fill: {
      type: "gradient",
      gradient: {
        opacityFrom: 0.4,
        opacityTo: 0.1,
      },
    },
    markers: {
      size: 4,
      strokeColors: "#fff",
      strokeWidth: 2,
      hover: {
        size: 6,
      },
    },
    grid: {
      xaxis: {
        lines: {
          show: false,
        },
      },
      yaxis: {
        lines: {
          show: true,
        },
      },
    },
    dataLabels: {
      enabled: false,
    },
    tooltip: {
      enabled: true,
      y: {
        formatter: (val: number) => `₺${val.toFixed(2)}`,
      },
    },
    xaxis: {
      type: "category",
      categories: [
        "Oca",
        "Şub",
        "Mar",
        "Nis",
        "May",
        "Haz",
        "Tem",
        "Ağu",
        "Eyl",
        "Eki",
        "Kas",
        "Ara",
      ],
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    yaxis: {
      labels: {
        style: {
          fontSize: "12px",
          colors: ["#6B7280"],
        },
        formatter: (val: number) => `₺${val}`,
      },
      title: {
        text: "Fiyat (₺)",
        style: {
          fontSize: "14px",
          color: "#6B7280",
        },
      },
    },
  };

  const series = [
    {
      name: "Ürün A",
      data: [120, 115, 125, 130, 128, 135, 140, 138, 142, 145, 148, 150],
    },
    {
      name: "Ürün B",
      data: [80, 85, 82, 88, 90, 87, 92, 95, 98, 100, 102, 105],
    },
    {
      name: "Ürün C",
      data: [200, 195, 205, 210, 208, 215, 220, 218, 225, 230, 235, 240],
    },
  ];

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-white/[0.03]">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
          Fiyat Takip Grafiği
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Ürün fiyatlarının aylık değişimi
        </p>
      </div>
      <div className="max-w-full overflow-x-auto custom-scrollbar">
        <div id="priceTrackingChart" className="min-w-[600px]">
          <ReactApexChart
            options={options}
            series={series}
            type="area"
            height={350}
          />
        </div>
      </div>
    </div>
  );
}
