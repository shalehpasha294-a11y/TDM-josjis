import React from 'react';
import { useApp } from '../../context/AppContext';
import { X, Calendar, Clock, MapPin, User, FileText, MessageSquare } from 'lucide-react';

export const AgendaDetailModal: React.FC = () => {
  const { selectedAgenda, setSelectedAgenda, orgInfo } = useApp();

  if (!selectedAgenda) return null;

  const contactPJ = () => {
    const text = encodeURIComponent(`Halo, saya ingin menanyakan terkait agenda: *${selectedAgenda.title}* pada tanggal ${selectedAgenda.date}.`);
    window.open(`https://wa.me/${orgInfo.whatsapp.replace(/[^0-9]/g, '')}?text=${text}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-xs animate-fade-in">
      <div 
        className="w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 bg-gradient-to-br from-blue-700 to-indigo-800 text-white relative">
          <button
            onClick={() => setSelectedAgenda(null)}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center transition"
          >
            <X className="w-4 h-4" />
          </button>
          <span className="px-2.5 py-0.5 rounded-full bg-white/20 text-[11px] font-bold uppercase tracking-wider mb-2 inline-block">
            {selectedAgenda.category}
          </span>
          <h3 className="font-display font-bold text-xl sm:text-2xl leading-snug">
            {selectedAgenda.title}
          </h3>
        </div>

        <div className="p-6 space-y-4 text-slate-700">
          <div className="space-y-3 p-4 rounded-2xl bg-slate-50 border border-slate-100 text-xs sm:text-sm">
            <div className="flex items-start gap-3">
              <Calendar className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
              <div>
                <span className="text-[10px] text-slate-400 font-bold uppercase block">Hari & Tanggal</span>
                <span className="font-semibold text-slate-900">{selectedAgenda.date}</span>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Clock className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <span className="text-[10px] text-slate-400 font-bold uppercase block">Waktu Pelaksanaan</span>
                <span className="font-semibold text-slate-900">{selectedAgenda.time}</span>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <MapPin className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
              <div>
                <span className="text-[10px] text-slate-400 font-bold uppercase block">Tempat</span>
                <span className="font-semibold text-slate-900">{selectedAgenda.location}</span>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <User className="w-4 h-4 text-purple-600 shrink-0 mt-0.5" />
              <div>
                <span className="text-[10px] text-slate-400 font-bold uppercase block">Penanggung Jawab</span>
                <span className="font-semibold text-slate-900">{selectedAgenda.personInCharge}</span>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5 text-blue-600" />
              <span>Catatan & Arahan Kegiatan</span>
            </h4>
            <p className="text-sm text-slate-700 leading-relaxed p-3.5 rounded-xl bg-blue-50/50 border border-blue-100">
              {selectedAgenda.notes}
            </p>
          </div>
        </div>

        <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between gap-3">
          <button
            onClick={contactPJ}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white transition"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Tanya PJ via WhatsApp</span>
          </button>
          <button
            onClick={() => setSelectedAgenda(null)}
            className="px-5 py-2 rounded-xl text-xs font-bold bg-slate-200 hover:bg-slate-300 text-slate-700 transition"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};
