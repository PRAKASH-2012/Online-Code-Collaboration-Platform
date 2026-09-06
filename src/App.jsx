import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { IDEProvider } from './context/IDEContext';
import { SocketProvider } from './context/SocketContext';
import { ThemeProvider } from './context/ThemeContext';

import { LandingPage } from './pages/LandingPage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { DashboardPage } from './pages/DashboardPage';
import { IDEWorkspacePage } from './pages/IDEWorkspacePage';
import { PublicExplorerPage } from './pages/PublicExplorerPage';
import { TemplateMarketplacePage } from './pages/TemplateMarketplacePage';
import { AnalyticsPage } from './pages/AnalyticsPage';
import { AdminDashboardPage } from './pages/AdminDashboardPage';
import { OrganizationPage } from './pages/OrganizationPage';
import { UserProfileSettingsPage } from './pages/UserProfileSettingsPage';

export default function App() {
  return (
    <BrowserRouter basename="/Online-Code-Collaboration-Platform">
      <AuthProvider>
        <ThemeContextWrapper>
          <SocketProvider>
            <IDEProvider>
              <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route path="/ide" element={<IDEWorkspacePage />} />
                <Route path="/explore" element={<PublicExplorerPage />} />
                <Route path="/templates" element={<TemplateMarketplacePage />} />
                <Route path="/analytics" element={<AnalyticsPage />} />
                <Route path="/admin" element={<AdminDashboardPage />} />
                <Route path="/organizations" element={<OrganizationPage />} />
                <Route path="/settings" element={<UserProfileSettingsPage />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </IDEProvider>
          </SocketProvider>
        </ThemeContextWrapper>
      </AuthProvider>
    </BrowserRouter>
  );
}

function ThemeContextWrapper({ children }) {
  return <ThemeProvider>{children}</ThemeProvider>;
}
