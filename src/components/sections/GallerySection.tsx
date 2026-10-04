import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Video, 
  Play, 
  Maximize2 
} from 'lucide-react';
import { GalleryItem } from '../../types';

export const GallerySection: React.FC = () => {
  const { gallery, setActiveLightboxIndex } = useApp();
  const [selectedCat, setSelectedCat] = useState<string>('Semua');

  const categories = ['Semua', 'Sosial', 'Olahraga', 'Budaya', 'Rapat', 'Event'];

  const filtered = selectedCat === 'Semua'
    ? gallery
    : gallery.filter(g => g.category === selectedCat);

  const videoItems = gallery.filter(g => g.type === 'video');

  return (
    <div className="py-16 sm:py-24 bg-slate-50 text-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="px-3.5 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-bold uppercase tracking-wider">
            Dokumentasi Visual
          </span>
          <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-slate-900 tracking-tight mt-3">
            Galeri Foto & Video Pemuda
          </h2>
          <p className="text-slate-600 text-base sm:text-lg mt-3 leading-relaxed">
            Momen kebersamaan, keringat gotong royong, dan keseruan aktivitas muda-mudi Tri Dharma Manunggal di Desa Pojok RW 1.
          </p>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCat(cat)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition ${
                selectedCat === cat
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-500/25'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Masonry / Grid Gallery */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {filtered.map((item) => {
            const isVideo = item.type === 'video';
            const originalIndex = gallery.findIndex(g => g.id === item.id);

            return (
              <div
                key={item.id}
                onClick={() => setActiveLightboxIndex(originalIndex !== -1 ? originalIndex : 0)}
                className="bg-white rounded-3xl border border-slate-200/80 shadow-xs hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col group cursor-pointer"
              >
                <div className="relative h-64 w-full overflow-hidden bg-slate-900">
                  <img
                    src={item.thumbnailUrl}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent"></div>
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 rounded-full text-[10px] font-bold bg-blue-600 text-white uppercase tracking-wider backdrop-blur-md">
                      {item.category}
                    </span>
                  </div>
                  {isVideo && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-14 h-14 rounded-full bg-red-600 text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                        <Play className="w-6 h-6 fill-current ml-0.5" />
                      </div>
                    </div>
                  )}
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="p-2 rounded-xl bg-black/60 text-white backdrop-blur-md flex items-center justify-center">
                      <Maximize2 className="w-4 h-4" />
                    </span>
                  </div>
                  <div className="absolute bottom-3 left-4 right-4 text-white">
                    <h3 className="font-display font-bold text-base leading-snug line-clamp-1">
                      {item.title}
                    </h3>
                    <p className="text-xs text-blue-200 mt-0.5">{item.date}</p>
                  </div>
                </div>
                <div className="p-4 text-xs text-slate-600 leading-relaxed line-clamp-2">
                  {item.caption}
                </div>
              </div>
            );
          })}
        </div>

        {/* Video Feature Highlight Section */}
        {videoItems.length > 0 && (
          <div className="bg-slate-900 text-white p-8 sm:p-12 rounded-3xl shadow-xl space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="px-3 py-1 rounded-full bg-red-600 text-white text-xs font-bold uppercase tracking-wider inline-flex items-center gap-1.5 mb-2">
                  <Video className="w-3.5 h-3.5" />
                  Kanal Video Pemuda
                </span>
                <h3 className="font-display font-bold text-2xl sm:text-3xl text-white">
                  Kilas Balik Video Semarak Warga
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 max-w-md">
                Karya produksi multimedia oleh Divisi PDD Muda-Mudi Tri Dharma Manunggal mengabadikan euforia warga Desa Pojok RW 1.
              </p>
            </div>
            <div className="aspect-video w-full max-w-4xl mx-auto rounded-2xl overflow-hidden shadow-2xl bg-black border border-white/10">
              <iframe
                className="w-full h-full"
                src={`https://www.youtube-nocookie.com/embed/${videoItems[0].youtubeId || 'dQw4w9WgXcQ'}`}
                title="Dokumentasi Pemuda TDM RW 1"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
