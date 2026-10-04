import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Trophy, 
  Medal
} from 'lucide-react';

export const AchievementsSection: React.FC = () => {
  const { achievements } = useApp();

  return (
    <div className="py-16 sm:py-24 bg-slate-50 text-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="px-3.5 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-bold uppercase tracking-wider">
            Kebanggaan Bersama
          </span>
          <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-slate-900 tracking-tight mt-3">
            Prestasi & Penghargaan
          </h2>
          <p className="text-slate-600 text-base sm:text-lg mt-3 leading-relaxed">
            Dedikasi dan kerja keras para pemuda Tri Dharma Manunggal yang telah mengukir prestasi membanggakan bagi Desa Pojok RW 1.
          </p>
        </div>

        {/* Achievement Trophy Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {achievements.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-3xl border border-slate-200/80 shadow-xs hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col group relative"
            >
              {/* Image banner */}
              <div className="relative h-56 w-full overflow-hidden bg-slate-900">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>
                {/* Trophy Badge */}
                <div className="absolute top-4 left-4 flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-amber-400 to-yellow-500 text-slate-950 font-extrabold text-xs shadow-lg">
                  <Trophy className="w-3.5 h-3.5 fill-current" />
                  <span>{item.rank}</span>
                </div>
                <div className="absolute top-4 right-4">
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-white/20 text-white backdrop-blur-md">
                    Tahun {item.year}
                  </span>
                </div>
                <div className="absolute bottom-3 left-4 right-4 text-white">
                  <span className="text-[11px] font-semibold text-amber-300 block">
                    {item.competition}
                  </span>
                  <h3 className="font-display font-bold text-lg leading-snug">
                    {item.title}
                  </h3>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {item.description}
                </p>
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400 font-medium">
                  <span className="flex items-center gap-1">
                    <Medal className="w-3.5 h-3.5 text-amber-500" />
                    Kategori: {item.category}
                  </span>
                  <span className="text-blue-600 font-bold">Desa Pojok RW 1</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Motivational Banner */}
        <div className="mt-16 p-8 rounded-3xl bg-gradient-to-br from-blue-900 via-indigo-900 to-slate-900 text-white text-center max-w-3xl mx-auto shadow-xl space-y-3">
          <Trophy className="w-10 h-10 text-amber-400 mx-auto animate-bounce" />
          <h3 className="font-display font-bold text-2xl">
            "Pemuda Berdaya, Desa Berjaya"
          </h3>
          <p className="text-xs sm:text-sm text-blue-200 max-w-xl mx-auto leading-relaxed">
            Prestasi bukan tujuan akhir, melainkan buah dari kekompakan, latihan tekun, dan rasa cinta terhadap kampung halaman Desa Pojok tercinta.
          </p>
        </div>

      </div>
    </div>
  );
};
