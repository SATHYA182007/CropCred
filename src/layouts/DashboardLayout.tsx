import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sprout, 
  LayoutDashboard, 
  ClipboardList, 
  Users, 
  BarChart3, 
  Bell, 
  LogOut, 
  Menu, 
  X, 
  ChevronRight,
  ShieldCheck,
  Search,
  MessageSquare,
  FileText,
  Settings,
  Cpu,
  Database
} from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import { toast } from 'sonner';

const farmerNav = [
  { icon: LayoutDashboard, label: 'Dashboard', to: '/dashboard/farmer' },
  { icon: FileText, label: 'Applications', to: '/dashboard/applications' },
  { icon: MessageSquare, label: 'Grievances', to: '/dashboard/grievances' },
  { icon: Sprout, label: 'Scheme Hub', to: '/dashboard/schemes' },
];

const officerNav = [
  { icon: LayoutDashboard, label: 'Admin Desk', to: '/dashboard/officer' },
  { icon: ClipboardList, label: 'Review Queue', to: '/dashboard/review' },
  { icon: Cpu, label: 'AI Verifications', to: '/dashboard/verification' },
  { icon: MessageSquare, label: 'Farmer Support', to: '/dashboard/support' },
];

const adminNav = [
  { icon: LayoutDashboard, label: 'Control Center', to: '/dashboard/admin' },
  { icon: Database, label: 'Scheme Management', to: '/dashboard/schemes-manage' },
  { icon: Users, label: 'User Management', to: '/dashboard/users' },
  { icon: BarChart3, label: 'Analytics', to: '/dashboard/analytics' },
  { icon: Settings, label: 'System Settings', to: '/dashboard/settings' },
];

const DashboardLayout = () => {
  const { profile, signOut } = useAuthStore();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const nav = profile?.role === 'farmer' ? farmerNav : profile?.role === 'officer' ? officerNav : adminNav;

  const handleSignOut = async () => {
    await signOut();
    toast.success('Secure session terminated');
    navigate('/');
  };

  const roleStyles = {
    farmer: {
      bg: 'bg-green-100 text-green-700',
      border: 'border-green-200',
      icon: <Sprout size={16} />
    },
    officer: {
      bg: 'bg-brand-gold/10 text-brand-gold',
      border: 'border-brand-gold/20',
      icon: <Cpu size={16} />
    },
    admin: {
      bg: 'bg-slate-100 text-brand-slate',
      border: 'border-slate-200',
      icon: <ShieldCheck size={16} />
    }
  }[profile?.role || 'farmer'];

  const Sidebar = () => (
    <div className="flex flex-col h-full premium-sidebar border-r border-white/5 shadow-2xl relative overflow-hidden">
      {/* Decorative pulse background */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-brand-gold/5 to-transparent pointer-events-none opacity-20" />

      {/* Brand Header */}
      <div className="flex items-center gap-3 p-8">
        <div className="bg-brand-gold p-2.5 rounded-xl text-brand-deep shadow-lg shadow-brand-gold/20 transition-transform hover:scale-110">
          <Sprout size={24} />
        </div>
        <div className="flex flex-col">
          <span className="text-xl font-black text-white tracking-widest leading-none">CROP<span className="text-brand-gold">CRED</span></span>
          <span className="text-[9px] font-black tracking-[0.4em] text-white/30 uppercase mt-2">Intelligence Platform</span>
        </div>
      </div>

      {/* Session/Profile Info */}
      <div className="px-6 mb-8 mt-2">
        <div className="p-4 bg-white/5 border border-white/10 rounded-[32px] backdrop-blur-xl group hover:border-brand-gold/30 transition-all">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-[18px] bg-brand-gold flex items-center justify-center text-brand-deep font-black text-lg shadow-xl shadow-brand-gold/20 group-hover:rotate-6 transition-transform">
              {profile?.full_name?.charAt(0) ?? '?'}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-black text-white truncate tracking-tight">{profile?.full_name}</p>
              <div className={`mt-1 inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full ${roleStyles.bg} text-[9px] font-black uppercase tracking-wider border ${roleStyles.border}`}>
                {roleStyles.icon}
                {profile?.role}
              </div>
            </div>
          </div>
          <div className="h-px w-full bg-white/5 mb-4" />
          <div className="flex items-center justify-between px-1">
            <div className="flex flex-col">
              <span className="text-[9px] font-black text-white/20 uppercase tracking-widest">ID Status</span>
              <span className="text-[10px] font-bold text-green-400">ENCRYPTED</span>
            </div>
            <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)] animate-pulse" />
          </div>
        </div>
      </div>

      {/* Navigation Layer */}
      <nav className="flex-1 px-6 space-y-2 overflow-y-auto">
        <div className="text-[10px] font-black text-white/20 uppercase tracking-[0.3em] mb-4 ml-4">Registry Control</div>
        {nav.map(item => (
          <NavLink 
            key={item.to + item.label} 
            to={item.to}
            className={({ isActive }) =>
              `flex items-center gap-4 px-6 py-4 rounded-[24px] text-xs font-black uppercase tracking-widest transition-all group relative overflow-hidden ${
                isActive
                  ? 'bg-brand-gold text-brand-deep shadow-xl shadow-brand-gold/20'
                  : 'text-white/40 hover:text-white hover:bg-white/5'
              }`
            }
          >
            <item.icon size={18} className="relative z-10" />
            <span className="relative z-10">{item.label}</span>
            <ChevronRight size={14} className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
          </NavLink>
        ))}
      </nav>

      {/* Secondary Controls */}
      <div className="p-6 space-y-2 mt-auto">
        <div className="h-px w-full bg-white/5 mb-6" />
        <button className="flex w-full items-center gap-4 px-6 py-4 rounded-[24px] text-xs font-black uppercase tracking-widest text-white/30 hover:text-white hover:bg-white/5 transition-all group">
          <Bell size={18} />
          <span>Notification Node</span>
          <div className="ml-auto w-5 h-5 rounded-full bg-brand-gold text-brand-deep text-[10px] flex items-center justify-center">3</div>
        </button>
        <button 
          onClick={handleSignOut}
          className="flex w-full items-center gap-4 px-6 py-4 rounded-[24px] text-xs font-black uppercase tracking-widest text-red-500/60 hover:text-red-500 hover:bg-red-500/5 transition-all group"
        >
          <LogOut size={18} />
          <span>Terminate Session</span>
        </button>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen bg-brand-offwhite overflow-hidden font-sans">
      {/* Desktop Sidebar */}
      <div className="hidden lg:flex w-80 flex-shrink-0 flex-col h-full relative z-40">
        <Sidebar />
      </div>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 bg-brand-deep/80 backdrop-blur-md z-40 lg:hidden"
              onClick={() => setSidebarOpen(false)}
            />
            <motion.div
              initial={{ x: -320 }} animate={{ x: 0 }} exit={{ x: -320 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="fixed left-0 top-0 bottom-0 w-80 z-50 lg:hidden"
            >
              <Sidebar />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
        {/* Background Gradients */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-gold/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
        
        {/* Top Header (mobile) */}
        <div className="lg:hidden flex items-center justify-between px-6 py-4 bg-white border-b border-brand-earth/5 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <button onClick={() => setSidebarOpen(true)} className="p-2 -ml-2 text-brand-slate/60 hover:text-brand-earth transition-colors">
              <Menu size={24} />
            </button>
            <div className="flex items-center gap-2">
              <Sprout size={20} className="text-brand-earth" />
              <span className="text-lg font-black text-brand-slate uppercase tracking-tight">CROP<span className="text-brand-gold">CRED</span></span>
            </div>
          </div>
          <div className="w-10 h-10 rounded-full bg-brand-gold/10 flex items-center justify-center text-brand-gold font-bold">
            {profile?.full_name?.charAt(0)}
          </div>
        </div>

        {/* Dynamic Header (desktop) */}
        <div className="hidden lg:flex items-center justify-between px-10 py-6 relative z-30">
          <div className="flex items-center gap-4 text-brand-slate/40">
            <Search size={18} />
            <input type="text" placeholder="Global Registry Search..." className="bg-transparent border-none focus:outline-none text-sm font-bold w-64 placeholder:text-brand-slate/20" />
          </div>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3 px-4 py-2 rounded-full glass-card border border-brand-earth/10">
              <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.3)]" />
              <span className="text-[10px] font-black text-brand-slate/60 uppercase tracking-widest">Network Secure</span>
            </div>
            <div className="relative group">
              <div className="w-12 h-12 rounded-2xl bg-white shadow-xl shadow-brand-slate/5 flex items-center justify-center text-brand-slate/40 hover:text-brand-earth transition-all cursor-pointer border border-brand-earth/5 hover:border-brand-earth/20">
                <Bell size={20} />
                <div className="absolute top-0 right-0 w-3 h-3 bg-red-500 border-2 border-brand-offwhite rounded-full" />
              </div>
            </div>
          </div>
        </div>

        {/* Page Content Outlet */}
        <main className="flex-1 overflow-y-auto px-6 lg:px-10 pb-10 relative z-10">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
