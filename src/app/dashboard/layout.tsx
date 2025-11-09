"use client";
import { useSidebar } from "@/context/SidebarContext";
import { useAuth } from "@/context/AuthContext";
import AppHeader from "@/layout/AppHeader";
import AppSidebar from "@/layout/AppSidebar";
import Backdrop from "@/layout/Backdrop";
import React, { useMemo } from "react";
import { Toaster } from "sonner";
import AnnouncementBanner from "@/components/common/AnnouncementBanner";
import { AnnouncementProvider } from "@/context/AnnouncementContext";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isExpanded, isHovered, isMobileOpen } = useSidebar();
  const { isAuthenticated, loading } = useAuth();

  // Memoize margin calculation to prevent unnecessary re-renders
  const mainContentMargin = useMemo(() => {
    if (isMobileOpen) return "ml-0";
    if (isExpanded || isHovered) return "lg:ml-[290px]";
    return "lg:ml-[90px]";
  }, [isMobileOpen, isExpanded, isHovered]);

  // Early return for loading/unauthenticated states
  if (loading || !isAuthenticated) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
      </div>
    );
  }

  return (
    <AnnouncementProvider>
      <div className="min-h-screen xl:flex">
        {/* Sidebar and Backdrop */}
        <AppSidebar />

        {/* Toast Notifications - position optimized */}
        <Toaster
          richColors
          position="top-right"
          closeButton
          toastOptions={{
            className: "toast-custom",
          }}
        />

        <Backdrop />

        {/* Main Content Area */}
        <div
          className={`flex-1 transition-all duration-300 ease-in-out ${mainContentMargin}`}
        >
          {/* Header */}
          <AppHeader />

          {/* Announcement Banner */}
          <AnnouncementBanner />

          {/* Page Content */}
          <main className="p-1 mx-auto max-w-screen-2xl sm:p-4 md:p-6">
            {children}
          </main>
        </div>
      </div>
    </AnnouncementProvider>
  );
}
