/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { AnnouncementBar } from './components/layout/AnnouncementBar';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { ToastContainer } from './components/common/ToastContainer';

// Section components
import { HomeSection } from './components/sections/HomeSection';
import { AboutSection } from './components/sections/AboutSection';
import { OrgStructureSection } from './components/sections/OrgStructureSection';
import { ProgramsSection } from './components/sections/ProgramsSection';
import { ActivitiesSection } from './components/sections/ActivitiesSection';
import { AgendaSection } from './components/sections/AgendaSection';
import { NewsSection } from './components/sections/NewsSection';
import { GallerySection } from './components/sections/GallerySection';
import { AchievementsSection } from './components/sections/AchievementsSection';
import { UMKMSection } from './components/sections/UMKMSection';
import { MembersSection } from './components/sections/MembersSection';
import { TransparencySection } from './components/sections/TransparencySection';
import { RegistrationSection } from './components/sections/RegistrationSection';
import { CertificateSection } from './components/sections/CertificateSection';
import { ContactSection } from './components/sections/ContactSection';
import { AdminDashboard } from './components/admin/AdminDashboard';

// Modals
import { AuthModal } from './components/auth/AuthModal';
import { GlobalSearchModal } from './components/modals/GlobalSearchModal';
import { ActivityDetailModal } from './components/modals/ActivityDetailModal';
import { NewsDetailModal } from './components/modals/NewsDetailModal';
import { AgendaDetailModal } from './components/modals/AgendaDetailModal';
import { LightboxModal } from './components/modals/LightboxModal';
import { CertificateModal } from './components/modals/CertificateModal';

const MainContent: React.FC = () => {
  const { currentTab, isAdminView } = useApp();

  // If in Admin Mode, display Admin Dashboard exclusively
  if (isAdminView || currentTab === 'admin') {
    return <AdminDashboard />;
  }

  switch (currentTab) {
    case 'beranda':
      return <HomeSection />;
    case 'tentang':
      return <AboutSection />;
    case 'struktur':
      return <OrgStructureSection />;
    case 'program':
      return <ProgramsSection />;
    case 'kegiatan':
      return <ActivitiesSection />;
    case 'agenda':
      return <AgendaSection />;
    case 'berita':
      return <NewsSection />;
    case 'galeri':
      return <GallerySection />;
    case 'prestasi':
      return <AchievementsSection />;
    case 'umkm':
      return <UMKMSection />;
    case 'anggota':
      return <MembersSection />;
    case 'transparansi':
      return <TransparencySection />;
    case 'gabung':
      return <RegistrationSection />;
    case 'sertifikat':
      return <CertificateSection />;
    case 'kontak':
      return <ContactSection />;
    default:
      return <HomeSection />;
  }
};

export default function App() {
  return (
    <AppProvider>
      <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans selection:bg-blue-600 selection:text-white">
        {/* Top Announcement Bar */}
        <AnnouncementBar />

        {/* Sticky Navbar */}
        <Navbar />

        {/* Dynamic Page Content */}
        <main className="flex-1">
          <MainContent />
        </main>

        {/* Comprehensive Footer */}
        <Footer />

        {/* Modals & Overlays */}
        <AuthModal />
        <GlobalSearchModal />
        <ActivityDetailModal />
        <NewsDetailModal />
        <AgendaDetailModal />
        <LightboxModal />
        <CertificateModal />

        {/* Global Toast Notifications */}
        <ToastContainer />
      </div>
    </AppProvider>
  );
}
