import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Instagram, 
  Youtube, 
  MessageCircle, 
  Send, 
  CheckCircle2, 
  Clock,
  ShieldCheck
} from 'lucide-react';

export const ContactSection: React.FC = () => {
  const { orgInfo, addToast, sendReportToGmail } = useApp();
  const [senderName, setSenderName] = useState('');
  const [senderWhatsApp, setSenderWhatsApp] = useState('');
  const [senderMessage, setSenderMessage] = useState('');
  const [sentSuccess, setSentSuccess] = useState(false);

  const officialEmail = 'tridharmamanunggalrw1@gmail.com';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!senderName || !senderMessage) return;
    setSentSuccess(true);
    addToast('success', 'Pesan Terkirim', `Pesan Anda berhasil diteruskan ke Pengurus TDM RW 1 (${officialEmail}).`);
    
    // Also open mailto or WhatsApp
    const body = `Nama Pengirim: ${senderName}\nNo. WhatsApp: ${senderWhatsApp}\n\nPesan:\n${senderMessage}`;
    sendReportToGmail(`[PESAN DARI WARGA] Pesan dari ${senderName}`, body);
  };

  return (
    <div className="py-16 sm:py-24 bg-slate-50 text-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="px-3.5 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-bold uppercase tracking-wider">
            Hubungi Pengurus
          </span>
          <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-slate-900 tracking-tight mt-3">
            Kontak & Sekretariat
          </h2>
          <p className="text-slate-600 text-base sm:text-lg mt-3 leading-relaxed">
            Pintu komunikasi selalu terbuka bagi pemuda, warga RW 1, tokoh masyarakat, dan mitra kepemudaan.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
          
          {/* Left Col: Contact Info Cards */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Primary WhatsApp Card */}
            <div className="p-8 rounded-3xl bg-gradient-to-br from-emerald-600 to-teal-700 text-white shadow-xl space-y-4">
              <span className="px-3 py-1 rounded-full bg-white/20 text-xs font-bold uppercase tracking-wider inline-block">
                Saluran Utama WhatsApp
              </span>
              <h3 className="font-display font-black text-2xl sm:text-3xl">
                {orgInfo.contactPerson}
              </h3>
              <p className="text-xs sm:text-sm text-emerald-100">
                Ketua Umum Muda-Mudi Tri Dharma Manunggal RW 1 Desa Pojok
              </p>
              <div className="text-lg font-mono font-bold pt-2">
                {orgInfo.whatsapp}
              </div>
              <a
                href={`https://wa.me/${orgInfo.whatsapp.replace(/[^0-9]/g, '')}?text=Halo%20Ketua%20TDM%20Surya%20Jati,%20saya%20ingin%20berkomunikasi`}
                target="_blank"
                rel="noreferrer"
                className="w-full py-3.5 px-4 rounded-2xl bg-white text-emerald-800 font-extrabold text-sm hover:bg-emerald-50 transition shadow-md flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4 text-emerald-600" />
                <span>Chat Langsung via WhatsApp</span>
              </a>
            </div>

            {/* Address & Official Gmail Card */}
            <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-md space-y-6">
              
              <div className="space-y-4 text-xs sm:text-sm text-slate-700">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-900 block font-display text-sm">Alamat Sekretariat:</strong>
                    <span className="text-slate-600 leading-relaxed block mt-0.5">
                      {orgInfo.secretariatAddress}
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-blue-50/70 border border-blue-100">
                  <Mail className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                  <div>
                    <div className="flex items-center gap-1.5">
                      <strong className="text-slate-900 font-display text-sm">Email Resmi Organisasi:</strong>
                      <span className="text-[10px] bg-blue-600 text-white font-bold px-1.5 py-0.5 rounded">Resmi</span>
                    </div>
                    <a href={`mailto:${officialEmail}`} className="text-blue-700 font-bold text-sm hover:underline block mt-0.5">
                      {officialEmail}
                    </a>
                    <span className="text-[11px] text-slate-500 block mt-0.5">
                      Digunakan untuk korespondensi formal, pengarsipan surat, dan pencadangan database.
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-900 block font-display text-sm">Waktu Koordinasi:</strong>
                    <span className="text-slate-600">Setiap sore & malam hari di Balai Pertemuan RW 01</span>
                  </div>
                </div>
              </div>

              {/* Social links */}
              <div className="pt-4 border-t border-slate-100">
                <strong className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-3">
                  Media Sosial Resmi:
                </strong>
                <div className="flex flex-wrap gap-2">
                  <a
                    href={orgInfo.instagram}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-50 hover:bg-pink-50 hover:text-pink-600 border border-slate-200 text-xs font-bold text-slate-700 transition"
                  >
                    <Instagram className="w-4 h-4 text-pink-600" />
                    <span>@tdm_rw1</span>
                  </a>
                  <a
                    href={orgInfo.youtube}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-50 hover:bg-red-50 hover:text-red-600 border border-slate-200 text-xs font-bold text-slate-700 transition"
                  >
                    <Youtube className="w-4 h-4 text-red-600" />
                    <span>YouTube TDM</span>
                  </a>
                </div>
              </div>
            </div>

          </div>

          {/* Right Col: Contact Form */}
          <div className="lg:col-span-7 bg-white p-8 sm:p-10 rounded-3xl border border-slate-200 shadow-md">
            
            <div className="mb-6 space-y-1">
              <h3 className="font-display font-bold text-xl text-slate-900">
                Kirim Pesan / Aspirasi ke Pengurus
              </h3>
              <p className="text-xs sm:text-sm text-slate-500">
                Pesan akan langsung diteruskan ke inbox resmi: <strong className="text-slate-800">{officialEmail}</strong>.
              </p>
            </div>

            {sentSuccess ? (
              <div className="p-8 text-center bg-emerald-50 border border-emerald-200 rounded-2xl space-y-3 animate-fade-in">
                <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                <h4 className="font-display font-bold text-lg text-emerald-950">
                  Pesan Berhasil Terkirim!
                </h4>
                <p className="text-xs sm:text-sm text-emerald-800 leading-relaxed max-w-md mx-auto">
                  Terima kasih telah menghubungi Muda-Mudi Tri Dharma Manunggal RW 1. Pengurus akan membalas melalui WhatsApp atau email resmi <strong>{officialEmail}</strong>.
                </p>
                <button
                  onClick={() => setSentSuccess(false)}
                  className="px-4 py-2 rounded-xl bg-emerald-600 text-white font-bold text-xs mt-2"
                >
                  Kirim Pesan Baru
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Nama Anda *</label>
                  <input
                    type="text"
                    required
                    value={senderName}
                    onChange={(e) => setSenderName(e.target.value)}
                    placeholder="Nama lengkap Anda..."
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm focus:outline-blue-600"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Nomor WhatsApp Aktif *</label>
                  <input
                    type="tel"
                    required
                    value={senderWhatsApp}
                    onChange={(e) => setSenderWhatsApp(e.target.value)}
                    placeholder="Contoh: 0857xxxxxxxx"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm focus:outline-emerald-600"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Pesan / Masukan / Usulan *</label>
                  <textarea
                    rows={4}
                    required
                    value={senderMessage}
                    onChange={(e) => setSenderMessage(e.target.value)}
                    placeholder="Tuliskan pesan atau saran Anda untuk kemajuan pemuda RW 1..."
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm focus:outline-blue-600"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 px-6 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-sm shadow-md shadow-blue-500/25 transition flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Kirim Pesan ke Pengurus ({officialEmail})</span>
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Embedded Google Maps Section */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-md space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-display font-bold text-lg text-slate-900">
                Peta Wilayah Tawangsari, Sukoharjo
              </h3>
              <p className="text-xs text-slate-500">
                Lokasi Desa Pojok RW 1, Kec. Tawangsari, Kab. Sukoharjo, Jawa Tengah
              </p>
            </div>
            <span className="px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold">
              Kodepos 57561
            </span>
          </div>

          <div className="w-full h-80 sm:h-96 rounded-2xl overflow-hidden border border-slate-200 bg-slate-100">
            <iframe
              src={orgInfo.mapsEmbedUrl || "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15814.776626601449!2d110.8351543!3d-7.6974868!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e7a3ec5cb239f19%3A0x5027a76e356c9a0!2sPojok%2C%20Tawangsari%2C%20Sukoharjo%20Regency%2C%20Central%20Java!5e0!3m2!1sen!2sid!4v1700000000000!5m2!1sen!2sid"}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Peta Lokasi Desa Pojok RW 1 Tawangsari Sukoharjo"
            ></iframe>
          </div>
        </div>

      </div>
    </div>
  );
};
