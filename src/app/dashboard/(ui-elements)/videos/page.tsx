import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import VideosExample from "@/components/ui/video/VideosExample";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Videolar | PriceSyncPro - UI Bileşenleri",
  description:
    "PriceSyncPro video bileşenleri - Video oynatıcı ve medya yönetimi örnekleri",
};

export default function VideoPage() {
  return (
    <div>
      <PageBreadcrumb pageTitle="Videos" />

      <VideosExample />
    </div>
  );
}
