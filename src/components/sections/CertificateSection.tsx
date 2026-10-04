import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  FileText, 
  Search, 
  ShieldCheck, 
  AlertCircle, 
  ArrowRight 
} from 'lucide-react';
import { Certificate } from '../../types';

export const CertificateSection: React.FC = () => {
  const { certificates, verifyCertificateCode, setVerifiedCert } = useApp();
  const [inputCode, setInputCode] = useState('');
  const [searched, setSearched] = useState(false);
  const [result, setResult] = useState<Certificate | null>(null);

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputCode.trim()) return;
    const res = verifyCertificateCode(inputCode);
    setResult(res);
    setSearched(true);
  };

  const checkDemo = (code: string) => {
    setInputCode(code);
    const res = verifyCertificateCode(code);
    setResult(res);
    setSearched(true);
  };

  return (
    <div className="py-16 sm:py-24 bg-slate-50 text-slate-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="px-3.5 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-bold uppercase tracking-wider">
            Validasi Dokumen Digital
          </span>
          <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-slate-900 tracking-tight mt-3">
            Verifikasi Sertifikat
          </h2>
          <p className="text-slate-600 text-base sm:text-lg mt-3 leading-relaxed">
            Periksa keaslian dan validitas sertifikat kepanitiaan, kejuaraan lomba, atau partisipasi kegiatan resmi Muda-Mudi Tri Dharma Manunggal.
          </p>
        </div>

        {/* Verification Box */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-xl space-y-6">
          <form onSubmit={handleVerify} className="space-y-4">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
              Masukkan Nomor Kode Unik Sertifikat:
            </label>
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <div className="relative flex-1 w-full">
                <FileText className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  value={inputCode}
                  onChange={(e) => setInputCode(e.target.value)}
                  placeholder="Contoh: TDM-2026-VOLI-01"
                  className="w-full pl-12 pr-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-sm sm:text-base font-mono uppercase focus:outline-blue-600"
                />
              </div>
              <button
                type="submit"
                className="w-full sm:w-auto px-8 py-3 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-md shadow-blue-500/25 transition flex items-center justify-center gap-2 shrink-0"
              >
                <Search className="w-4 h-4" />
                <span>Cek Validitas</span>
              </button>
            </div>
          </form>

          {/* Quick Demo Test Pills */}
          <div className="pt-2 border-t border-slate-100">
            <span className="text-xs text-slate-400 block mb-2 font-medium">
              Contoh kode sertifikat resmi terdaftar:
            </span>
            <div className="flex flex-wrap gap-2">
              {certificates.map((c) => (
                <button
                  key={c.id}
                  onClick={() => checkDemo(c.code)}
                  className="px-3 py-1 rounded-lg bg-slate-100 hover:bg-blue-50 hover:text-blue-700 text-slate-700 text-xs font-mono font-semibold transition"
                >
                  {c.code}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Verification Result Card */}
        {searched && (
          <div className="mt-8 animate-fade-in">
            {result ? (
              <div className="p-6 sm:p-8 rounded-3xl bg-white border-2 border-emerald-500 shadow-xl space-y-4">
                <div className="flex items-center justify-between flex-wrap gap-3 pb-4 border-b border-slate-100">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center">
                      <ShieldCheck className="w-6 h-6" />
                    </div>
                    <div>
                      <span className="text-[11px] font-bold text-emerald-700 uppercase tracking-widest block">
                        Status Sertifikat
                      </span>
                      <h4 className="font-display font-black text-xl text-slate-900">
                        Terverifikasi Resmi & Sah
                      </h4>
                    </div>
                  </div>
                  <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                    {result.code}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm text-slate-700 pt-2">
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold uppercase block">Penerima Sertifikat</span>
                    <strong className="text-base text-slate-900 font-display">{result.recipientName}</strong>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold uppercase block">Peran / Predikat</span>
                    <span className="font-semibold text-blue-700">{result.role}</span>
                  </div>
                  <div className="sm:col-span-2">
                    <span className="text-[10px] text-slate-400 font-bold uppercase block">Nama Kegiatan</span>
                    <p className="font-semibold text-slate-800">{result.eventName}</p>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold uppercase block">Tanggal Diterbitkan</span>
                    <span>{result.issueDate}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold uppercase block">Penandatangan Resmi</span>
                    <span>{result.signatory} ({result.signatoryRole})</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between flex-wrap gap-3">
                  <p className="text-xs text-slate-400">
                    Dokumen ini diarsipkan secara digital oleh Sekretariat Muda-Mudi Tri Dharma Manunggal RW 1 Pojok.
                  </p>
                  <button
                    onClick={() => setVerifiedCert(result)}
                    className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md transition flex items-center gap-1.5"
                  >
                    <span>Buka Tampilan Sertifikat</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ) : (
              <div className="p-8 rounded-3xl bg-white border border-rose-200 shadow-md text-center space-y-3">
                <AlertCircle className="w-12 h-12 text-rose-500 mx-auto" />
                <h4 className="font-display font-bold text-lg text-slate-900">
                  Sertifikat Tidak Ditemukan
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto">
                  Kode "{inputCode}" tidak terdaftar di arsip data Tri Dharma Manunggal. Pastikan penulisan kode sudah sesuai.
                </p>
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
};
