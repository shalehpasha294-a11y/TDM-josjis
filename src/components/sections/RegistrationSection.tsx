import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Sparkles, 
  Send, 
  CheckCircle2, 
  User, 
  Phone, 
  Mail,
  ShieldCheck
} from 'lucide-react';

export const RegistrationSection: React.FC = () => {
  const { submitRegistration, setCurrentTab } = useApp();

  const [fullName, setFullName] = useState('');
  const [nickname, setNickname] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [gender, setGender] = useState<'Laki-laki' | 'Perempuan'>('Laki-laki');
  const [whatsapp, setWhatsapp] = useState('');
  const [instagramAccount, setInstagramAccount] = useState('');
  const [rtAddress, setRtAddress] = useState('RT 01 / RW 01 Desa Pojok');
  const [selectedInterests, setSelectedInterests] = useState<string[]>(['Olahraga']);
  const [skills, setSkills] = useState('');
  const [reasons, setReasons] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const interestOptions = [
    'Olahraga',
    'Sosial & Kemanusiaan',
    'Seni & Budaya',
    'PDD / Dokumentasi / Media',
    'Kewirausahaan / UMKM',
    'Lingkungan Hidup',
    'Keagamaan',
    'Pendidikan & Anak'
  ];

  const toggleInterest = (opt: string) => {
    if (selectedInterests.includes(opt)) {
      setSelectedInterests(selectedInterests.filter(i => i !== opt));
    } else {
      setSelectedInterests([...selectedInterests, opt]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !whatsapp) return;

    submitRegistration({
      fullName,
      nickname,
      birthDate,
      gender,
      whatsapp,
      instagram: instagramAccount,
      rtAddress,
      interests: selectedInterests,
      skills,
      reasons
    });

    setIsSubmitted(true);
  };

  const resetForm = () => {
    setFullName('');
    setNickname('');
    setBirthDate('');
    setWhatsapp('');
    setInstagramAccount('');
    setSkills('');
    setReasons('');
    setIsSubmitted(false);
  };

  return (
    <div className="py-16 sm:py-24 bg-slate-50 text-slate-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="px-3.5 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-bold uppercase tracking-wider">
            Regenerasi & Solidaritas
          </span>
          <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-slate-900 tracking-tight mt-3">
            Gabung Muda-Mudi
          </h2>
          <p className="text-slate-600 text-base sm:text-lg mt-3 leading-relaxed">
            Formulir pendaftaran anggota baru Muda-Mudi Tri Dharma Manunggal RW 01 Desa Pojok, Tawangsari, Sukoharjo.
          </p>
        </div>

        {isSubmitted ? (
          /* Success Screen */
          <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200/80 shadow-xl text-center space-y-6 animate-fade-in">
            <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
              <CheckCircle2 className="w-12 h-12" />
            </div>

            <div className="space-y-2 max-w-lg mx-auto">
              <h3 className="font-display font-black text-2xl sm:text-3xl text-slate-900">
                Pendaftaran Berhasil!
              </h3>
              <p className="text-slate-700 text-base sm:text-lg leading-relaxed font-medium">
                Terima kasih! Formulir pendaftaran kamu telah terkirim ke arsip pengurus <strong>tridharmamanunggalrw1@gmail.com</strong>.
              </p>
              <p className="text-xs text-slate-400 pt-2">
                Pengurus TDM RW 1 akan segera menghubungi kamu melalui nomor WhatsApp aktif yang didaftarkan.
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
              <button
                onClick={() => setCurrentTab('beranda')}
                className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm shadow-md transition"
              >
                Kembali ke Beranda
              </button>
              <button
                onClick={resetForm}
                className="px-6 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs sm:text-sm transition"
              >
                Daftarkan Anggota Lain
              </button>
            </div>
          </div>
        ) : (
          /* Form Screen */
          <form 
            onSubmit={handleSubmit}
            className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-xl space-y-8"
          >
            {/* Identity Info */}
            <div className="space-y-4">
              <h3 className="font-display font-bold text-lg text-slate-900 border-b border-slate-100 pb-2 flex items-center gap-2">
                <User className="w-4 h-4 text-blue-600" />
                <span>Data Diri Calon Anggota</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Nama Lengkap *</label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Contoh: Surya Pratama"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm focus:outline-blue-600"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Nama Panggilan</label>
                  <input
                    type="text"
                    value={nickname}
                    onChange={(e) => setNickname(e.target.value)}
                    placeholder="Contoh: Surya"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm focus:outline-blue-600"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Tanggal Lahir</label>
                  <input
                    type="date"
                    value={birthDate}
                    onChange={(e) => setBirthDate(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm focus:outline-blue-600"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Jenis Kelamin</label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setGender('Laki-laki')}
                      className={`py-2.5 rounded-xl text-xs font-bold transition border ${
                        gender === 'Laki-laki' 
                          ? 'bg-blue-600 text-white border-blue-600' 
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      Laki-laki
                    </button>
                    <button
                      type="button"
                      onClick={() => setGender('Perempuan')}
                      className={`py-2.5 rounded-xl text-xs font-bold transition border ${
                        gender === 'Perempuan' 
                          ? 'bg-blue-600 text-white border-blue-600' 
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      Perempuan
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Kontak & Wilayah */}
            <div className="space-y-4">
              <h3 className="font-display font-bold text-lg text-slate-900 border-b border-slate-100 pb-2 flex items-center gap-2">
                <Phone className="w-4 h-4 text-emerald-600" />
                <span>Kontak & Wilayah Domisili RW 1</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1 sm:col-span-1">
                  <label className="text-xs font-bold text-slate-700">Nomor WhatsApp Aktif *</label>
                  <input
                    type="tel"
                    required
                    value={whatsapp}
                    onChange={(e) => setWhatsapp(e.target.value)}
                    placeholder="08xxxxxxxxxx"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm focus:outline-emerald-600"
                  />
                </div>

                <div className="space-y-1 sm:col-span-1">
                  <label className="text-xs font-bold text-slate-700">Akun Instagram (Opsional)</label>
                  <input
                    type="text"
                    value={instagramAccount}
                    onChange={(e) => setInstagramAccount(e.target.value)}
                    placeholder="@username"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm focus:outline-pink-600"
                  />
                </div>

                <div className="space-y-1 sm:col-span-1">
                  <label className="text-xs font-bold text-slate-700">Wilayah RT di RW 1</label>
                  <select
                    value={rtAddress}
                    onChange={(e) => setRtAddress(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm focus:outline-blue-600"
                  >
                    <option value="RT 01 / RW 01 Desa Pojok">RT 01 / RW 01</option>
                    <option value="RT 02 / RW 01 Desa Pojok">RT 02 / RW 01</option>
                    <option value="RT 03 / RW 01 Desa Pojok">RT 03 / RW 01</option>
                    <option value="RT 04 / RW 01 Desa Pojok">RT 04 / RW 01</option>
                    <option value="Warga Perantau RW 01">Warga Perantau RW 01</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Minat & Keterampilan */}
            <div className="space-y-4">
              <h3 className="font-display font-bold text-lg text-slate-900 border-b border-slate-100 pb-2 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span>Minat, Keahlian & Motivasi</span>
              </h3>

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700 block">
                  Bidang yang Disukai / Diminati:
                </label>
                <div className="flex flex-wrap gap-2">
                  {interestOptions.map((opt) => {
                    const active = selectedInterests.includes(opt);
                    return (
                      <button
                        type="button"
                        key={opt}
                        onClick={() => toggleInterest(opt)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition border ${
                          active 
                            ? 'bg-blue-600 text-white border-blue-600 shadow-xs' 
                            : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        {opt}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Skill / Keterampilan yang Dimiliki</label>
                  <textarea
                    rows={3}
                    value={skills}
                    onChange={(e) => setSkills(e.target.value)}
                    placeholder="Contoh: Main voli, desain grafis Canva, memasak, MC acara, sound system, pertukangan..."
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm focus:outline-blue-600"
                  ></textarea>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Alasan Ingin Bergabung</label>
                  <textarea
                    rows={3}
                    value={reasons}
                    onChange={(e) => setReasons(e.target.value)}
                    placeholder="Contoh: Ingin memperbanyak teman, ikut memajukan kampung RW 1, dan aktif berkegiatan positif..."
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm focus:outline-blue-600"
                  ></textarea>
                </div>
              </div>
            </div>

            {/* Submit button */}
            <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-xs text-slate-400">
                Data akan diverifikasi langsung oleh Sekretariat Muda-Mudi Tri Dharma Manunggal.
              </p>
              <button
                type="submit"
                className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-sm shadow-lg shadow-blue-500/25 transition flex items-center justify-center gap-2 shrink-0"
              >
                <Send className="w-4 h-4" />
                <span>Kirim Formulir Pendaftaran</span>
              </button>
            </div>
          </form>
        )}

      </div>
    </div>
  );
};
