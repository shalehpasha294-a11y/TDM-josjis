import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Calendar, 
  User, 
  Target, 
  ArrowRight
} from 'lucide-react';
import { ProgramKerja } from '../../types';

export const ProgramsSection: React.FC = () => {
  const { programs, setCurrentTab } = useApp();
  const [selectedCat, setSelectedCat] = useState<string>('Semua');

  const categories = [
    'Semua',
    'Sosial',
    'Olahraga',
    'Pendidikan',
    'Seni & Budaya',
    'Keagamaan',
    'Lingkungan',
    'Kewirausahaan'
  ];

  const filtered = selectedCat === 'Semua' 
    ? programs 
    : programs.filter(p => p.category === selectedCat);

  return (
    <div className="py-16 sm:py-24 bg-slate-50 text-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="px-3.5 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-bold uppercase tracking-wider">
            Rencana & Aksi Nyata
          </span>
          <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-slate-900 tracking-tight mt-3">
            Program Kerja Organisasi
          </h2>
          <p className="text-slate-600 text-base sm:text-lg mt-3 leading-relaxed">
            Inisiatif strategis 7 divisi Muda-Mudi Tri Dharma Manunggal untuk membangun solidaritas pemuda dan kesejahteraan masyarakat Desa Pojok RW 1.
          </p>
        </div>

        {/* Filter categories */}
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

        {/* Program Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((program) => {
            const isCompleted = program.status === 'Selesai';
            const isOngoing = program.status === 'Sedang Berjalan';
            return (
              <div
                key={program.id}
                className="bg-white rounded-3xl border border-slate-200/80 shadow-xs hover:shadow-xl transition-all duration-300 p-6 flex flex-col justify-between space-y-5 group"
              >
                <div className="space-y-4">
                  {/* Category & Status */}
                  <div className="flex items-center justify-between gap-2">
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-700 border border-blue-100">
                      {program.category}
                    </span>
                    <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                      isCompleted 
                        ? 'bg-emerald-100 text-emerald-800' 
                        : isOngoing 
                        ? 'bg-amber-100 text-amber-800' 
                        : 'bg-slate-100 text-slate-700'
                    }`}>
                      {program.status}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="font-display font-bold text-lg text-slate-900 leading-snug group-hover:text-blue-600 transition-colors">
                    {program.name}
                  </h3>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {program.description}
                  </p>

                  {/* Purpose Box */}
                  <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
                    <div className="flex items-center gap-1.5 text-[11px] font-bold text-blue-700 uppercase tracking-wider">
                      <Target className="w-3.5 h-3.5" />
                      <span>Tujuan Program:</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-normal">
                      {program.purpose}
                    </p>
                  </div>
                </div>

                {/* Meta details & Progress */}
                <div className="space-y-3 pt-3 border-t border-slate-100 text-xs text-slate-500">
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5 text-slate-400" />
                      <strong className="text-slate-700">{program.personInCharge}</strong>
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" />
                      {program.schedule}
                    </span>
                  </div>

                  {/* Progress Bar */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-[11px] font-semibold text-slate-500">
                      <span>Kemajuan Program</span>
                      <span className="text-blue-600 font-bold">{program.progressPercentage}%</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                      <div 
                        className={`h-full rounded-full transition-all duration-500 ${
                          isCompleted ? 'bg-emerald-500' : 'bg-blue-600'
                        }`}
                        style={{ width: `${program.progressPercentage}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Banner */}
        <div className="mt-16 p-8 rounded-3xl bg-gradient-to-r from-blue-700 via-indigo-700 to-blue-800 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="font-display font-bold text-xl sm:text-2xl">
              Punya Usulan Program Kerja Baru?
            </h3>
            <p className="text-sm text-blue-100 max-w-xl">
              Muda-Mudi Tri Dharma Manunggal selalu terbuka terhadap aspirasi pemuda dan warga RW 1. Sampaikan ide kreatif Anda ke pengurus!
            </p>
          </div>
          <button
            onClick={() => setCurrentTab('kontak')}
            className="px-6 py-3 rounded-2xl bg-white text-blue-800 font-bold text-sm hover:bg-blue-50 transition shadow-md shrink-0 flex items-center gap-2"
          >
            <span>Kirim Saran & Aspirasi</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};
