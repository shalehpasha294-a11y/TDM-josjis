import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  X, 
  Lock, 
  Mail, 
  User, 
  Phone, 
  ShieldCheck, 
  Sparkles, 
  ArrowRight, 
  Eye, 
  EyeOff, 
  CheckCircle2,
  Users,
  Wallet,
  FileText,
  AlertTriangle,
  KeyRound
} from 'lucide-react';
import { UserRole } from '../../types';

export const AuthModal: React.FC = () => {
  const { 
    isAuthModalOpen, 
    setIsAuthModalOpen, 
    authModalMode, 
    setAuthModalMode,
    loginWithCredentials,
    registerUser,
    loginAs,
    registeredUsers,
    setCurrentTab,
    securitySettings,
    isAccountLocked,
    lockoutRemainingSeconds
  } = useApp();

  // Login Form States
  const [loginIdentifier, setLoginIdentifier] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState('');

  // Register Form States
  const [regName, setRegName] = useState('');
  const [regUsername, setRegUsername] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regRt, setRegRt] = useState('RT 01 / RW 01 Desa Pojok');
  const [regRole, setRegRole] = useState<UserRole>('Viewer');
  const [regPassword, setRegPassword] = useState('');
  const [regConfirmPassword, setRegConfirmPassword] = useState('');
  const [showRegPassword, setShowRegPassword] = useState(false);
  const [regError, setRegError] = useState('');

  if (!isAuthModalOpen) return null;

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    if (!loginIdentifier || !loginPassword) {
      setLoginError('Harap masukkan username/email dan kata sandi.');
      return;
    }
    const res = loginWithCredentials(loginIdentifier, loginPassword);
    if (!res.success) {
      setLoginError(res.message);
    } else {
      setCurrentTab('admin');
    }
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setRegError('');
    if (!regName.trim() || !regUsername.trim() || !regEmail.trim()) {
      setRegError('Nama lengkap, username, dan email wajib diisi.');
      return;
    }
    if (regPassword.length < 6) {
      setRegError('Kata sandi minimal 6 karakter.');
      return;
    }
    if (regPassword !== regConfirmPassword) {
      setRegError('Konfirmasi kata sandi tidak cocok.');
      return;
    }
    const res = registerUser({
      name: regName.trim(),
      username: regUsername.trim().toLowerCase(),
      email: regEmail.trim().toLowerCase(),
      phone: regPhone.trim(),
      rtAddress: regRt,
      role: regRole,
      status: 'Aktif',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80'
    });
    if (!res.success) {
      setRegError(res.message);
    } else {
      setCurrentTab('admin');
    }
  };

  const quickRoles = [
    {
      role: 'Super Admin',
      name: 'Surya Jati P',
      desc: 'Akses penuh + Ubah Semua Konten & Jabatan',
      color: 'bg-purple-600',
      icon: Sparkles
    },
    {
      role: 'Admin',
      name: 'Bagas Aditya',
      desc: 'Kegiatan, Agenda, & Anggota',
      color: 'bg-blue-600',
      icon: Users
    },
    {
      role: 'Bendahara',
      name: 'Fajar Kurniawan S.E.',
      desc: 'Buku Kas & Transparansi Keuangan',
      color: 'bg-emerald-600',
      icon: Wallet
    },
    {
      role: 'Sekretaris',
      name: 'Anisa Ratna Dewi',
      desc: 'Notulensi, Jadwal Piket, & Sertifikat',
      color: 'bg-amber-600',
      icon: FileText
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm overflow-y-auto">
      <div 
        className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header Graphic */}
        <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-blue-900 p-6 sm:p-8 text-white relative">
          <button
            onClick={() => setIsAuthModalOpen(false)}
            className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition"
          >
            <X className="w-4 h-4" />
          </button>
          
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 text-[11px] font-bold uppercase tracking-wider text-blue-200 mb-2">
            <ShieldCheck className="w-3.5 h-3.5 text-blue-300" />
            <span>Portal Akses Resmi Pengurus RW 1</span>
          </div>

          <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-white">
            {authModalMode === 'login' ? 'Masuk ke Portal Admin' : 'Daftar Akun Pengurus Baru'}
          </h2>
          <p className="text-xs sm:text-sm text-blue-100 mt-1 max-w-md">
            {authModalMode === 'login' 
              ? 'Kelola kegiatan, kas organisasi, sekretariat, foto pengurus, dan jabatan anggota.'
              : 'Daftarkan akun pengurus muda-mudi untuk berpartisipasi aktif mengelola sistem.'
            }
          </p>

          {/* Tab Switcher */}
          <div className="flex bg-black/20 p-1 rounded-2xl mt-5 w-fit border border-white/10">
            <button
              onClick={() => { setAuthModalMode('login'); setLoginError(''); }}
              className={`px-5 py-2 rounded-xl text-xs font-bold transition ${
                authModalMode === 'login'
                  ? 'bg-white text-blue-900 shadow-md'
                  : 'text-white/80 hover:text-white'
              }`}
            >
              Masuk / Login
            </button>
            <button
              onClick={() => { setAuthModalMode('register'); setRegError(''); }}
              className={`px-5 py-2 rounded-xl text-xs font-bold transition ${
                authModalMode === 'register'
                  ? 'bg-white text-blue-900 shadow-md'
                  : 'text-white/80 hover:text-white'
              }`}
            >
              Buat Akun / Daftar
            </button>
          </div>
        </div>

        {/* Form Body */}
        <div className="p-6 sm:p-8 space-y-6">
          {authModalMode === 'login' ? (
            /* --- LOGIN FORM --- */
            <div className="space-y-6">
              {/* Account lockout alert if triggered */}
              {isAccountLocked && (
                <div className="p-4 rounded-2xl bg-rose-50 border border-rose-300 text-rose-800 text-xs font-semibold flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0" />
                  <div>
                    <h4 className="font-bold text-rose-950">Proteksi Keamanan Aktif (Lockout)</h4>
                    <p className="mt-0.5">
                      Percobaan login melebihi batas toleransi. Silakan tunggu <strong>{lockoutRemainingSeconds} detik</strong> sebelum mencoba lagi.
                    </p>
                  </div>
                </div>
              )}

              {loginError && !isAccountLocked && (
                <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-rose-500"></span>
                  {loginError}
                </div>
              )}

              <form onSubmit={handleLoginSubmit} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 block">
                    Username atau Email Pengurus
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      required
                      value={loginIdentifier}
                      onChange={(e) => setLoginIdentifier(e.target.value)}
                      placeholder="Masukkan username atau email pengurus..."
                      disabled={isAccountLocked}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm focus:bg-white focus:outline-blue-600 text-slate-800 disabled:opacity-50"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 block">
                    Kata Sandi
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      placeholder="Masukkan kata sandi..."
                      disabled={isAccountLocked}
                      className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm focus:bg-white focus:outline-blue-600 text-slate-800 font-mono disabled:opacity-50"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isAccountLocked}
                  className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-display font-bold text-sm shadow-md transition flex items-center justify-center gap-2 disabled:bg-slate-400"
                >
                  <span>Masuk ke Dashboard</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>

              <div className="text-center pt-2 text-xs text-slate-500">
                Belum memiliki akun?{' '}
                <button
                  type="button"
                  onClick={() => { setAuthModalMode('register'); setRegError(''); }}
                  className="font-bold text-blue-600 hover:underline"
                >
                  Daftar Akun Pengurus Baru
                </button>
              </div>
            </div>
          ) : (
            /* --- REGISTER FORM --- */
            <div className="space-y-5">
              {regError && (
                <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-rose-500"></span>
                  {regError}
                </div>
              )}

              <form onSubmit={handleRegisterSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700">Nama Lengkap *</label>
                    <div className="relative">
                      <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        required
                        value={regName}
                        onChange={(e) => setRegName(e.target.value)}
                        placeholder="Nama lengkap pengurus..."
                        className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm focus:outline-blue-600"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700">Username *</label>
                    <input
                      type="text"
                      required
                      value={regUsername}
                      onChange={(e) => setRegUsername(e.target.value.toLowerCase().replace(/\s+/g, ''))}
                      placeholder="contoh: bayu_saputra"
                      className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm focus:outline-blue-600 font-mono"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700">Email *</label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="email"
                        required
                        value={regEmail}
                        onChange={(e) => setRegEmail(e.target.value)}
                        placeholder="nama@email.com"
                        className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm focus:outline-blue-600"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700">No. WhatsApp *</label>
                    <div className="relative">
                      <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        required
                        value={regPhone}
                        onChange={(e) => setRegPhone(e.target.value)}
                        placeholder="0857xxxxxxxx"
                        className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm focus:outline-blue-600"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700">Wilayah RT</label>
                    <select
                      value={regRt}
                      onChange={(e) => setRegRt(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm focus:outline-blue-600"
                    >
                      <option value="RT 01 / RW 01 Desa Pojok">RT 01 / RW 01</option>
                      <option value="RT 02 / RW 01 Desa Pojok">RT 02 / RW 01</option>
                      <option value="RT 03 / RW 01 Desa Pojok">RT 03 / RW 01</option>
                      <option value="RT 04 / RW 01 Desa Pojok">RT 04 / RW 01</option>
                      <option value="Warga Perantau RW 01">Warga Perantau RW 01</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700">Peran / Jabatan Akses</label>
                    <select
                      value={regRole}
                      onChange={(e) => setRegRole(e.target.value as UserRole)}
                      className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm focus:outline-blue-600 font-semibold"
                    >
                      <option value="Admin">Admin (Kegiatan & Acara)</option>
                      <option value="Bendahara">Bendahara (Keuangan Kas)</option>
                      <option value="Sekretaris">Sekretaris (Administrasi & Surat)</option>
                      <option value="PDD">PDD (Dokumentasi & Media)</option>
                      <option value="Viewer">Viewer / Anggota Pemuda</option>
                      <option value="Super Admin">Super Admin (Ubah Semua Konten)</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700">Kata Sandi (min 6)</label>
                    <div className="relative">
                      <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type={showRegPassword ? 'text' : 'password'}
                        required
                        value={regPassword}
                        onChange={(e) => setRegPassword(e.target.value)}
                        placeholder="Minimal 6 karakter..."
                        className="w-full pl-9 pr-9 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm focus:outline-blue-600 font-mono"
                      />
                      <button
                        type="button"
                        onClick={() => setShowRegPassword(!showRegPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                      >
                        {showRegPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700">Konfirmasi Sandi</label>
                    <div className="relative">
                      <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type={showRegPassword ? 'text' : 'password'}
                        required
                        value={regConfirmPassword}
                        onChange={(e) => setRegConfirmPassword(e.target.value)}
                        placeholder="Ulangi kata sandi..."
                        className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm focus:outline-blue-600 font-mono"
                      />
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-display font-bold text-sm shadow-md transition flex items-center justify-center gap-2 mt-2"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Daftar & Masuk Sekarang</span>
                </button>
              </form>

              <div className="text-center pt-2 text-xs text-slate-500">
                Sudah memiliki akun terdaftar?{' '}
                <button
                  type="button"
                  onClick={() => { setAuthModalMode('login'); setLoginError(''); }}
                  className="font-bold text-blue-600 hover:underline"
                >
                  Masuk di sini
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
