import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Calendar as CalendarIcon, 
  Clock, 
  MapPin, 
  User, 
  ArrowRight 
} from 'lucide-react';
import { AgendaEvent } from '../../types';

export const AgendaSection: React.FC = () => {
  const { agenda, setSelectedAgenda } = useApp();
  const [filterType, setFilterType] = useState<string>('Semua');

  const types = ['Semua', 'Rapat', 'Kegiatan', 'Event Warga', 'Deadline'];

  const filtered = filterType === 'Semua'
    ? agenda
    : agenda.filter(a => a.category === filterType);

  const daysInMonth = Array.from({ length: 31 }, (_, i) => i + 1);

  const getEventForDay = (day: number) => {
    const dayStr = `2026-10-${String(day).padStart(2, '0')}`;
    return agenda.find(a => a.date === dayStr);
  };

  return (
    <div className="py-16 sm:py-24 bg-slate-50 text-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="px-3.5 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-bold uppercase tracking-wider">
            Jadwal & Kalender
          </span>
          <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-slate-900 tracking-tight mt-3">
            Agenda Kegiatan Pemuda
          </h2>
          <p className="text-slate-600 text-base sm:text-lg mt-3 leading-relaxed">
            Pantau seluruh jadwal rapat rutin, latihan olahraga, kerja bakti, dan event warga RW 1 Desa Pojok secara real-time.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Interactive Mini Calendar Grid */}
          <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-md">
            
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <CalendarIcon className="w-5 h-5 text-blue-600" />
                <h3 className="font-display font-bold text-lg text-slate-900">
                  Oktober 2026
                </h3>
              </div>
              <span className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-blue-50 text-blue-700">
                Tawangsari
              </span>
            </div>

            {/* Days of week header */}
            <div className="grid grid-cols-7 gap-1 text-center font-bold text-xs text-slate-400 mb-2">
              <span>Min</span>
              <span>Sen</span>
              <span>Sel</span>
              <span>Rab</span>
              <span>Kam</span>
              <span>Jum</span>
              <span>Sab</span>
            </div>

            {/* Month Days (Oct 2026 starts on Thursday = 4 offset days) */}
            <div className="grid grid-cols-7 gap-1 text-center text-xs">
              <div className="p-2"></div>
              <div className="p-2"></div>
              <div className="p-2"></div>
              <div className="p-2"></div>
              {daysInMonth.map((day) => {
                const event = getEventForDay(day);
                const isSelected = day === 10;
                return (
                  <button
                    key={day}
                    onClick={() => {
                      if (event) setSelectedAgenda(event);
                    }}
                    className={`p-2 rounded-xl flex flex-col items-center justify-center h-10 w-full transition relative ${
                      event 
                        ? 'bg-blue-600 text-white font-bold shadow-xs hover:bg-blue-700' 
                        : isSelected 
                        ? 'bg-blue-100 text-blue-800 font-bold' 
                        : 'text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    <span>{day}</span>
                    {event && (
                      <span className="w-1 h-1 rounded-full bg-amber-300 -mt-0.5"></span>
                    )}
                  </button>
                );
              })}
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-600"></span>
                <span>Ada agenda</span>
              </div>
              <span>Klik tanggal bertanda untuk detail</span>
            </div>
          </div>

          {/* Right Column: Agenda List Cards */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Filter pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1">
              {types.map((t) => (
                <button
                  key={t}
                  onClick={() => setFilterType(t)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition ${
                    filterType === t 
                      ? 'bg-blue-600 text-white shadow-xs' 
                      : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>

            {/* List */}
            <div className="space-y-4">
              {filtered.map((item) => (
                <div
                  key={item.id}
                  onClick={() => setSelectedAgenda(item)}
                  className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md hover:border-blue-300 transition cursor-pointer flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 group"
                >
                  <div className="flex items-start gap-4">
                    {/* Date badge */}
                    <div className="w-14 h-14 rounded-2xl bg-blue-50 border border-blue-100 text-blue-700 flex flex-col items-center justify-center shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                      <span className="font-display font-black text-lg leading-none">
                        {item.date.split('-')[2]}
                      </span>
                      <span className="text-[10px] font-bold uppercase mt-0.5">
                        Okt '26
                      </span>
                    </div>

                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-slate-100 text-slate-700 uppercase">
                          {item.category}
                        </span>
                        <span className="text-xs text-amber-600 font-semibold flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {item.time}
                        </span>
                      </div>
                      <h4 className="font-display font-bold text-base text-slate-900 group-hover:text-blue-600 transition-colors">
                        {item.title}
                      </h4>
                      <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 pt-0.5">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                          {item.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <User className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                          PJ: {item.personInCharge}
                        </span>
                      </div>
                    </div>
                  </div>

                  <button className="px-4 py-2 rounded-xl text-xs font-bold bg-slate-100 group-hover:bg-blue-600 group-hover:text-white text-slate-700 transition flex items-center gap-1 shrink-0 self-end sm:self-auto">
                    <span>Lihat Detail</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};
