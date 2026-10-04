import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  ShieldCheck, 
  Users, 
  Calendar, 
  FileText, 
  DollarSign, 
  CheckSquare, 
  Settings, 
  LogOut, 
  Plus, 
  Trash2, 
  Edit3, 
  CheckCircle2, 
  Bell, 
  Image as ImageIcon,
  TrendingUp, 
  ArrowRight,
  Sparkles,
  KeyRound,
  Mail,
  Lock,
  MapPin,
  Phone,
  Camera,
  Layers,
  Save,
  X,
  ExternalLink
} from 'lucide-react';
import { AdminUser, Member, Activity, NewsArticle, AgendaEvent, UserRole } from '../../types';
import { TdmLogo } from '../common/TdmLogo';
import { AppearanceCustomizer } from './AppearanceCustomizer';
import { SecurityShieldCenter } from './SecurityShieldCenter';
import { GmailStorageManager } from './GmailStorageManager';

export const AdminDashboard: React.FC = () => {
  const { 
    currentUser, 
    loginAs, 
    logout, 
    setIsAdminView, 
    registeredUsers,
    members,
    activities,
    agenda,
    news,
    finances,
    tasks,
    piketList,
    registrations,
    announcement,
    orgInfo,
    addMember,
    updateMember,
    deleteMember,
    changeMemberRole,
    addActivity,
    updateActivity,
    deleteActivity,
    addAgenda,
    deleteAgenda,
    addNews,
    updateNews,
    deleteNews,
    addFinancialRecord,
    deleteFinancialRecord,
    resetFinancesToZero,
    addTask,
    updateTaskStatus,
    deleteTask,
    addPiket,
    deletePiket,
    updateRegistrationStatus,
    deleteRegistration,
    updateAnnouncement,
    updateOrgInfo,
    securitySettings,
    setIsAuthModalOpen,
    setAuthModalMode,
    addToast
  } = useApp();

  const [activeAdminTab, setActiveAdminTab] = useState<'overview' | 'content' | 'members' | 'finances' | 'tasks' | 'settings' | 'appearance' | 'security' | 'gmail'>('overview');

  // Modal State for Editing Member / Officer (Foto Pengurus & Jabatan)
  const [editingMember, setEditingMember] = useState<Member | null>(null);
  const [memName, setMemName] = useState('');
  const [memRole, setMemRole] = useState('');
  const [memDivision, setMemDivision] = useState('');
  const [memPhotoUrl, setMemPhotoUrl] = useState('');
  const [memWhatsapp, setMemWhatsapp] = useState('');
  const [memInstagram, setMemInstagram] = useState('');
  const [memBio, setMemBio] = useState('');

  // Form states for adding items
  const [showAddNews, setShowAddNews] = useState(false);
  const [newNewsTitle, setNewNewsTitle] = useState('');
  const [newNewsSummary, setNewNewsSummary] = useState('');
  const [newNewsContent, setNewNewsContent] = useState('');
  const [newNewsCategory, setNewNewsCategory] = useState('Sosial & Lingkungan');
  const [newNewsImage, setNewNewsImage] = useState('https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=800&q=80');

  const [showAddActivity, setShowAddActivity] = useState(false);
  const [newActTitle, setNewActTitle] = useState('');
  const [newActCategory, setNewActCategory] = useState<any>('Sosial');
  const [newActLocation, setNewActLocation] = useState('Balai RW 01 Desa Pojok');
  const [newActDate, setNewActDate] = useState('2026-10-15');
  const [newActDesc, setNewActDesc] = useState('');
  const [newActImage, setNewActImage] = useState('https://images.unsplash.com/photo-1534158914592-062992fbe900?auto=format&fit=crop&w=800&q=80');

  const [showAddFinance, setShowAddFinance] = useState(false);
  const [newFinType, setNewFinType] = useState<'Pemasukan' | 'Pengeluaran'>('Pemasukan');
  const [newFinCat, setNewFinCat] = useState<any>('Iuran Anggota');
  const [newFinAmount, setNewFinAmount] = useState('');
  const [newFinDesc, setNewFinDesc] = useState('');

  const [showAddTask, setShowAddTask] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskPJ, setNewTaskPJ] = useState('');
  const [newTaskDeadline, setNewTaskDeadline] = useState('2026-10-20');
  const [newTaskPriority, setNewTaskPriority] = useState<any>('Sedang');

  // Announcement state
  const [editAnnText, setEditAnnText] = useState(announcement.text);

  // Settings: Sekretariat & Kontak
  const [editName, setEditName] = useState(orgInfo.name);
  const [editTagline, setEditTagline] = useState(orgInfo.tagline);
  const [editSecondaryTagline, setEditSecondaryTagline] = useState(orgInfo.secondaryTagline);
  const [editWhatsApp, setEditWhatsApp] = useState(orgInfo.whatsapp);
  const [editContactPerson, setEditContactPerson] = useState(orgInfo.contactPerson);
  const [editEmail, setEditEmail] = useState(orgInfo.email || 'tridharmamanunggalrw1@gmail.com');
  const [editSecretariat, setEditSecretariat] = useState(orgInfo.secretariatAddress);
  const [editMapsUrl, setEditMapsUrl] = useState(orgInfo.mapsEmbedUrl || '');

  // If not logged in, prompt secure login without exposing password
  if (!currentUser) {
    return (
      <div className="py-20 px-4 bg-slate-900 min-h-[85vh] flex items-center justify-center text-white">
        <div className="max-w-md w-full bg-slate-800 rounded-3xl p-8 border border-slate-700 shadow-2xl space-y-6">
          <div className="text-center space-y-2">
            <TdmLogo className="w-16 h-16 mx-auto mb-2 bg-white" />
            <h2 className="font-display font-extrabold text-2xl text-white">
              Portal Admin & Pengurus
            </h2>
            <p className="text-xs text-slate-400">
              Akses terbatas untuk pengurus resmi Muda-Mudi Tri Dharma Manunggal RW 1.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-700 text-center space-y-3">
            <div className="w-10 h-10 rounded-full bg-blue-600/20 text-blue-400 flex items-center justify-center mx-auto">
              <Lock className="w-5 h-5" />
            </div>
            <p className="text-xs text-slate-300">
              Silakan masukkan akun pengurus Anda melalui form login yang aman untuk mengakses dashboard manajemen.
            </p>
            <button
              onClick={() => {
                setAuthModalMode('login');
                setIsAuthModalOpen(true);
              }}
              className="w-full py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-md transition"
            >
              Masuk dengan Akun Pengurus
            </button>
          </div>

          <div className="space-y-2 text-center">
            <button
              onClick={() => setIsAdminView(false)}
              className="text-xs text-slate-400 hover:text-white underline block mx-auto"
            >
              ← Kembali ke Website Publik
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Handlers for Member Management (Super Admin editing foto & jabatan)
  const openEditMemberModal = (m: Member) => {
    setEditingMember(m);
    setMemName(m.name);
    setMemRole(m.role);
    setMemDivision(m.division);
    setMemPhotoUrl(m.photoUrl);
    setMemWhatsapp(m.whatsapp || '');
    setMemInstagram(m.instagram || '');
    setMemBio(m.bio || '');
  };

  const handleSaveMemberEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingMember) return;
    updateMember(editingMember.id, {
      name: memName,
      role: memRole,
      division: memDivision,
      photoUrl: memPhotoUrl,
      whatsapp: memWhatsapp,
      instagram: memInstagram,
      bio: memBio
    });
    setEditingMember(null);
  };

  // Content additions
  const handleCreateNews = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNewsTitle) return;
    addNews({
      title: newNewsTitle,
      date: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }),
      author: currentUser.name,
      category: newNewsCategory,
      summary: newNewsSummary,
      content: newNewsContent,
      thumbnailUrl: newNewsImage,
      readTime: '3 Menit'
    });
    setNewNewsTitle('');
    setNewNewsSummary('');
    setNewNewsContent('');
    setShowAddNews(false);
  };

  const handleCreateActivity = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newActTitle) return;
    addActivity({
      title: newActTitle,
      category: newActCategory,
      date: newActDate,
      year: parseInt(newActDate.slice(0, 4), 10) || 2026,
      location: newActLocation,
      description: newActDesc,
      imageUrl: newActImage,
      status: 'Terlaksana',
      participantCount: 50
    });
    setNewActTitle('');
    setNewActDesc('');
    setShowAddActivity(false);
  };

  const handleCreateFinance = (e: React.FormEvent) => {
    e.preventDefault();
    const amountNum = parseInt(newFinAmount, 10);
    if (!amountNum || !newFinDesc) return;
    addFinancialRecord({
      type: newFinType,
      category: newFinCat,
      amount: amountNum,
      date: new Date().toISOString().slice(0, 10),
      description: newFinDesc,
      receiptNote: `Diinput oleh ${currentUser.name}`
    });
    setNewFinAmount('');
    setNewFinDesc('');
    setShowAddFinance(false);
  };

  const handleCreateTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle) return;
    addTask({
      title: newTaskTitle,
      personInCharge: newTaskPJ || currentUser.name,
      deadline: newTaskDeadline,
      priority: newTaskPriority,
      status: 'Sedang Dikerjakan',
      category: 'Kegiatan'
    });
    setNewTaskTitle('');
    setNewTaskPJ('');
    setShowAddTask(false);
  };

  const handleSaveAnnouncement = () => {
    updateAnnouncement({ text: editAnnText, isActive: true });
  };

  const handleSaveSettings = () => {
    updateOrgInfo({
      name: editName,
      tagline: editTagline,
      secondaryTagline: editSecondaryTagline,
      whatsapp: editWhatsApp,
      contactPerson: editContactPerson,
      email: 'tridharmamanunggalrw1@gmail.com', // strictly enforced
      secretariatAddress: editSecretariat,
      mapsEmbedUrl: editMapsUrl
    });
  };

  // Permission checks
  const isSuperAdmin = currentUser.role === 'Super Admin';
  const canManageFinance = isSuperAdmin || currentUser.role === 'Bendahara';
  const canManageMembers = isSuperAdmin || currentUser.role === 'Sekretaris' || currentUser.role === 'Admin';
  const canManageContent = isSuperAdmin || currentUser.role === 'Admin' || currentUser.role === 'PDD';

  return (
    <div className="bg-slate-900 text-slate-100 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Admin Top Header */}
        <div className="bg-slate-800 p-6 rounded-3xl border border-slate-700 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <img src={currentUser.avatar} alt={currentUser.name} className="w-14 h-14 rounded-2xl object-cover border-2 border-blue-500 shadow-md" />
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-display font-bold text-xl text-white">
                  {currentUser.name}
                </h2>
                <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
                  isSuperAdmin ? 'bg-purple-600 text-white' : 'bg-blue-600 text-white'
                }`}>
                  {currentUser.role}
                </span>
                {isSuperAdmin && (
                  <span className="text-[10px] font-bold text-amber-300 bg-amber-400/10 border border-amber-400/20 px-2 py-0.5 rounded-full">
                    Akses Penuh / Master CMS
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Dashboard Manajemen Muda-Mudi Tri Dharma Manunggal • Email Resmi: <strong className="text-blue-300">tridharmamanunggalrw1@gmail.com</strong>
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            {/* Quick role switcher */}
            <div className="flex items-center gap-1.5 text-xs text-slate-400 bg-slate-700/60 p-1 rounded-xl">
              <span className="pl-2 pr-1 font-semibold">Ganti Peran:</span>
              {registeredUsers.slice(0, 4).map((u) => (
                <button
                  key={u.id}
                  onClick={() => loginAs(u)}
                  className={`px-2 py-1 rounded-lg transition ${
                    currentUser.role === u.role ? 'bg-blue-600 text-white font-bold' : 'hover:text-white'
                  }`}
                >
                  {u.role.split(' ')[0]}
                </button>
              ))}
            </div>

            <button
              onClick={() => setIsAdminView(false)}
              className="px-4 py-2 rounded-xl text-xs font-bold bg-slate-700 hover:bg-slate-600 text-white transition"
            >
              Lihat Website Publik
            </button>

            <button
              onClick={logout}
              className="p-2 rounded-xl bg-rose-600/80 hover:bg-rose-600 text-white transition"
              title="Keluar / Logout"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-800 text-sm font-semibold">
          {[
            { id: 'overview', label: 'Ringkasan & Metrik', icon: <TrendingUp className="w-4 h-4" /> },
            { id: 'content', label: 'Berita & Kegiatan', icon: <FileText className="w-4 h-4" /> },
            { id: 'members', label: `Kelola Anggota & Foto Pengurus (${registrations.filter(r => r.status === 'Menunggu').length})`, icon: <Users className="w-4 h-4" /> },
            { id: 'finances', label: 'Kas & Transparansi', icon: <DollarSign className="w-4 h-4" /> },
            { id: 'tasks', label: 'Tugas & Piket', icon: <CheckSquare className="w-4 h-4" /> },
            { id: 'settings', label: 'Sekretariat & Kontak', icon: <Settings className="w-4 h-4" /> },
            ...(isSuperAdmin ? [
              { id: 'appearance', label: 'Kustomisasi Tampilan & Banner', icon: <Sparkles className="w-4 h-4 text-purple-400" /> }
            ] : []),
            { id: 'security', label: 'Perlindungan Siber & Sandi', icon: <ShieldCheck className="w-4 h-4 text-emerald-400" /> },
            { id: 'gmail', label: 'Penyimpanan & Cadangan Gmail', icon: <Mail className="w-4 h-4 text-red-400" /> },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveAdminTab(tab.id as any)}
              className={`px-4 py-2.5 rounded-2xl whitespace-nowrap flex items-center gap-2 transition ${
                activeAdminTab === tab.id
                  ? 'bg-blue-600 text-white font-bold shadow-lg shadow-blue-600/30'
                  : 'bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-750'
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* TAB 1: OVERVIEW METRICS */}
        {activeAdminTab === 'overview' && (
          <div className="space-y-8 animate-fade-in">
            {/* Quick Super Admin Notification Banner */}
            {isSuperAdmin && (
              <div className="p-4 rounded-2xl bg-purple-900/40 border border-purple-500/40 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-purple-600 text-white">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-white">Status Super Admin Aktif</h4>
                    <p className="text-xs text-purple-200">
                      Anda memiliki izin mengubah semua data, foto pengurus, jabatan anggota, alamat sekretariat, banner, dan menyamakan sandi seluruh admin.
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setActiveAdminTab('members')}
                  className="px-3.5 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold shrink-0"
                >
                  Kelola Pengurus & Jabatan →
                </button>
              </div>
            )}

            {/* Stat Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
              <div className="p-5 rounded-2xl bg-slate-800 border border-slate-700">
                <span className="text-[11px] text-slate-400 font-bold uppercase">Total Anggota</span>
                <div className="font-display font-black text-2xl text-white mt-1">{members.length}</div>
                <span className="text-[10px] text-emerald-400">Aktif di RW 1</span>
              </div>
              <div className="p-5 rounded-2xl bg-slate-800 border border-slate-700">
                <span className="text-[11px] text-slate-400 font-bold uppercase">Kegiatan Terdata</span>
                <div className="font-display font-black text-2xl text-blue-400 mt-1">{activities.length}</div>
                <span className="text-[10px] text-slate-400">Dokumentasi</span>
              </div>
              <div className="p-5 rounded-2xl bg-slate-800 border border-slate-700">
                <span className="text-[11px] text-slate-400 font-bold uppercase">Berita & Warta</span>
                <div className="font-display font-black text-2xl text-indigo-400 mt-1">{news.length}</div>
                <span className="text-[10px] text-slate-400">Artikel tayang</span>
              </div>
              <div className="p-5 rounded-2xl bg-slate-800 border border-slate-700">
                <span className="text-[11px] text-slate-400 font-bold uppercase">Agenda Kalender</span>
                <div className="font-display font-black text-2xl text-amber-400 mt-1">{agenda.length}</div>
                <span className="text-[10px] text-amber-400">Terjadwal</span>
              </div>
              <div className="p-5 rounded-2xl bg-slate-800 border border-slate-700">
                <span className="text-[11px] text-slate-400 font-bold uppercase">Pendaftar Baru</span>
                <div className="font-display font-black text-2xl text-rose-400 mt-1">
                  {registrations.filter(r => r.status === 'Menunggu').length}
                </div>
                <span className="text-[10px] text-rose-300">Menunggu review</span>
              </div>
              <div className="p-5 rounded-2xl bg-slate-800 border border-slate-700">
                <span className="text-[11px] text-slate-400 font-bold uppercase">Tugas Berjalan</span>
                <div className="font-display font-black text-2xl text-purple-400 mt-1">
                  {tasks.filter(t => t.status === 'Sedang Dikerjakan').length}
                </div>
                <span className="text-[10px] text-slate-400">Di progress</span>
              </div>
            </div>

            {/* Recent Registrations Table */}
            <div className="p-6 rounded-3xl bg-slate-800 border border-slate-700 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-display font-bold text-lg text-white">
                    Pendaftar Calon Anggota Baru
                  </h3>
                  <p className="text-xs text-slate-400">Calon anggota yang mengisi form pendaftaran online</p>
                </div>
                <button
                  onClick={() => setActiveAdminTab('members')}
                  className="text-xs text-blue-400 font-semibold hover:underline"
                >
                  Kelola Semua →
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="text-slate-400 uppercase text-[10px] border-b border-slate-700">
                    <tr>
                      <th className="py-2 px-3">Nama</th>
                      <th className="py-2 px-3">WhatsApp</th>
                      <th className="py-2 px-3">Wilayah</th>
                      <th className="py-2 px-3">Minat</th>
                      <th className="py-2 px-3">Status</th>
                      <th className="py-2 px-3 text-right">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-700/60 font-medium">
                    {registrations.map((reg) => (
                      <tr key={reg.id}>
                        <td className="py-3 px-3 font-bold text-white">{reg.fullName}</td>
                        <td className="py-3 px-3 text-emerald-400 font-mono">{reg.whatsapp}</td>
                        <td className="py-3 px-3 text-slate-300">{reg.rtAddress}</td>
                        <td className="py-3 px-3 text-slate-400">{reg.interests.join(', ')}</td>
                        <td className="py-3 px-3">
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                            reg.status === 'Diterima' ? 'bg-emerald-900 text-emerald-300' : 'bg-amber-900 text-amber-300'
                          }`}>
                            {reg.status}
                          </span>
                        </td>
                        <td className="py-3 px-3 text-right space-x-2">
                          {reg.status === 'Menunggu' && (
                            <>
                              <button
                                onClick={() => updateRegistrationStatus(reg.id, 'Diterima')}
                                className="px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-[11px]"
                              >
                                Terima
                              </button>
                              <button
                                onClick={() => updateRegistrationStatus(reg.id, 'Ditolak')}
                                className="px-2.5 py-1 rounded-lg bg-slate-700 hover:bg-slate-600 text-slate-300 text-[11px]"
                              >
                                Tolak
                              </button>
                            </>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: CONTENT MANAGEMENT */}
        {activeAdminTab === 'content' && (
          <div className="space-y-8 animate-fade-in">
            {/* News Section */}
            <div className="p-6 rounded-3xl bg-slate-800 border border-slate-700 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-display font-bold text-lg text-white">Daftar Berita & Artikel</h3>
                  <p className="text-xs text-slate-400">Publikasi warta pemuda di website resmi</p>
                </div>
                {canManageContent && (
                  <button
                    onClick={() => setShowAddNews(!showAddNews)}
                    className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center gap-1.5"
                  >
                    <Plus className="w-4 h-4" />
                    <span>{showAddNews ? 'Batal' : 'Tulis Berita Baru'}</span>
                  </button>
                )}
              </div>

              {/* Add News Form */}
              {showAddNews && (
                <form onSubmit={handleCreateNews} className="p-5 rounded-2xl bg-slate-750 border border-slate-600 space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-300">Judul Berita *</label>
                      <input
                        type="text"
                        required
                        value={newNewsTitle}
                        onChange={(e) => setNewNewsTitle(e.target.value)}
                        placeholder="Contoh: Kerja Bakti Saluran Air..."
                        className="w-full px-3 py-2 rounded-xl bg-slate-700 border border-slate-600 text-sm text-white"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-300">Kategori</label>
                      <select
                        value={newNewsCategory}
                        onChange={(e) => setNewNewsCategory(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-slate-700 border border-slate-600 text-sm text-white"
                      >
                        <option value="Sosial & Lingkungan">Sosial & Lingkungan</option>
                        <option value="Prestasi Olahraga">Prestasi Olahraga</option>
                        <option value="Organisasi & Teknologi">Organisasi & Teknologi</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-300">URL Gambar Thumbnail</label>
                    <input
                      type="text"
                      value={newNewsImage}
                      onChange={(e) => setNewNewsImage(e.target.value)}
                      placeholder="https://images.unsplash.com/..."
                      className="w-full px-3 py-2 rounded-xl bg-slate-700 border border-slate-600 text-sm text-white font-mono"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-300">Ringkasan Singkat</label>
                    <input
                      type="text"
                      value={newNewsSummary}
                      onChange={(e) => setNewNewsSummary(e.target.value)}
                      placeholder="Ringkasan 1-2 kalimat untuk preview..."
                      className="w-full px-3 py-2 rounded-xl bg-slate-700 border border-slate-600 text-sm text-white"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-300">Isi Berita Lengkap</label>
                    <textarea
                      rows={4}
                      value={newNewsContent}
                      onChange={(e) => setNewNewsContent(e.target.value)}
                      placeholder="Tuliskan isi berita di sini..."
                      className="w-full px-3 py-2 rounded-xl bg-slate-700 border border-slate-600 text-sm text-white"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs"
                  >
                    Terbitkan Berita
                  </button>
                </form>
              )}

              {/* News list */}
              <div className="divide-y divide-slate-700">
                {news.map((item) => (
                  <div key={item.id} className="py-3 flex items-center justify-between gap-4">
                    <div>
                      <h4 className="font-bold text-white text-sm">{item.title}</h4>
                      <p className="text-xs text-slate-400">{item.author} • {item.date}</p>
                    </div>
                    {canManageContent && (
                      <button
                        onClick={() => deleteNews(item.id)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-slate-700 transition"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Activities Section */}
            <div className="p-6 rounded-3xl bg-slate-800 border border-slate-700 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-display font-bold text-lg text-white">Daftar Kegiatan Pemuda</h3>
                  <p className="text-xs text-slate-400">Aktivitas resmi yang tampil pada publik</p>
                </div>
                {canManageContent && (
                  <button
                    onClick={() => setShowAddActivity(!showAddActivity)}
                    className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center gap-1.5"
                  >
                    <Plus className="w-4 h-4" />
                    <span>{showAddActivity ? 'Batal' : 'Tambah Kegiatan'}</span>
                  </button>
                )}
              </div>

              {/* Add Activity Form */}
              {showAddActivity && (
                <form onSubmit={handleCreateActivity} className="p-5 rounded-2xl bg-slate-750 border border-slate-600 space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-300">Nama Kegiatan *</label>
                      <input
                        type="text"
                        required
                        value={newActTitle}
                        onChange={(e) => setNewActTitle(e.target.value)}
                        placeholder="Contoh: Turnamen Voli Antar RT..."
                        className="w-full px-3 py-2 rounded-xl bg-slate-700 border border-slate-600 text-sm text-white"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-300">Kategori</label>
                      <select
                        value={newActCategory}
                        onChange={(e) => setNewActCategory(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-slate-700 border border-slate-600 text-sm text-white"
                      >
                        <option value="Sosial">Sosial</option>
                        <option value="Olahraga">Olahraga</option>
                        <option value="Budaya">Budaya</option>
                        <option value="Lingkungan">Lingkungan</option>
                        <option value="Keagamaan">Keagamaan</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-300">Lokasi</label>
                      <input
                        type="text"
                        value={newActLocation}
                        onChange={(e) => setNewActLocation(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-slate-700 border border-slate-600 text-sm text-white"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-300">Tanggal</label>
                      <input
                        type="date"
                        value={newActDate}
                        onChange={(e) => setNewActDate(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-slate-700 border border-slate-600 text-sm text-white"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-300">URL Gambar Kegiatan</label>
                    <input
                      type="text"
                      value={newActImage}
                      onChange={(e) => setNewActImage(e.target.value)}
                      placeholder="https://images.unsplash.com/..."
                      className="w-full px-3 py-2 rounded-xl bg-slate-700 border border-slate-600 text-sm text-white font-mono"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-300">Deskripsi Singkat</label>
                    <textarea
                      rows={3}
                      value={newActDesc}
                      onChange={(e) => setNewActDesc(e.target.value)}
                      placeholder="Uraian kegiatan..."
                      className="w-full px-3 py-2 rounded-xl bg-slate-700 border border-slate-600 text-sm text-white"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs"
                  >
                    Simpan Kegiatan
                  </button>
                </form>
              )}

              {/* Activity list */}
              <div className="divide-y divide-slate-700">
                {activities.map((act) => (
                  <div key={act.id} className="py-3 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <img src={act.imageUrl} alt={act.title} className="w-12 h-12 rounded-xl object-cover" />
                      <div>
                        <h4 className="font-bold text-white text-sm">{act.title}</h4>
                        <p className="text-xs text-slate-400">{act.category} • {act.date} @ {act.location}</p>
                      </div>
                    </div>
                    {canManageContent && (
                      <button
                        onClick={() => deleteActivity(act.id)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-slate-700 transition"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: MEMBER MANAGEMENT & FOTO PENGURUS & GANTI JABATAN */}
        {activeAdminTab === 'members' && (
          <div className="space-y-8 animate-fade-in">
            {/* Top Super Admin Banner for Members */}
            <div className="p-6 rounded-3xl bg-slate-800 border border-slate-700 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h3 className="font-display font-bold text-lg text-white flex items-center gap-2">
                  <Users className="w-5 h-5 text-purple-400" />
                  <span>Pengelolaan Pengurus & Anggota (Ganti Foto & Jabatan)</span>
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Sebagai Super Admin, Anda dapat mengganti jabatan anggota kapan pun dan memperbarui foto pengurus secara instan.
                </p>
              </div>
              <button
                onClick={() => {
                  const name = prompt('Masukkan Nama Anggota Baru:');
                  if (!name) return;
                  const role = prompt('Masukkan Jabatan/Peran (contoh: Koordinator Olahraga):') || 'Anggota Baru';
                  const div = prompt('Masukkan Divisi (contoh: Divisi Olahraga):') || 'Pengurus';
                  addMember({
                    name,
                    nickname: name.split(' ')[0],
                    role,
                    division: div,
                    joinedYear: new Date().getFullYear(),
                    status: 'Aktif',
                    photoUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=400&q=80',
                    whatsapp: '+62 857-4726-3684',
                    isCoordinator: false,
                    bio: 'Anggota pemuda resmi RW 1 Desa Pojok.'
                  });
                }}
                className="px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-md"
              >
                <Plus className="w-4 h-4" />
                <span>Tambah Anggota/Pengurus Baru</span>
              </button>
            </div>

            {/* List of all members with edit photo & change role capabilities */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {members.map((m) => (
                <div key={m.id} className="p-4 rounded-2xl bg-slate-800 border border-slate-700 space-y-3">
                  <div className="flex items-start gap-3">
                    <img 
                      src={m.photoUrl} 
                      alt={m.name} 
                      className="w-14 h-14 rounded-2xl object-cover border-2 border-slate-600 shrink-0" 
                    />
                    <div className="flex-1 min-w-0">
                      <span className="text-[10px] font-bold text-purple-300 bg-purple-900/50 px-2 py-0.5 rounded-md inline-block mb-0.5">
                        {m.division}
                      </span>
                      <h4 className="font-bold text-sm text-white truncate">{m.name}</h4>
                      <p className="text-xs font-semibold text-blue-400 truncate">{m.role}</p>
                    </div>
                  </div>

                  {m.bio && (
                    <p className="text-[11px] text-slate-400 line-clamp-2 italic">
                      "{m.bio}"
                    </p>
                  )}

                  <div className="pt-2 border-t border-slate-700/60 flex items-center justify-between gap-2">
                    <button
                      onClick={() => openEditMemberModal(m)}
                      className="px-3 py-1.5 rounded-xl bg-blue-600/30 hover:bg-blue-600 text-blue-300 hover:text-white font-bold text-xs flex items-center gap-1 transition"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                      <span>Ubah Foto & Jabatan</span>
                    </button>

                    {canManageMembers && (
                      <button
                        onClick={() => {
                          if (confirm(`Hapus anggota ${m.name}?`)) {
                            deleteMember(m.id);
                          }
                        }}
                        className="p-1.5 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-slate-700 transition"
                        title="Hapus Anggota"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Modal Edit Member (Foto & Jabatan) */}
            {editingMember && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
                <div className="bg-slate-800 border border-slate-700 rounded-3xl max-w-lg w-full p-6 space-y-5 text-white max-h-[90vh] overflow-y-auto">
                  <div className="flex items-center justify-between border-b border-slate-700 pb-3">
                    <h3 className="font-display font-bold text-lg text-white">
                      Ubah Data & Jabatan Pengurus
                    </h3>
                    <button onClick={() => setEditingMember(null)} className="p-1 text-slate-400 hover:text-white">
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <form onSubmit={handleSaveMemberEdit} className="space-y-4">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-300">Nama Lengkap</label>
                      <input
                        type="text"
                        required
                        value={memName}
                        onChange={(e) => setMemName(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-slate-700 border border-slate-600 text-sm text-white"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-purple-300">Jabatan / Peran (Penting)</label>
                        <input
                          type="text"
                          required
                          value={memRole}
                          onChange={(e) => setMemRole(e.target.value)}
                          placeholder="Contoh: Ketua Umum, Koordinator Voli"
                          className="w-full px-3 py-2 rounded-xl bg-slate-700 border border-purple-500 text-sm text-white font-bold"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-300">Divisi</label>
                        <select
                          value={memDivision}
                          onChange={(e) => setMemDivision(e.target.value)}
                          className="w-full px-3 py-2 rounded-xl bg-slate-700 border border-slate-600 text-sm text-white"
                        >
                          <option value="Pengurus Harian">Pengurus Harian</option>
                          <option value="Kesekretariatan">Kesekretariatan</option>
                          <option value="Keuangan">Keuangan</option>
                          <option value="Divisi PDD / Media">Divisi PDD / Media</option>
                          <option value="Divisi Olahraga">Divisi Olahraga</option>
                          <option value="Divisi Sosial & Keagamaan">Divisi Sosial & Keagamaan</option>
                          <option value="Divisi Lingkungan">Divisi Lingkungan</option>
                          <option value="Divisi Kewirausahaan">Divisi Kewirausahaan</option>
                          <option value="Divisi Humas">Divisi Humas</option>
                        </select>
                      </div>
                    </div>

                    {/* Foto Pengurus */}
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-300 flex items-center justify-between">
                        <span>URL Foto Profil Pengurus</span>
                        <Camera className="w-3.5 h-3.5 text-purple-400" />
                      </label>
                      <input
                        type="text"
                        required
                        value={memPhotoUrl}
                        onChange={(e) => setMemPhotoUrl(e.target.value)}
                        placeholder="https://..."
                        className="w-full px-3 py-2 rounded-xl bg-slate-700 border border-slate-600 text-xs text-blue-300 font-mono"
                      />
                      {memPhotoUrl && (
                        <div className="pt-2 flex items-center gap-3">
                          <img src={memPhotoUrl} alt="Preview" className="w-12 h-12 rounded-xl object-cover border border-purple-400" />
                          <span className="text-[11px] text-slate-400">Pratinjau foto pengurus</span>
                        </div>
                      )}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-300">No. WhatsApp</label>
                        <input
                          type="text"
                          value={memWhatsapp}
                          onChange={(e) => setMemWhatsapp(e.target.value)}
                          className="w-full px-3 py-2 rounded-xl bg-slate-700 border border-slate-600 text-sm text-white"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-300">Username Instagram</label>
                        <input
                          type="text"
                          value={memInstagram}
                          onChange={(e) => setMemInstagram(e.target.value)}
                          placeholder="tanpa @"
                          className="w-full px-3 py-2 rounded-xl bg-slate-700 border border-slate-600 text-sm text-white"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-300">Biodata Singkat</label>
                      <textarea
                        rows={2}
                        value={memBio}
                        onChange={(e) => setMemBio(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-slate-700 border border-slate-600 text-xs text-white"
                      ></textarea>
                    </div>

                    <div className="flex items-center justify-end gap-3 pt-2">
                      <button
                        type="button"
                        onClick={() => setEditingMember(null)}
                        className="px-4 py-2 rounded-xl bg-slate-700 hover:bg-slate-600 text-slate-300 font-bold text-xs"
                      >
                        Batal
                      </button>
                      <button
                        type="submit"
                        className="px-5 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs shadow-md"
                      >
                        Simpan Perubahan Jabatan & Foto
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 4: FINANCE MANAGEMENT */}
        {activeAdminTab === 'finances' && (
          <div className="space-y-8 animate-fade-in">
            <div className="p-6 rounded-3xl bg-slate-800 border border-slate-700 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-display font-bold text-lg text-white">Pencatatan Buku Kas Organisasi</h3>
                  <p className="text-xs text-slate-400">Pencatatan saldo kas dimulai dari Rp 0 untuk kemudahan pembukuan</p>
                </div>
                {canManageFinance && (
                  <div className="flex items-center gap-2">
                    {finances.length > 0 && (
                      <button
                        type="button"
                        onClick={() => {
                          if (confirm('Apakah Anda yakin ingin mereset buku kas ke saldo Rp 0?')) {
                            resetFinancesToZero();
                          }
                        }}
                        className="px-3 py-2 rounded-xl bg-slate-700 hover:bg-slate-600 text-slate-300 font-bold text-xs"
                      >
                        Reset Kas ke Rp 0
                      </button>
                    )}
                    <button
                      onClick={() => setShowAddFinance(!showAddFinance)}
                      className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1.5"
                    >
                      <Plus className="w-4 h-4" />
                      <span>{showAddFinance ? 'Batal' : 'Catat Transaksi Kas'}</span>
                    </button>
                  </div>
                )}
              </div>

              {/* Form Input Kas */}
              {showAddFinance && (
                <form onSubmit={handleCreateFinance} className="p-5 rounded-2xl bg-slate-750 border border-slate-600 space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-300">Tipe Transaksi</label>
                      <select
                        value={newFinType}
                        onChange={(e) => setNewFinType(e.target.value as any)}
                        className="w-full px-3 py-2 rounded-xl bg-slate-700 border border-slate-600 text-sm text-white"
                      >
                        <option value="Pemasukan">Pemasukan (+)</option>
                        <option value="Pengeluaran">Pengeluaran (-)</option>
                      </select>
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-300">Kategori</label>
                      <select
                        value={newFinCat}
                        onChange={(e) => setNewFinCat(e.target.value as any)}
                        className="w-full px-3 py-2 rounded-xl bg-slate-700 border border-slate-600 text-sm text-white"
                      >
                        <option value="Iuran Anggota">Iuran Anggota</option>
                        <option value="Donasi Warga">Donasi Warga</option>
                        <option value="Sponsorship">Sponsorship</option>
                        <option value="Dana Usaha">Dana Usaha</option>
                        <option value="Konsumsi">Konsumsi</option>
                        <option value="Perlengkapan">Perlengkapan</option>
                        <option value="Sosial & Santunan">Sosial & Santunan</option>
                        <option value="Operasional">Operasional</option>
                      </select>
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-300">Jumlah Nominal (Rp) *</label>
                      <input
                        type="number"
                        required
                        value={newFinAmount}
                        onChange={(e) => setNewFinAmount(e.target.value)}
                        placeholder="Contoh: 150000"
                        className="w-full px-3 py-2 rounded-xl bg-slate-700 border border-slate-600 text-sm text-white"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-300">Keterangan Transaksi *</label>
                    <input
                      type="text"
                      required
                      value={newFinDesc}
                      onChange={(e) => setNewFinDesc(e.target.value)}
                      placeholder="Uraian peruntukan kas..."
                      className="w-full px-3 py-2 rounded-xl bg-slate-700 border border-slate-600 text-sm text-white"
                    />
                  </div>

                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs"
                  >
                    Simpan Catatan Kas
                  </button>
                </form>
              )}

              {/* Finance list */}
              <div className="divide-y divide-slate-700">
                {finances.map((item) => (
                  <div key={item.id} className="py-3 flex items-center justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${
                          item.type === 'Pemasukan' ? 'bg-emerald-900 text-emerald-300' : 'bg-rose-900 text-rose-300'
                        }`}>
                          {item.type}
                        </span>
                        <h4 className="font-bold text-white text-sm">{item.description}</h4>
                      </div>
                      <p className="text-xs text-slate-400 mt-0.5">{item.date} • {item.category}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className={`font-display font-bold text-sm ${
                        item.type === 'Pemasukan' ? 'text-emerald-400' : 'text-rose-400'
                      }`}>
                        Rp {item.amount.toLocaleString('id-ID')}
                      </span>
                      {canManageFinance && (
                        <button
                          onClick={() => deleteFinancialRecord(item.id)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-slate-700 transition"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: TASKS & PIKET */}
        {activeAdminTab === 'tasks' && (
          <div className="space-y-8 animate-fade-in">
            {/* Task Management Kanban */}
            <div className="p-6 rounded-3xl bg-slate-800 border border-slate-700 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-display font-bold text-lg text-white">Manajemen Tugas Pengurus</h3>
                  <p className="text-xs text-slate-400">Tracking progres kepanitiaan dan program kerja</p>
                </div>
                <button
                  onClick={() => setShowAddTask(!showAddTask)}
                  className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center gap-1.5"
                >
                  <Plus className="w-4 h-4" />
                  <span>{showAddTask ? 'Batal' : 'Tambah Tugas'}</span>
                </button>
              </div>

              {showAddTask && (
                <form onSubmit={handleCreateTask} className="p-5 rounded-2xl bg-slate-750 border border-slate-600 space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="space-y-1 sm:col-span-2">
                      <label className="text-xs font-bold text-slate-300">Nama Tugas *</label>
                      <input
                        type="text"
                        required
                        value={newTaskTitle}
                        onChange={(e) => setNewTaskTitle(e.target.value)}
                        placeholder="Contoh: Pengadaan kabel mic dan sound..."
                        className="w-full px-3 py-2 rounded-xl bg-slate-700 border border-slate-600 text-sm text-white"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-300">Penanggung Jawab (PJ)</label>
                      <input
                        type="text"
                        value={newTaskPJ}
                        onChange={(e) => setNewTaskPJ(e.target.value)}
                        placeholder="Nama anggota..."
                        className="w-full px-3 py-2 rounded-xl bg-slate-700 border border-slate-600 text-sm text-white"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-300">Deadline</label>
                      <input
                        type="date"
                        value={newTaskDeadline}
                        onChange={(e) => setNewTaskDeadline(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-slate-700 border border-slate-600 text-sm text-white"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-300">Prioritas</label>
                      <select
                        value={newTaskPriority}
                        onChange={(e) => setNewTaskPriority(e.target.value as any)}
                        className="w-full px-3 py-2 rounded-xl bg-slate-700 border border-slate-600 text-sm text-white"
                      >
                        <option value="Tinggi">Tinggi (Urgent)</option>
                        <option value="Sedang">Sedang</option>
                        <option value="Rendah">Rendah</option>
                      </select>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs"
                  >
                    Simpan Tugas
                  </button>
                </form>
              )}

              {/* Task Columns */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                {(['Belum Dimulai', 'Sedang Dikerjakan', 'Selesai'] as const).map((colStatus) => {
                  const tasksInCol = tasks.filter(t => t.status === colStatus);
                  return (
                    <div key={colStatus} className="p-4 rounded-2xl bg-slate-750 border border-slate-700 space-y-3">
                      <div className="flex items-center justify-between pb-2 border-b border-slate-700">
                        <span className="font-bold text-xs text-white uppercase tracking-wider">
                          {colStatus}
                        </span>
                        <span className="px-2 py-0.5 rounded-full bg-slate-700 text-slate-300 text-[11px] font-bold">
                          {tasksInCol.length}
                        </span>
                      </div>
                      <div className="space-y-2.5">
                        {tasksInCol.map((task) => (
                          <div key={task.id} className="p-3.5 rounded-xl bg-slate-800 border border-slate-600 space-y-2">
                            <div className="flex items-start justify-between gap-2">
                              <h5 className="font-bold text-xs text-white leading-tight">
                                {task.title}
                              </h5>
                              <button
                                onClick={() => deleteTask(task.id)}
                                className="text-slate-500 hover:text-rose-400"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                            <div className="flex items-center justify-between text-[11px] text-slate-400">
                              <span>PJ: {task.personInCharge}</span>
                              <span className="text-amber-300 font-mono">{task.deadline}</span>
                            </div>
                            <div className="pt-2 flex items-center justify-between text-[10px]">
                              <span className={`px-2 py-0.5 rounded-md font-bold ${
                                task.priority === 'Tinggi' ? 'bg-rose-900 text-rose-300' : 'bg-slate-700 text-slate-300'
                              }`}>
                                {task.priority}
                              </span>
                              <button
                                onClick={() => {
                                  const nextStatus = task.status === 'Belum Dimulai' ? 'Sedang Dikerjakan' : task.status === 'Sedang Dikerjakan' ? 'Selesai' : 'Belum Dimulai';
                                  updateTaskStatus(task.id, nextStatus);
                                }}
                                className="px-2 py-1 rounded bg-slate-700 hover:bg-slate-600 text-blue-300 font-semibold"
                              >
                                Pindah Status →
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* TAB 6: SETTINGS (Sekretariat, Kontak, Kotak, Pengumuman) */}
        {activeAdminTab === 'settings' && (
          <div className="space-y-8 animate-fade-in max-w-4xl">
            {/* Announcement Editor */}
            <div className="p-6 rounded-3xl bg-slate-800 border border-slate-700 space-y-4">
              <h3 className="font-display font-bold text-lg text-white flex items-center gap-2">
                <Bell className="w-5 h-5 text-amber-400" />
                <span>Pengaturan Teks Pengumuman Berjalan (Top Bar)</span>
              </h3>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-300">Isi Pengumuman Saat Ini:</label>
                <textarea
                  rows={2}
                  value={editAnnText}
                  onChange={(e) => setEditAnnText(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-750 border border-slate-600 text-sm text-white"
                ></textarea>
              </div>
              <button
                onClick={handleSaveAnnouncement}
                className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs"
              >
                Perbarui Pengumuman
              </button>
            </div>

            {/* Super Admin: Sekretariat, Kontak, Kotak & Alamat Lengkap */}
            <div className="p-6 sm:p-8 rounded-3xl bg-slate-800 border border-slate-700 space-y-6">
              <div className="flex items-center justify-between border-b border-slate-700 pb-3">
                <h3 className="font-display font-bold text-lg text-white flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-rose-400" />
                  <span>Sekretariat, Kontak, dan Kotak Informasi Organisasi</span>
                </h3>
                {isSuperAdmin && (
                  <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30">
                    Super Admin Master Edit
                  </span>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-300">Nama Organisasi</label>
                  <input
                    type="text"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-750 border border-slate-600 text-sm text-white"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-300">Slogan Utama (Tagline)</label>
                  <input
                    type="text"
                    value={editTagline}
                    onChange={(e) => setEditTagline(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-750 border border-slate-600 text-sm text-white"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-300">Nama Kontak WhatsApp (Ketua)</label>
                  <input
                    type="text"
                    value={editContactPerson}
                    onChange={(e) => setEditContactPerson(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-750 border border-slate-600 text-sm text-white"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-300">Nomor WhatsApp Pengurus</label>
                  <input
                    type="text"
                    value={editWhatsApp}
                    onChange={(e) => setEditWhatsApp(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-750 border border-slate-600 text-sm text-white"
                  />
                </div>

                {/* Email Resmi (tridharmamanunggalrw1@gmail.com) */}
                <div className="space-y-1 sm:col-span-2">
                  <label className="text-xs font-bold text-emerald-400 flex items-center justify-between">
                    <span>Email Resmi Organisasi & Kontak Gmail (Wajib: tridharmamanunggalrw1@gmail.com)</span>
                    <Mail className="w-4 h-4 text-emerald-400" />
                  </label>
                  <input
                    type="email"
                    value={editEmail}
                    onChange={(e) => setEditEmail(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-750 border border-emerald-500 text-sm text-emerald-300 font-mono font-bold"
                  />
                </div>

                <div className="space-y-1 sm:col-span-2">
                  <label className="text-xs font-bold text-slate-300">Alamat Gedung Sekretariat RW 1</label>
                  <textarea
                    rows={2}
                    value={editSecretariat}
                    onChange={(e) => setEditSecretariat(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-750 border border-slate-600 text-sm text-white"
                  ></textarea>
                </div>

                <div className="space-y-1 sm:col-span-2">
                  <label className="text-xs font-bold text-slate-300">URL Embed Google Maps</label>
                  <input
                    type="text"
                    value={editMapsUrl}
                    onChange={(e) => setEditMapsUrl(e.target.value)}
                    placeholder="https://www.google.com/maps/embed?..."
                    className="w-full px-3 py-2 rounded-xl bg-slate-750 border border-slate-600 text-xs text-blue-300 font-mono"
                  />
                </div>
              </div>

              <button
                onClick={handleSaveSettings}
                className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm shadow-md flex items-center gap-2"
              >
                <Save className="w-4 h-4" />
                <span>Simpan Perubahan Sekretariat & Kontak</span>
              </button>
            </div>
          </div>
        )}

        {/* TAB 7: APPEARANCE (Super Admin Only) */}
        {activeAdminTab === 'appearance' && isSuperAdmin && (
          <AppearanceCustomizer />
        )}

        {/* TAB 8: SECURITY SHIELD & PROTECTION */}
        {activeAdminTab === 'security' && (
          <SecurityShieldCenter />
        )}

        {/* TAB 9: GMAIL STORAGE & CLOUD BACKUP */}
        {activeAdminTab === 'gmail' && (
          <GmailStorageManager />
        )}

      </div>
    </div>
  );
};
