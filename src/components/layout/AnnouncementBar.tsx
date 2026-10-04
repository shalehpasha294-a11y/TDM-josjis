import React from 'react';
import { useApp } from '../../context/AppContext';
import { Bell, ArrowRight, X } from 'lucide-react';

export const AnnouncementBar: React.FC = () => {
  const { announcement, isAnnouncementVisible, dismissAnnouncement, setCurrentTab, appearance } = useApp();

  if (!announcement.isActive || !isAnnouncementVisible || !appearance.showMarquee) return null;

  return (
    <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-blue-800 text-white text-xs sm:text-sm py-2.5 px-4 sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 flex-1 overflow-hidden">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/20 text-white text-[11px] font-bold shrink-0 uppercase tracking-wider backdrop-blur-xs">
            <Bell className="w-3.5 h-3.5 animate-pulse text-amber-300" />
            Pengumuman
          </span>
          <p className="truncate font-semibold text-slate-100">
            {announcement.text}
          </p>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          {announcement.linkText && (
            <button
              onClick={() => {
                if (announcement.targetTab) setCurrentTab(announcement.targetTab);
              }}
              className="inline-flex items-center gap-1 text-xs font-bold text-amber-200 hover:text-white underline underline-offset-2 hover:no-underline transition"
            >
              {announcement.linkText}
              <ArrowRight className="w-3 h-3" />
            </button>
          )}
          <button
            onClick={dismissAnnouncement}
            className="p-1 rounded-md text-white/70 hover:text-white hover:bg-white/10 transition"
            aria-label="Tutup bar pengumuman"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
