import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Mail, 
  Cloud, 
  Download, 
  Upload, 
  FileText, 
  CheckCircle2, 
  RefreshCw, 
  HardDrive, 
  Send, 
  ExternalLink,
  ShieldCheck,
  AlertCircle
} from 'lucide-react';

export const GmailStorageManager: React.FC = () => {
  const { 
    gmailSyncInfo, 
    backupToGmail, 
    restoreFromGmailBackup, 
    sendReportToGmail,
    members,
    activities,
    finances,
    totalBalance,
    addToast
  } = useApp();

  const [restoreText, setRestoreText] = useState('');
  const [showRestoreBox, setShowRestoreBox] = useState(false);

  const handleRestoreSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!restoreText.trim()) return;
    const success = restoreFromGmailBackup(restoreText.trim());
    if (success) {
      setRestoreText('');
      setShowRestoreBox(false);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      if (content) {
        restoreFromGmailBackup(content);
      }
    };
    reader.readAsText(file);
  };

  const handleSendFinancialReport = () => {
    const lines = finances.map(f => `• [${f.date}] ${f.type.toUpperCase()}: Rp ${f.amount.toLocaleString('id-ID')} (${f.category} - ${f.description})`).join('\n');
    const body = `Yth. Pembina & Warga RW 1,\n\nBerikut Laporan Kas Resmi Muda-Mudi Tri Dharma Manunggal:\n\nSaldo Kas Terkini: Rp ${totalBalance.toLocaleString('id-ID')}\nTotal Transaksi: ${finances.length}\n\nRiwayat Transaksi:\n${lines}\n\nEmail Arsip Resmi: tridharmamanunggalrw1@gmail.com`;
    sendReportToGmail(`[LAPORAN KAS] Kas Organisasi TDM RW 1 - ${new Date().toLocaleDateString('id-ID')}`, body);
  };

  const handleSendMembersReport = () => {
    const lines = members.map((m, i) => `${i + 1}. ${m.name} - ${m.role} (${m.division}) | WA: ${m.whatsapp || '-'}`).join('\n');
    const body = `Yth. Pengurus Muda-Mudi Tri Dharma Manunggal,\n\nBerikut Daftar Keanggotaan Terkini (${members.length} Anggota):\n\n${lines}\n\nArsip Resmi: tridharmamanunggalrw1@gmail.com`;
    sendReportToGmail(`[DIREKTORI ANGGOTA] Daftar Pemuda TDM RW 1 - ${new Date().toLocaleDateString('id-ID')}`, body);
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Top Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-red-950 via-slate-900 to-indigo-950 border border-red-500/30 shadow-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/20 text-red-300 text-xs font-bold uppercase tracking-wider border border-red-500/30">
            <Mail className="w-3.5 h-3.5 text-red-400" />
            <span>Penyimpanan Berbasis Cloud Gmail</span>
          </div>
          <h2 className="font-display font-black text-2xl sm:text-3xl text-white">
            Sistem Penyimpanan & Cadangan Gmail
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
            Sesuai permintaan, seluruh penyimpanan data website (anggota, kas, arsip kegiatan, dan pengaturan) terhubung ke akun Gmail resmi: <strong className="text-white underline">tridharmamanunggalrw1@gmail.com</strong>.
          </p>
        </div>

        <div className="p-4 sm:p-5 rounded-2xl bg-white/10 border border-white/15 backdrop-blur-md flex items-center gap-4 shrink-0 shadow-lg">
          <div className="w-12 h-12 rounded-xl bg-red-600 text-white flex items-center justify-center">
            <Cloud className="w-6 h-6" />
          </div>
          <div>
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Status Koneksi</div>
            <div className="font-display font-bold text-sm sm:text-base text-emerald-400 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
              <span>Tersambung ke Gmail</span>
            </div>
            <div className="text-[11px] text-slate-300 font-mono">tridharmamanunggalrw1@gmail.com</div>
          </div>
        </div>
      </div>

      {/* Grid: Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left: Backup & Restore Controls */}
        <div className="lg:col-span-7 space-y-6">
          {/* Card 1: 1-Click Backup ke Gmail */}
          <div className="p-6 rounded-3xl bg-slate-800 border border-slate-700 shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-700 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-red-600/20 text-red-400">
                  <Download className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-base text-white">
                    Pencadangan Data ke Gmail (1-Klik)
                  </h3>
                  <p className="text-xs text-slate-400">
                    Ekspor seluruh database website dan buka email pengarsipan resmi.
                  </p>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-700 text-xs text-slate-300 space-y-2">
              <div className="flex items-center justify-between">
                <span>Alamat Tujuan Arsip:</span>
                <span className="font-mono font-bold text-emerald-400">tridharmamanunggalrw1@gmail.com</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Pencadangan Terakhir:</span>
                <span className="text-slate-300">{gmailSyncInfo.lastBackupDate}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Total Snapshot Tersimpan:</span>
                <span className="text-blue-400 font-bold">{gmailSyncInfo.totalSnapshots} snapshot</span>
              </div>
            </div>

            <button
              onClick={backupToGmail}
              className="w-full py-3 px-4 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs sm:text-sm shadow-lg shadow-red-900/30 transition flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" />
              <span>Cadangkan Database ke Gmail Sekarang</span>
            </button>
          </div>

          {/* Card 2: Pulihkan dari Cadangan Gmail */}
          <div className="p-6 rounded-3xl bg-slate-800 border border-slate-700 shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-700 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-blue-600/20 text-blue-400">
                  <Upload className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-base text-white">
                    Pulihkan Data dari Cadangan Gmail
                  </h3>
                  <p className="text-xs text-slate-400">
                    Unggah file JSON backup dari email atau tempel kode cadangan.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <label className="flex-1 py-3 px-4 rounded-xl bg-slate-750 hover:bg-slate-700 border border-slate-600 text-center cursor-pointer transition text-xs font-bold text-white flex items-center justify-center gap-2">
                <Upload className="w-4 h-4 text-blue-400" />
                <span>Unggah File Cadangan (.json)</span>
                <input
                  type="file"
                  accept=".json"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>

              <button
                type="button"
                onClick={() => setShowRestoreBox(!showRestoreBox)}
                className="py-3 px-4 rounded-xl bg-slate-700 hover:bg-slate-650 text-slate-200 text-xs font-bold transition"
              >
                {showRestoreBox ? 'Tutup Kotak Teks' : 'Tempel Teks JSON'}
              </button>
            </div>

            {showRestoreBox && (
              <form onSubmit={handleRestoreSubmit} className="space-y-3 pt-2">
                <textarea
                  rows={4}
                  required
                  value={restoreText}
                  onChange={(e) => setRestoreText(e.target.value)}
                  placeholder="Tempel teks snapshot JSON cadangan dari inbox Gmail di sini..."
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs font-mono text-emerald-400 focus:outline-blue-500"
                ></textarea>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md transition flex items-center gap-1.5"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Eksekusi Pemulihan Database</span>
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Right: Quick Dispatch to Gmail */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-6 rounded-3xl bg-slate-800 border border-slate-700 shadow-xl space-y-4">
            <h3 className="font-display font-bold text-base text-white flex items-center gap-2">
              <Mail className="w-5 h-5 text-red-400" />
              <span>Kirim Laporan Resmi ke Gmail</span>
            </h3>
            <p className="text-xs text-slate-400">
              Kirim rekapitulasi data organisasi secara otomatis ke <strong className="text-white">tridharmamanunggalrw1@gmail.com</strong> untuk arsip dan pembagian ke sesepuh RW 1.
            </p>

            <div className="space-y-3 pt-2">
              <button
                onClick={handleSendFinancialReport}
                className="w-full p-3.5 rounded-2xl bg-slate-750 hover:bg-slate-700 border border-slate-600 text-left transition flex items-center justify-between group"
              >
                <div>
                  <div className="text-xs font-bold text-white group-hover:text-emerald-400 transition-colors">
                    Kirim Rekap Kas Terbuka ke Gmail
                  </div>
                  <div className="text-[10px] text-slate-400">Saldo: Rp {totalBalance.toLocaleString('id-ID')} • {finances.length} transaksi</div>
                </div>
                <Send className="w-4 h-4 text-emerald-400" />
              </button>

              <button
                onClick={handleSendMembersReport}
                className="w-full p-3.5 rounded-2xl bg-slate-750 hover:bg-slate-700 border border-slate-600 text-left transition flex items-center justify-between group"
              >
                <div>
                  <div className="text-xs font-bold text-white group-hover:text-blue-400 transition-colors">
                    Kirim Direktori Anggota ke Gmail
                  </div>
                  <div className="text-[10px] text-slate-400">{members.length} anggota aktif terdata</div>
                </div>
                <Send className="w-4 h-4 text-blue-400" />
              </button>

              <a
                href="https://mail.google.com"
                target="_blank"
                rel="noreferrer"
                className="w-full p-3.5 rounded-2xl bg-slate-900 hover:bg-slate-850 border border-slate-700 text-center text-xs font-bold text-slate-300 hover:text-white transition flex items-center justify-center gap-2 mt-4"
              >
                <span>Buka Inbox Gmail (tridharmamanunggalrw1@gmail.com)</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
