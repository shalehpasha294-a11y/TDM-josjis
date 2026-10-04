import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  ShieldCheck, 
  Lock, 
  KeyRound, 
  AlertTriangle, 
  CheckCircle2, 
  Activity, 
  RefreshCw, 
  Eye, 
  EyeOff, 
  ShieldAlert, 
  FileText,
  Sliders,
  Server,
  Terminal,
  Cpu
} from 'lucide-react';

export const SecurityShieldCenter: React.FC = () => {
  const { 
    currentUser, 
    securitySettings, 
    updateSecuritySettings, 
    securityLogs, 
    securityScore, 
    updateMasterPasswordForAllAdmins,
    failedLoginAttempts,
    isAccountLocked,
    lockoutRemainingSeconds,
    addToast
  } = useApp();

  const [newUnifiedPassword, setNewUnifiedPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showCurrentMasterPassword, setShowCurrentMasterPassword] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleUpdatePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUnifiedPassword.trim()) return;
    if (newUnifiedPassword.length < 6) {
      addToast('error', 'Kata Sandi Lemah', 'Sandi minimal harus 6 karakter.');
      return;
    }
    updateMasterPasswordForAllAdmins(newUnifiedPassword.trim());
    setShowSuccessModal(true);
    setNewUnifiedPassword('');
  };

  const isSuperAdmin = currentUser?.role === 'Super Admin';

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Top Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 border border-indigo-500/30 shadow-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold uppercase tracking-wider border border-emerald-500/30">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Pusat Perlindungan Siber Tingkat Tinggi</span>
          </div>
          <h2 className="font-display font-black text-2xl sm:text-3xl text-white">
            Security Shield & Proteksi Website
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
            Sistem pengamanan berlapis dengan proteksi Anti Brute-Force, sanitasi Anti-XSS, rate-limiting, audit log real-time, dan manajemen sandi seragam seluruh admin.
          </p>
        </div>

        {/* Security Score Widget */}
        <div className="p-4 sm:p-5 rounded-2xl bg-white/10 border border-white/15 backdrop-blur-md flex items-center gap-4 shrink-0 shadow-lg">
          <div className="relative w-16 h-16 flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
              <path
                className="text-slate-700"
                strokeWidth="3.5"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <path
                className={securityScore >= 80 ? 'text-emerald-400' : 'text-amber-400'}
                strokeDasharray={`${securityScore}, 100`}
                strokeWidth="3.5"
                strokeLinecap="round"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
            </svg>
            <div className="absolute font-display font-black text-base text-white">
              {securityScore}%
            </div>
          </div>
          <div>
            <div className="text-xs font-bold text-slate-300 uppercase tracking-wider">Skor Keamanan</div>
            <div className="font-display font-bold text-lg text-emerald-400">Website Aman</div>
            <div className="text-[10px] text-slate-400">Proteksi Aktif 24/7</div>
          </div>
        </div>
      </div>

      {/* Grid: Password Management + Security Features */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Sandi Seragam Seluruh Admin (Permintaan Khusus) */}
        <div className="lg:col-span-6 space-y-6">
          <div className="p-6 rounded-3xl bg-slate-800 border border-slate-700 shadow-xl space-y-5">
            <div className="flex items-center gap-3 border-b border-slate-700 pb-3">
              <div className="p-2.5 rounded-xl bg-blue-600/20 text-blue-400 border border-blue-500/30">
                <KeyRound className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-display font-bold text-base text-white">
                  Sandi Seragam Seluruh Admin
                </h3>
                <p className="text-xs text-slate-400">
                  Sesuai instruksi, semua akun admin dapat login menggunakan sandi yang sama.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-700 space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>Kata Sandi Seragam Saat Ini:</span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-bold">
                  Aktif untuk Semua Role
                </span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <code className="text-lg font-mono font-bold text-amber-300 tracking-wider">
                    {showCurrentMasterPassword 
                      ? securitySettings.masterAdminPassword 
                      : '••••••••••••'}
                  </code>
                  <button
                    type="button"
                    onClick={() => setShowCurrentMasterPassword(!showCurrentMasterPassword)}
                    className="p-1 text-slate-400 hover:text-white transition"
                    title={showCurrentMasterPassword ? 'Sembunyikan' : 'Tampilkan'}
                  >
                    {showCurrentMasterPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                <span className="text-xs text-slate-400">
                  (Super Admin, Admin, Bendahara, Sekretaris, PDD)
                </span>
              </div>
            </div>

            {/* Form Ubah Sandi Seragam */}
            {isSuperAdmin ? (
              <form onSubmit={handleUpdatePassword} className="space-y-4 pt-2">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-300 block">
                    Ganti Sandi Seragam Baru untuk Seluruh Admin:
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={newUnifiedPassword}
                      onChange={(e) => setNewUnifiedPassword(e.target.value)}
                      placeholder="Masukkan kata sandi baru untuk seluruh admin..."
                      className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-slate-750 border border-slate-600 text-sm text-white focus:outline-blue-500 font-mono"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  <p className="text-[11px] text-slate-400">
                    Ketika disimpan, semua akun pengurus (Super Admin, Bagas, Fajar, Ratna, Rizky) akan langsung memakai sandi ini.
                  </p>
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-md transition flex items-center justify-center gap-2"
                >
                  <KeyRound className="w-4 h-4" />
                  <span>Terapkan Sandi ke Seluruh Akun Admin</span>
                </button>
              </form>
            ) : (
              <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-slate-400">
                Hanya <strong>Super Admin</strong> yang memiliki otoritas untuk mengganti sandi seragam admin.
              </div>
            )}
          </div>

          {/* Firewall & Rate-Limiting Controls */}
          <div className="p-6 rounded-3xl bg-slate-800 border border-slate-700 shadow-xl space-y-4">
            <div className="flex items-center gap-2 text-white font-display font-bold text-base">
              <Sliders className="w-5 h-5 text-indigo-400" />
              <span>Konfigurasi Perlindungan Sistem</span>
            </div>

            <div className="space-y-3 pt-1">
              <label className="p-3 rounded-2xl bg-slate-750 border border-slate-700 flex items-center justify-between cursor-pointer select-none">
                <div>
                  <div className="text-xs font-bold text-white">Proteksi Anti Brute-Force & Anti-Spam</div>
                  <div className="text-[10px] text-slate-400">Kunci otomatis akun jika salah sandi 5 kali berturut-turut</div>
                </div>
                <input
                  type="checkbox"
                  checked={securitySettings.rateLimitingEnabled}
                  onChange={(e) => updateSecuritySettings({ rateLimitingEnabled: e.target.checked })}
                  className="w-5 h-5 accent-blue-600 rounded"
                />
              </label>

              <label className="p-3 rounded-2xl bg-slate-750 border border-slate-700 flex items-center justify-between cursor-pointer select-none">
                <div>
                  <div className="text-xs font-bold text-white">Sanitasi Input XSS (Cross-Site Scripting)</div>
                  <div className="text-[10px] text-slate-400">Membersihkan tag berbahaya seperti script dan iframe liar</div>
                </div>
                <input
                  type="checkbox"
                  checked={securitySettings.antiXssEnabled}
                  onChange={(e) => updateSecuritySettings({ antiXssEnabled: e.target.checked })}
                  className="w-5 h-5 accent-blue-600 rounded"
                />
              </label>

              <label className="p-3 rounded-2xl bg-slate-750 border border-slate-700 flex items-center justify-between cursor-pointer select-none">
                <div>
                  <div className="text-xs font-bold text-white">Konfirmasi Tindakan Kritis (Delete Safeguard)</div>
                  <div className="text-[10px] text-slate-400">Mencegah penghapusan massal data anggota dan keuangan tanpa verifikasi</div>
                </div>
                <input
                  type="checkbox"
                  checked={securitySettings.requirePasskeyForDeletion}
                  onChange={(e) => updateSecuritySettings({ requirePasskeyForDeletion: e.target.checked })}
                  className="w-5 h-5 accent-blue-600 rounded"
                />
              </label>
            </div>
          </div>
        </div>

        {/* Right Column: Real-time Audit Logs */}
        <div className="lg:col-span-6 space-y-6">
          <div className="p-6 rounded-3xl bg-slate-800 border border-slate-700 shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-700 pb-3">
              <div className="flex items-center gap-2 text-white font-display font-bold text-base">
                <Terminal className="w-5 h-5 text-emerald-400" />
                <span>Log Audit Keamanan Real-Time</span>
              </div>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-950 text-emerald-300 border border-emerald-800">
                Live Monitoring
              </span>
            </div>

            <div className="space-y-2.5 max-h-[460px] overflow-y-auto pr-1">
              {securityLogs.map((log) => {
                const isCritical = log.severity === 'critical';
                const isWarning = log.severity === 'warning';
                return (
                  <div
                    key={log.id}
                    className={`p-3 rounded-xl border text-xs space-y-1 transition ${
                      isCritical
                        ? 'bg-rose-950/40 border-rose-800 text-rose-200'
                        : isWarning
                        ? 'bg-amber-950/40 border-amber-800 text-amber-200'
                        : 'bg-slate-750/70 border-slate-700 text-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between text-[11px] font-mono">
                      <span className="font-bold text-white">{log.event}</span>
                      <span className="text-slate-400 text-[10px]">{log.timestamp}</span>
                    </div>
                    <div className="text-[11px] text-slate-400">
                      Oleh: <strong className="text-blue-300">{log.user}</strong> • IP: {log.ipAddress}
                    </div>
                    <p className="text-[11px] leading-relaxed pt-0.5 text-slate-300">
                      {log.details}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
