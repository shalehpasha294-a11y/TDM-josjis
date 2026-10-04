import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  ArrowRight, 
  Sparkles, 
  Users, 
  Calendar, 
  Award,
  ShieldCheck
} from 'lucide-react';
import { TdmLogo } from '../common/TdmLogo';

export const HeroSection: React.FC = () => {
  const { orgInfo, setCurrentTab, members, activities, programs, achievements, appearance } = useApp();

  const bgImage = appearance.heroBackgroundImage || 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=1800&q=80';

  return (
    <div className="relative overflow-hidden bg-slate-950 text-white pt-12 pb-20 sm:pt-16 sm:pb-28">
      {/* Background Graphic & Texture Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-25 filter blur-[1px] scale-105 transition-all duration-700"
        style={{ backgroundImage: `url('${bgImage}')` }}
      ></div>
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-slate-950/90 to-slate-950"></div>
      
      {/* Radiant Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-gradient-to-r from-blue-600/20 via-indigo-600/30 to-sky-500/20 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Badges */}
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          
          {/* Official TDM Circular Logo Emblem */}
          <div className="mb-5 relative group">
            <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-blue-500 to-sky-400 opacity-60 blur-md group-hover:opacity-100 transition duration-500"></div>
            <TdmLogo className="relative w-24 h-24 sm:w-28 sm:h-28 bg-white ring-4 ring-white/20 shadow-2xl hover:scale-105 transition-transform" />
          </div>

          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 backdrop-blur-md mb-6 shadow-md hover:bg-white/15 transition cursor-default">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
            <span className="w-2 h-2 rounded-full bg-emerald-400 -ml-4"></span>
            <span className="text-xs font-bold uppercase tracking-wider text-blue-200">
              {appearance.heroBadge || 'Karang Taruna Desa Pojok RW 1 • Tawangsari, Sukoharjo'}
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="font-display font-black text-4xl sm:text-6xl md:text-7xl tracking-tight text-white leading-tight sm:leading-none mb-4">
            MUDA-MUDI <br />
            <span className="bg-gradient-to-r from-blue-400 via-sky-300 to-indigo-300 bg-clip-text text-transparent">
              Tri Dharma Manunggal
            </span>
          </h1>

          {/* Tagline Highlight */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-2xl bg-blue-600/30 border border-blue-400/30 text-blue-200 font-display font-black text-lg sm:text-xl tracking-wide mb-6">
            <span className="text-amber-300 font-mono">“</span>
            <span>{appearance.mottoQuote || orgInfo.tagline}</span>
            <span className="text-amber-300 font-mono">”</span>
          </div>

          {/* Description */}
          <p className="text-base sm:text-xl text-slate-300 max-w-2xl font-normal leading-relaxed mb-8">
            {appearance.heroSubheadline || 'Wadah generasi muda untuk berkolaborasi, berkarya, mengembangkan potensi, dan memberikan kontribusi nyata bagi kemajuan masyarakat Desa Pojok.'}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 w-full sm:w-auto">
            <button
              onClick={() => setCurrentTab('kegiatan')}
              className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm sm:text-base shadow-lg shadow-blue-600/30 hover:shadow-blue-500/40 transition flex items-center justify-center gap-2 group"
            >
              <span>Lihat Kegiatan</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={() => setCurrentTab('tentang')}
              className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-bold text-sm sm:text-base border border-white/15 backdrop-blur-md transition flex items-center justify-center gap-2"
            >
              <span>Tentang Kami</span>
            </button>
            <button
              onClick={() => setCurrentTab('gabung')}
              className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-black text-sm sm:text-base shadow-lg shadow-amber-500/25 transition flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              <span>Gabung Pemuda</span>
            </button>
          </div>
        </div>

        {/* Floating Metrics / Stats Card Grid */}
        <div className="mt-14 sm:mt-18 pt-10 border-t border-white/10 grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
          
          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xs text-center hover:bg-white/10 transition">
            <div className="font-display font-black text-2xl sm:text-3xl text-white">
              {members.length + 116}
            </div>
            <div className="text-xs text-blue-300 font-semibold uppercase tracking-wider mt-1">
              Anggota Pemuda
            </div>
            <p className="text-[11px] text-slate-400 mt-0.5">Pemuda RT 1, 2, 3, 4</p>
          </div>

          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xs text-center hover:bg-white/10 transition">
            <div className="font-display font-black text-2xl sm:text-3xl text-white">
              {activities.length}+
            </div>
            <div className="text-xs text-blue-300 font-semibold uppercase tracking-wider mt-1">
              Kegiatan Resmi
            </div>
            <p className="text-[11px] text-slate-400 mt-0.5">Sosial, voli, gotong royong</p>
          </div>

          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xs text-center hover:bg-white/10 transition">
            <div className="font-display font-black text-2xl sm:text-3xl text-white">
              {programs.length}
            </div>
            <div className="text-xs text-blue-300 font-semibold uppercase tracking-wider mt-1">
              Program Kerja
            </div>
            <p className="text-[11px] text-slate-400 mt-0.5">7 Divisi kepengurusan</p>
          </div>

          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xs text-center hover:bg-white/10 transition">
            <div className="font-display font-black text-2xl sm:text-3xl text-white">
              {achievements.length}
            </div>
            <div className="text-xs text-blue-300 font-semibold uppercase tracking-wider mt-1">
              Prestasi & Juara
            </div>
            <p className="text-[11px] text-slate-400 mt-0.5">Kecamatan & Kabupaten</p>
          </div>
        </div>

      </div>
    </div>
  );
};
