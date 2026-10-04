import React from 'react';
import { useApp } from '../../context/AppContext';
import { X, Calendar, MapPin, Users, CheckCircle2, Share2 } from 'lucide-react';

export const ActivityDetailModal: React.FC = () => {
  const { selectedActivity, setSelectedActivity, addToast } = useApp();

  if (!selectedActivity) return null;

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: selectedActivity.title,
        text: selectedActivity.description,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      addToast('info', 'Tautan Disalin', 'Tautan kegiatan berhasil disalin ke clipboard.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-xs animate-fade-in">
      <div 
        className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Image Header */}
        <div className="relative h-64 sm:h-72 w-full bg-slate-900">
          <img
            src={selectedActivity.imageUrl}
            alt={selectedActivity.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>
          <button
            onClick={() => setSelectedActivity(null)}
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/50 hover:bg-black/80 text-white flex items-center justify-center backdrop-blur-md transition"
            aria-label="Tutup detail kegiatan"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="absolute bottom-4 left-4 right-4 text-white">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-600 text-white uppercase tracking-wider">
                {selectedActivity.category}
              </span>
              <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
                selectedActivity.status === 'Terlaksana' ? 'bg-emerald-500/80 text-white' : 'bg-amber-500/80 text-white'
              }`}>
                {selectedActivity.status}
              </span>
            </div>
            <h3 className="font-display font-bold text-xl sm:text-2xl leading-tight">
              {selectedActivity.title}
            </h3>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          {/* Metadata badges */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-3.5 rounded-2xl bg-slate-50 border border-slate-100 text-xs text-slate-600">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-blue-600 shrink-0" />
              <div>
                <span className="block text-[10px] text-slate-400 font-bold uppercase">Tanggal</span>
                <span className="font-semibold text-slate-800">{selectedActivity.date}</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-rose-500 shrink-0" />
              <div>
                <span className="block text-[10px] text-slate-400 font-bold uppercase">Lokasi</span>
                <span className="font-semibold text-slate-800 truncate block max-w-[120px]">{selectedActivity.location}</span>
              </div>
            </div>
            <div className="flex items-center gap-2 col-span-2 sm:col-span-1">
              <Users className="w-4 h-4 text-emerald-600 shrink-0" />
              <div>
                <span className="block text-[10px] text-slate-400 font-bold uppercase">Peserta / Warga</span>
                <span className="font-semibold text-slate-800">± {selectedActivity.participantCount || 60} Orang</span>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider text-blue-700">
              Ringkasan Kegiatan
            </h4>
            <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
              {selectedActivity.description}
            </p>
          </div>

          {/* Full content narrative */}
          {selectedActivity.fullContent && (
            <div className="space-y-3 pt-2 border-t border-slate-100">
              <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider text-blue-700">
                Dokumentasi & Laporan Pelaksanaan
              </h4>
              <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-line">
                {selectedActivity.fullContent}
              </p>
            </div>
          )}

          {/* Impact banner */}
          <div className="p-4 rounded-2xl bg-blue-50/70 border border-blue-100 flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
            <div className="text-xs text-blue-900 leading-relaxed">
              <span className="font-bold block text-sm mb-0.5">Semangat Gotong Royong RW 1</span>
              Kegiatan ini didukung melalui partisipasi kas pemuda Tri Dharma Manunggal serta swadaya warga RW 1 Desa Pojok.
            </div>
          </div>
        </div>

        {/* Footer actions */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
          <button
            onClick={handleShare}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-200 transition"
          >
            <Share2 className="w-3.5 h-3.5 text-slate-600" />
            <span>Bagikan Kegiatan</span>
          </button>
          <button
            onClick={() => setSelectedActivity(null)}
            className="px-5 py-2 rounded-xl text-xs font-bold bg-blue-600 text-white hover:bg-blue-700 transition"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};
