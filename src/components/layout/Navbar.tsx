import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { NavTab } from '../../types';
import { 
  Menu, 
  X, 
  Search, 
  ChevronDown, 
  ShoppingBag, 
  FileText, 
  Award, 
  Users, 
  DollarSign, 
  Phone,
  Sparkles,
  ShieldCheck,
  Mail,
  Lock
} from 'lucide-react';
import { TdmLogo } from '../common/TdmLogo';

export const Navbar: React.FC = () => {
  const { 
    currentTab, 
    setCurrentTab, 
    orgInfo, 
    setIsSearchOpen, 
    currentUser, 
    isAdminView, 
    setIsAdminView,
    setIsAuthModalOpen,
    setAuthModalMode,
    logout
  } = useApp();

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNav = (tab: NavTab) => {
    setCurrentTab(tab);
    setMobileMenuOpen(false);
    setDropdownOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const primaryTabs: { id: NavTab; label: string }[] = [
    { id: 'beranda', label: 'Beranda' },
    { id: 'tentang', label: 'Tentang' },
    { id: 'struktur', label: 'Struktur' },
    { id: 'program', label: 'Program' },
    { id: 'kegiatan', label: 'Kegiatan' },
    { id: 'agenda', label: 'Agenda' },
    { id: 'berita', label: 'Berita' },
    { id: 'galeri', label: 'Galeri' },
  ];

  const secondaryTabs: { id: NavTab; label: string; icon: React.ReactNode; desc: string }[] = [
    { id: 'umkm', label: 'UMKM Pemuda', icon: <ShoppingBag className="w-4 h-4 text-emerald-500" />, desc: 'Marketplace produk wirausaha pemuda RW 1' },
    { id: 'transparansi', label: 'Transparansi Kas', icon: <DollarSign className="w-4 h-4 text-blue-500" />, desc: 'Laporan keuangan kas organisasi terbuka' },
    { id: 'prestasi', label: 'Prestasi & Juara', icon: <Award className="w-4 h-4 text-amber-500" />, desc: 'Pencapaian dan kejuaraan pemuda TDM' },
    { id: 'anggota', label: 'Direktori Anggota', icon: <Users className="w-4 h-4 text-purple-500" />, desc: 'Database keanggotaan pemuda pemudi' },
    { id: 'sertifikat', label: 'Verifikasi Sertifikat', icon: <FileText className="w-4 h-4 text-indigo-500" />, desc: 'Validasi keaslian sertifikat kegiatan resmi' },
    { id: 'kontak', label: 'Kontak & Sekretariat', icon: <Phone className="w-4 h-4 text-teal-500" />, desc: 'Lokasi dan email resmi tridharmamanunggalrw1@gmail.com' },
  ];

  const isSecondaryActive = secondaryTabs.some(t => t.id === currentTab);

  return (
    <header 
      className={`sticky top-0 z-40 w-full transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-md py-3 border-b border-slate-100' 
          : 'bg-white py-4 border-b border-slate-100'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4">
          
          {/* Logo & Brand */}
          <div 
            onClick={() => handleNav('beranda')}
            className="flex items-center gap-3 cursor-pointer group select-none shrink-0"
          >
            <TdmLogo className="w-10 h-10 sm:w-11 sm:h-11 group-hover:scale-105 transition-transform bg-white" />
            <div>
              <div className="flex items-center gap-2">
                <span className="font-display font-extrabold text-base sm:text-lg tracking-tight text-slate-900 group-hover:text-blue-600 transition-colors">
                  Tri Dharma Manunggal
                </span>
                <span className="hidden xl:inline-block px-2 py-0.5 text-[10px] font-bold rounded-md bg-blue-50 text-blue-700 border border-blue-200">
                  RW 1 Pojok
                </span>
              </div>
              <p className="text-[11px] text-slate-500 font-medium hidden sm:block">
                Karang Taruna • Kec. Tawangsari, Sukoharjo
              </p>
            </div>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {primaryTabs.map((tab) => {
              const active = currentTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => handleNav(tab.id)}
                  className={`px-3 py-2 rounded-xl text-xs xl:text-sm font-semibold transition-all ${
                    active 
                      ? 'bg-blue-50 text-blue-700 font-bold shadow-xs' 
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}

            {/* Dropdown "Lainnya" */}
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                onBlur={() => setTimeout(() => setDropdownOpen(false), 200)}
                className={`px-3 py-2 rounded-xl text-xs xl:text-sm font-semibold transition-all flex items-center gap-1.5 ${
                  isSecondaryActive 
                    ? 'bg-blue-50 text-blue-700 font-bold' 
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
                }`}
              >
                <span>Lainnya</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {dropdownOpen && (
                <div className="absolute top-full right-0 mt-2 w-72 bg-white rounded-2xl shadow-2xl border border-slate-100 py-2 z-50">
                  <div className="px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    Layanan & Direktori Pemuda
                  </div>
                  {secondaryTabs.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => handleNav(item.id)}
                      className={`w-full px-3 py-2.5 text-left flex items-start gap-3 hover:bg-slate-50 transition ${
                        currentTab === item.id ? 'bg-blue-50/70 font-semibold' : ''
                      }`}
                    >
                      <div className="p-2 rounded-xl bg-slate-100 shrink-0 mt-0.5">
                        {item.icon}
                      </div>
                      <div>
                        <div className="text-sm font-bold text-slate-800">{item.label}</div>
                        <div className="text-xs text-slate-500 leading-snug">{item.desc}</div>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Global Search Button */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="p-2 sm:px-3 sm:py-2 text-slate-500 hover:text-blue-600 hover:bg-slate-100 rounded-xl transition flex items-center gap-2"
              title="Cari Berita, Kegiatan, Anggota (Ctrl+K)"
              aria-label="Buka pencarian global"
            >
              <Search className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
              <span className="hidden xl:inline text-xs text-slate-400 font-medium">Cari...</span>
              <kbd className="hidden xl:inline-block px-1.5 py-0.5 text-[10px] font-mono bg-slate-100 border border-slate-200 rounded text-slate-500">
                ⌘K
              </kbd>
            </button>

            {/* Gabung Sekarang CTA */}
            <button
              onClick={() => handleNav('gabung')}
              className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold bg-blue-600 text-white shadow-md shadow-blue-500/25 hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-500/35 transition active:scale-95"
            >
              <Sparkles className="w-3.5 h-3.5 text-blue-200" />
              <span>Gabung</span>
            </button>

            {/* Auth / Account Controls */}
            {currentUser ? (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    setIsAdminView(true);
                    setCurrentTab('admin');
                  }}
                  className="flex items-center gap-2 p-1.5 sm:px-3 sm:py-1.5 rounded-xl bg-slate-900 text-white hover:bg-slate-800 transition border border-slate-700 shadow-sm"
                  title="Buka Dashboard Pengurus"
                >
                  <img 
                    src={currentUser.avatar} 
                    alt={currentUser.name} 
                    className="w-6 h-6 rounded-lg object-cover border border-blue-400"
                  />
                  <div className="hidden sm:block text-left">
                    <div className="text-xs font-bold leading-none text-white">{currentUser.name.split(' ')[0]}</div>
                    <span className="text-[10px] font-bold text-blue-300 leading-none">{currentUser.role}</span>
                  </div>
                </button>
                <button
                  onClick={logout}
                  className="p-2 rounded-xl text-slate-500 hover:text-rose-600 hover:bg-rose-50 transition"
                  title="Keluar / Logout"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => {
                    setAuthModalMode('login');
                    setIsAuthModalOpen(true);
                  }}
                  className="px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold text-slate-700 hover:text-blue-600 hover:bg-slate-100 transition flex items-center gap-1.5"
                >
                  <Lock className="w-3.5 h-3.5 text-slate-500" />
                  <span>Masuk Admin</span>
                </button>
              </div>
            )}

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition"
              aria-label="Menu navigasi mobile"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-full bg-white border-b border-slate-200 shadow-2xl max-h-[85vh] overflow-y-auto p-4 z-50">
          <div className="space-y-1">
            <div className="px-3 py-1 text-xs font-bold text-slate-400 uppercase tracking-wider">
              Menu Utama
            </div>
            {primaryTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => handleNav(tab.id)}
                className={`w-full text-left px-3 py-2.5 rounded-xl text-sm font-semibold transition ${
                  currentTab === tab.id ? 'bg-blue-50 text-blue-700 font-bold' : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                {tab.label}
              </button>
            ))}

            <div className="pt-3 px-3 py-1 text-xs font-bold text-slate-400 uppercase tracking-wider">
              Layanan & Direktori
            </div>
            {secondaryTabs.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNav(item.id)}
                className={`w-full text-left px-3 py-2.5 rounded-xl text-sm font-semibold flex items-center gap-3 transition ${
                  currentTab === item.id ? 'bg-blue-50 text-blue-700 font-bold' : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            ))}

            <div className="pt-4 border-t border-slate-100 space-y-2">
              {currentUser ? (
                <>
                  <button
                    onClick={() => {
                      setIsAdminView(true);
                      handleNav('admin');
                    }}
                    className="w-full py-2.5 px-4 rounded-xl bg-slate-900 text-white font-semibold text-sm text-center flex items-center justify-between"
                  >
                    <div className="flex items-center gap-2">
                      <img src={currentUser.avatar} alt={currentUser.name} className="w-5 h-5 rounded-md object-cover" />
                      <span>{currentUser.name} ({currentUser.role})</span>
                    </div>
                    <span className="text-xs text-blue-400 font-bold">Dashboard →</span>
                  </button>
                  <button
                    onClick={() => {
                      logout();
                      setMobileMenuOpen(false);
                    }}
                    className="w-full py-2 px-4 rounded-xl bg-slate-100 hover:bg-rose-50 text-rose-600 font-semibold text-xs text-center"
                  >
                    Keluar / Logout
                  </button>
                </>
              ) : (
                <button
                  onClick={() => {
                    setAuthModalMode('login');
                    setIsAuthModalOpen(true);
                    setMobileMenuOpen(false);
                  }}
                  className="w-full py-2.5 px-4 rounded-xl bg-blue-600 text-white font-bold text-xs text-center"
                >
                  Masuk Portal Pengurus & Admin
                </button>
              )}
              
              <button
                onClick={() => handleNav('gabung')}
                className="w-full py-2.5 px-4 rounded-xl bg-emerald-600 text-white font-bold text-sm text-center shadow-xs flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4 text-emerald-200" />
                <span>Formulir Gabung Pemuda</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
