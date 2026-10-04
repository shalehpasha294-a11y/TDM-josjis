import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Wallet, 
  Receipt, 
  ShieldCheck, 
  FileSpreadsheet,
  ArrowUpRight,
  ArrowDownRight,
  Mail
} from 'lucide-react';
import { FinancialRecord } from '../../types';

export const TransparencySection: React.FC = () => {
  const { finances, totalIncome, totalExpense, totalBalance, addToast, setCurrentTab, sendReportToGmail } = useApp();
  const [filterType, setFilterType] = useState<string>('Semua');

  const filteredFinances = filterType === 'Semua' 
    ? finances 
    : finances.filter(f => f.type === filterType);

  const formatRupiah = (val: number) => {
    return 'Rp ' + val.toLocaleString('id-ID');
  };

  const handleExport = () => {
    const headers = 'ID,Tipe,Kategori,Jumlah,Tanggal,Deskripsi,Kuitansi\n';
    const rows = finances.map(f => `"${f.id}","${f.type}","${f.category}",${f.amount},"${f.date}","${f.description}","${f.receiptNote || '-'}"`).join('\n');
    const blob = new Blob([headers + rows], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `Laporan_Kas_TDM_RW1_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    addToast('success', 'Laporan Kas Terunduh', 'File laporan CSV kas organisasi berhasil diunduh.');
  };

  const handleEmailReport = () => {
    const lines = finances.map(f => `[${f.date}] ${f.type.toUpperCase()}: Rp ${f.amount.toLocaleString('id-ID')} (${f.category} - ${f.description})`).join('\n');
    const body = `Berikut Laporan Kas Terbuka TDM RW 1:\n\nSaldo: Rp ${totalBalance.toLocaleString('id-ID')}\nTotal Pemasukan: Rp ${totalIncome.toLocaleString('id-ID')}\nTotal Pengeluaran: Rp ${totalExpense.toLocaleString('id-ID')}\n\nDetail:\n${lines}`;
    sendReportToGmail(`Laporan Kas Transparan TDM RW 1 - ${new Date().toLocaleDateString('id-ID')}`, body);
  };

  return (
    <div className="py-16 sm:py-24 bg-slate-50 text-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="px-3.5 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-bold uppercase tracking-wider">
            Akuntabilitas Publik
          </span>
          <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-slate-900 tracking-tight mt-3">
            Transparansi Kas Organisasi
          </h2>
          <p className="text-slate-600 text-base sm:text-lg mt-3 leading-relaxed">
            Setiap rupiah iuran anggota, donasi warga RW 1, dan pengeluaran kegiatan dicatat secara terbuka dan disinkronkan ke email resmi tridharmamanunggalrw1@gmail.com.
          </p>
        </div>

        {/* 3 Overview Stat Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          
          {/* Saldo Kas */}
          <div className="p-8 rounded-3xl bg-gradient-to-br from-blue-700 via-blue-800 to-indigo-900 text-white shadow-xl relative overflow-hidden">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold uppercase tracking-widest text-blue-200">
                Saldo Kas Tersedia
              </span>
              <div className="w-10 h-10 rounded-2xl bg-white/10 flex items-center justify-center">
                <Wallet className="w-5 h-5 text-blue-300" />
              </div>
            </div>
            <div className="font-display font-black text-3xl sm:text-4xl tracking-tight mb-2">
              {formatRupiah(totalBalance)}
            </div>
            <p className="text-xs text-blue-200 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Rekening kas Bendahara TDM RW 1</span>
            </p>
          </div>

          {/* Total Pemasukan */}
          <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-md">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold uppercase tracking-widest text-slate-400">
                Total Pemasukan
              </span>
              <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <ArrowUpRight className="w-5 h-5" />
              </div>
            </div>
            <div className="font-display font-black text-3xl sm:text-4xl text-emerald-600 tracking-tight mb-2">
              {formatRupiah(totalIncome)}
            </div>
            <p className="text-xs text-slate-500">
              Iuran rutin bulanan, donasi sesepuh & sponsor
            </p>
          </div>

          {/* Total Pengeluaran */}
          <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-md">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold uppercase tracking-widest text-slate-400">
                Total Pengeluaran
              </span>
              <div className="w-10 h-10 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center">
                <ArrowDownRight className="w-5 h-5" />
              </div>
            </div>
            <div className="font-display font-black text-3xl sm:text-4xl text-rose-600 tracking-tight mb-2">
              {formatRupiah(totalExpense)}
            </div>
            <p className="text-xs text-slate-500">
              Operasional, konsumsi kerja bakti, santunan
            </p>
          </div>
        </div>

        {/* Visual Comparison Progress Bar */}
        <div className="mb-12 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="font-display font-bold text-lg text-slate-900">
                Perbandingan Arus Kas
              </h3>
              <p className="text-xs text-slate-500">
                Persentase realisasi pemasukan vs serapan dana kegiatan
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={handleEmailReport}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-blue-50 text-blue-700 hover:bg-blue-100 transition"
              >
                <Mail className="w-4 h-4 text-blue-600" />
                <span>Kirim ke Gmail</span>
              </button>
              <button
                onClick={handleExport}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-800 transition"
              >
                <FileSpreadsheet className="w-4 h-4 text-emerald-600" />
                <span>Unduh CSV</span>
              </button>
            </div>
          </div>

          <div className="space-y-2">
            <div className="h-4 rounded-full bg-slate-100 overflow-hidden flex">
              <div 
                className="h-full bg-emerald-500" 
                style={{ width: `${Math.round((totalIncome / (totalIncome + totalExpense || 1)) * 100)}%` }}
                title={`Pemasukan: ${formatRupiah(totalIncome)}`}
              ></div>
              <div 
                className="h-full bg-rose-500" 
                style={{ width: `${Math.round((totalExpense / (totalIncome + totalExpense || 1)) * 100)}%` }}
                title={`Pengeluaran: ${formatRupiah(totalExpense)}`}
              ></div>
            </div>
            <div className="flex items-center justify-between text-xs font-semibold">
              <span className="flex items-center gap-1.5 text-emerald-600">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                Pemasukan ({Math.round((totalIncome / (totalIncome + totalExpense || 1)) * 100)}%)
              </span>
              <span className="flex items-center gap-1.5 text-rose-600">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500"></span>
                Pengeluaran ({Math.round((totalExpense / (totalIncome + totalExpense || 1)) * 100)}%)
              </span>
            </div>
          </div>
        </div>

        {/* Ledger Table Section */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-md overflow-hidden">
          
          {/* Table Toolbar */}
          <div className="p-6 border-b border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h3 className="font-display font-bold text-lg text-slate-900">
                Buku Catatan Kas Transparan
              </h3>
              <p className="text-xs text-slate-500">
                Menampilkan {filteredFinances.length} transaksi kas
              </p>
            </div>

            {/* Filter buttons */}
            <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl text-xs font-semibold">
              {['Semua', 'Pemasukan', 'Pengeluaran'].map((type) => (
                <button
                  key={type}
                  onClick={() => setFilterType(type)}
                  className={`px-3 py-1.5 rounded-lg transition ${
                    filterType === type ? 'bg-white text-slate-900 font-bold shadow-xs' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-slate-50 text-slate-400 font-bold uppercase text-[10px] tracking-wider border-b border-slate-100">
                <tr>
                  <th className="py-3.5 px-6">Tanggal</th>
                  <th className="py-3.5 px-6">Tipe & Kategori</th>
                  <th className="py-3.5 px-6">Keterangan Transaksi</th>
                  <th className="py-3.5 px-6">Kuitansi / Bukti</th>
                  <th className="py-3.5 px-6 text-right">Jumlah</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                {filteredFinances.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="py-16 px-6 text-center">
                      <div className="max-w-md mx-auto space-y-3">
                        <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto">
                          <Wallet className="w-7 h-7" />
                        </div>
                        <h4 className="font-display font-bold text-base text-slate-900">
                          Buku Kas Saldo Awal Rp 0
                        </h4>
                        <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                          Pencatatan kas siap digunakan. Setiap pemasukan dan pengeluaran yang diinput oleh Bendahara akan langsung tampil di sini dan disinkronkan ke Gmail.
                        </p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  filteredFinances.map((rec) => {
                    const isIncome = rec.type === 'Pemasukan';
                    return (
                      <tr key={rec.id} className="hover:bg-slate-50/80 transition">
                        <td className="py-4 px-6 text-slate-500 whitespace-nowrap">
                          {rec.date}
                        </td>
                        <td className="py-4 px-6 whitespace-nowrap">
                          <div className="flex items-center gap-2">
                            <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${
                              isIncome ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                            }`}>
                              {rec.type}
                            </span>
                            <span className="text-xs text-slate-600">{rec.category}</span>
                          </div>
                        </td>
                        <td className="py-4 px-6 max-w-xs">
                          <span className="line-clamp-2">{rec.description}</span>
                        </td>
                        <td className="py-4 px-6 whitespace-nowrap text-slate-400 text-xs">
                          <span className="flex items-center gap-1 font-mono">
                            <Receipt className="w-3.5 h-3.5 text-slate-400" />
                            {rec.receiptNote || 'Tercatat di Kas'}
                          </span>
                        </td>
                        <td className={`py-4 px-6 text-right font-display font-bold text-sm whitespace-nowrap ${
                          isIncome ? 'text-emerald-600' : 'text-rose-600'
                        }`}>
                          {isIncome ? '+ ' : '- '}
                          {formatRupiah(rec.amount)}
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>

          <div className="p-4 bg-slate-50 border-t border-slate-100 text-center text-xs text-slate-500">
            Diaudit dan diverifikasi oleh Bendahara Muda-Mudi Tri Dharma Manunggal RW 1 Desa Pojok
          </div>
        </div>

      </div>
    </div>
  );
};
