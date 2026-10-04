import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Calendar, 
  MapPin, 
  ArrowRight, 
  ShieldCheck,
  Plus
} from 'lucide-react';
import { Activity } from '../../types';

export const ActivitiesSection: React.FC = () => {
  const { activities, setSelectedActivity, setCurrentTab, currentUser, setIsAdminView } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<string>('Semua');
  const [selectedYear, setSelectedYear] = useState<string>('Semua');

  const categories = [
    'Semua',
    'Sosial',
    'Olahraga',
    'Pendidikan',
    'Keagamaan',
    'Budaya',
    'Lingkungan',
    'Kewirausahaan',
    'Event'
  ];

  const years = ['Semua', '2026', '2025'];

  const filtered = activities.filter((act) => {
    const matchCat = selectedCategory === 'Semua' || act.category === selectedCategory;
    const matchYear = selectedYear === 'Semua' || act.year.toString() === selectedYear;
    return matchCat && matchYear;
  });

  return (
    <div className="py-16 sm:py-24 bg-slate-50 text-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-bold uppercase tracking-wider mb-2">
            <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
            <span>Dipublikasikan Khusus oleh Pengurus TDM RW 1</span>
          </div>
          <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-slate-900 tracking-tight mt-1">
            Kegiatan Pemuda RW 1
          </h2>
          <p className="text-slate-600 text-base sm:text-lg mt-3 leading-relaxed">
            Dokumentasi dan agenda kegiatan resmi paguyuban pemuda RW 1 Desa Pojok yang dikurasi dan dipublikasikan langsung oleh Pengurus.
          </p>
        </div>

        {/* Filter Controls */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10 bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
          
          {/* Category Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition ${
                  selectedCategory === cat 
                    ? 'bg-blue-600 text-white shadow-xs' 
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Year selector */}
          <div className="flex items-center gap-2 shrink-0 self-end md:self-auto text-xs font-semibold text-slate-600">
            <span>Tahun:</span>
            <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
              {years.map((y) => (
                <button
                  key={y}
                  onClick={() => setSelectedYear(y)}
                  className={`px-3 py-1 rounded-lg transition ${
                    selectedYear === y ? 'bg-white text-blue-700 font-bold shadow-xs' : 'hover:text-slate-900'
                  }`}
                >
                  {y}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Activities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((activity) => (
            <div
              key={activity.id}
              onClick={() => setSelectedActivity(activity)}
              className="bg-white rounded-3xl border border-slate-200/80 shadow-xs hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col cursor-pointer group"
            >
              {/* Photo Banner */}
              <div className="relative h-56 w-full overflow-hidden bg-slate-900">
                <img
                  src={activity.imageUrl}
                  alt={activity.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>
                <div className="absolute top-4 left-4 flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-blue-600 text-white uppercase tracking-wider backdrop-blur-md">
                    {activity.category}
                  </span>
                </div>
                <div className="absolute top-4 right-4">
                  <span className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider backdrop-blur-md ${
                    activity.status === 'Terlaksana' 
                      ? 'bg-emerald-500/90 text-white' 
                      : 'bg-amber-500/90 text-white'
                  }`}>
                    {activity.status}
                  </span>
                </div>
                <div className="absolute bottom-3 left-4 right-4 text-white">
                  <div className="flex items-center gap-2 text-xs text-blue-200">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{activity.date}</span>
                  </div>
                </div>
              </div>

              {/* Body */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <h3 className="font-display font-bold text-lg text-slate-900 leading-snug group-hover:text-blue-600 transition-colors">
                    {activity.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-3">
                    {activity.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                  <span className="flex items-center gap-1.5 truncate max-w-[190px]">
                    <MapPin className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                    <span className="truncate">{activity.location}</span>
                  </span>
                  <span className="text-blue-600 font-bold flex items-center gap-1 shrink-0 group-hover:translate-x-1 transition-transform">
                    Detail <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="p-10 sm:p-14 text-center bg-white rounded-3xl border border-slate-200 max-w-lg mx-auto shadow-sm space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto">
              <Calendar className="w-8 h-8" />
            </div>
            <div>
              <h3 className="font-display font-bold text-lg text-slate-900">
                Belum Ada Kegiatan Dipublikasikan
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 mt-1.5 leading-relaxed">
                Agenda dan dokumentasi kegiatan resmi diisi dan dipublikasikan langsung oleh Pengurus Paguyuban Muda-Mudi RW 1.
              </p>
            </div>
            <button
              onClick={() => {
                setIsAdminView(true);
                setCurrentTab('admin');
              }}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 text-white text-xs sm:text-sm font-bold shadow-md hover:bg-blue-700 transition"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Masuk Portal Pengurus untuk Tambah Kegiatan</span>
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
