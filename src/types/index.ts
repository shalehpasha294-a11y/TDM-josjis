export type NavTab = 
  | 'beranda'
  | 'tentang'
  | 'struktur'
  | 'program'
  | 'kegiatan'
  | 'agenda'
  | 'berita'
  | 'galeri'
  | 'prestasi'
  | 'umkm'
  | 'anggota'
  | 'transparansi'
  | 'gabung'
  | 'sertifikat'
  | 'kontak'
  | 'admin';

export type UserRole = 'Super Admin' | 'Admin' | 'Bendahara' | 'Sekretaris' | 'PDD' | 'Viewer';

export interface AdminUser {
  id: string;
  name: string;
  role: UserRole;
  email: string;
  avatar: string;
  username: string;
  password?: string;
  phone?: string;
  rtAddress?: string;
  status: 'Aktif' | 'Menunggu Verifikasi';
  createdAt?: string;
}

export interface SiteAppearanceConfig {
  primaryTheme: 'blue' | 'emerald' | 'indigo' | 'rose' | 'amber';
  heroHeadline: string;
  heroSubheadline: string;
  mottoQuote: string;
  heroBadge: string;
  heroBackgroundImage: string;
  showMarquee: boolean;
  showTriDharmaPillars: boolean;
  showActivitiesPreview: boolean;
  showAgendaPreview: boolean;
  showTransparencyPreview: boolean;
  showUMKMPreview: boolean;
  showAchievementsPreview: boolean;
  footerTagline: string;
}

export interface Announcement {
  id: string;
  text: string;
  date: string;
  isActive: boolean;
  linkText?: string;
  targetTab?: NavTab;
}

export interface Member {
  id: string;
  name: string;
  nickname: string;
  role: string;
  division: string;
  joinedYear: number;
  status: 'Aktif' | 'Pasif' | 'Alumni';
  whatsapp?: string;
  instagram?: string;
  photoUrl: string;
  isCoordinator?: boolean;
  bio?: string;
}

export interface Activity {
  id: string;
  title: string;
  category: 'Sosial' | 'Olahraga' | 'Pendidikan' | 'Keagamaan' | 'Budaya' | 'Lingkungan' | 'Kewirausahaan' | 'Event';
  date: string;
  year: number;
  location: string;
  description: string;
  fullContent?: string;
  imageUrl: string;
  status: 'Terlaksana' | 'Akan Datang';
  participantCount?: number;
}

export interface AgendaEvent {
  id: string;
  title: string;
  date: string; // YYYY-MM-DD
  time: string;
  location: string;
  personInCharge: string;
  category: 'Rapat' | 'Kegiatan' | 'Deadline' | 'Event Warga';
  notes: string;
  status: 'Akan Datang' | 'Sedang Berlangsung' | 'Selesai';
}

export interface NewsArticle {
  id: string;
  title: string;
  date: string;
  author: string;
  category: string;
  summary: string;
  content: string;
  thumbnailUrl: string;
  views: number;
  readTime: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'Sosial' | 'Olahraga' | 'Event' | 'Rapat' | 'Budaya' | 'Dokumentasi';
  type: 'image' | 'video';
  mediaUrl: string;
  thumbnailUrl: string;
  caption: string;
  date: string;
  youtubeId?: string;
}

export interface Achievement {
  id: string;
  title: string;
  year: number;
  competition: string;
  category: string;
  rank: string;
  description: string;
  imageUrl: string;
}

export interface UMKMProduct {
  id: string;
  businessName: string;
  ownerName: string;
  productName: string;
  price: number;
  priceFormatted: string;
  category: string;
  description: string;
  imageUrl: string;
  whatsappNumber: string;
  instagram?: string;
  rating?: number;
}

export interface ProgramKerja {
  id: string;
  name: string;
  category: 'Sosial' | 'Olahraga' | 'Pendidikan' | 'Seni & Budaya' | 'Keagamaan' | 'Lingkungan' | 'Kewirausahaan';
  description: string;
  purpose: string;
  personInCharge: string;
  schedule: string;
  status: 'Rencana' | 'Sedang Berjalan' | 'Selesai';
  progressPercentage: number;
  documentationUrl?: string;
}

export interface FinancialRecord {
  id: string;
  type: 'Pemasukan' | 'Pengeluaran';
  category: 'Iuran Anggota' | 'Donasi Warga' | 'Sponsorship' | 'Dana Usaha' | 'Konsumsi' | 'Perlengkapan' | 'Sosial & Santunan' | 'Operasional';
  amount: number;
  date: string;
  description: string;
  receiptNote?: string;
}

export interface TaskItem {
  id: string;
  title: string;
  personInCharge: string;
  deadline: string;
  priority: 'Tinggi' | 'Sedang' | 'Rendah';
  status: 'Belum Dimulai' | 'Sedang Dikerjakan' | 'Selesai';
  category: string;
}

export interface PiketSchedule {
  id: string;
  day: string;
  dateStr: string;
  timeRange: string;
  members: string[];
  tasks: string;
  status: 'Akan Datang' | 'Selesai' | 'Dibatalkan';
}

export interface Certificate {
  id: string;
  code: string;
  recipientName: string;
  eventName: string;
  role: string;
  issueDate: string;
  signatory: string;
  signatoryRole: string;
  verificationStatus: 'Terverifikasi' | 'Tidak Ditemukan';
}

export interface RegistrationSubmission {
  id: string;
  fullName: string;
  nickname: string;
  birthDate: string;
  gender: 'Laki-laki' | 'Perempuan';
  whatsapp: string;
  instagram: string;
  rtAddress: string;
  interests: string[];
  skills: string;
  reasons: string;
  submittedAt: string;
  status: 'Menunggu' | 'Diterima' | 'Ditolak';
}

export interface OrganizationInfo {
  name: string;
  shortName: string;
  tagline: string;
  secondaryTagline: string;
  village: string;
  rw: string;
  subdistrict: string;
  regency: string;
  province: string;
  foundedYear: number;
  primaryColor: string;
  contactPerson: string;
  whatsapp: string;
  email: string;
  instagram: string;
  tiktok: string;
  youtube: string;
  facebook: string;
  secretariatAddress: string;
  mapsEmbedUrl?: string;
}

export interface SecurityLog {
  id: string;
  timestamp: string;
  event: string;
  user: string;
  ipAddress: string;
  severity: 'info' | 'warning' | 'critical';
  details: string;
}

export interface SecuritySettings {
  maxLoginAttempts: number;
  lockoutMinutes: number;
  requirePasskeyForDeletion: boolean;
  masterAdminPassword: string; // Sandi seragam untuk seluruh admin
  sessionTimeoutMinutes: number;
  antiXssEnabled: boolean;
  rateLimitingEnabled: boolean;
  secureHeadersSimulated: boolean;
}

export interface GmailSyncInfo {
  connectedEmail: string;
  lastBackupDate: string;
  backupStatus: 'Tersambung' | 'Belum Pernah' | 'Sinkronisasi Otomatis';
  totalSnapshots: number;
  lastSnapshotSize: string;
}

export interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'info';
  title: string;
  message: string;
}
