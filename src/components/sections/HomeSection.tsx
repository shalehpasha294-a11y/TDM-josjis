import React from 'react';
import { useApp } from '../../context/AppContext';
import { HeroSection } from './HeroSection';
import { 
  ArrowRight, 
  Sparkles, 
  Calendar, 
  Users, 
  ShoppingBag, 
  DollarSign, 
  ChevronRight,
  CheckCircle2,
  MessageCircle,
  Trophy
} from 'lucide-react';

export const HomeSection: React.FC = () => {
  const { 
    activities, 
    agenda, 
    news, 
    umkmProducts, 
    achievements, 
    totalBalance, 
    setCurrentTab,
    setSelectedActivity,
    setSelectedAgenda,
    setSelectedNews,
    appearance
  } = useApp();

  return (
    <div className="space-y-0">
      
      {/* 1. Hero Section */}
      <HeroSection />

      {/* 2. Tri Dharma Pillars Quick Highlight */}
      {appearance.showTriDharmaPillars && (
        <section className="py-16 sm:py-20 bg-white border-b border-slate-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="text-xs font-bold uppercase tracking-widest text-blue-600 block mb-1">
                Nilai & Pondasi
              </span>
              <h2 className="font-display font-extrabold text-2xl sm:text-4xl text-slate-900">
                Tiga Pilar Tri Dharma Manunggal
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-2">
                Prinsip gotong royong yang menjadi napas kebersamaan pemuda RW 1 Desa Pojok.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-8 rounded-3xl bg-blue-50/50 border border-blue-100 hover:border-blue-300 transition space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white font-display font-black text-xl flex items-center justify-center shadow-md shadow-blue-500/20">
                  1
                </div>
                <h3 className="font-display font-bold text-lg text-slate-900">
                  Dharma Bakti
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Pengabdian tulus pemuda bagi kesejahteraan warga, orang tua, dan kemajuan Desa Pojok tanpa pamrih.
                </p>
              </div>

              <div className="p-8 rounded-3xl bg-indigo-50/50 border border-indigo-100 hover:border-indigo-300 transition space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-indigo-600 text-white font-display font-black text-xl flex items-center justify-center shadow-md shadow-indigo-500/20">
                  2
                </div>
                <h3 className="font-display font-bold text-lg text-slate-900">
                  Dharma Karya
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Kreativitas tanpa henti dalam olahraga, kesenian, inovasi wirausaha, dan prestasi generasi muda.
                </p>
              </div>

              <div className="p-8 rounded-3xl bg-emerald-50/50 border border-emerald-100 hover:border-emerald-300 transition space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white font-display font-black text-xl flex items-center justify-center shadow-md shadow-emerald-500/20">
                  3
                </div>
                <h3 className="font-display font-bold text-lg text-slate-900">
                  Dharma Manunggal
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Persatuan erat antar RT 1, 2, 3, dan 4. Satu rasa, satu jiwa dengan semboyan <em>"Ra mangan ra jalan"</em>.
                </p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 3. Latest Activities Grid Preview */}
      {appearance.showActivitiesPreview && (
        <section className="py-16 sm:py-20 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-blue-600 block mb-1">
                  Aksi & Gerakan
                </span>
                <h2 className="font-display font-extrabold text-2xl sm:text-4xl text-slate-900">
                  Kegiatan Terbaru Pemuda
                </h2>
              </div>
              <button
                onClick={() => setCurrentTab('kegiatan')}
                className="text-xs sm:text-sm font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1 group self-start sm:self-auto"
              >
                <span>Lihat Semua Kegiatan</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            {activities.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {activities.slice(0, 3).map((act) => (
                  <div
                    key={act.id}
                    onClick={() => setSelectedActivity(act)}
                    className="bg-white rounded-3xl border border-slate-200/80 shadow-xs hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col cursor-pointer group"
                  >
                    <div className="relative h-52 w-full overflow-hidden bg-slate-900">
                      <img
                        src={act.imageUrl}
                        alt={act.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-3 left-3">
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-600 text-white uppercase tracking-wider backdrop-blur-md">
                          {act.category}
                        </span>
                      </div>
                      <div className="absolute bottom-3 left-3 text-white text-xs flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>{act.date}</span>
                      </div>
                    </div>
                    <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                      <div>
                        <h3 className="font-display font-bold text-base text-slate-900 group-hover:text-blue-600 transition-colors leading-snug">
                          {act.title}
                        </h3>
                        <p className="text-xs text-slate-500 mt-1.5 line-clamp-2">
                          {act.description}
                        </p>
                      </div>
                      <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
                        <span className="truncate max-w-[170px]">{act.location}</span>
                        <span className="text-blue-600 font-bold">Detail →</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-8 sm:p-12 text-center bg-white rounded-3xl border border-slate-200 shadow-sm max-w-xl mx-auto space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto">
                  <Calendar className="w-6 h-6" />
                </div>
                <h3 className="font-display font-bold text-base text-slate-900">
                  Agenda Kegiatan Resmi
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                  Dokumentasi dan publikasi kegiatan pemuda RW 1 diatur dan diisi langsung oleh Pengurus TDM RW 1.
                </p>
              </div>
            )}
          </div>
        </section>
      )}

      {/* 4. Upcoming Agenda + Kas Transparansi Split Section */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left: Agenda Mendatang */}
            {appearance.showAgendaPreview && (
              <div className={`${appearance.showTransparencyPreview ? 'lg:col-span-7' : 'lg:col-span-12'} space-y-6`}>
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-widest text-amber-600 block mb-1">
                      Jadwal Terdekat
                    </span>
                    <h3 className="font-display font-extrabold text-2xl sm:text-3xl text-slate-900">
                      Agenda Mendatang
                    </h3>
                  </div>
                  <button
                    onClick={() => setCurrentTab('agenda')}
                    className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1"
                  >
                    <span>Buka Kalender</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>

                <div className="space-y-3">
                  {agenda.slice(0, 3).map((ag) => (
                    <div
                      key={ag.id}
                      onClick={() => setSelectedAgenda(ag)}
                      className="p-4 rounded-2xl bg-slate-50 hover:bg-blue-50/50 border border-slate-200 hover:border-blue-200 transition cursor-pointer flex items-center justify-between gap-4 group"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-blue-600 text-white flex flex-col items-center justify-center shrink-0">
                          <span className="font-display font-black text-sm leading-none">
                            {ag.date.split('-')[2]}
                          </span>
                          <span className="text-[9px] uppercase font-bold mt-0.5">Okt</span>
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-white text-slate-700 border border-slate-200">
                              {ag.category}
                            </span>
                            <span className="text-xs text-amber-600 font-semibold">{ag.time}</span>
                          </div>
                          <h4 className="font-display font-bold text-sm text-slate-900 group-hover:text-blue-600 transition-colors mt-0.5">
                            {ag.title}
                          </h4>
                          <p className="text-xs text-slate-500 line-clamp-1">{ag.location}</p>
                        </div>
                      </div>
                      <span className="text-xs font-bold text-blue-600 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                        Lihat →
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Right: Transparansi Kas Card */}
            {appearance.showTransparencyPreview && (
              <div className={`${appearance.showAgendaPreview ? 'lg:col-span-5' : 'lg:col-span-12'} p-8 rounded-3xl bg-gradient-to-br from-blue-700 via-blue-800 to-indigo-900 text-white shadow-xl space-y-6`}>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-widest text-blue-200">
                    Laporan Kas Terbuka
                  </span>
                  <div className="w-8 h-8 rounded-xl bg-white/10 flex items-center justify-center">
                    <DollarSign className="w-4 h-4 text-emerald-300" />
                  </div>
                </div>

                <div>
                  <p className="text-xs text-blue-200">Saldo Kas Tersedia Saat Ini:</p>
                  <div className="font-display font-black text-3xl sm:text-4xl text-white mt-1">
                    Rp {totalBalance.toLocaleString('id-ID')}
                  </div>
                </div>

                <div className="space-y-2 text-xs text-blue-100 pt-2 border-t border-white/15">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Diperbarui berkala oleh Bendahara TDM RW 1.</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Dapat diaudit dan diunduh rekapan kasnya oleh publik.</span>
                  </div>
                </div>

                <button
                  onClick={() => setCurrentTab('transparansi')}
                  className="w-full py-3 px-4 rounded-xl bg-white text-blue-900 font-bold text-xs sm:text-sm hover:bg-blue-50 transition shadow-md flex items-center justify-center gap-2"
                >
                  <span>Lihat Pembukuan Lengkap</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}

          </div>
        </div>
      </section>

      {/* 5. Featured UMKM Pemuda */}
      {appearance.showUMKMPreview && (
        <section className="py-16 sm:py-20 bg-slate-50 border-t border-slate-200/60">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-emerald-600 block mb-1">
                  Kemandirian Ekonomi
                </span>
                <h2 className="font-display font-extrabold text-2xl sm:text-4xl text-slate-900">
                  Produk UMKM Pemuda RW 1
                </h2>
              </div>
              <button
                onClick={() => setCurrentTab('umkm')}
                className="text-xs sm:text-sm font-bold text-emerald-600 hover:text-emerald-700 flex items-center gap-1 group self-start sm:self-auto"
              >
                <span>Kunjungi Etalase UMKM</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {umkmProducts.slice(0, 4).map((prod) => (
                <div
                  key={prod.id}
                  className="bg-white rounded-3xl border border-slate-200/80 shadow-xs hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col justify-between group"
                >
                  <div className="relative h-48 w-full overflow-hidden bg-slate-100">
                    <img
                      src={prod.imageUrl}
                      alt={prod.productName}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-white/90 text-slate-800 backdrop-blur-xs">
                        {prod.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                    <div>
                      <h4 className="font-display font-bold text-sm text-slate-900 group-hover:text-emerald-600 transition-colors line-clamp-1">
                        {prod.productName}
                      </h4>
                      <p className="text-xs text-slate-500 mt-1 line-clamp-1">{prod.businessName} • {prod.ownerName}</p>
                      <div className="text-sm font-black text-emerald-600 mt-2">
                        {prod.priceFormatted}
                      </div>
                    </div>
                    <a
                      href={`https://wa.me/${prod.whatsappNumber}?text=Halo%20saya%20tertarik%20pesan%20${encodeURIComponent(prod.productName)}`}
                      target="_blank"
                      rel="noreferrer"
                      className="w-full py-2 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs text-center flex items-center justify-center gap-1.5 transition"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>Pesan via WA</span>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 6. Join Callout Banner */}
      <section className="py-16 sm:py-20 bg-slate-950 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/40 via-indigo-900/40 to-slate-950 pointer-events-none"></div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 text-amber-300 text-xs font-bold uppercase tracking-wider backdrop-blur-md">
            <Sparkles className="w-4 h-4" />
            <span>Generasi Penerus Desa</span>
          </div>

          <h2 className="font-display font-black text-3xl sm:text-5xl text-white leading-tight">
            Waktunya Berperan, <br />
            Bukan Sekadar Menonton!
          </h2>

          <p className="text-sm sm:text-base text-slate-300 max-w-xl mx-auto leading-relaxed">
            Bergabunglah bersama keluarga besar Muda-Mudi Tri Dharma Manunggal RW 1 Desa Pojok. Kembangkan potensimu, dapatkan teman baru, dan ciptakan karya nyata.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <button
              onClick={() => setCurrentTab('gabung')}
              className="px-8 py-3.5 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-extrabold text-sm shadow-xl shadow-blue-600/30 transition flex items-center gap-2"
            >
              <span>Isi Formulir Gabung Sekarang</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => setCurrentTab('kontak')}
              className="px-6 py-3.5 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-bold text-sm border border-white/20 backdrop-blur-md transition"
            >
              Tanya Pengurus
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};
