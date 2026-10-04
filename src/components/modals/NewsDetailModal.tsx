import React from 'react';
import { useApp } from '../../context/AppContext';
import { X, Calendar, User, Clock, Share2, MessageCircle } from 'lucide-react';

export const NewsDetailModal: React.FC = () => {
  const { selectedNews, setSelectedNews, addToast } = useApp();

  if (!selectedNews) return null;

  const shareViaWhatsApp = () => {
    const text = encodeURIComponent(`*${selectedNews.title}*\n\nBaca warta selengkapnya di website resmi Muda-Mudi Tri Dharma Manunggal RW 1:\n${window.location.href}`);
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
  };

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    addToast('info', 'Tautan Disalin', 'Tautan artikel berita berhasil disalin.');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-xs animate-fade-in">
      <div 
        className="w-full max-w-3xl bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Image */}
        <div className="relative h-64 sm:h-80 w-full bg-slate-900">
          <img
            src={selectedNews.thumbnailUrl}
            alt={selectedNews.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>
          <button
            onClick={() => setSelectedNews(null)}
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/50 hover:bg-black/80 text-white flex items-center justify-center backdrop-blur-md transition"
            aria-label="Tutup artikel"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="absolute bottom-5 left-5 right-5 text-white">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-600 text-white uppercase tracking-wider mb-2.5 inline-block">
              {selectedNews.category}
            </span>
            <h2 className="font-display font-bold text-xl sm:text-2xl md:text-3xl leading-snug">
              {selectedNews.title}
            </h2>
          </div>
        </div>

        {/* Article Meta */}
        <div className="px-6 py-3 bg-slate-50 border-b border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500">
          <div className="flex flex-wrap items-center gap-4">
            <span className="flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-blue-600" />
              <strong className="text-slate-700">{selectedNews.author}</strong>
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-slate-400" />
              {selectedNews.date}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              {selectedNews.readTime}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={shareViaWhatsApp}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-semibold transition"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>Share WA</span>
            </button>
            <button
              onClick={copyLink}
              className="p-1.5 rounded-lg bg-slate-200 hover:bg-slate-300 text-slate-700 transition"
              title="Salin tautan"
            >
              <Share2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 flex-1 text-slate-700 text-sm sm:text-base leading-relaxed">
          <p className="font-semibold text-slate-900 text-base sm:text-lg italic border-l-4 border-blue-600 pl-4 py-1 bg-blue-50/50 rounded-r-xl">
            {selectedNews.summary}
          </p>
          <div className="space-y-4 whitespace-pre-line text-slate-800">
            {selectedNews.content}
          </div>
          <div className="pt-6 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
            <span>Diterbitkan oleh Divisi PDD & Media Tri Dharma Manunggal</span>
            <span>Desa Pojok RW 1, Tawangsari</span>
          </div>
        </div>

        {/* Action button */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 flex justify-end">
          <button
            onClick={() => setSelectedNews(null)}
            className="px-6 py-2 rounded-xl text-xs font-bold bg-slate-900 text-white hover:bg-slate-800 transition"
          >
            Selesai Membaca
          </button>
        </div>
      </div>
    </div>
  );
};
