import React, { useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { X, ChevronLeft, ChevronRight, Play, Maximize2 } from 'lucide-react';

export const LightboxModal: React.FC = () => {
  const { gallery, activeLightboxIndex, setActiveLightboxIndex } = useApp();

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (activeLightboxIndex === null) return;
      if (e.key === 'ArrowRight') {
        setActiveLightboxIndex((activeLightboxIndex + 1) % gallery.length);
      } else if (e.key === 'ArrowLeft') {
        setActiveLightboxIndex((activeLightboxIndex - 1 + gallery.length) % gallery.length);
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [activeLightboxIndex, gallery.length, setActiveLightboxIndex]);

  if (activeLightboxIndex === null) return null;

  const currentItem = gallery[activeLightboxIndex];
  if (!currentItem) return null;

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveLightboxIndex((activeLightboxIndex - 1 + gallery.length) % gallery.length);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveLightboxIndex((activeLightboxIndex + 1) % gallery.length);
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md p-4 select-none animate-fade-in"
      onClick={() => setActiveLightboxIndex(null)}
    >
      {/* Top action bar */}
      <div className="absolute top-4 inset-x-4 flex items-center justify-between z-50 text-white">
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-600/80 uppercase tracking-wider backdrop-blur-md">
            {currentItem.category}
          </span>
          <span className="text-xs text-slate-400">
            {activeLightboxIndex + 1} / {gallery.length}
          </span>
        </div>
        <button
          onClick={() => setActiveLightboxIndex(null)}
          className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition"
          aria-label="Tutup preview galeri"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Prev button */}
      <button
        onClick={handlePrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/25 text-white flex items-center justify-center transition z-50"
        aria-label="Foto sebelumnya"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      {/* Main Media Content */}
      <div 
        className="max-w-4xl max-h-[80vh] flex flex-col items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        {currentItem.type === 'video' ? (
          <div className="w-full aspect-video max-w-3xl rounded-2xl overflow-hidden shadow-2xl bg-black">
            <iframe
              className="w-full h-full"
              src={`https://www.youtube-nocookie.com/embed/${currentItem.youtubeId || 'dQw4w9WgXcQ'}?autoplay=1`}
              title={currentItem.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        ) : (
          <img
            src={currentItem.mediaUrl}
            alt={currentItem.title}
            className="max-h-[70vh] max-w-full object-contain rounded-2xl shadow-2xl"
          />
        )}

        {/* Caption */}
        <div className="mt-4 text-center max-w-xl text-white space-y-1 px-4">
          <h4 className="font-display font-bold text-lg sm:text-xl">
            {currentItem.title}
          </h4>
          <p className="text-xs sm:text-sm text-slate-300">
            {currentItem.caption}
          </p>
          <span className="text-[11px] text-blue-400 font-medium inline-block pt-1">
            Dokumentasi: {currentItem.date}
          </span>
        </div>
      </div>

      {/* Next button */}
      <button
        onClick={handleNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/25 text-white flex items-center justify-center transition z-50"
        aria-label="Foto selanjutnya"
      >
        <ChevronRight className="w-6 h-6" />
      </button>
    </div>
  );
};
