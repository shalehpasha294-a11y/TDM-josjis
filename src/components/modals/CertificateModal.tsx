import React from 'react';
import { useApp } from '../../context/AppContext';
import { X, CheckCircle2, ShieldCheck, Printer, Download } from 'lucide-react';
import { TdmLogo } from '../common/TdmLogo';

export const CertificateModal: React.FC = () => {
  const { verifiedCert, setVerifiedCert, addToast, orgInfo } = useApp();

  if (!verifiedCert) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    addToast('success', 'Sertifikat Siap', 'Gunakan menu Cetak/Simpan PDF pada browser Anda.');
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-xs animate-fade-in">
      <div 
        className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Bar */}
        <div className="p-4 bg-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
            <span className="text-xs font-bold uppercase tracking-wider">
              Sertifikat Digital Terverifikasi Resmi
            </span>
          </div>
          <button
            onClick={() => setVerifiedCert(null)}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Certificate Printable Canvas */}
        <div className="p-6 sm:p-10 overflow-y-auto flex-1 bg-slate-50 flex items-center justify-center">
          <div className="w-full bg-white p-6 sm:p-10 rounded-2xl border-4 border-double border-blue-900/40 shadow-xl relative overflow-hidden text-center space-y-6">
            
            {/* Watermark badge */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 border-8 border-blue-600/5 rounded-full flex items-center justify-center pointer-events-none select-none">
              <span className="text-blue-900/5 font-display font-black text-6xl rotate-[-25deg]">
                TRI DHARMA
              </span>
            </div>

            {/* Certificate Header */}
            <div className="space-y-1.5 relative z-10">
              <TdmLogo className="w-14 h-14 mx-auto mb-2 bg-white" />
              <span className="text-xs font-bold text-blue-700 uppercase tracking-widest block">
                {orgInfo.name}
              </span>
              <p className="text-[11px] text-slate-400">
                Desa Pojok RW 01, Kecamatan Tawangsari, Kabupaten Sukoharjo
              </p>
              <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-slate-900 tracking-tight pt-2">
                SERTIFIKAT PENGHARGAAN
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-indigo-600 mx-auto rounded-full"></div>
            </div>

            {/* Recipient */}
            <div className="space-y-1 relative z-10 py-2">
              <p className="text-xs text-slate-500 italic">Diberikan secara terhormat kepada:</p>
              <h3 className="font-display font-black text-xl sm:text-2xl text-blue-900">
                {verifiedCert.recipientName}
              </h3>
              <p className="text-xs font-semibold text-slate-700">
                Atas dedikasi, partisipasi aktif, dan kontribusi nyata sebagai:
              </p>
              <span className="inline-block px-4 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-800 font-bold text-sm mt-1">
                {verifiedCert.role}
              </span>
            </div>

            {/* Event Name */}
            <div className="relative z-10 text-xs text-slate-600 max-w-md mx-auto leading-relaxed">
              Dalam agenda kegiatan resmi: <br />
              <strong className="text-slate-900 text-sm font-bold block mt-1">
                "{verifiedCert.eventName}"
              </strong>
            </div>

            {/* Verification code pill */}
            <div className="relative z-10 pt-2">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-mono font-bold">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>KODE RESMI: {verifiedCert.code}</span>
              </div>
            </div>

            {/* Signatures & Seal */}
            <div className="pt-6 border-t border-slate-100 grid grid-cols-2 gap-6 relative z-10 text-xs text-slate-600">
              <div>
                <p className="text-[10px] text-slate-400">Tanggal Penerbitan:</p>
                <p className="font-bold text-slate-800">{verifiedCert.issueDate}</p>
                <p className="text-[10px] text-slate-400 mt-1">Sukoharjo, Jawa Tengah</p>
              </div>
              <div>
                <p className="text-[10px] text-slate-400">Pengurus Organisasi:</p>
                <div className="font-serif italic font-bold text-blue-900 text-base my-1">
                  Surya Jati P
                </div>
                <p className="font-bold text-slate-800 text-[11px]">{verifiedCert.signatoryRole}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Actions */}
        <div className="p-4 bg-white border-t border-slate-100 flex items-center justify-between">
          <button
            onClick={() => setVerifiedCert(null)}
            className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 transition"
          >
            Tutup
          </button>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-800 transition"
            >
              <Printer className="w-4 h-4 text-slate-600" />
              <span>Cetak Sertifikat</span>
            </button>
            <button
              onClick={handleDownload}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-md transition"
            >
              <Download className="w-4 h-4" />
              <span>Unduh PDF</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
