"use client";

import React from 'react';
import { X, AlertTriangle, AlertCircle, Info, CheckCircle, ChevronDown } from 'lucide-react';
import { useAnnouncementContext, Announcement, AnnouncementType } from '@/context/AnnouncementContext';

const getAnnouncementStyles = (type: AnnouncementType) => {
  switch (type) {
    case 'warning':
      return {
        container: 'bg-yellow-50 border-l-4 border-yellow-400',
        icon: 'text-yellow-400',
        title: 'text-yellow-800',
        message: 'text-yellow-700',
        button: 'bg-yellow-400 hover:bg-yellow-500 text-yellow-900',
        closeButton: 'text-yellow-400 hover:text-yellow-600',
        Icon: AlertTriangle,
      };
    case 'error':
      return {
        container: 'bg-red-50 border-l-4 border-red-400',
        icon: 'text-red-400',
        title: 'text-red-800',
        message: 'text-red-700',
        button: 'bg-red-400 hover:bg-red-500 text-red-900',
        closeButton: 'text-red-400 hover:text-red-600',
        Icon: AlertCircle,
      };
    case 'info':
      return {
        container: 'bg-blue-50 border-l-4 border-blue-400',
        icon: 'text-blue-400',
        title: 'text-blue-800',
        message: 'text-blue-700',
        button: 'bg-blue-400 hover:bg-blue-500 text-blue-900',
        closeButton: 'text-blue-400 hover:text-blue-600',
        Icon: Info,
      };
    case 'success':
      return {
        container: 'bg-green-50 border-l-4 border-green-400',
        icon: 'text-green-400',
        title: 'text-green-800',
        message: 'text-green-700',
        button: 'bg-green-400 hover:bg-green-500 text-green-900',
        closeButton: 'text-green-400 hover:text-green-600',
        Icon: CheckCircle,
      };
    default:
      return {
        container: 'bg-gray-50 border-l-4 border-gray-400',
        icon: 'text-gray-400',
        title: 'text-gray-800',
        message: 'text-gray-700',
        button: 'bg-gray-400 hover:bg-gray-500 text-gray-900',
        closeButton: 'text-gray-400 hover:text-gray-600',
        Icon: Info,
      };
  }
};

interface AnnouncementItemProps {
  announcement: Announcement;
  onClose: (id: string) => void;
}

const AnnouncementItem: React.FC<AnnouncementItemProps> = ({ announcement, onClose }) => {
  const styles = getAnnouncementStyles(announcement.type);
  const { Icon } = styles;

  const handleActionClick = () => {
    if (announcement.link) {
      window.location.href = announcement.link;
    }
  };

  const handleClose = () => {
    onClose(announcement.id);
  };

  return (
    <div className={`${styles.container} p-2 mb-2 mx-4 md:mx-6 rounded shadow-sm`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Icon className={`h-4 w-4 ${styles.icon} mr-2`} />
          <div>
            <p className={`text-xs font-medium ${styles.title}`}>
              {announcement.title}
            </p>
            {announcement.message && (
              <p className={`text-xs ${styles.message} opacity-80`}>
                {announcement.message}
              </p>
            )}
          </div>
        </div>
        <div className="flex items-center space-x-1">
          {announcement.link && (
            <button
              onClick={handleActionClick}
              className={`${styles.button} px-2 py-1 rounded text-xs font-medium transition-colors duration-200`}
            >
              Tıkla
            </button>
          )}
          <button
            onClick={handleClose}
            className={`${styles.closeButton} transition-colors duration-200 p-1`}
          >
            <X className="h-3 w-3" />
          </button>
        </div>
      </div>
    </div>
  );
};

const AnnouncementBanner: React.FC = () => {
  const { announcements, removeAnnouncement } = useAnnouncementContext();

  const visibleAnnouncements = announcements.filter(announcement => announcement.isVisible);

  if (visibleAnnouncements.length === 0) {
    return null;
  }

  const maxVisible = 2;
  const hasMore = visibleAnnouncements.length > maxVisible;

  return (
    <div className="announcement-banner relative">
      <div className={`${hasMore ? 'max-h-32 overflow-y-auto' : ''} space-y-1 relative`}>
        {visibleAnnouncements.map((announcement) => (
          <AnnouncementItem
            key={announcement.id}
            announcement={announcement}
            onClose={removeAnnouncement}
          />
        ))}
        
        {/* Gradient fade effect - inside scroll container */}
        {hasMore && (
          <div className="sticky bottom-0 h-6 bg-gradient-to-t from-white to-transparent pointer-events-none -mt-6"></div>
        )}
      </div>
      
      {hasMore && (
        <div className="mx-4 md:mx-6 mt-1 mb-2">
          <div className="flex items-center justify-center space-x-2 py-1 bg-white">
            <ChevronDown className="h-3 w-3 text-gray-400" />
            <span className="text-xs text-gray-500 font-medium">
              {visibleAnnouncements.length - maxVisible} daha fazla duyuru
            </span>
            <ChevronDown className="h-3 w-3 text-gray-400" />
          </div>
        </div>
      )}
    </div>
  );
};

export default AnnouncementBanner;
