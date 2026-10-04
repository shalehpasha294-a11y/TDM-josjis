import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Calendar, 
  User, 
  Clock, 
  Search, 
  ArrowRight
} from 'lucide-react';
import { NewsArticle } from '../../types';

export const NewsSection: React.FC = () => {
  const { news, setSelectedNews } = useApp();
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Semua');

  const categories = ['Semua', 'Sosial & Lingkungan', 'Prestasi Olahraga', 'Organisasi & Teknologi'];

  const filtered = news.filter((item) => {
    const matchCat = selectedCategory === 'Semua' || item.category === selectedCategory;
    const matchSearch = item.title.toLowerCase().includes(search.toLowerCase()) ||
                        item.summary.toLowerCase().includes(search.toLowerCase()) ||
                        item.author.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="py-16 sm:py-24 bg-slate-50 text-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="px-3.5 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-bold uppercase tracking-wider">
            Kabar & Informasi
          </span>
          <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-slate-900 tracking-tight mt-3">
            Warta Pemuda Tri Dharma
          </h2>
          <p className="text-slate-600 text-base sm:text-lg mt-3 leading-relaxed">
            Berita terkini, liputan kegiatan gotong royong, kabar kejuaraan, dan wacana kemajuan pemuda Desa Pojok RW 1.
          </p>
        </div>

        {/* Search & Category Filter */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-10 bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
          
          <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0">
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

          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Cari artikel berita..."
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-100 border-none text-xs font-medium focus:outline-blue-600"
            />
          </div>
        </div>

        {/* Featured first article if available */}
        {filtered.length > 0 && !search && selectedCategory === 'Semua' && (
          <div 
            onClick={() => setSelectedNews(filtered[0])}
            className="mb-12 bg-white rounded-3xl border border-slate-200/80 shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden grid grid-cols-1 lg:grid-cols-12 cursor-pointer group"
          >
            <div className="lg:col-span-7 relative h-72 sm:h-96 overflow-hidden bg-slate-900">
              <img
                src={filtered[0].thumbnailUrl}
                alt={filtered[0].title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-4 left-4">
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-500 text-slate-950 uppercase tracking-wider shadow-md">
                  Sorotan Utama
                </span>
              </div>
            </div>
            <div className="lg:col-span-5 p-6 sm:p-10 flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-xs text-slate-400">
                  <span className="font-bold text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-full">
                    {filtered[0].category}
                  </span>
                  <span>{filtered[0].date}</span>
                </div>
                <h3 className="font-display font-bold text-xl sm:text-2xl text-slate-900 group-hover:text-blue-600 transition-colors leading-tight">
                  {filtered[0].title}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed line-clamp-3">
                  {filtered[0].summary}
                </p>
              </div>
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                <span className="flex items-center gap-1.5 font-medium">
                  <User className="w-3.5 h-3.5 text-slate-400" />
                  {filtered[0].author}
                </span>
                <span className="text-blue-600 font-bold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  Baca Selengkapnya <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Regular Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {(search || selectedCategory !== 'Semua' ? filtered : filtered.slice(1)).map((article) => (
            <div
              key={article.id}
              onClick={() => setSelectedNews(article)}
              className="bg-white rounded-3xl border border-slate-200/80 shadow-xs hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col cursor-pointer group"
            >
              <div className="relative h-52 w-full overflow-hidden bg-slate-900">
                <img
                  src={article.thumbnailUrl}
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-600 text-white uppercase tracking-wider backdrop-blur-md">
                    {article.category}
                  </span>
                </div>
              </div>
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span>{article.date}</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {article.readTime}
                    </span>
                  </div>
                  <h3 className="font-display font-bold text-base sm:text-lg text-slate-900 group-hover:text-blue-600 transition-colors leading-snug line-clamp-2">
                    {article.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-2">
                    {article.summary}
                  </p>
                </div>
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                  <span className="truncate max-w-[150px] font-medium text-slate-600">
                    {article.author}
                  </span>
                  <span className="text-blue-600 font-bold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    Baca <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="p-12 text-center bg-white rounded-3xl border border-slate-200 max-w-md mx-auto text-slate-500">
            <p className="font-semibold text-slate-700">Tidak ada berita yang sesuai</p>
            <p className="text-xs text-slate-400 mt-1">Gunakan kata kunci pencarian lain.</p>
          </div>
        )}

      </div>
    </div>
  );
};
