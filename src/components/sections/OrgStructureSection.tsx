import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Users, 
  MessageCircle, 
  Instagram, 
  ShieldCheck, 
  Edit3
} from 'lucide-react';
import { Member } from '../../types';

export const OrgStructureSection: React.FC = () => {
  const { members, orgInfo, currentUser, setCurrentTab, setIsAdminView } = useApp();
  const [selectedDivision, setSelectedDivision] = useState<string>('Semua');

  const isAdmin = !!(currentUser && ['Super Admin', 'Admin', 'Bendahara', 'Sekretaris', 'PDD'].includes(currentUser.role));

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

  const filteredMembers = selectedDivision === 'Semua' 
    ? members 
    : members.filter(m => m.division === selectedDivision);

  const ketua = members.find(m => m.role.includes('Ketua Umum'));
  const wakil = members.find(m => m.role.includes('Wakil Ketua'));
  const sekretaris = members.filter(m => m.division === 'Kesekretariatan');
  const bendahara = members.filter(m => m.division === 'Keuangan');

  return (
    <div className="py-16 sm:py-24 bg-slate-50 text-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="px-3.5 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-bold uppercase tracking-wider">
            Kepengurusan Periode 2024 - 2027
          </span>
          <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-slate-900 tracking-tight mt-3">
            Struktur Organisasi Pemuda
          </h2>
          <p className="text-slate-600 text-base sm:text-lg mt-3 leading-relaxed">
            Susunan pengurus Muda-Mudi Tri Dharma Manunggal yang bertugas melayani dan memfasilitasi kreativitas pemuda Desa Pojok RW 1.
          </p>

          {currentUser?.role === 'Super Admin' && (
            <div className="mt-4 inline-flex items-center gap-2 p-2 px-4 rounded-xl bg-purple-50 border border-purple-200 text-xs font-bold text-purple-700">
              <ShieldCheck className="w-4 h-4 text-purple-600" />
              <span>Mode Super Admin: Anda dapat mengubah foto & jabatan seluruh pengurus di Portal Admin.</span>
              <button
                onClick={() => {
                  setIsAdminView(true);
                  setCurrentTab('admin');
                }}
                className="ml-2 underline hover:text-purple-900"
              >
                Kelola Pengurus →
              </button>
            </div>
          )}
        </div>

        {/* Visual Org Chart Hierarchy Preview */}
        <div className="mb-20 p-8 sm:p-12 rounded-3xl bg-white border border-slate-200/80 shadow-md">
          <div className="text-center mb-8">
            <span className="text-xs font-bold uppercase tracking-widest text-slate-400">
              Bagan Pimpinan Harian
            </span>
          </div>

          <div className="flex flex-col items-center gap-8">
            
            {/* Ketua */}
            {ketua && (
              <div className="relative flex flex-col items-center">
                <div className="p-4 sm:p-6 rounded-2xl bg-gradient-to-br from-blue-700 to-indigo-800 text-white shadow-xl text-center w-64 border-2 border-blue-400/40 transform hover:scale-105 transition-all">
                  <img
                    src={ketua.photoUrl}
                    alt={ketua.name}
                    className="w-20 h-20 rounded-full mx-auto object-cover border-4 border-white/30 shadow-md mb-3"
                  />
                  <span className="px-2.5 py-0.5 rounded-full bg-white/20 text-[10px] font-bold uppercase tracking-wider">
                    {ketua.role}
                  </span>
                  <h4 className="font-display font-bold text-lg text-white mt-1">
                    {ketua.name}
                  </h4>
                  <p className="text-xs text-blue-200">{orgInfo.whatsapp}</p>
                </div>
                <div className="w-0.5 h-8 bg-blue-300"></div>
              </div>
            )}

            {/* Wakil Ketua */}
            {wakil && (
              <div className="relative flex flex-col items-center -mt-8">
                <div className="p-4 rounded-2xl bg-blue-600 text-white shadow-lg text-center w-56 border border-blue-300/30 transform hover:scale-105 transition-all">
                  <img
                    src={wakil.photoUrl}
                    alt={wakil.name}
                    className="w-16 h-16 rounded-full mx-auto object-cover border-2 border-white/30 shadow-xs mb-2"
                  />
                  <span className="px-2.5 py-0.5 rounded-full bg-white/20 text-[10px] font-bold uppercase tracking-wider">
                    {wakil.role}
                  </span>
                  <h4 className="font-display font-bold text-base text-white mt-1">
                    {wakil.name}
                  </h4>
                </div>
                <div className="w-0.5 h-8 bg-blue-300"></div>
              </div>
            )}

            {/* Sekretaris & Bendahara Row */}
            <div className="w-full max-w-4xl relative">
              <div className="hidden sm:block absolute top-0 left-12 right-12 h-0.5 bg-blue-300"></div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4 sm:pt-6">
                {[...sekretaris, ...bendahara].map((officer) => (
                  <div 
                    key={officer.id}
                    className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-center hover:bg-blue-50/50 hover:border-blue-300 transition"
                  >
                    <img
                      src={officer.photoUrl}
                      alt={officer.name}
                      className="w-14 h-14 rounded-full mx-auto object-cover border-2 border-blue-600/30 mb-2"
                    />
                    <span className="text-[10px] font-bold text-blue-700 uppercase tracking-wider block">
                      {officer.role}
                    </span>
                    <h5 className="font-bold text-sm text-slate-800 truncate">
                      {officer.name}
                    </h5>
                    <p className="text-[11px] text-slate-500">{officer.division}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* Division Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {divisions.map((div) => (
            <button
              key={div}
              onClick={() => setSelectedDivision(div)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition ${
                selectedDivision === div
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-500/25'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              {div}
            </button>
          ))}
        </div>

        {/* Members Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredMembers.map((member) => (
            <div
              key={member.id}
              className="bg-white rounded-3xl border border-slate-200/80 shadow-xs hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col group"
            >
              {/* Member Photo */}
              <div className="relative h-56 w-full overflow-hidden bg-slate-100">
                <img
                  src={member.photoUrl}
                  alt={member.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent"></div>
                
                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-blue-600 text-white uppercase tracking-wider inline-block">
                    {member.division}
                  </span>
                  <h3 className="font-display font-bold text-lg leading-tight mt-1">
                    {member.name}
                  </h3>
                </div>
              </div>

              {/* Member Details */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-md">
                      {member.role}
                    </span>
                    <span className="text-slate-400 font-medium">
                      Tahun {member.joinedYear}
                    </span>
                  </div>
                  {member.bio && (
                    <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                      {member.bio}
                    </p>
                  )}
                </div>

                {/* Contacts */}
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                  {isAdmin && member.whatsapp ? (
                    <a
                      href={`https://wa.me/${member.whatsapp.replace(/[^0-9]/g, '')}?text=Halo%20${encodeURIComponent(member.name)}`}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 font-semibold text-emerald-600 hover:text-emerald-700 transition"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>WhatsApp</span>
                    </a>
                  ) : (
                    <span className="text-[11px] text-slate-400 font-medium">Pengurus RW 1</span>
                  )}
                  {member.instagram && (
                    <a
                      href={`https://instagram.com/${member.instagram}`}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 text-slate-400 hover:text-pink-600 transition"
                      title={`@${member.instagram}`}
                    >
                      <Instagram className="w-3.5 h-3.5" />
                      <span className="text-[11px]">@{member.instagram}</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};
