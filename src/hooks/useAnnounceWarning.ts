"use client";

import { useAnnouncementContext, AnnouncementType } from '@/context/AnnouncementContext';

export const useAnnounceWarning = () => {
  const { addAnnouncement, removeAnnouncement, clearAllAnnouncements } = useAnnouncementContext();

  const announceWarning = (title: string, message: string, link?: string): string => {
    return addAnnouncement('warning', title, message, link);
  };

  const announceError = (title: string, message: string, link?: string): string => {
    return addAnnouncement('error', title, message, link);
  };

  const announceInfo = (title: string, message: string, link?: string): string => {
    return addAnnouncement('info', title, message, link);
  };

  const announceSuccess = (title: string, message: string, link?: string): string => {
    return addAnnouncement('success', title, message, link);
  };

  const announce = (type: AnnouncementType, title: string, message: string, link?: string): string => {
    return addAnnouncement(type, title, message, link);
  };

  const dismissAnnouncement = (id: string) => {
    removeAnnouncement(id);
  };

  const clearAll = () => {
    clearAllAnnouncements();
  };

  return {
    announceWarning,
    announceError,
    announceInfo,
    announceSuccess,
    announce,
    dismissAnnouncement,
    clearAll,
  };
};
