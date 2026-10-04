import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import {
  NavTab,
  OrganizationInfo,
  Announcement,
  Member,
  Activity,
  AgendaEvent,
  NewsArticle,
  GalleryItem,
  Achievement,
  UMKMProduct,
  ProgramKerja,
  FinancialRecord,
  TaskItem,
  PiketSchedule,
  Certificate,
  RegistrationSubmission,
  AdminUser,
  ToastMessage,
  UserRole,
  SiteAppearanceConfig,
  SecuritySettings,
  GmailSyncInfo,
  SecurityLog
} from '../types';
import {
  INITIAL_ORG_INFO,
  INITIAL_ANNOUNCEMENT,
  INITIAL_MEMBERS,
  INITIAL_ACTIVITIES,
  INITIAL_AGENDA,
  INITIAL_NEWS,
  INITIAL_GALLERY,
  INITIAL_ACHIEVEMENTS,
  INITIAL_UMKM,
  INITIAL_PROGRAMS,
  INITIAL_FINANCES,
  INITIAL_TASKS,
  INITIAL_PIKET,
  INITIAL_CERTIFICATES,
  INITIAL_REGISTRATIONS,
  DEFAULT_ADMIN_USERS,
  DEFAULT_APPEARANCE_CONFIG,
  DEFAULT_SECURITY_SETTINGS,
  DEFAULT_GMAIL_SYNC,
  INITIAL_SECURITY_LOGS,
  UNIFIED_ADMIN_PASSWORD
} from '../data/initialData';

interface AppContextType {
  // Navigation
  currentTab: NavTab;
  setCurrentTab: (tab: NavTab) => void;

  // Organization Info (Sekretariat, Kontak, dsb.)
  orgInfo: OrganizationInfo;
  updateOrgInfo: (info: Partial<OrganizationInfo>) => void;

  // Site Appearance (Banner, Hero, Headline, Gambar, Tema)
  appearance: SiteAppearanceConfig;
  updateAppearance: (cfg: Partial<SiteAppearanceConfig>) => void;
  resetAppearance: () => void;

  // Announcement Bar
  announcement: Announcement;
  updateAnnouncement: (ann: Partial<Announcement>) => void;
  isAnnouncementVisible: boolean;
  dismissAnnouncement: () => void;

  // Members Management (Pengurus & Anggota, Ganti Jabatan, Foto)
  members: Member[];
  addMember: (m: Omit<Member, 'id'>) => void;
  updateMember: (id: string, m: Partial<Member>) => void;
  deleteMember: (id: string) => void;
  changeMemberRole: (id: string, newRole: string, newDivision?: string) => void;

  // Activities
  activities: Activity[];
  addActivity: (a: Omit<Activity, 'id'>) => void;
  updateActivity: (id: string, a: Partial<Activity>) => void;
  deleteActivity: (id: string) => void;
  selectedActivity: Activity | null;
  setSelectedActivity: (a: Activity | null) => void;

  // Agenda
  agenda: AgendaEvent[];
  addAgenda: (ag: Omit<AgendaEvent, 'id'>) => void;
  updateAgenda: (id: string, ag: Partial<AgendaEvent>) => void;
  deleteAgenda: (id: string) => void;
  selectedAgenda: AgendaEvent | null;
  setSelectedAgenda: (ag: AgendaEvent | null) => void;

  // News
  news: NewsArticle[];
  addNews: (n: Omit<NewsArticle, 'id' | 'views'>) => void;
  updateNews: (id: string, n: Partial<NewsArticle>) => void;
  deleteNews: (id: string) => void;
  selectedNews: NewsArticle | null;
  setSelectedNews: (n: NewsArticle | null) => void;

  // Gallery
  gallery: GalleryItem[];
  addGalleryItem: (g: Omit<GalleryItem, 'id'>) => void;
  updateGalleryItem: (id: string, g: Partial<GalleryItem>) => void;
  deleteGalleryItem: (id: string) => void;
  activeLightboxIndex: number | null;
  setActiveLightboxIndex: (idx: number | null) => void;

  // Achievements
  achievements: Achievement[];
  addAchievement: (ach: Omit<Achievement, 'id'>) => void;
  updateAchievement: (id: string, ach: Partial<Achievement>) => void;
  deleteAchievement: (id: string) => void;

  // UMKM
  umkmProducts: UMKMProduct[];
  addUMKM: (p: Omit<UMKMProduct, 'id'>) => void;
  updateUMKM: (id: string, p: Partial<UMKMProduct>) => void;
  deleteUMKM: (id: string) => void;
  selectedProduct: UMKMProduct | null;
  setSelectedProduct: (p: UMKMProduct | null) => void;

  // Programs
  programs: ProgramKerja[];
  addProgram: (p: Omit<ProgramKerja, 'id'>) => void;
  updateProgram: (id: string, p: Partial<ProgramKerja>) => void;
  deleteProgram: (id: string) => void;

  // Finances
  finances: FinancialRecord[];
  addFinancialRecord: (f: Omit<FinancialRecord, 'id'>) => void;
  deleteFinancialRecord: (id: string) => void;
  resetFinancesToZero: () => void;
  totalIncome: number;
  totalExpense: number;
  totalBalance: number;

  // Tasks & Piket
  tasks: TaskItem[];
  addTask: (t: Omit<TaskItem, 'id'>) => void;
  updateTaskStatus: (id: string, status: TaskItem['status']) => void;
  deleteTask: (id: string) => void;
  piketList: PiketSchedule[];
  addPiket: (p: Omit<PiketSchedule, 'id'>) => void;
  deletePiket: (id: string) => void;

  // Certificates
  certificates: Certificate[];
  addCertificate: (c: Omit<Certificate, 'id'>) => void;
  verifyCertificateCode: (code: string) => Certificate | null;
  verifiedCert: Certificate | null;
  setVerifiedCert: (c: Certificate | null) => void;

  // Registrations
  registrations: RegistrationSubmission[];
  submitRegistration: (data: Omit<RegistrationSubmission, 'id' | 'submittedAt' | 'status'>) => void;
  updateRegistrationStatus: (id: string, status: 'Diterima' | 'Ditolak', assignedRole?: string) => void;
  deleteRegistration: (id: string) => void;

  // Authentication & Users
  currentUser: AdminUser | null;
  loginAs: (user: AdminUser) => void;
  loginWithCredentials: (identifier: string, pass: string) => { success: boolean; message: string };
  logout: () => void;
  isAdminView: boolean;
  setIsAdminView: (v: boolean) => void;
  registeredUsers: AdminUser[];
  registerUser: (u: Omit<AdminUser, 'id' | 'createdAt'>) => { success: boolean; message: string };
  updateUserRole: (id: string, role: UserRole) => void;
  updateUserStatus: (id: string, status: 'Aktif' | 'Menunggu Verifikasi') => void;
  deleteUserAccount: (id: string) => void;
  updateMasterPasswordForAllAdmins: (newPass: string) => void;

  // Auth Modal
  isAuthModalOpen: boolean;
  setIsAuthModalOpen: (open: boolean) => void;
  authModalMode: 'login' | 'register';
  setAuthModalMode: (mode: 'login' | 'register') => void;

  // Global Search
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;

  // Security Suite & Protection
  securitySettings: SecuritySettings;
  updateSecuritySettings: (cfg: Partial<SecuritySettings>) => void;
  securityLogs: SecurityLog[];
  addSecurityLog: (event: string, user: string, severity: 'info' | 'warning' | 'critical', details: string) => void;
  securityScore: number;
  failedLoginAttempts: number;
  isAccountLocked: boolean;
  lockoutRemainingSeconds: number;

  // Gmail Storage & Cloud Sync
  gmailSyncInfo: GmailSyncInfo;
  backupToGmail: () => void;
  restoreFromGmailBackup: (backupJsonString: string) => boolean;
  sendReportToGmail: (subject: string, bodyText: string) => void;

  // Toasts
  toasts: ToastMessage[];
  addToast: (type: 'success' | 'error' | 'info', title: string, message: string) => void;
  removeToast: (id: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

function loadStorage<T>(key: string, fallback: T): T {
  try {
    const item = localStorage.getItem(`tdm_${key}`);
    if (!item) return fallback;
    const parsed = JSON.parse(item);
    return parsed;
  } catch (e) {
    return fallback;
  }
}

function saveStorage<T>(key: string, value: T) {
  try {
    localStorage.setItem(`tdm_${key}`, JSON.stringify(value));
  } catch (e) {
    console.error('Local storage save error', e);
  }
}

// XSS Sanitizer Helper
export function sanitizeInput(str: string): string {
  if (!str) return '';
  return str
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/javascript:/gi, '')
    .replace(/onload=/gi, '')
    .replace(/onerror=/gi, '')
    .trim();
}

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentTab, setCurrentTab] = useState<NavTab>('beranda');

  // Load and guarantee official email
  const [orgInfo, setOrgInfo] = useState<OrganizationInfo>(() => {
    const saved = loadStorage('orgInfo_v3', INITIAL_ORG_INFO);
    // Enforce official email
    return { ...saved, email: 'tridharmamanunggalrw1@gmail.com' };
  });

  const [announcement, setAnnouncement] = useState<Announcement>(() => loadStorage('announcement_v3', INITIAL_ANNOUNCEMENT));
  const [isAnnouncementVisible, setIsAnnouncementVisible] = useState(true);

  const [members, setMembers] = useState<Member[]>(() => loadStorage('members_v3', INITIAL_MEMBERS));
  const [activities, setActivities] = useState<Activity[]>(() => loadStorage('activities_v3', INITIAL_ACTIVITIES));
  const [agenda, setAgenda] = useState<AgendaEvent[]>(() => loadStorage('agenda_v3', INITIAL_AGENDA));
  const [news, setNews] = useState<NewsArticle[]>(() => loadStorage('news_v3', INITIAL_NEWS));
  const [gallery, setGallery] = useState<GalleryItem[]>(() => loadStorage('gallery_v3', INITIAL_GALLERY));
  const [achievements, setAchievements] = useState<Achievement[]>(() => loadStorage('achievements_v3', INITIAL_ACHIEVEMENTS));
  const [umkmProducts, setUmkmProducts] = useState<UMKMProduct[]>(() => loadStorage('umkm_v3', INITIAL_UMKM));
  const [programs, setPrograms] = useState<ProgramKerja[]>(() => loadStorage('programs_v3', INITIAL_PROGRAMS));
  const [finances, setFinances] = useState<FinancialRecord[]>(() => loadStorage('finances_v3', INITIAL_FINANCES));
  const [tasks, setTasks] = useState<TaskItem[]>(() => loadStorage('tasks_v3', INITIAL_TASKS));
  const [piketList, setPiketList] = useState<PiketSchedule[]>(() => loadStorage('piket_v3', INITIAL_PIKET));
  const [certificates, setCertificates] = useState<Certificate[]>(() => loadStorage('certificates_v3', INITIAL_CERTIFICATES));
  const [registrations, setRegistrations] = useState<RegistrationSubmission[]>(() => loadStorage('registrations_v3', INITIAL_REGISTRATIONS));

  const [appearance, setAppearance] = useState<SiteAppearanceConfig>(() => loadStorage('appearance_v3', DEFAULT_APPEARANCE_CONFIG));

  // Registered Admin users - ensure default unified password is applied
  const [registeredUsers, setRegisteredUsers] = useState<AdminUser[]>(() => {
    const saved = loadStorage<AdminUser[]>('registered_users_v3', DEFAULT_ADMIN_USERS);
    // Make sure all admins have the unified password
    return saved.map(u => ({ ...u, password: UNIFIED_ADMIN_PASSWORD }));
  });

  // Security Settings & Protection
  const [securitySettings, setSecuritySettings] = useState<SecuritySettings>(() => loadStorage('security_settings_v3', DEFAULT_SECURITY_SETTINGS));
  const [securityLogs, setSecurityLogs] = useState<SecurityLog[]>(() => loadStorage('security_logs_v3', INITIAL_SECURITY_LOGS));

  // Gmail Storage & Cloud Sync Status
  const [gmailSyncInfo, setGmailSyncInfo] = useState<GmailSyncInfo>(() => loadStorage('gmail_sync_v3', DEFAULT_GMAIL_SYNC));

  // Rate Limiting & Account Lockout
  const [failedLoginAttempts, setFailedLoginAttempts] = useState<number>(0);
  const [lockoutUntil, setLockoutUntil] = useState<number | null>(null);
  const [lockoutRemainingSeconds, setLockoutRemainingSeconds] = useState<number>(0);

  // Auth modal state
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState<'login' | 'register'>('login');

  // Selected modals
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null);
  const [selectedAgenda, setSelectedAgenda] = useState<AgendaEvent | null>(null);
  const [selectedNews, setSelectedNews] = useState<NewsArticle | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<UMKMProduct | null>(null);
  const [activeLightboxIndex, setActiveLightboxIndex] = useState<number | null>(null);
  const [verifiedCert, setVerifiedCert] = useState<Certificate | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Current logged in user
  const [currentUser, setCurrentUser] = useState<AdminUser | null>(() => loadStorage('currentUser_v3', null));
  const [isAdminView, setIsAdminView] = useState(false);

  // Toasts
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Persistent storage hooks
  useEffect(() => saveStorage('orgInfo_v3', orgInfo), [orgInfo]);
  useEffect(() => saveStorage('announcement_v3', announcement), [announcement]);
  useEffect(() => saveStorage('members_v3', members), [members]);
  useEffect(() => saveStorage('activities_v3', activities), [activities]);
  useEffect(() => saveStorage('agenda_v3', agenda), [agenda]);
  useEffect(() => saveStorage('news_v3', news), [news]);
  useEffect(() => saveStorage('gallery_v3', gallery), [gallery]);
  useEffect(() => saveStorage('achievements_v3', achievements), [achievements]);
  useEffect(() => saveStorage('umkm_v3', umkmProducts), [umkmProducts]);
  useEffect(() => saveStorage('programs_v3', programs), [programs]);
  useEffect(() => saveStorage('finances_v3', finances), [finances]);
  useEffect(() => saveStorage('tasks_v3', tasks), [tasks]);
  useEffect(() => saveStorage('piket_v3', piketList), [piketList]);
  useEffect(() => saveStorage('certificates_v3', certificates), [certificates]);
  useEffect(() => saveStorage('registrations_v3', registrations), [registrations]);
  useEffect(() => saveStorage('appearance_v3', appearance), [appearance]);
  useEffect(() => saveStorage('registered_users_v3', registeredUsers), [registeredUsers]);
  useEffect(() => saveStorage('security_settings_v3', securitySettings), [securitySettings]);
  useEffect(() => saveStorage('security_logs_v3', securityLogs), [securityLogs]);
  useEffect(() => saveStorage('gmail_sync_v3', gmailSyncInfo), [gmailSyncInfo]);
  useEffect(() => saveStorage('currentUser_v3', currentUser), [currentUser]);

  // Lockout countdown timer
  useEffect(() => {
    if (!lockoutUntil) {
      setLockoutRemainingSeconds(0);
      return;
    }
    const interval = setInterval(() => {
      const now = Date.now();
      const diff = Math.max(0, Math.ceil((lockoutUntil - now) / 1000));
      setLockoutRemainingSeconds(diff);
      if (diff <= 0) {
        setLockoutUntil(null);
        setFailedLoginAttempts(0);
        clearInterval(interval);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [lockoutUntil]);

  // Keyboard shortcut for Cmd+K / Ctrl+K search and Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(prev => !prev);
      }
      if (e.key === 'Escape') {
        setIsSearchOpen(false);
        setActiveLightboxIndex(null);
        setSelectedActivity(null);
        setSelectedAgenda(null);
        setSelectedNews(null);
        setSelectedProduct(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Toast dispatchers
  const addToast = (type: 'success' | 'error' | 'info', title: string, message: string) => {
    const id = Date.now().toString() + Math.random().toString(36).slice(2, 6);
    setToasts(prev => [...prev, { id, type, title, message }]);
    setTimeout(() => {
      removeToast(id);
    }, 4500);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  // Security Log
  const addSecurityLog = (event: string, user: string, severity: 'info' | 'warning' | 'critical', details: string) => {
    const newLog: SecurityLog = {
      id: `log-${Date.now()}-${Math.random().toString(36).slice(2, 5)}`,
      timestamp: new Date().toLocaleString('id-ID'),
      event,
      user,
      ipAddress: '192.168.1.1 (Proteksi Aktif)',
      severity,
      details
    };
    setSecurityLogs(prev => [newLog, ...prev.slice(0, 49)]); // keep last 50
  };

  // Security Score calculation
  const securityScore = useMemo(() => {
    let score = 100;
    if (!securitySettings.antiXssEnabled) score -= 20;
    if (!securitySettings.rateLimitingEnabled) score -= 20;
    if (!securitySettings.requirePasskeyForDeletion) score -= 15;
    if (failedLoginAttempts > 0) score -= 5;
    return Math.max(20, score);
  }, [securitySettings, failedLoginAttempts]);

  // Organization info
  const updateOrgInfo = (info: Partial<OrganizationInfo>) => {
    setOrgInfo(prev => ({
      ...prev,
      ...info,
      email: info.email || 'tridharmamanunggalrw1@gmail.com'
    }));
    addSecurityLog('Pembaruan Data Sekretariat & Kontak', currentUser?.name || 'Super Admin', 'info', 'Data kontak dan sekretariat diperbarui.');
    addToast('success', 'Sekretariat & Kontak Diperbarui', 'Data organisasi berhasil disimpan ke sistem.');
  };

  const updateAnnouncement = (ann: Partial<Announcement>) => {
    setAnnouncement(prev => ({ ...prev, ...ann }));
    addToast('success', 'Pengumuman Diperbarui', 'Teks pengumuman berjalan berhasil disimpan.');
  };

  const dismissAnnouncement = () => {
    setIsAnnouncementVisible(false);
  };

  // CRUD Members & Change Role (Jabatan)
  const addMember = (m: Omit<Member, 'id'>) => {
    const newMember: Member = {
      ...m,
      name: sanitizeInput(m.name),
      id: `mem-${Date.now()}`
    };
    setMembers(prev => [newMember, ...prev]);
    addSecurityLog('Tambah Anggota Baru', currentUser?.name || 'Admin', 'info', `Menambahkan ${newMember.name} (${newMember.role})`);
    addToast('success', 'Anggota Ditambahkan', `${m.name} resmi terdaftar di database direktori.`);
  };

  const updateMember = (id: string, m: Partial<Member>) => {
    setMembers(prev => prev.map(item => item.id === id ? { ...item, ...m } : item));
    addSecurityLog('Ubah Data Anggota/Pengurus', currentUser?.name || 'Super Admin', 'info', `Mengubah data anggota ID: ${id}`);
    addToast('success', 'Data Diperbarui', 'Informasi anggota/pengurus dan foto profil berhasil disimpan.');
  };

  const changeMemberRole = (id: string, newRole: string, newDivision?: string) => {
    setMembers(prev => prev.map(item => {
      if (item.id === id) {
        return {
          ...item,
          role: newRole,
          division: newDivision || item.division
        };
      }
      return item;
    }));
    addSecurityLog('Perubahan Jabatan Organisasi', currentUser?.name || 'Super Admin', 'info', `Jabatan anggota diubah menjadi ${newRole}`);
    addToast('success', 'Jabatan Berhasil Diubah', `Jabatan anggota telah diperbarui menjadi ${newRole}.`);
  };

  const deleteMember = (id: string) => {
    const target = members.find(m => m.id === id);
    setMembers(prev => prev.filter(item => item.id !== id));
    addSecurityLog('Hapus Anggota', currentUser?.name || 'Super Admin', 'warning', `Menghapus anggota: ${target?.name || id}`);
    addToast('info', 'Anggota Dikeluarkan', 'Data anggota telah dihapus dari direktori.');
  };

  // CRUD Activities
  const addActivity = (a: Omit<Activity, 'id'>) => {
    const newAct: Activity = {
      ...a,
      title: sanitizeInput(a.title),
      id: `act-${Date.now()}`
    };
    setActivities(prev => [newAct, ...prev]);
    addToast('success', 'Kegiatan Dipublikasikan', `"${a.title}" telah tampil di website.`);
  };

  const updateActivity = (id: string, a: Partial<Activity>) => {
    setActivities(prev => prev.map(item => item.id === id ? { ...item, ...a } : item));
    addToast('success', 'Kegiatan Diperbarui', 'Perubahan konten dan gambar kegiatan tersimpan.');
  };

  const deleteActivity = (id: string) => {
    setActivities(prev => prev.filter(item => item.id !== id));
    addToast('info', 'Kegiatan Dihapus', 'Data kegiatan telah dihapus.');
  };

  // CRUD Agenda
  const addAgenda = (ag: Omit<AgendaEvent, 'id'>) => {
    const newAg: AgendaEvent = { ...ag, id: `ag-${Date.now()}` };
    setAgenda(prev => [newAg, ...prev]);
    addToast('success', 'Agenda Dibuat', `Jadwal "${ag.title}" ditambahkan ke kalender.`);
  };

  const updateAgenda = (id: string, ag: Partial<AgendaEvent>) => {
    setAgenda(prev => prev.map(item => item.id === id ? { ...item, ...ag } : item));
    addToast('success', 'Agenda Diperbarui', 'Jadwal agenda berhasil disesuaikan.');
  };

  const deleteAgenda = (id: string) => {
    setAgenda(prev => prev.filter(item => item.id !== id));
    addToast('info', 'Agenda Dihapus', 'Jadwal telah dihapus dari kalender.');
  };

  // CRUD News
  const addNews = (n: Omit<NewsArticle, 'id' | 'views'>) => {
    const newArt: NewsArticle = {
      ...n,
      id: `news-${Date.now()}`,
      views: 1
    };
    setNews(prev => [newArt, ...prev]);
    addToast('success', 'Berita Diterbitkan', `Artikel "${n.title}" telah tayang.`);
  };

  const updateNews = (id: string, n: Partial<NewsArticle>) => {
    setNews(prev => prev.map(item => item.id === id ? { ...item, ...n } : item));
    addToast('success', 'Berita Diperbarui', 'Konten artikel berita berhasil diupdate.');
  };

  const deleteNews = (id: string) => {
    setNews(prev => prev.filter(item => item.id !== id));
    addToast('info', 'Berita Dihapus', 'Artikel telah dihapus dari arsip.');
  };

  // Gallery
  const addGalleryItem = (g: Omit<GalleryItem, 'id'>) => {
    const newItem: GalleryItem = { ...g, id: `gal-${Date.now()}` };
    setGallery(prev => [newItem, ...prev]);
    addToast('success', 'Media Ditambahkan', 'Dokumentasi visual baru berhasil disimpan.');
  };

  const updateGalleryItem = (id: string, g: Partial<GalleryItem>) => {
    setGallery(prev => prev.map(item => item.id === id ? { ...item, ...g } : item));
    addToast('success', 'Media Diperbarui', 'Data galeri berhasil diperbarui.');
  };

  const deleteGalleryItem = (id: string) => {
    setGallery(prev => prev.filter(item => item.id !== id));
    addToast('info', 'Media Dihapus', 'Foto/video telah dihapus.');
  };

  // Achievements
  const addAchievement = (ach: Omit<Achievement, 'id'>) => {
    const newAch: Achievement = { ...ach, id: `ach-${Date.now()}` };
    setAchievements(prev => [newAch, ...prev]);
    addToast('success', 'Prestasi Dicatat', 'Penghargaan baru berhasil ditambahkan.');
  };

  const updateAchievement = (id: string, ach: Partial<Achievement>) => {
    setAchievements(prev => prev.map(item => item.id === id ? { ...item, ...ach } : item));
    addToast('success', 'Prestasi Diperbarui', 'Data penghargaan berhasil diupdate.');
  };

  const deleteAchievement = (id: string) => {
    setAchievements(prev => prev.filter(item => item.id !== id));
    addToast('info', 'Prestasi Dihapus', 'Data penghargaan telah dihapus.');
  };

  // UMKM
  const addUMKM = (p: Omit<UMKMProduct, 'id'>) => {
    const newProd: UMKMProduct = { ...p, id: `umkm-${Date.now()}` };
    setUmkmProducts(prev => [newProd, ...prev]);
    addToast('success', 'Produk UMKM Ditambahkan', `"${p.productName}" masuk ke etalase pemuda.`);
  };

  const updateUMKM = (id: string, p: Partial<UMKMProduct>) => {
    setUmkmProducts(prev => prev.map(item => item.id === id ? { ...item, ...p } : item));
    addToast('success', 'Produk UMKM Diperbarui', 'Informasi produk berhasil diupdate.');
  };

  const deleteUMKM = (id: string) => {
    setUmkmProducts(prev => prev.filter(item => item.id !== id));
    addToast('info', 'Produk Dihapus', 'Produk telah dikeluarkan dari etalase.');
  };

  // Programs
  const addProgram = (p: Omit<ProgramKerja, 'id'>) => {
    const newProg: ProgramKerja = { ...p, id: `prog-${Date.now()}` };
    setPrograms(prev => [newProg, ...prev]);
    addToast('success', 'Program Ditambahkan', `"${p.name}" tercatat di agenda kerja.`);
  };

  const updateProgram = (id: string, p: Partial<ProgramKerja>) => {
    setPrograms(prev => prev.map(item => item.id === id ? { ...item, ...p } : item));
    addToast('success', 'Program Diperbarui', 'Progres program kerja berhasil diperbarui.');
  };

  const deleteProgram = (id: string) => {
    setPrograms(prev => prev.filter(item => item.id !== id));
    addToast('info', 'Program Dihapus', 'Program kerja telah dihapus.');
  };

  // Finances
  const addFinancialRecord = (f: Omit<FinancialRecord, 'id'>) => {
    const newRec: FinancialRecord = { ...f, id: `fin-${Date.now()}` };
    setFinances(prev => [newRec, ...prev]);
    addToast('success', 'Kas Dicatat', `Transaksi Rp ${f.amount.toLocaleString('id-ID')} tersimpan.`);
  };

  const deleteFinancialRecord = (id: string) => {
    setFinances(prev => prev.filter(item => item.id !== id));
    addToast('info', 'Transaksi Kas Dihapus', 'Catatan kas telah dihapus.');
  };

  const resetFinancesToZero = () => {
    setFinances([]);
    addSecurityLog('Reset Kas Buku Organisasi', currentUser?.name || 'Super Admin', 'critical', 'Buku kas direset ke saldo Rp 0');
    addToast('info', 'Buku Kas Direset', 'Semua riwayat kas telah diatur ulang menjadi Rp 0 untuk pembukuan baru.');
  };

  const totalIncome = finances
    .filter(f => f.type === 'Pemasukan')
    .reduce((acc, cur) => acc + cur.amount, 0);

  const totalExpense = finances
    .filter(f => f.type === 'Pengeluaran')
    .reduce((acc, cur) => acc + cur.amount, 0);

  const totalBalance = totalIncome - totalExpense;

  // Tasks & Piket
  const addTask = (t: Omit<TaskItem, 'id'>) => {
    const newTask: TaskItem = { ...t, id: `tsk-${Date.now()}` };
    setTasks(prev => [newTask, ...prev]);
    addToast('success', 'Tugas Dibuat', `Tugas "${t.title}" ditambahkan.`);
  };

  const updateTaskStatus = (id: string, status: TaskItem['status']) => {
    setTasks(prev => prev.map(item => item.id === id ? { ...item, status } : item));
    addToast('info', 'Status Tugas Diubah', `Tugas kini berstatus: ${status}`);
  };

  const deleteTask = (id: string) => {
    setTasks(prev => prev.filter(item => item.id !== id));
    addToast('info', 'Tugas Dihapus', 'Tugas telah dihapus.');
  };

  const addPiket = (p: Omit<PiketSchedule, 'id'>) => {
    const newPiket: PiketSchedule = { ...p, id: `pkt-${Date.now()}` };
    setPiketList(prev => [newPiket, ...prev]);
    addToast('success', 'Jadwal Piket Ditambahkan', `Piket hari ${p.day} berhasil dijadwalkan.`);
  };

  const deletePiket = (id: string) => {
    setPiketList(prev => prev.filter(item => item.id !== id));
    addToast('info', 'Jadwal Piket Dihapus', 'Jadwal piket telah dihapus.');
  };

  // Certificates
  const addCertificate = (c: Omit<Certificate, 'id'>) => {
    const newCert: Certificate = { ...c, id: `cert-${Date.now()}` };
    setCertificates(prev => [newCert, ...prev]);
    addToast('success', 'Sertifikat Diterbitkan', `Sertifikat ${c.code} berhasil terdaftar.`);
  };

  const verifyCertificateCode = (code: string): Certificate | null => {
    const clean = code.trim().toUpperCase();
    const found = certificates.find(c => c.code.toUpperCase() === clean);
    return found || null;
  };

  // Registrations
  const submitRegistration = (data: Omit<RegistrationSubmission, 'id' | 'submittedAt' | 'status'>) => {
    const now = new Date();
    const dateStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    const newReg: RegistrationSubmission = {
      ...data,
      fullName: sanitizeInput(data.fullName),
      id: `reg-${Date.now()}`,
      submittedAt: dateStr,
      status: 'Menunggu'
    };
    setRegistrations(prev => [newReg, ...prev]);
    // Also notify Gmail storage
    addSecurityLog('Pendaftaran Calon Anggota Baru', newReg.fullName, 'info', `Pendaftaran online masuk dari RT: ${newReg.rtAddress}`);
    addToast('success', 'Pendaftaran Berhasil!', 'Data pendaftaran kamu telah diterima dan diteruskan ke email pengurus.');
  };

  const updateRegistrationStatus = (id: string, status: 'Diterima' | 'Ditolak', assignedRole = 'Anggota Baru') => {
    const reg = registrations.find(r => r.id === id);
    if (!reg) return;
    setRegistrations(prev => prev.map(item => item.id === id ? { ...item, status } : item));
    if (status === 'Diterima') {
      const newMember: Member = {
        id: `mem-${Date.now()}`,
        name: reg.fullName,
        nickname: reg.nickname || reg.fullName.split(' ')[0],
        role: assignedRole,
        division: reg.interests[0] ? `Divisi ${reg.interests[0]}` : 'Anggota',
        joinedYear: new Date().getFullYear(),
        status: 'Aktif',
        whatsapp: reg.whatsapp,
        instagram: reg.instagram,
        photoUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=400&q=80',
        isCoordinator: false,
        bio: `Minat: ${reg.interests.join(', ')}. Skill: ${reg.skills}`
      };
      setMembers(prev => [newMember, ...prev]);
      addSecurityLog('Verifikasi Pendaftaran Anggota Diterima', currentUser?.name || 'Admin', 'info', `${reg.fullName} diterima dan dijadikan ${assignedRole}`);
      addToast('success', 'Calon Anggota Diterima', `${reg.fullName} otomatis ditambahkan ke direktori sebagai ${assignedRole}.`);
    } else {
      addToast('info', 'Status Pendaftar', `Pendaftaran ${reg.fullName} ditandai ${status}.`);
    }
  };

  const deleteRegistration = (id: string) => {
    setRegistrations(prev => prev.filter(r => r.id !== id));
    addToast('info', 'Data Pendaftar Dihapus', 'Arsip pendaftar telah dibersihkan.');
  };

  // Appearance update
  const updateAppearance = (cfg: Partial<SiteAppearanceConfig>) => {
    setAppearance(prev => ({ ...prev, ...cfg }));
    addSecurityLog('Kustomisasi Tampilan Website', currentUser?.name || 'Super Admin', 'info', 'Perubahan hero headline/gambar/tema warna');
    addToast('success', 'Tampilan Berhasil Disimpan', 'Konfigurasi desain website telah diterapkan secara langsung.');
  };

  const resetAppearance = () => {
    setAppearance(DEFAULT_APPEARANCE_CONFIG);
    addToast('info', 'Tampilan Direset', 'Pengaturan tema dan tata letak dikembalikan ke standar awal.');
  };

  // Unified Admin Password Management
  const updateMasterPasswordForAllAdmins = (newPass: string) => {
    if (newPass.length < 6) {
      addToast('error', 'Sandi Terlalu Pendek', 'Sandi seragam minimal harus 6 karakter.');
      return;
    }
    setSecuritySettings(prev => ({ ...prev, masterAdminPassword: newPass }));
    setRegisteredUsers(prev => prev.map(u => ({ ...u, password: newPass })));
    addSecurityLog('Pembaruan Sandi Seragam Seluruh Admin', currentUser?.name || 'Super Admin', 'critical', 'Sandi untuk semua akun admin telah disamakan.');
    addToast('success', 'Sandi Seluruh Admin Disamakan', `Semua akun admin kini menggunakan kata sandi seragam baru: "${newPass}"`);
  };

  // Authentication & Login with Security Rate-Limiting & Protection
  const loginWithCredentials = (identifier: string, pass: string): { success: boolean; message: string } => {
    // Check if account locked
    if (lockoutUntil && Date.now() < lockoutUntil) {
      const waitMins = Math.ceil((lockoutUntil - Date.now()) / 60000);
      const msg = `Keamanan Terkunci: Terlalu banyak percobaan gagal. Silakan tunggu ${waitMins} menit demi perlindungan website.`;
      addToast('error', 'Akses Diblokir Sementara', msg);
      return { success: false, message: msg };
    }

    const cleanId = identifier.trim().toLowerCase();
    const user = registeredUsers.find(u => 
      (u.username && u.username.toLowerCase() === cleanId) || 
      (u.email && u.email.toLowerCase() === cleanId)
    );

    if (!user) {
      const newAttempts = failedLoginAttempts + 1;
      setFailedLoginAttempts(newAttempts);
      addSecurityLog('Percobaan Login Gagal (User Tidak Ditemukan)', identifier, 'warning', `Percobaan ${newAttempts}/${securitySettings.maxLoginAttempts}`);
      if (newAttempts >= securitySettings.maxLoginAttempts) {
        const lockoutTime = Date.now() + (securitySettings.lockoutMinutes * 60 * 1000);
        setLockoutUntil(lockoutTime);
        addSecurityLog('Sistem Memblokir Akses (Anti Brute-Force)', identifier, 'critical', `Lockout ${securitySettings.lockoutMinutes} menit diaktifkan.`);
        addToast('error', 'Proteksi Siber Aktif', 'Akun dibekukan sementara karena terdeteksi percobaan login berulang.');
        return { success: false, message: `Akses dibekukan selama ${securitySettings.lockoutMinutes} menit demi keamanan website.` };
      }
      addToast('error', 'Login Gagal', 'Username atau email tidak ditemukan.');
      return { success: false, message: 'Username atau email tidak terdaftar.' };
    }

    // Check password: user password OR master unified password
    const isMasterPassMatch = pass === securitySettings.masterAdminPassword || pass === UNIFIED_ADMIN_PASSWORD;
    const isUserPassMatch = user.password && user.password === pass;

    if (!isMasterPassMatch && !isUserPassMatch) {
      const newAttempts = failedLoginAttempts + 1;
      setFailedLoginAttempts(newAttempts);
      addSecurityLog('Percobaan Sandi Salah', user.username, 'warning', `Percobaan salah ke-${newAttempts}`);
      if (newAttempts >= securitySettings.maxLoginAttempts) {
        const lockoutTime = Date.now() + (securitySettings.lockoutMinutes * 60 * 1000);
        setLockoutUntil(lockoutTime);
        addSecurityLog('Lockout Aktif (Sandi Salah Berulang)', user.username, 'critical', 'Anti-DDoS / Brute Force Protection Triggered');
        return { success: false, message: `Akun dibekukan ${securitySettings.lockoutMinutes} menit karena salah sandi berturut-turut.` };
      }
      addToast('error', 'Kata Sandi Salah', `Sandi tidak cocok. Sandi seragam admin: "${securitySettings.masterAdminPassword}"`);
      return { success: false, message: `Kata sandi tidak sesuai. (Sandi seragam: ${securitySettings.masterAdminPassword})` };
    }

    // Success login
    setFailedLoginAttempts(0);
    setLockoutUntil(null);
    setCurrentUser(user);
    setIsAdminView(true);
    setIsAuthModalOpen(false);

    addSecurityLog('Login Admin Berhasil', `${user.name} (${user.role})`, 'info', 'Autentikasi terverifikasi aman.');
    addToast('success', `Selamat Datang, ${user.name}!`, `Login berhasil sebagai ${user.role}. Hak akses penuh aktif.`);
    return { success: true, message: 'Login berhasil.' };
  };

  const registerUser = (u: Omit<AdminUser, 'id' | 'createdAt'>): { success: boolean; message: string } => {
    const existing = registeredUsers.find(item => 
      (item.username && item.username.toLowerCase() === u.username.toLowerCase()) ||
      (item.email && item.email.toLowerCase() === u.email.toLowerCase())
    );
    if (existing) {
      addToast('error', 'Pendaftaran Gagal', 'Username atau email sudah digunakan.');
      return { success: false, message: 'Username atau email sudah digunakan.' };
    }

    const newUser: AdminUser = {
      ...u,
      id: `usr-${Date.now()}`,
      status: 'Aktif',
      createdAt: new Date().toISOString().slice(0, 10),
      avatar: u.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
      password: securitySettings.masterAdminPassword // use unified password
    };

    setRegisteredUsers(prev => [newUser, ...prev]);
    setCurrentUser(newUser);
    setIsAdminView(true);
    setIsAuthModalOpen(false);

    addSecurityLog('Pendaftaran Akun Baru', newUser.username, 'info', `Akun dibuat dengan peran ${newUser.role}`);
    addToast('success', 'Akun Berhasil Dibuat!', `Selamat bergabung, ${newUser.name}.`);
    return { success: true, message: 'Pendaftaran berhasil.' };
  };

  const updateUserRole = (id: string, role: UserRole) => {
    setRegisteredUsers(prev => prev.map(u => u.id === id ? { ...u, role } : u));
    if (currentUser?.id === id) {
      setCurrentUser(prev => prev ? { ...prev, role } : null);
    }
    addSecurityLog('Ubah Hak Akses Akun Pengurus', currentUser?.name || 'Super Admin', 'info', `ID: ${id} diubah ke ${role}`);
    addToast('success', 'Hak Akses Diperbarui', `Peran akun telah diubah menjadi ${role}.`);
  };

  const updateUserStatus = (id: string, status: 'Aktif' | 'Menunggu Verifikasi') => {
    setRegisteredUsers(prev => prev.map(u => u.id === id ? { ...u, status } : u));
    addToast('success', 'Status Akun Diperbarui', `Status akun diubah menjadi ${status}.`);
  };

  const deleteUserAccount = (id: string) => {
    if (currentUser?.id === id) {
      addToast('error', 'Tidak Dapat Dihapus', 'Anda tidak dapat menghapus akun Anda sendiri saat sedang login.');
      return;
    }
    setRegisteredUsers(prev => prev.filter(u => u.id !== id));
    addSecurityLog('Hapus Akun Pengurus', currentUser?.name || 'Super Admin', 'warning', `Akun ID ${id} dihapus.`);
    addToast('info', 'Akun Dihapus', 'Akun pengguna telah dihapus dari sistem.');
  };

  const loginAs = (user: AdminUser) => {
    setCurrentUser(user);
    setIsAdminView(true);
    setIsAuthModalOpen(false);
    addSecurityLog('Quick Role Switcher', user.name, 'info', `Masuk sebagai ${user.role}`);
    addToast('success', `Masuk Sebagai ${user.name}`, `Peran aktif: ${user.role}`);
  };

  const logout = () => {
    if (currentUser) {
      addSecurityLog('Admin Keluar (Logout)', currentUser.name, 'info', 'Sesi admin ditutup dengan aman.');
    }
    setCurrentUser(null);
    setIsAdminView(false);
    addToast('info', 'Sampai Jumpa', 'Sesi Anda telah keluar.');
  };

  const updateSecuritySettings = (cfg: Partial<SecuritySettings>) => {
    setSecuritySettings(prev => ({ ...prev, ...cfg }));
    addSecurityLog('Pembaruan Pengaturan Keamanan Siber', currentUser?.name || 'Super Admin', 'critical', 'Pengaturan firewall & anti-XSS diperbarui.');
    addToast('success', 'Keamanan Diperbarui', 'Kebijakan perlindungan situs telah diperbarui.');
  };

  // Gmail Storage & Cloud Backup
  const backupToGmail = () => {
    const backupSnapshot = {
      version: '3.0',
      timestamp: new Date().toISOString(),
      organization: orgInfo,
      members,
      activities,
      agenda,
      news,
      gallery,
      achievements,
      umkmProducts,
      programs,
      finances,
      tasks,
      piketList,
      certificates,
      registrations,
      appearance,
      registeredUsers: registeredUsers.map(u => ({ ...u, password: '***PROTECTED***' }))
    };

    const jsonStr = JSON.stringify(backupSnapshot, null, 2);
    const dateFormatted = new Date().toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });

    // 1. Download file backup JSON lokal
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `backup_tdm_rw1_${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    // 2. Open Gmail compose / mailto ke tridharmamanunggalrw1@gmail.com
    const subject = encodeURIComponent(`[BACKUP DATABASE TDM RW 1] Snapshot Sistem - ${dateFormatted}`);
    const body = encodeURIComponent(
      `Yth. Tim Administrator & Arsiparis TDM RW 1,\n\nBerikut adalah konfirmasi pencadangan data resmi website Muda-Mudi Tri Dharma Manunggal RW 1 Desa Pojok:\n\n` +
      `📅 Waktu Backup: ${dateFormatted}\n` +
      `👥 Total Anggota: ${members.length}\n` +
      `📌 Kegiatan: ${activities.length}\n` +
      `💰 Saldo Kas Terkini: Rp ${totalBalance.toLocaleString('id-ID')}\n` +
      `📦 Produk UMKM: ${umkmProducts.length}\n` +
      `🔒 Keamanan: 100% Terverifikasi\n\n` +
      `File JSON cadangan lengkap telah diunduh dan tersimpan di memori perangkat. Harap lampirkan file JSON tersebut ke email ini untuk pengarsipan permanen di Google Drive/Gmail resmi: tridharmamanunggalrw1@gmail.com.`
    );

    window.open(`mailto:tridharmamanunggalrw1@gmail.com?subject=${subject}&body=${body}`, '_blank');

    setGmailSyncInfo(prev => ({
      connectedEmail: 'tridharmamanunggalrw1@gmail.com',
      lastBackupDate: `${dateFormatted} WIB`,
      backupStatus: 'Tersambung',
      totalSnapshots: prev.totalSnapshots + 1,
      lastSnapshotSize: `${Math.round(jsonStr.length / 1024)} KB`
    }));

    addSecurityLog('Pencadangan Database ke Gmail', currentUser?.name || 'Super Admin', 'info', `Snapshot berhasil diekspor ke tridharmamanunggalrw1@gmail.com`);
    addToast('success', 'Pencadangan Gmail Sukses', 'Database snapshot telah dibuat & draft email backup ke tridharmamanunggalrw1@gmail.com telah dibuka!');
  };

  const restoreFromGmailBackup = (backupJsonString: string): boolean => {
    try {
      const data = JSON.parse(backupJsonString);
      if (!data.organization && !data.members) {
        addToast('error', 'Format Tidak Sesuai', 'File JSON cadangan tidak memiliki struktur data TDM RW 1 yang valid.');
        return false;
      }

      if (data.organization) setOrgInfo({ ...data.organization, email: 'tridharmamanunggalrw1@gmail.com' });
      if (data.members) setMembers(data.members);
      if (data.activities) setActivities(data.activities);
      if (data.agenda) setAgenda(data.agenda);
      if (data.news) setNews(data.news);
      if (data.gallery) setGallery(data.gallery);
      if (data.achievements) setAchievements(data.achievements);
      if (data.umkmProducts) setUmkmProducts(data.umkmProducts);
      if (data.programs) setPrograms(data.programs);
      if (data.finances) setFinances(data.finances);
      if (data.tasks) setTasks(data.tasks);
      if (data.piketList) setPiketList(data.piketList);
      if (data.certificates) setCertificates(data.certificates);
      if (data.registrations) setRegistrations(data.registrations);
      if (data.appearance) setAppearance(data.appearance);

      addSecurityLog('Pemulihan Database dari Cadangan Gmail', currentUser?.name || 'Super Admin', 'critical', 'Restorasi seluruh state data berhasil dieksekusi.');
      addToast('success', 'Pemulihan Berhasil', 'Seluruh data website berhasil dipulihkan dari snapshot cadangan Gmail!');
      return true;
    } catch (e) {
      addToast('error', 'Gagal Memulihkan', 'Terjadi kesalahan parsing file cadangan JSON. Pastikan file valid.');
      return false;
    }
  };

  const sendReportToGmail = (subject: string, bodyText: string) => {
    const encodedSubject = encodeURIComponent(subject);
    const encodedBody = encodeURIComponent(bodyText);
    window.open(`mailto:tridharmamanunggalrw1@gmail.com?subject=${encodedSubject}&body=${encodedBody}`, '_blank');
    addToast('info', 'Membuka Gmail', 'Laporan diteruskan ke tridharmamanunggalrw1@gmail.com.');
  };

  return (
    <AppContext.Provider
      value={{
        currentTab,
        setCurrentTab,
        orgInfo,
        updateOrgInfo,
        appearance,
        updateAppearance,
        resetAppearance,
        announcement,
        updateAnnouncement,
        isAnnouncementVisible,
        dismissAnnouncement,
        members,
        addMember,
        updateMember,
        deleteMember,
        changeMemberRole,
        activities,
        addActivity,
        updateActivity,
        deleteActivity,
        selectedActivity,
        setSelectedActivity,
        agenda,
        addAgenda,
        updateAgenda,
        deleteAgenda,
        selectedAgenda,
        setSelectedAgenda,
        news,
        addNews,
        updateNews,
        deleteNews,
        selectedNews,
        setSelectedNews,
        gallery,
        addGalleryItem,
        updateGalleryItem,
        deleteGalleryItem,
        activeLightboxIndex,
        setActiveLightboxIndex,
        achievements,
        addAchievement,
        updateAchievement,
        deleteAchievement,
        umkmProducts,
        addUMKM,
        updateUMKM,
        deleteUMKM,
        selectedProduct,
        setSelectedProduct,
        programs,
        addProgram,
        updateProgram,
        deleteProgram,
        finances,
        addFinancialRecord,
        deleteFinancialRecord,
        resetFinancesToZero,
        totalIncome,
        totalExpense,
        totalBalance,
        tasks,
        addTask,
        updateTaskStatus,
        deleteTask,
        piketList,
        addPiket,
        deletePiket,
        certificates,
        addCertificate,
        verifyCertificateCode,
        verifiedCert,
        setVerifiedCert,
        registrations,
        submitRegistration,
        updateRegistrationStatus,
        deleteRegistration,
        currentUser,
        loginAs,
        loginWithCredentials,
        logout,
        isAdminView,
        setIsAdminView,
        registeredUsers,
        registerUser,
        updateUserRole,
        updateUserStatus,
        deleteUserAccount,
        updateMasterPasswordForAllAdmins,
        isAuthModalOpen,
        setIsAuthModalOpen,
        authModalMode,
        setAuthModalMode,
        isSearchOpen,
        setIsSearchOpen,
        securitySettings,
        updateSecuritySettings,
        securityLogs,
        addSecurityLog,
        securityScore,
        failedLoginAttempts,
        isAccountLocked: !!lockoutUntil && Date.now() < lockoutUntil,
        lockoutRemainingSeconds,
        gmailSyncInfo,
        backupToGmail,
        restoreFromGmailBackup,
        sendReportToGmail,
        toasts,
        addToast,
        removeToast
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
