import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  MessageCircle, 
  Star, 
  Store, 
  Sparkles 
} from 'lucide-react';
import { UMKMProduct } from '../../types';

export const UMKMSection: React.FC = () => {
  const { umkmProducts } = useApp();
  const [selectedCat, setSelectedCat] = useState<string>('Semua');

  const categories = ['Semua', 'Makanan & Camilan', 'Kuliner & Minuman', 'Jasa & Konveksi', 'Jasa Otomotif'];

  const filtered = selectedCat === 'Semua'
    ? umkmProducts
    : umkmProducts.filter(p => p.category === selectedCat);

  const contactSeller = (product: UMKMProduct) => {
    const text = encodeURIComponent(
      `Halo Kak ${product.ownerName} (${product.businessName}), saya melihat produk *${product.productName}* di Website Pemuda Tri Dharma Manunggal Pojok RW 1. Mau tanya ketersediaan dan pesan.`
    );
    window.open(`https://wa.me/${product.whatsappNumber}?text=${text}`, '_blank');
  };

  return (
    <div className="py-16 sm:py-24 bg-slate-50 text-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="px-3.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider">
            Ekonomi Kreatif & Kemandirian
          </span>
          <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-slate-900 tracking-tight mt-3">
            Etalase UMKM Pemuda RW 1
          </h2>
          <p className="text-slate-600 text-base sm:text-lg mt-3 leading-relaxed">
            Dukung wirausaha rintisan muda-mudi Desa Pojok! Dari kuliner khas kripik tempe hingga jasa kreatif sablon dan konveksi.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCat(cat)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition ${
                selectedCat === cat
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-500/25'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filtered.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-3xl border border-slate-200/80 shadow-xs hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col justify-between group"
            >
              {/* Product Image */}
              <div className="relative h-56 w-full overflow-hidden bg-slate-100">
                <img
                  src={item.imageUrl}
                  alt={item.productName}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                
                <div className="absolute top-3 left-3">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-white/90 text-slate-800 shadow-xs backdrop-blur-xs">
                    {item.category}
                  </span>
                </div>
                {item.rating && (
                  <div className="absolute top-3 right-3 flex items-center gap-1 px-2 py-0.5 rounded-full bg-slate-950/70 text-amber-400 text-[11px] font-bold backdrop-blur-xs">
                    <Star className="w-3 h-3 fill-current" />
                    <span>{item.rating}</span>
                  </div>
                )}
              </div>

              {/* Body */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-1.5 text-xs text-emerald-700 font-semibold">
                    <Store className="w-3.5 h-3.5" />
                    <span>{item.businessName}</span>
                  </div>
                  <h3 className="font-display font-bold text-base text-slate-900 group-hover:text-emerald-600 transition-colors leading-snug">
                    {item.productName}
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed line-clamp-2">
                    {item.description}
                  </p>
                </div>

                <div className="space-y-3 pt-3 border-t border-slate-100">
                  <div className="flex items-baseline justify-between">
                    <div>
                      <span className="text-[10px] text-slate-400 uppercase font-bold block">Harga</span>
                      <span className="font-display font-black text-emerald-600 text-base">
                        {item.priceFormatted}
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] text-slate-400 uppercase font-bold block">Pemilik</span>
                      <span className="text-xs font-semibold text-slate-700">{item.ownerName}</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <button
                    onClick={() => contactSeller(item)}
                    className="w-full py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md shadow-emerald-500/20 transition flex items-center justify-center gap-2"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Hubungi Penjual</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Promo Banner for Members */}
        <div className="mt-16 p-8 rounded-3xl bg-gradient-to-r from-emerald-700 via-teal-700 to-emerald-900 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="font-display font-bold text-xl sm:text-2xl">
              Anggota Pemuda RW 1 Ingin Promosikan Usaha?
            </h3>
            <p className="text-sm text-emerald-100 max-w-xl">
              Daftarkan produk atau jasa kreatif Anda secara gratis ke pengurus divisi kewirausahaan TDM untuk dimuat di etalase website resmi ini.
            </p>
          </div>
          <a
            href="https://wa.me/6285747263684?text=Halo%20Pengurus%20TDM%20Pojok,%20saya%20anggota%20pemuda%20ingin%20mendaftarkan%20produk%20UMKM%20ke%20website"
            target="_blank"
            rel="noreferrer"
            className="px-6 py-3 rounded-2xl bg-white text-emerald-900 font-bold text-sm hover:bg-emerald-50 transition shadow-md shrink-0 flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4 text-emerald-600" />
            <span>Daftarkan Produk Saya</span>
          </a>
        </div>

      </div>
    </div>
  );
};
