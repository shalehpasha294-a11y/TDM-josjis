import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Target, 
  Compass, 
  CheckCircle2
} from 'lucide-react';
import { TdmLogo } from '../common/TdmLogo';

export const AboutSection: React.FC = () => {
  const { orgInfo } = useApp();

  const missions = [
    { id: 1, title: 'Meningkatkan Kreativitas Pemuda', desc: 'Mewadahi bakat seni, budaya, olahraga, dan ide-ide segar anak muda RW 1.' },
    { id: 2, title: 'Membangun Solidaritas Tanpa Batas', desc: 'Mempererat tali silaturahmi, gotong royong, dan kerukunan antar warga RT 1, 2, 3, dan 4.' },
    { id: 3, title: 'Mengembangkan Keterampilan & Keahlian', desc: 'Menyelenggarakan workshop, pelatihan digital, dan bimbingan belajar generasi muda.' },
    { id: 4, title: 'Mengadakan Kegiatan Sosial Rutin', desc: 'Tanggap sosial melalui santunan yatim, bantuan lansia, dan aksi tanggap darurat warga.' },
    { id: 5, title: 'Mendukung Kegiatan Kemasyarakatan', desc: 'Berperan aktif dalam sinoman, kerja bakti, pengamanan, dan hajatan lingkungan RW.' },
    { id: 6, title: 'Mengembangkan Kewirausahaan Pemuda', desc: 'Mendorong kemandirian ekonomi melalui etalase UMKM dan bazaar produk lokal.' },
    { id: 7, title: 'Menciptakan Lingkungan yang Positif', desc: 'Menjaga generasi muda dari pengaruh negatif melalui aktivitas fisik dan keagamaan.' },
    { id: 8, title: 'Mendorong Partisipasi Pembangunan Daerah', desc: 'Menjadi mitra produktif bagi Pemerintah Desa Pojok dan Kecamatan Tawangsari.' },
  ];

  const historicalTimeline = [
    {
      year: '2018',
      title: 'Awal Pembentukan & Deklarasi "Tri Dharma Manunggal"',
      desc: 'Para sesepuh dan perwakilan pemuda RT 01, 02, 03, dan 04 sepakat menyatukan wadah karang taruna tingkat RW dengan nama Tri Dharma Manunggal, melambangkan tiga kewajiban suci pemuda: Bakti, Karya, dan Manunggal.'
    },
    {
      year: '2020',
      title: 'Solidaritas Warga di Masa Sulit',
      desc: 'Pemuda TDM menjadi garda terdepan penyemprotan lingkungan RW 1, dan penyaluran logistik gotong royong warga.'
    },
    {
      year: '2022',
      title: 'Pengembangan Sarana Olahraga & Balai Pemuda',
      desc: 'Gotong royong membangun lapangan voli swadaya dan pengadaan meja tenis meja di Balai RW 01, memicu tumbuhnya klub olahraga voli muda.'
    },
    {
      year: '2024',
      title: 'Kemandirian Ekonomi & Festival Seni RW 1',
      desc: 'Peluncuran paguyuban UMKM pemuda dan penyelenggaraan Festival Seni Budaya Kemerdekaan di Tawangsari.'
    },
    {
      year: '2026',
      title: 'Era Transformasi Digital & Manajemen Terbuka',
      desc: 'Peluncuran website digital komprehensif dengan sistem transparansi keuangan kas publik, direktori anggota, dan sertifikasi digital.'
    }
  ];

  return (
    <div className="py-16 sm:py-24 bg-slate-50 text-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <TdmLogo className="w-20 h-20 mx-auto mb-4 bg-white shadow-xl hover:scale-105 transition-transform ring-4 ring-blue-50" />
          <span className="px-3.5 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-bold uppercase tracking-wider">
            Mengenal Lebih Dekat
          </span>
          <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-slate-900 tracking-tight mt-3">
            Tentang Tri Dharma Manunggal
          </h2>
          <p className="text-slate-600 text-base sm:text-lg mt-3 leading-relaxed">
            Karang Taruna dan Organisasi Pemuda RW 01 Desa Pojok, Kecamatan Tawangsari, Kabupaten Sukoharjo, Jawa Tengah.
          </p>
        </div>

        {/* 3 Pillars Card */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div className="p-8 rounded-3xl bg-white border border-slate-200/80 shadow-md hover:shadow-xl transition relative overflow-hidden group">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center font-display font-black text-xl mb-4 group-hover:scale-110 transition-transform">
              1
            </div>
            <h3 className="font-display font-bold text-xl text-slate-900 mb-2">
              Dharma Bakti
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Pengabdian tulus pemuda untuk masyarakat, orang tua, sesepuh desa, dan tanah kelahiran Desa Pojok tanpa pamrih.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-white border border-slate-200/80 shadow-md hover:shadow-xl transition relative overflow-hidden group">
            <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-display font-black text-xl mb-4 group-hover:scale-110 transition-transform">
              2
            </div>
            <h3 className="font-display font-bold text-xl text-slate-900 mb-2">
              Dharma Karya
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Semangat produktif untuk terus berkarya, berinovasi, berwirausaha mandiri, dan berprestasi di segala bidang positif.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-white border border-slate-200/80 shadow-md hover:shadow-xl transition relative overflow-hidden group">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-display font-black text-xl mb-4 group-hover:scale-110 transition-transform">
              3
            </div>
            <h3 className="font-display font-bold text-xl text-slate-900 mb-2">
              Dharma Manunggal
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Persatuan kokoh antar generasi, menyatukan seluruh elemen pemuda RT 1, 2, 3, dan 4 dalam satu ikatan kekeluargaan guyub rukun.
            </p>
          </div>
        </div>

        {/* Visi & Misi Box */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-20">
          
          {/* Visi Box */}
          <div className="lg:col-span-5 p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-blue-700 via-blue-800 to-indigo-900 text-white shadow-xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-bold uppercase tracking-wider text-blue-200">
              <Target className="w-3.5 h-3.5 text-amber-300" />
              <span>Visi Organisasi</span>
            </div>
            <blockquote className="font-display font-bold text-2xl sm:text-3xl leading-snug text-white">
              "Menjadi wadah pemuda yang aktif, kreatif, produktif, solid, dan memberikan manfaat nyata bagi masyarakat."
            </blockquote>
            <div className="pt-4 border-t border-white/15 space-y-3 text-xs sm:text-sm text-blue-100">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Berlandaskan gotong royong dan kearifan lokal Sukoharjo.</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Mendorong kemandirian ekonomi pemuda desa.</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Keterbukaan informasi dan akuntabilitas kas terbuka.</span>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-white/10 border border-white/15">
              <span className="text-[11px] font-bold text-amber-300 uppercase tracking-widest block">
                Filosofi Semboyan
              </span>
              <p className="text-xs text-slate-200 mt-1 italic">
                "{orgInfo.tagline}" — Kebersamaan dan keguyuban dimulai dari kesiapan berkumpul, makan bersama, dan bergerak serempak demi kebaikan lingkungan.
              </p>
            </div>
          </div>

          {/* Misi List */}
          <div className="lg:col-span-7 bg-white p-8 sm:p-10 rounded-3xl border border-slate-200 shadow-md">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-bold uppercase tracking-wider mb-6">
              <Compass className="w-3.5 h-3.5 text-blue-600" />
              <span>8 Misi Utama Organisasi</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {missions.map((m) => (
                <div 
                  key={m.id} 
                  className="p-4 rounded-2xl bg-slate-50 hover:bg-blue-50/50 border border-slate-100 hover:border-blue-200 transition"
                >
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="w-6 h-6 rounded-full bg-blue-600 text-white font-bold text-xs flex items-center justify-center shrink-0">
                      {m.id}
                    </span>
                    <h4 className="text-xs sm:text-sm font-bold text-slate-900 leading-tight">
                      {m.title}
                    </h4>
                  </div>
                  <p className="text-xs text-slate-500 pl-8 leading-relaxed">
                    {m.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Timeline Sejarah */}
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <span className="px-3.5 py-1 rounded-full bg-purple-100 text-purple-800 text-xs font-bold uppercase tracking-wider">
              Rekam Jejak
            </span>
            <h3 className="font-display font-extrabold text-2xl sm:text-4xl text-slate-900 mt-2">
              Timeline Sejarah Perjalanan
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Dari kebersamaan sederhana hingga menjadi organisasi pemuda yang modern dan mandiri.
            </p>
          </div>

          <div className="relative border-l-2 border-blue-500/30 ml-4 sm:ml-8 pl-6 sm:pl-10 space-y-10">
            {historicalTimeline.map((item, idx) => (
              <div key={idx} className="relative group">
                <div className="absolute -left-[35px] sm:-left-[51px] top-1 w-6 h-6 rounded-full bg-white border-4 border-blue-600 shadow-md group-hover:scale-125 transition-transform flex items-center justify-center"></div>
                <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs hover:shadow-md transition">
                  <span className="inline-block px-3 py-0.5 rounded-full text-xs font-extrabold bg-blue-600 text-white font-mono mb-2">
                    Tahun {item.year}
                  </span>
                  <h4 className="font-display font-bold text-lg text-slate-900 mb-1">
                    {item.title}
                  </h4>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
