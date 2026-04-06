import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'sonner';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/auth/LoginPage';
import RoleSelectPage from './pages/auth/RoleSelectPage';
import DashboardLayout from './layouts/DashboardLayout';
import { ProtectedRoute } from './routes/ProtectedRoute';

// Dashboards
import FarmerDashboard from './pages/dashboard/FarmerDashboard';
import OfficerDashboard from './pages/dashboard/OfficerDashboard';
import AdminDashboard from './pages/dashboard/AdminDashboard';

// Farmer Pages
import SchemeHub from './pages/dashboard/SchemeHub';
import ApplicationRegistry from './pages/dashboard/ApplicationRegistry';
import GrievanceHub from './pages/dashboard/GrievanceHub';

// Officer Pages
import OfficerReviewQueue from './pages/dashboard/OfficerReviewQueue';
import AIVerificationPage from './pages/dashboard/AIVerificationPage';
import OfficerSupportQueue from './pages/dashboard/OfficerSupportQueue';

// Admin Pages
import SchemeManagement from './pages/dashboard/SchemeManagement';
import UserControl from './pages/dashboard/UserControl';
import AdminAnalytics from './pages/dashboard/AdminAnalytics';
import SystemSettings from './pages/dashboard/SystemSettings';

import { useAuthStore } from './store/authStore';
import { useEffect } from 'react';



function App() {
  const { initialize } = useAuthStore();

  useEffect(() => {
    initialize();
  }, []);

  return (
    <BrowserRouter>
      <Toaster 
        position="top-right" 
        richColors 
        theme="light"
        toastOptions={{
          style: {
            borderRadius: '24px',
            padding: '16px 24px',
            fontSize: '14px',
            fontWeight: '600',
            border: '1px solid rgba(15, 41, 27, 0.05)',
            boxShadow: '0 10px 40px rgba(15, 41, 27, 0.04)',
            backdropFilter: 'blur(16px)',
            background: 'rgba(255, 255, 255, 0.8)'
          }
        }}
      />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        
        {/* Auth Routes */}
        <Route path="/auth/role-select" element={<RoleSelectPage />} />
        <Route path="/auth/login/:role" element={<LoginPage />} />

        {/* Dashboard Routes */}
        <Route path="/dashboard" element={<ProtectedRoute><DashboardLayout /></ProtectedRoute>}>
          {/* Farmer Portal */}
          <Route path="farmer" element={<ProtectedRoute allowedRoles={['farmer']}><FarmerDashboard /></ProtectedRoute>} />
          <Route path="schemes" element={<ProtectedRoute allowedRoles={['farmer']}><SchemeHub /></ProtectedRoute>} />
          <Route path="applications" element={<ProtectedRoute allowedRoles={['farmer']}><ApplicationRegistry /></ProtectedRoute>} />
          <Route path="grievances" element={<ProtectedRoute allowedRoles={['farmer']}><GrievanceHub /></ProtectedRoute>} />
          
          {/* Officer Portal */}
          <Route path="officer" element={<ProtectedRoute allowedRoles={['officer']}><OfficerDashboard /></ProtectedRoute>} />
          <Route path="review" element={<ProtectedRoute allowedRoles={['officer']}><OfficerReviewQueue /></ProtectedRoute>} />
          <Route path="verification" element={<ProtectedRoute allowedRoles={['officer']}><AIVerificationPage /></ProtectedRoute>} />
          <Route path="support" element={<ProtectedRoute allowedRoles={['officer']}><OfficerSupportQueue /></ProtectedRoute>} />
          
          {/* Admin Portal */}
          <Route path="admin" element={<ProtectedRoute allowedRoles={['admin']}><AdminDashboard /></ProtectedRoute>} />
          <Route path="schemes-manage" element={<ProtectedRoute allowedRoles={['admin']}><SchemeManagement /></ProtectedRoute>} />
          <Route path="users" element={<ProtectedRoute allowedRoles={['admin']}><UserControl /></ProtectedRoute>} />
          <Route path="analytics" element={<ProtectedRoute allowedRoles={['admin']}><AdminAnalytics /></ProtectedRoute>} />
          <Route path="settings" element={<ProtectedRoute allowedRoles={['admin']}><SystemSettings /></ProtectedRoute>} />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
