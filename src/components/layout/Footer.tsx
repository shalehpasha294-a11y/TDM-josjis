import React from 'react';
import { useApp } from '../../context/AppContext';
import { NavTab } from '../../types';
import { 
  Instagram, 
  Youtube, 
  Phone, 
  Mail, 
  MapPin, 
  ArrowUp, 
  MessageCircle,
  ShieldCheck
} from 'lucide-react';
import { TdmLogo } from '../common/TdmLogo';

export const Footer: React.FC = () => {
  const { orgInfo, setCurrentTab } = useApp();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateTo = (tab: NavTab) => {
    setCurrentTab(tab);
    scrollToTop();
  };

  return (
    <footer className="bg-slate-950 text-slate-300 pt-16 pb-8 border-t border-slate-900 relative overflow-hidden">
      {/* Decorative ambient gradients */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          
          {/* Col 1: Identity & Taglines */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <TdmLogo className="w-11 h-11 bg-white" />
              <div>
                <h3 className="font-display font-bold text-lg text-white tracking-tight">
                  {orgInfo.name}
                </h3>
                <p className="text-xs text-blue-400 font-semibold">
                  RW 01 Desa Pojok • Tawangsari
                </p>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 space-y-1">
              <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider block">
                Semboyan Kami
              </span>
              <p className="text-sm font-bold text-white italic">
                "{orgInfo.tagline}"
              </p>
              <p className="text-xs text-slate-400">
                "{orgInfo.secondaryTagline}"
              </p>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed">
              Wadah resmi generasi muda Karang Taruna RW 01 Desa Pojok untuk berkolaborasi, bergotong-royong, memajukan desa, dan menumbuhkan kemandirian pemuda.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href={orgInfo.instagram}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-xl bg-white/10 hover:bg-pink-600 hover:text-white flex items-center justify-center transition"
                title="Instagram Resmi @tdm_rw1"
                aria-label="Instagram Resmi"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={`https://wa.me/${orgInfo.whatsapp.replace(/[^0-9]/g, '')}?text=Halo%20Pengurus%20Muda-Mudi%20Tri%20Dharma%20Manunggal`}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-xl bg-white/10 hover:bg-emerald-600 hover:text-white flex items-center justify-center transition"
                title="WhatsApp Kontak Pengurus"
                aria-label="WhatsApp Pengurus"
              >
                <Phone className="w-4 h-4" />
              </a>
              <a
                href={orgInfo.youtube}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-xl bg-white/10 hover:bg-red-600 hover:text-white flex items-center justify-center transition"
                title="YouTube Dokumentasi Pemuda"
                aria-label="YouTube Channel"
              >
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h4 className="font-display font-semibold text-white text-sm uppercase tracking-wider mb-4 border-l-2 border-blue-500 pl-2.5">
              Navigasi Halaman
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => navigateTo('beranda')} className="hover:text-blue-400 transition">
                  • Beranda Utama
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('tentang')} className="hover:text-blue-400 transition">
                  • Tentang Kami & Sejarah
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('struktur')} className="hover:text-blue-400 transition">
                  • Struktur Organisasi & Pengurus
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('program')} className="hover:text-blue-400 transition">
                  • Program Kerja 7 Divisi
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('kegiatan')} className="hover:text-blue-400 transition">
                  • Dokumentasi & Kegiatan
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('agenda')} className="hover:text-blue-400 transition">
                  • Kalender Agenda Pemuda
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('berita')} className="hover:text-blue-400 transition">
                  • Warta & Berita Terkini
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('galeri')} className="hover:text-blue-400 transition">
                  • Galeri Foto & Video
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Layanan Pemuda & Transparansi */}
          <div>
            <h4 className="font-display font-semibold text-white text-sm uppercase tracking-wider mb-4 border-l-2 border-blue-500 pl-2.5">
              Layanan & Transparansi
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => navigateTo('umkm')} className="hover:text-blue-400 transition">
                  • Etalase UMKM Pemuda Pojok
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('transparansi')} className="hover:text-blue-400 transition">
                  • Laporan Kas Terbuka & Transparan
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('anggota')} className="hover:text-blue-400 transition">
                  • Direktori Anggota Pemuda
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('sertifikat')} className="hover:text-blue-400 transition">
                  • Cek & Verifikasi Sertifikat Resmi
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('prestasi')} className="hover:text-blue-400 transition">
                  • Penghargaan & Juara Pemuda
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('gabung')} className="text-amber-400 hover:text-amber-300 font-bold transition">
                  • Formulir Gabung Muda-Mudi
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Kontak & Sekretariat */}
          <div className="space-y-3">
            <h4 className="font-display font-semibold text-white text-sm uppercase tracking-wider mb-4 border-l-2 border-blue-500 pl-2.5">
              Sekretariat & Kontak
            </h4>
            <div className="flex items-start gap-2.5 text-xs text-slate-300">
              <MapPin className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
              <span>{orgInfo.secretariatAddress}</span>
            </div>
            <div className="flex items-center gap-2.5 text-xs text-slate-300">
              <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>
                WA: <a href={`https://wa.me/${orgInfo.whatsapp.replace(/[^0-9]/g, '')}`} target="_blank" rel="noreferrer" className="font-bold text-white hover:text-emerald-400 transition">
                  {orgInfo.whatsapp}
                </a>
              </span>
            </div>
            <div className="flex items-center gap-2.5 text-xs text-slate-300">
              <Mail className="w-4 h-4 text-blue-400 shrink-0" />
              <a href="mailto:tridharmamanunggalrw1@gmail.com" className="truncate font-semibold text-blue-300 hover:text-white hover:underline">
                tridharmamanunggalrw1@gmail.com
              </a>
            </div>
            <div className="pt-2">
              <a
                href={`https://wa.me/${orgInfo.whatsapp.replace(/[^0-9]/g, '')}?text=Halo%20Ketua%20TDM%20RW1%20Surya%20Jati,%20saya%20ingin%20bertanya`}
                target="_blank"
                rel="noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white transition shadow-md shadow-emerald-900/40"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>Chat WhatsApp Pengurus</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="text-center sm:text-left space-y-1">
            <p>© 2026 {orgInfo.name}. All Rights Reserved.</p>
            <p className="text-[11px] text-slate-400 flex items-center justify-center sm:justify-start gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
              <span>Sistem Penyimpanan & Cloud Sync Terhubung ke <strong className="text-slate-300">tridharmamanunggalrw1@gmail.com</strong></span>
            </p>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigateTo('tentang')}
              className="hover:text-slate-300 transition"
            >
              Tentang Kami
            </button>
            <span>•</span>
            <button
              onClick={() => navigateTo('transparansi')}
              className="hover:text-slate-300 transition"
            >
              Transparansi
            </button>
            <span>•</span>
            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-1 text-slate-400 hover:text-white transition p-1.5 rounded-lg hover:bg-white/5"
              aria-label="Kembali ke atas"
            >
              <span>Ke Atas</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
