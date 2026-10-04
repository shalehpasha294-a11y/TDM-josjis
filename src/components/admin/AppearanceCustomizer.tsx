import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Palette, 
  Layout, 
  Type, 
  Eye, 
  Save, 
  RotateCcw, 
  ShieldAlert, 
  Sparkles, 
  Check, 
  CheckCircle2,
  Sliders,
  Layers,
  Image as ImageIcon
} from 'lucide-react';
import { SiteAppearanceConfig } from '../../types';

export const AppearanceCustomizer: React.FC = () => {
  const { currentUser, appearance, updateAppearance, resetAppearance, orgInfo, updateOrgInfo } = useApp();

  // Local draft state for customization
  const [formData, setFormData] = useState<SiteAppearanceConfig>(appearance);
  const [draftMotto, setDraftMotto] = useState(orgInfo.tagline);

  // Guard: Only Super Admin can access
  if (currentUser?.role !== 'Super Admin') {
    return (
      <div className="p-8 sm:p-12 rounded-3xl bg-slate-800 border border-slate-700 text-center max-w-xl mx-auto space-y-4">
        <div className="w-16 h-16 rounded-2xl bg-amber-500/10 text-amber-400 flex items-center justify-center mx-auto border border-amber-500/20">
          <ShieldAlert className="w-8 h-8" />
        </div>
        <h3 className="font-display font-bold text-xl text-white">
          Akses Terbatas: Khusus Super Admin
        </h3>
        <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
          Hak akses untuk mengubah tampilan, tema warna, banner gambar, dan tata letak website resmi Muda-Mudi RW 1 ini dikunci secara eksklusif hanya untuk <strong>Super Admin</strong> demi konsistensi identitas organisasi.
        </p>
        <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-700 text-xs text-slate-300">
          Peran Anda saat ini: <span className="font-bold text-blue-400">{currentUser?.role || 'Tamu / Viewer'}</span>
        </div>
      </div>
    );
  }

  const colorThemes: { id: SiteAppearanceConfig['primaryTheme']; name: string; bgClass: string; ringClass: string }[] = [
    { id: 'blue', name: 'Biru Kerajaan (Default)', bgClass: 'bg-blue-600', ringClass: 'ring-blue-500' },
    { id: 'emerald', name: 'Hijau Zamrud (Desa & Asri)', bgClass: 'bg-emerald-600', ringClass: 'ring-emerald-500' },
    { id: 'indigo', name: 'Ungu Indigo (Modern Pemuda)', bgClass: 'bg-indigo-600', ringClass: 'ring-indigo-500' },
    { id: 'rose', name: 'Merah Semangat (Enerjik)', bgClass: 'bg-rose-600', ringClass: 'ring-rose-500' },
    { id: 'amber', name: 'Emas Hangat (Tradisi & Budaya)', bgClass: 'bg-amber-600', ringClass: 'ring-amber-500' },
  ];

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateAppearance(formData);
    if (draftMotto !== orgInfo.tagline) {
      updateOrgInfo({ tagline: draftMotto });
    }
  };

  const handleReset = () => {
    if (confirm('Kembalikan semua pengaturan tampilan website ke default bawaan?')) {
      resetAppearance();
      setFormData(appearance);
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Top Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-purple-900/60 via-indigo-900/40 to-slate-900 border border-purple-500/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 text-xs font-bold uppercase tracking-wider border border-purple-500/30">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Akses Eksklusif Super Admin</span>
          </div>
          <h2 className="font-display font-black text-2xl sm:text-3xl text-white">
            Studio Kustomisasi Tampilan & Gambar
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
            Sebagai Super Admin, Anda memiliki wewenang penuh untuk mengubah tema warna utama, banner gambar latar, headline, semboyan, dan mengatur komponen yang tampil di halaman utama.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={handleReset}
            className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs flex items-center gap-1.5 transition border border-slate-700"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Default</span>
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-lg shadow-purple-900/40 transition"
          >
            <Save className="w-4 h-4" />
            <span>Simpan Perubahan</span>
          </button>
        </div>
      </div>

      <form onSubmit={handleSave} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Customization Controls */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Section 1: Color Palette */}
          <div className="p-6 rounded-3xl bg-slate-800 border border-slate-700 space-y-4">
            <div className="flex items-center gap-2 text-white font-display font-bold text-base">
              <Palette className="w-5 h-5 text-purple-400" />
              <span>Tema Warna Utama Website</span>
            </div>
            <p className="text-xs text-slate-400">
              Warna ini menjadi aksen identitas website, tombol navigasi, highlight pilar, dan status badge.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              {colorThemes.map((ct) => {
                const isSelected = formData.primaryTheme === ct.id;
                return (
                  <button
                    key={ct.id}
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, primaryTheme: ct.id }))}
                    className={`p-3.5 rounded-2xl border text-left transition flex items-center gap-3 ${
                      isSelected 
                        ? 'bg-slate-750 border-purple-400 ring-2 ring-purple-500/30 text-white' 
                        : 'bg-slate-900/50 border-slate-700 text-slate-400 hover:border-slate-600'
                    }`}
                  >
                    <div className={`w-8 h-8 rounded-xl ${ct.bgClass} text-white flex items-center justify-center shrink-0 shadow-sm`}>
                      {isSelected && <Check className="w-4 h-4 stroke-[3]" />}
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white">{ct.name}</div>
                      <div className="text-[10px] text-slate-400 capitalize">{ct.id} Accent</div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Section 2: Headline, Motto, & Banner Image */}
          <div className="p-6 rounded-3xl bg-slate-800 border border-slate-700 space-y-5">
            <div className="flex items-center gap-2 text-white font-display font-bold text-base">
              <Type className="w-5 h-5 text-purple-400" />
              <span>Teks Headline, Semboyan & Gambar Banner</span>
            </div>

            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-300 block">
                  Badge / Label Atas Banner
                </label>
                <input
                  type="text"
                  value={formData.heroBadge}
                  onChange={(e) => setFormData(prev => ({ ...prev, heroBadge: e.target.value }))}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-750 border border-slate-600 text-white text-xs sm:text-sm focus:outline-purple-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-300 block">
                  Judul Utama Banner (Hero Headline)
                </label>
                <input
                  type="text"
                  value={formData.heroHeadline}
                  onChange={(e) => setFormData(prev => ({ ...prev, heroHeadline: e.target.value }))}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-750 border border-slate-600 text-white text-xs sm:text-sm focus:outline-purple-500 font-bold"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-300 block">
                  Deskripsi Sub-headline Banner
                </label>
                <textarea
                  rows={2}
                  value={formData.heroSubheadline}
                  onChange={(e) => setFormData(prev => ({ ...prev, heroSubheadline: e.target.value }))}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-750 border border-slate-600 text-white text-xs sm:text-sm focus:outline-purple-500"
                ></textarea>
              </div>

              {/* Banner Background Image */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-300 flex items-center gap-2">
                  <ImageIcon className="w-4 h-4 text-purple-400" />
                  <span>URL Gambar Latar Belakang Hero (Background Banner)</span>
                </label>
                <input
                  type="text"
                  value={formData.heroBackgroundImage}
                  onChange={(e) => setFormData(prev => ({ ...prev, heroBackgroundImage: e.target.value }))}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-750 border border-slate-600 text-white text-xs sm:text-sm focus:outline-purple-500 font-mono text-blue-300"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-300 block">
                    Semboyan / Motto Pemuda
                  </label>
                  <input
                    type="text"
                    value={draftMotto}
                    onChange={(e) => {
                      setDraftMotto(e.target.value);
                      setFormData(prev => ({ ...prev, mottoQuote: e.target.value }));
                    }}
                    placeholder='Contoh: "Ra mangan ra jalan"'
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-750 border border-slate-600 text-white text-xs sm:text-sm focus:outline-purple-500 font-mono text-amber-300"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-300 block">
                    Tagline Footer Website
                  </label>
                  <input
                    type="text"
                    value={formData.footerTagline}
                    onChange={(e) => setFormData(prev => ({ ...prev, footerTagline: e.target.value }))}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-750 border border-slate-600 text-white text-xs sm:text-sm focus:outline-purple-500"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Section 3: Component Visibility Toggles */}
          <div className="p-6 rounded-3xl bg-slate-800 border border-slate-700 space-y-4">
            <div className="flex items-center gap-2 text-white font-display font-bold text-base">
              <Layers className="w-5 h-5 text-purple-400" />
              <span>Visibilitas Komponen di Halaman Depan</span>
            </div>
            <p className="text-xs text-slate-400">
              Aktifkan atau sembunyikan modul tertentu sesuai kebutuhan publikasi organisasi saat ini.
            </p>

            <div className="space-y-3 pt-2">
              {[
                { key: 'showMarquee', label: 'Teks Pengumuman Berjalan (Top Bar)', desc: 'Pengumuman bergerak di bagian paling atas' },
                { key: 'showTriDharmaPillars', label: 'Tiga Pilar Tri Dharma Manunggal', desc: 'Kartu 3 pilar nilai pemuda RW 1' },
                { key: 'showActivitiesPreview', label: 'Cuplikan Kegiatan Terbaru Pemuda', desc: 'Galeri ringkas kegiatan yang sudah diisi pengurus' },
                { key: 'showAgendaPreview', label: 'Jadwal Agenda & Pertemuan Mendatang', desc: 'Daftar agenda kerja bakti, rapat, dan turnamen' },
                { key: 'showTransparencyPreview', label: 'Ringkasan Kas Transparan di Beranda', desc: 'Kotak saldo kas terbuka untuk transparansi warga' },
                { key: 'showUMKMPreview', label: 'Etalase Produk UMKM Warga RW 1', desc: 'Daftar produk wirausaha muda binaan' },
                { key: 'showAchievementsPreview', label: 'Prestasi & Penghargaan Pemuda', desc: 'Piala turnamen dan apresiasi dari kelurahan' }
              ].map((item) => {
                const isChecked = (formData as any)[item.key];
                return (
                  <label
                    key={item.key}
                    className="p-3.5 rounded-2xl bg-slate-750 border border-slate-700 hover:border-slate-600 flex items-center justify-between cursor-pointer transition select-none"
                  >
                    <div>
                      <div className="text-xs font-bold text-white">{item.label}</div>
                      <div className="text-[11px] text-slate-400">{item.desc}</div>
                    </div>
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={(e) => setFormData(prev => ({ ...prev, [item.key]: e.target.checked }))}
                      className="w-5 h-5 rounded-md accent-purple-600 cursor-pointer"
                    />
                  </label>
                );
              })}
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={handleReset}
              className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs"
            >
              Batal / Reset
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs shadow-lg shadow-purple-900/40 flex items-center gap-1.5"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Terapkan Tampilan Sekarang</span>
            </button>
          </div>
        </div>

        {/* Right Column: Live Appearance Preview Card */}
        <div className="lg:col-span-4 space-y-4">
          <div className="sticky top-24 p-6 rounded-3xl bg-slate-800 border border-slate-700 space-y-4 shadow-xl">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-purple-400 flex items-center gap-1.5">
                <Eye className="w-4 h-4" />
                <span>Pratinjau Langsung (Preview)</span>
              </span>
              <span className="px-2 py-0.5 rounded-md bg-purple-900/50 text-purple-300 text-[10px] font-bold">
                Tema: {formData.primaryTheme}
              </span>
            </div>

            {/* Mock Mini-Hero Card */}
            <div className="rounded-2xl overflow-hidden border border-slate-600 bg-slate-900 shadow-xl">
              <div 
                className="bg-cover bg-center p-5 space-y-3 relative"
                style={{ backgroundImage: `url('${formData.heroBackgroundImage || 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=800&q=80'}')` }}
              >
                <div className="absolute inset-0 bg-slate-950/85"></div>
                <div className="relative z-10 space-y-2">
                  <div className="inline-block px-2 py-0.5 rounded-full bg-blue-500/20 text-[10px] font-bold text-blue-300 border border-blue-500/30 truncate max-w-[200px]">
                    {formData.heroBadge || 'Badge Pemuda'}
                  </div>
                  <h4 className="font-display font-black text-sm text-white leading-snug line-clamp-2">
                    {formData.heroHeadline || 'Headline Utama'}
                  </h4>
                  <p className="text-[10px] text-slate-300 line-clamp-2 leading-relaxed">
                    {formData.heroSubheadline}
                  </p>
                  <div className="p-2 rounded-xl bg-white/10 border border-white/10 text-[11px] text-amber-300 italic font-mono flex items-center gap-1.5">
                    <span>"{formData.mottoQuote}"</span>
                  </div>
                </div>
              </div>

              {/* Status List in Preview */}
              <div className="p-4 bg-slate-800/80 text-[11px] text-slate-400 space-y-2 border-t border-slate-700">
                <div className="flex items-center justify-between">
                  <span>Marquee Berjalan:</span>
                  <span className={formData.showMarquee ? 'text-emerald-400 font-bold' : 'text-slate-500'}>
                    {formData.showMarquee ? 'Aktif' : 'Nonaktif'}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Tiga Pilar Tri Dharma:</span>
                  <span className={formData.showTriDharmaPillars ? 'text-emerald-400 font-bold' : 'text-slate-500'}>
                    {formData.showTriDharmaPillars ? 'Tampil' : 'Sembunyi'}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Kas Transparan:</span>
                  <span className={formData.showTransparencyPreview ? 'text-emerald-400 font-bold' : 'text-slate-500'}>
                    {formData.showTransparencyPreview ? 'Tampil' : 'Sembunyi'}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Etalase UMKM:</span>
                  <span className={formData.showUMKMPreview ? 'text-emerald-400 font-bold' : 'text-slate-500'}>
                    {formData.showUMKMPreview ? 'Tampil' : 'Sembunyi'}
                  </span>
                </div>
              </div>
            </div>

            <p className="text-[11px] text-slate-400 italic text-center">
              Perubahan tampilan langsung berdampak pada seluruh halaman yang diakses publik.
            </p>
          </div>
        </div>
      </form>
    </div>
  );
};
