import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Search, 
  X, 
  Calendar, 
  FileText, 
  Users, 
  ShoppingBag, 
  ArrowRight,
  Sparkles 
} from 'lucide-react';
import { NavTab } from '../../types';

export const GlobalSearchModal: React.FC = () => {
  const { 
    isSearchOpen, 
    setIsSearchOpen, 
    activities, 
    news, 
    agenda, 
    members, 
    umkmProducts, 
    programs,
    setCurrentTab,
    setSelectedActivity,
    setSelectedNews,
    setSelectedAgenda
  } = useApp();

  const [query, setQuery] = useState('');

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return { activities: [], news: [], agenda: [], members: [], umkm: [], programs: [] };

    return {
      activities: activities.filter(a => 
        a.title.toLowerCase().includes(q) || 
        a.description.toLowerCase().includes(q) || 
        a.location.toLowerCase().includes(q) ||
        a.category.toLowerCase().includes(q)
      ).slice(0, 4),
      news: news.filter(n => 
        n.title.toLowerCase().includes(q) || 
        n.summary.toLowerCase().includes(q) || 
        n.author.toLowerCase().includes(q) ||
        n.category.toLowerCase().includes(q)
      ).slice(0, 4),
      agenda: agenda.filter(ag => 
        ag.title.toLowerCase().includes(q) || 
        ag.notes.toLowerCase().includes(q) || 
        ag.location.toLowerCase().includes(q)
      ).slice(0, 4),
      members: members.filter(m => 
        m.name.toLowerCase().includes(q) || 
        m.role.toLowerCase().includes(q) || 
        m.division.toLowerCase().includes(q) ||
        m.nickname.toLowerCase().includes(q)
      ).slice(0, 4),
      umkm: umkmProducts.filter(u => 
        u.productName.toLowerCase().includes(q) || 
        u.businessName.toLowerCase().includes(q) || 
        u.description.toLowerCase().includes(q)
      ).slice(0, 4),
      programs: programs.filter(p => 
        p.name.toLowerCase().includes(q) || 
        p.description.toLowerCase().includes(q) || 
        p.category.toLowerCase().includes(q)
      ).slice(0, 4),
    };
  }, [query, activities, news, agenda, members, umkmProducts, programs]);

  if (!isSearchOpen) return null;

  const totalHits = 
    results.activities.length + 
    results.news.length + 
    results.agenda.length + 
    results.members.length + 
    results.umkm.length + 
    results.programs.length;

  const handleNavigate = (tab: NavTab) => {
    setCurrentTab(tab);
    setIsSearchOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-slate-900/60 backdrop-blur-xs animate-fade-in">
      <div 
        className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden flex flex-col max-h-[80vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="p-4 border-b border-slate-100 flex items-center gap-3">
          <Search className="w-5 h-5 text-blue-600 shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Cari kegiatan, berita, agenda, pengurus, UMKM pemuda..."
            className="w-full bg-transparent text-slate-800 placeholder-slate-400 font-medium text-sm sm:text-base focus:outline-hidden"
            autoFocus
          />
          {query && (
            <button 
              onClick={() => setQuery('')}
              className="p-1 text-slate-400 hover:text-slate-600 text-xs font-semibold"
            >
              Reset
            </button>
          )}
          <button
            onClick={() => setIsSearchOpen(false)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results Container */}
        <div className="p-4 overflow-y-auto space-y-4 flex-1">
          {!query && (
            <div className="py-12 text-center text-slate-400 space-y-2">
              <Sparkles className="w-8 h-8 mx-auto text-blue-500/50" />
              <p className="text-sm font-medium text-slate-600">
                Ketik kata kunci untuk mencari di portal Tri Dharma Manunggal
              </p>
              <div className="flex flex-wrap items-center justify-center gap-2 pt-2 text-xs">
                <span className="text-slate-400">Pencarian populer:</span>
                {['Kerja Bakti', 'Turnamen Voli', 'Kripik Tempe', 'Surya Jati', 'Transparansi Kas'].map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setQuery(tag)}
                    className="px-2.5 py-1 rounded-full bg-slate-100 hover:bg-blue-50 hover:text-blue-600 text-slate-600 transition"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          )}

          {query && totalHits === 0 && (
            <div className="py-12 text-center text-slate-500">
              <p className="text-base font-semibold text-slate-700">Tidak ada hasil untuk "{query}"</p>
              <p className="text-xs text-slate-400 mt-1">Coba gunakan kata kunci umum seperti "voli", "baksos", atau nama pengurus.</p>
            </div>
          )}

          {/* Activities hits */}
          {results.activities.length > 0 && (
            <div>
              <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-blue-600" />
                <span>Kegiatan Pemuda ({results.activities.length})</span>
              </div>
              <div className="space-y-1.5">
                {results.activities.map((a) => (
                  <div
                    key={a.id}
                    onClick={() => {
                      setSelectedActivity(a);
                      handleNavigate('kegiatan');
                    }}
                    className="p-2.5 rounded-xl hover:bg-slate-50 border border-transparent hover:border-slate-200 transition cursor-pointer flex items-center justify-between gap-3 group"
                  >
                    <div>
                      <h4 className="text-sm font-semibold text-slate-800 group-hover:text-blue-600 transition-colors">
                        {a.title}
                      </h4>
                      <p className="text-xs text-slate-500 line-clamp-1">{a.location} • {a.date}</p>
                    </div>
                    <span className="text-xs text-blue-600 font-semibold flex items-center gap-1 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                      Lihat <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* News hits */}
          {results.news.length > 0 && (
            <div>
              <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-indigo-600" />
                <span>Berita & Warta ({results.news.length})</span>
              </div>
              <div className="space-y-1.5">
                {results.news.map((n) => (
                  <div
                    key={n.id}
                    onClick={() => {
                      setSelectedNews(n);
                      handleNavigate('berita');
                    }}
                    className="p-2.5 rounded-xl hover:bg-slate-50 border border-transparent hover:border-slate-200 transition cursor-pointer flex items-center justify-between gap-3 group"
                  >
                    <div>
                      <h4 className="text-sm font-semibold text-slate-800 group-hover:text-indigo-600 transition-colors">
                        {n.title}
                      </h4>
                      <p className="text-xs text-slate-500 line-clamp-1">{n.author} • {n.date}</p>
                    </div>
                    <span className="text-xs text-indigo-600 font-semibold flex items-center gap-1 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                      Baca <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Agenda hits */}
          {results.agenda.length > 0 && (
            <div>
              <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-amber-600" />
                <span>Agenda Mendatang ({results.agenda.length})</span>
              </div>
              <div className="space-y-1.5">
                {results.agenda.map((ag) => (
                  <div
                    key={ag.id}
                    onClick={() => {
                      setSelectedAgenda(ag);
                      handleNavigate('agenda');
                    }}
                    className="p-2.5 rounded-xl hover:bg-slate-50 border border-transparent hover:border-slate-200 transition cursor-pointer flex items-center justify-between gap-3 group"
                  >
                    <div>
                      <h4 className="text-sm font-semibold text-slate-800 group-hover:text-amber-600 transition-colors">
                        {ag.title}
                      </h4>
                      <p className="text-xs text-slate-500">{ag.date} • {ag.time} @ {ag.location}</p>
                    </div>
                    <span className="text-xs text-amber-600 font-semibold flex items-center gap-1 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                      Buka <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Members hits */}
          {results.members.length > 0 && (
            <div>
              <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-purple-600" />
                <span>Pengurus & Anggota ({results.members.length})</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {results.members.map((m) => (
                  <div
                    key={m.id}
                    onClick={() => handleNavigate('struktur')}
                    className="p-2.5 rounded-xl hover:bg-slate-50 border border-slate-100 transition cursor-pointer flex items-center gap-3"
                  >
                    <img src={m.photoUrl} alt={m.name} className="w-9 h-9 rounded-full object-cover" />
                    <div>
                      <h4 className="text-xs font-bold text-slate-800">{m.name}</h4>
                      <p className="text-[11px] text-purple-600 font-medium">{m.role}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* UMKM hits */}
          {results.umkm.length > 0 && (
            <div>
              <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <ShoppingBag className="w-3.5 h-3.5 text-emerald-600" />
                <span>Produk UMKM Pemuda ({results.umkm.length})</span>
              </div>
              <div className="space-y-1.5">
                {results.umkm.map((u) => (
                  <div
                    key={u.id}
                    onClick={() => handleNavigate('umkm')}
                    className="p-2.5 rounded-xl hover:bg-slate-50 border border-transparent hover:border-slate-200 transition cursor-pointer flex items-center justify-between gap-3 group"
                  >
                    <div>
                      <h4 className="text-sm font-semibold text-slate-800 group-hover:text-emerald-600 transition-colors">
                        {u.productName}
                      </h4>
                      <p className="text-xs text-slate-500">{u.businessName} • {u.priceFormatted}</p>
                    </div>
                    <span className="text-xs text-emerald-600 font-semibold flex items-center gap-1 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                      Belanja <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer info */}
        <div className="p-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <span>Gunakan tombol <kbd className="px-1 py-0.5 bg-white border border-slate-200 rounded font-mono">ESC</kbd> untuk menutup</span>
          <span className="font-semibold text-blue-600">{totalHits} item ditemukan</span>
        </div>
      </div>
    </div>
  );
};
