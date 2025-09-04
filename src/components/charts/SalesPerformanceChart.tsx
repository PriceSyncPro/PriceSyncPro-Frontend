"use client";
import React from "react";
import { ApexOptions } from "apexcharts";
import dynamic from "next/dynamic";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

export default function SalesPerformanceChart() {
  const options: ApexOptions = {
    colors: ["#465fff", "#FF6B6B"],
    chart: {
      fontFamily: "Outfit, sans-serif",
      type: "bar",
      height: 300,
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "55%",
        borderRadius: 8,
        borderRadiusApplication: "end",
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 4,
      colors: ["transparent"],
    },
    xaxis: {
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
    legend: {
      show: true,
      position: "top",
      horizontalAlign: "left",
      fontFamily: "Outfit",
    },
    yaxis: {
      title: {
        text: "Satış Miktarı",
        style: {
          fontSize: "14px",
          color: "#6B7280",
        },
      },
      labels: {
        formatter: (val: number) => `${val}K`,
      },
    },
    grid: {
      yaxis: {
        lines: {
          show: true,
        },
      },
    },
    fill: {
      opacity: 1,
    },
    tooltip: {
      y: {
        formatter: (val: number) => `${val}K ₺`,
      },
    },
  };

  const series = [
    {
      name: "Bu Yıl",
      data: [168, 385, 201, 298, 187, 195, 291, 310, 215, 390, 280, 412],
    },
    {
      name: "Geçen Yıl",
      data: [120, 295, 180, 250, 160, 170, 240, 280, 190, 320, 250, 350],
    },
  ];

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-white/[0.03]">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
          Satış Performansı
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Aylık satış karşılaştırması
        </p>
      </div>
      <div className="max-w-full overflow-x-auto custom-scrollbar">
        <div id="salesPerformanceChart" className="min-w-[600px]">
          <ReactApexChart
            options={options}
            series={series}
            type="bar"
            height={300}
          />
        </div>
      </div>
    </div>
  );
}
