import Calendar from "@/components/calendar/Calendar";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Takvim | PriceSyncPro - Etkinlik Yönetimi",
  description:
    "PriceSyncPro takvim sayfası - Etkinliklerinizi planlayın ve yönetin",
  // other metadata
};
export default function page() {
  return (
    <div>
      <PageBreadcrumb pageTitle="Calendar" />
      <Calendar />
    </div>
  );
}
