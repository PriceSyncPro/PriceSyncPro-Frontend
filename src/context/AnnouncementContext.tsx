"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';

export type AnnouncementType = 'warning' | 'error' | 'info' | 'success';

export interface Announcement {
  id: string;
  type: AnnouncementType;
  title: string;
  message: string;
  link?: string;
  isVisible: boolean;
}

interface AnnouncementContextType {
  announcements: Announcement[];
  addAnnouncement: (type: AnnouncementType, title: string, message: string, link?: string) => string;
  removeAnnouncement: (id: string) => void;
  clearAllAnnouncements: () => void;
}

const AnnouncementContext = createContext<AnnouncementContextType | undefined>(undefined);

export const AnnouncementProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);

  const addAnnouncement = (type: AnnouncementType, title: string, message: string, link?: string): string => {
    const id = Math.random().toString(36).substr(2, 9);
    const newAnnouncement: Announcement = {
      id,
      type,
      title,
      message,
      link,
      isVisible: true,
    };

    setAnnouncements(prev => [...prev, newAnnouncement]);
    return id;
  };

  const removeAnnouncement = (id: string) => {
    setAnnouncements(prev => prev.filter(announcement => announcement.id !== id));
  };

  const clearAllAnnouncements = () => {
    setAnnouncements([]);
  };

  return (
    <AnnouncementContext.Provider
      value={{
        announcements,
        addAnnouncement,
        removeAnnouncement,
        clearAllAnnouncements,
      }}
    >
      {children}
    </AnnouncementContext.Provider>
  );
};

export const useAnnouncementContext = () => {
  const context = useContext(AnnouncementContext);
  if (context === undefined) {
    throw new Error('useAnnouncementContext must be used within an AnnouncementProvider');
  }
  return context;
};
