import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Users, 
  Search, 
  UserPlus,
  ShieldCheck,
  Lock,
  Phone,
  MessageCircle,
  Edit3,
  CheckCircle2,
  Eye,
  EyeOff
} from 'lucide-react';
import { Member } from '../../types';

export const MembersSection: React.FC = () => {
  const { members, setCurrentTab, currentUser, setIsAdminView } = useApp();
  const [search, setSearch] = useState('');
  const [selectedDivision, setSelectedDivision] = useState<string>('Semua');

  // Role-Based Access Control (RBAC) verification
  // Non-admin viewers: 'Viewer', undefined, or not logged in
  const isAdmin = !!(currentUser && ['Super Admin', 'Admin', 'Bendahara', 'Sekretaris', 'PDD'].includes(currentUser.role));
  const isSuperAdmin = currentUser?.role === 'Super Admin';

  const divisions = [
    'Semua',
    'Pengurus Harian',
    'Kesekretariatan',
    'Keuangan',
    'Divisi PDD / Media',
    'Divisi Olahraga',
    'Divisi Sosial & Keagamaan',
    'Divisi Lingkungan',
    'Divisi Kewirausahaan',
    'Divisi Humas'
  ];

  const filtered = members.filter((m) => {
    const matchDiv = selectedDivision === 'Semua' || m.division === selectedDivision;
    const matchSearch = m.name.toLowerCase().includes(search.toLowerCase()) ||
                        m.nickname.toLowerCase().includes(search.toLowerCase()) ||
                        m.role.toLowerCase().includes(search.toLowerCase());
    return matchDiv && matchSearch;
  });

  return (
    <div className="py-16 sm:py-24 bg-slate-50 text-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-purple-100 text-purple-800 text-xs font-bold uppercase tracking-wider mb-2">
            <ShieldCheck className="w-3.5 h-3.5 text-purple-600" />
            <span>Sistem Direktori Terlindungi RBAC</span>
          </div>
          <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-slate-900 tracking-tight mt-1">
            Direktori Pemuda RW 1
          </h2>
          <p className="text-slate-600 text-base sm:text-lg mt-3 leading-relaxed">
            Data keanggotaan pemuda pemudi Tri Dharma Manunggal yang aktif berkontribusi bagi Desa Pojok RW 1.
          </p>

          {/* RBAC Status Banner */}
          <div className="mt-5 max-w-xl mx-auto">
            {isAdmin ? (
              <div className="p-3.5 rounded-2xl bg-blue-50 border border-blue-200 flex items-center justify-between text-xs text-blue-900">
                <div className="flex items-center gap-2 text-left">
                  <ShieldCheck className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>
                    <strong>Akses Pengurus Aktif ({currentUser?.role})</strong>: Anda memiliki izin RBAC untuk melihat kontak WhatsApp, catatan internal, dan mengelola jabatan.
                  </span>
                </div>
                <button
                  onClick={() => {
                    setIsAdminView(true);
                    setCurrentTab('admin');
                  }}
                  className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-[11px] shrink-0 ml-3 transition"
                >
                  Kelola di Admin →
                </button>
              </div>
            ) : (
              <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 flex items-center justify-center gap-2 text-center">
                <Lock className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>
                  <strong>Perlindungan Data Pribadi (RBAC Aktif)</strong>: Nomor WhatsApp, kontak privat, dan biodata internal tidak dipublikasikan ke umum untuk menjaga privasi anggota.
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10 bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
          
          <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
            {divisions.map((div) => (
              <button
                key={div}
                onClick={() => setSelectedDivision(div)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition ${
                  selectedDivision === div 
                    ? 'bg-purple-600 text-white shadow-xs' 
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                {div}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Cari nama atau jabatan..."
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-100 border-none text-xs font-medium focus:outline-purple-600"
            />
          </div>
        </div>

        {/* Grid Members */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filtered.map((member) => (
            <div
              key={member.id}
              className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between space-y-3 relative group"
            >
              <div className="flex flex-col items-center text-center space-y-3">
                <div className="relative">
                  <img
                    src={member.photoUrl}
                    alt={member.name}
                    className="w-20 h-20 rounded-full object-cover border-4 border-slate-100 shadow-md group-hover:scale-105 transition-transform"
                  />
                  <span className="absolute bottom-0 right-0 w-4 h-4 rounded-full bg-emerald-500 border-2 border-white" title="Status: Aktif"></span>
                </div>

                <div>
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-purple-700 bg-purple-50 px-2.5 py-0.5 rounded-full inline-block mb-1">
                    {member.division}
                  </span>
                  <h3 className="font-display font-bold text-base text-slate-900">
                    {member.name}
                  </h3>
                  {member.nickname && (
                    <p className="text-xs text-slate-400 font-medium">({member.nickname})</p>
                  )}
                </div>

                <div className="w-full pt-2 border-t border-slate-100 text-xs text-slate-500 space-y-1">
                  <div className="font-semibold text-slate-800">{member.role}</div>
                  <div className="text-[11px] text-slate-400">Tahun Gabung: {member.joinedYear}</div>
                </div>
              </div>

              {/* SENSITIVE DATA FIELDS: STRICT CODE-LEVEL RBAC (NO CSS HIDDEN TRICKS) */}
              {/* Only rendered in the virtual DOM if the viewer possesses admin credentials */}
              {isAdmin ? (
                <div className="w-full pt-3 border-t border-slate-100 space-y-2 text-left">
                  {/* Sensitive Phone / WhatsApp Field */}
                  {member.whatsapp && (
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-[10px] font-bold text-slate-400 uppercase">Kontak Internal:</span>
                      <a
                        href={`https://wa.me/${member.whatsapp.replace(/[^0-9]/g, '')}?text=Halo%20${encodeURIComponent(member.name)}`}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 font-mono text-emerald-600 hover:text-emerald-700 font-semibold"
                        title="Nomor WhatsApp Pengurus"
                      >
                        <Phone className="w-3 h-3 text-emerald-500" />
                        <span>{member.whatsapp}</span>
                      </a>
                    </div>
                  )}

                  {/* Sensitive Bio / Internal Notes Field */}
                  {member.bio && (
                    <div className="p-2 rounded-xl bg-slate-50 border border-slate-100 text-[11px] text-slate-600 leading-snug">
                      <span className="font-bold text-[10px] text-blue-700 uppercase block mb-0.5">Catatan Pengurus:</span>
                      <p className="line-clamp-2">{member.bio}</p>
                    </div>
                  )}

                  {/* Super Admin Quick Manage Button */}
                  {isSuperAdmin && (
                    <button
                      onClick={() => {
                        setIsAdminView(true);
                        setCurrentTab('admin');
                      }}
                      className="w-full py-1.5 px-2.5 rounded-lg bg-purple-50 hover:bg-purple-100 text-purple-700 text-[11px] font-bold flex items-center justify-center gap-1 transition"
                    >
                      <Edit3 className="w-3 h-3" />
                      <span>Ubah Jabatan / Foto</span>
                    </button>
                  )}
                </div>
              ) : (
                /* Non-admin viewer: Private data is completely omitted from the DOM */
                <div className="w-full pt-2 border-t border-slate-50 flex items-center justify-center text-[10px] text-slate-400 gap-1 select-none">
                  <Lock className="w-3 h-3 text-slate-400" />
                  <span>Kontak Terlindungi RBAC</span>
                </div>
              )}
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="p-12 text-center bg-white rounded-3xl border border-slate-200 max-w-md mx-auto text-slate-500">
            <p className="font-semibold text-slate-700">Anggota tidak ditemukan</p>
            <p className="text-xs text-slate-400 mt-1">Coba cari dengan nama panggilan lain.</p>
          </div>
        )}

        {/* Join Invite Box */}
        <div className="mt-16 text-center bg-purple-50 border border-purple-200 p-8 rounded-3xl max-w-2xl mx-auto space-y-3">
          <UserPlus className="w-10 h-10 text-purple-600 mx-auto" />
          <h3 className="font-display font-bold text-xl text-purple-950">
            Kamu Pemuda RW 1 Tapi Belum Terdaftar?
          </h3>
          <p className="text-xs sm:text-sm text-purple-800 leading-relaxed">
            Ayo daftarkan dirimu secara online! Mari berkontribusi, berkarya bersama, dan mempererat silaturahmi dengan sesama pemuda Desa Pojok.
          </p>
          <button
            onClick={() => setCurrentTab('gabung')}
            className="px-6 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs sm:text-sm transition shadow-md shadow-purple-500/20"
          >
            Isi Formulir Pendaftaran Sekarang
          </button>
        </div>

      </div>
    </div>
  );
};
