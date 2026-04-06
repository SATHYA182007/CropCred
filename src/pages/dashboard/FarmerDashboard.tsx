import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  Sprout, 
  ClipboardList, 
  MessageSquare, 
  ChevronRight, 
  Plus, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  AlertCircle,
  FileText,
  Search,
  ArrowUpRight,
  ShieldCheck,
  Zap,
  Activity,
  Cpu
} from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { useAuthStore } from '../../store/authStore';
import { toast } from 'sonner';

const FarmerDashboard = () => {
  const { profile } = useAuthStore();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'overview' | 'schemes' | 'applications' | 'grievances'>('overview');
  const [stats, setStats] = useState({
    totalApps: 0,
    approvedApps: 0,
    pendingApps: 0,
    activeGrievances: 0
  });
  const [schemes, setSchemes] = useState<any[]>([]);
  const [recentApplications, setRecentApplications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, [profile]);

  const fetchDashboardData = async () => {
    if (!profile) return;
    setLoading(true);
    try {
      // Fetch Stats
      const { data: apps } = await supabase
        .from('applications')
        .select('status')
        .eq('farmer_id', profile.id);

      const { data: grievances } = await supabase
        .from('grievances')
        .select('id')
        .eq('farmer_id', profile.id)
        .neq('status', 'resolved');

      if (apps) {
        setStats({
          totalApps: apps.length,
          approvedApps: apps.filter(a => a.status === 'approved').length,
          pendingApps: apps.filter(a => a.status === 'pending' || a.status === 'under_review').length,
          activeGrievances: grievances?.length || 0
        });
      }

      // Fetch Recent Applications with Scheme Details
      const { data: recent } = await supabase
        .from('applications')
        .select('*, schemes(title, category)')
        .eq('farmer_id', profile.id)
        .order('submitted_at', { ascending: false })
        .limit(3);
      
      setRecentApplications(recent || []);

      // Fetch Available Schemes
      const { data: availableSchemes } = await supabase
        .from('schemes')
        .select('*')
        .eq('status', 'active')
        .limit(4);
      
      setSchemes(availableSchemes || []);

    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'text-green-500 bg-green-500/10 border-green-500/20';
      case 'rejected': return 'text-red-500 bg-red-500/10 border-red-500/20';
      case 'pending': return 'text-brand-gold bg-brand-gold/10 border-brand-gold/20';
      case 'under_review': return 'text-blue-500 bg-blue-500/10 border-blue-500/20';
      case 'correction_required': return 'text-purple-500 bg-purple-500/10 border-purple-500/20';
      default: return 'text-brand-slate/40 bg-brand-slate/5 border-brand-slate/10';
    }
  };

  const StatCard = ({ icon: Icon, label, value, subtext, color }: any) => (
    <motion.div 
      whileHover={{ y: -5 }}
      className="glass-card p-8 rounded-[40px] border border-brand-earth/5 hover:border-brand-gold/30 transition-all group"
    >
      <div className="flex items-center justify-between mb-6">
        <div className={`w-14 h-14 rounded-2xl ${color} flex items-center justify-center shadow-lg transition-transform group-hover:scale-110 group-hover:rotate-3`}>
          <Icon size={28} />
        </div>
        <div className="text-right">
          <p className="text-[10px] font-black text-brand-slate/30 uppercase tracking-widest">{label}</p>
          <p className="text-3xl font-black text-brand-slate mt-1 tracking-tight">{value}</p>
        </div>
      </div>
      <div className="flex items-center gap-2 text-[11px] font-bold text-brand-slate/60">
        <div className="w-1.5 h-1.5 rounded-full bg-green-400" />
        {subtext}
      </div>
    </motion.div>
  );

  return (
    <div className="space-y-10 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-earth/10 text-brand-earth text-[10px] font-black uppercase tracking-widest border border-brand-earth/20 mb-4">
            <ShieldCheck size={12} /> Secure Farmer Identity
          </div>
          <h1 className="text-5xl font-black text-brand-slate tracking-tight">Farmer <span className="text-brand-earth">Overview.</span></h1>
          <p className="text-lg font-medium text-brand-slate/40 mt-2">Manage your agriculture services and scheme registry.</p>
        </div>
        <div className="flex items-center gap-4">
          <button onClick={() => navigate('/dashboard/profile')} className="px-6 py-3 rounded-2xl glass-card border border-brand-earth/10 text-xs font-black uppercase text-brand-slate tracking-widest hover:bg-white transition-all shadow-xl shadow-brand-slate/5">
            Digital Profile
          </button>
          <button onClick={() => navigate('/dashboard/schemes')} className="px-6 py-3 rounded-2xl bg-brand-earth text-white text-xs font-black uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-xl shadow-brand-earth/30 flex items-center gap-2">
            <Plus size={16} /> New Application
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          icon={ClipboardList} 
          label="Registry Submissions" 
          value={stats.totalApps} 
          subtext="Total schemes applied"
          color="bg-brand-earth text-white"
        />
        <StatCard 
          icon={CheckCircle2} 
          label="Approved Schemes" 
          value={stats.approvedApps} 
          subtext="Verified by Agriculture Dept"
          color="bg-green-500 text-white"
        />
        <StatCard 
          icon={Clock} 
          label="Pending Review" 
          value={stats.pendingApps} 
          subtext="Currently with Officer"
          color="bg-brand-gold text-white"
        />
        <StatCard 
          icon={MessageSquare} 
          label="Grievances Hub" 
          value={stats.activeGrievances} 
          subtext="Open status complaints"
          color="bg-brand-slate text-white"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Left Column: Recent Activity & Schemes */}
        <div className="lg:col-span-2 space-y-10">
          
          {/* Recent Applications Activity */}
          <div className="glass-card rounded-[48px] p-10 border border-brand-earth/5 overflow-hidden relative">
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-brand-earth/5 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
            
            <div className="flex items-center justify-between mb-10 relative z-10">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-brand-earth/10 flex items-center justify-center text-brand-earth">
                  <Activity size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-black text-brand-slate tracking-tight">Recent Applications</h3>
                  <p className="text-xs font-bold text-brand-slate/40 uppercase tracking-widest">Digital Pipeline History</p>
                </div>
              </div>
              <button onClick={() => navigate('/dashboard/applications')} className="text-[10px] font-black text-brand-earth uppercase tracking-widest hover:underline flex items-center gap-1 group">
                Full Registry <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            <div className="space-y-4 relative z-10">
              {loading ? (
                Array(3).fill(0).map((_, i) => (
                  <div key={i} className="h-24 bg-brand-slate/5 animate-pulse rounded-[32px]" />
                ))
              ) : recentApplications.length > 0 ? (
                recentApplications.map((app) => (
                  <motion.div 
                    key={app.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="p-6 bg-white/50 border border-brand-earth/5 rounded-[32px] hover:border-brand-gold/30 hover:bg-white transition-all group"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all ${getStatusColor(app.status)}`}>
                          <FileText size={20} />
                        </div>
                        <div>
                          <p className="text-sm font-black text-brand-slate group-hover:text-brand-earth transition-colors">{app.schemes?.title}</p>
                          <p className="text-[10px] font-bold text-brand-slate/30 uppercase tracking-widest mt-1">{app.schemes?.category} • Applied {new Date(app.submitted_at).toLocaleDateString()}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-8">
                        <div className="hidden md:block">
                          <p className="text-[9px] font-black text-brand-slate/30 uppercase tracking-[0.2em] mb-1">AI Score</p>
                          <div className="flex items-center gap-2">
                             <div className="w-16 h-1.5 bg-brand-slate/10 rounded-full overflow-hidden">
                               <div className="h-full bg-brand-gold" style={{ width: `${app.ai_score}%` }} />
                             </div>
                             <span className="text-[10px] font-black text-brand-gold">{app.ai_score}%</span>
                          </div>
                        </div>
                        <div className={`px-4 py-2 rounded-full border-2 text-[10px] font-black uppercase tracking-widest ${getStatusColor(app.status)}`}>
                          {app.status.replace('_', ' ')}
                        </div>
                        <ArrowUpRight size={20} className="text-brand-slate/20 group-hover:text-brand-earth transition-colors cursor-pointer" />
                      </div>
                    </div>
                  </motion.div>
                ))
              ) : (
                <div className="p-12 text-center text-brand-slate/30">
                   <p className="text-sm font-bold uppercase tracking-widest">No Recent Submissions</p>
                </div>
              )}
            </div>
          </div>

          {/* Scheme Marketplace */}
          <div>
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-brand-gold/10 flex items-center justify-center text-brand-gold">
                  <Sprout size={22} />
                </div>
                <h3 className="text-lg font-black text-brand-slate tracking-tight uppercase">Featured Schemes</h3>
              </div>
              <button onClick={() => navigate('/dashboard/schemes')} className="text-[10px] font-black text-brand-gold uppercase tracking-widest hover:underline">Explore All Modules</button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {schemes.map((scheme, i) => (
                <motion.div 
                  key={scheme.id}
                  whileHover={{ scale: 1.02 }}
                  className="glass-card p-6 rounded-[32px] border border-brand-gold/10 hover:border-brand-gold/30 hover:bg-white transition-all group flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="px-2.5 py-1 rounded-full bg-brand-slate/5 text-[9px] font-black text-brand-slate/40 uppercase tracking-widest">{scheme.category}</span>
                      <div className="w-8 h-8 rounded-full bg-brand-gold/20 flex items-center justify-center text-brand-gold shadow-lg shadow-brand-gold/10">
                        <Zap size={14} fill="currentColor" />
                      </div>
                    </div>
                    <h4 className="text-md font-black text-brand-slate group-hover:text-brand-earth transition-colors mb-2">{scheme.title}</h4>
                    <p className="text-xs text-brand-slate/40 line-clamp-2 leading-relaxed mb-4">{scheme.description}</p>
                  </div>
                  <div className="flex items-center justify-between pt-4 border-t border-brand-slate/5">
                    <span className="text-[10px] font-black text-brand-gold leading-none">UP TO ₹{Number(scheme.max_amount).toLocaleString()}</span>
                    <button onClick={() => navigate('/dashboard/schemes')} className="text-[10px] font-black text-brand-earth uppercase tracking-widest flex items-center gap-1 group/btn">
                      Apply Now <ChevronRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: AI Insights & Quick Actions */}
        <div className="space-y-10">
          
          {/* AI Platform Assistant */}
          <div className="glass-card-dark rounded-[48px] p-10 border border-white/10 shadow-3xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-brand-gold/20 rounded-full blur-[60px] -translate-y-1/2 translate-x-1/2 pointer-events-none group-hover:bg-brand-gold/30 transition-all duration-700" />
            
            <div className="flex items-center gap-4 mb-8 relative z-10">
              <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-brand-gold border border-white/20">
                <Cpu size={24} />
              </div>
              <div>
                <p className="text-xs font-black text-white tracking-widest uppercase opacity-30 leading-none mb-1">AI Analysis</p>
                <h3 className="text-xl font-black text-white tracking-tight">CropCred Insight</h3>
              </div>
            </div>

            <div className="space-y-6 relative z-10">
              <div className="p-6 bg-white/5 border border-white/10 rounded-[32px] backdrop-blur-md">
                <p className="text-[10px] font-black text-brand-gold uppercase tracking-widest mb-3">Eligibility Alert</p>
                <p className="text-sm font-medium text-white/70 leading-relaxed mb-4">
                  Based on your land size (4.5 acres) and district (Tiruppur), you have <span className="text-white font-black underline decoration-brand-gold underline-offset-4">88% probability</span> of approval for the <span className="text-brand-gold font-bold">Seed Subsidy Support</span> scheme.
                </p>
                <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-green-500/10 border border-green-500/20 text-green-400 text-[10px] font-bold">
                  <CheckCircle2 size={12} /> Optimization Recommendation Ready
                </div>
              </div>

              <div className="space-y-3 px-2">
                 {[
                   { label: "Profile Completeness", val: "94%" },
                   { label: "Doc Verification Rate", val: "100%" },
                   { label: "System Trust Score", val: "A+" }
                 ].map(item => (
                   <div key={item.label} className="flex items-center justify-between">
                     <span className="text-[10px] font-black text-white/30 uppercase tracking-widest">{item.label}</span>
                     <span className="text-xs font-black text-white">{item.val}</span>
                   </div>
                 ))}
              </div>

              <button className="w-full py-4 rounded-[24px] bg-white text-brand-deep font-black text-xs uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-2xl shadow-brand-gold/10">
                 Run AI Verification Scan
              </button>
            </div>
          </div>

          {/* Quick Support Module */}
          <div className="glass-card rounded-[40px] p-8 border border-brand-earth/5">
            <h4 className="text-sm font-black text-brand-slate uppercase tracking-widest mb-6">Farmer Assistance</h4>
            <div className="space-y-3">
              {[
                { icon: MessageSquare, label: "Raise Grievance", desc: "Submit complaints directly to Officers", color: "bg-red-50 text-red-500", path: "/dashboard/grievances" },
                { icon: Search, label: "Help Center", desc: "Browse FAQs and portal tutorials", color: "bg-blue-50 text-blue-500", path: "/dashboard/support" },
                { icon: ShieldCheck, label: "Certificates", desc: "Download verified scheme certificates", color: "bg-brand-earth/5 text-brand-earth", path: "/dashboard/applications" }
              ].map(action => (
                <button onClick={() => navigate(action.path)} key={action.label} className="w-full flex items-center gap-4 p-4 rounded-3xl border border-transparent hover:border-brand-earth/10 hover:bg-brand-offwhite transition-all group">
                  <div className={`w-10 h-10 rounded-xl ${action.color} flex items-center justify-center`}>
                    <action.icon size={18} />
                  </div>
                  <div className="text-left flex-1">
                    <p className="text-xs font-black text-brand-slate tracking-tight">{action.label}</p>
                    <p className="text-[10px] text-brand-slate/40 font-medium">{action.desc}</p>
                  </div>
                  <ChevronRight size={14} className="text-brand-slate/20 group-hover:text-brand-earth group-hover:translate-x-1 transition-all" />
                </button>
              ))}
            </div>
          </div>

          {/* Regional Advisory */}
          <div className="p-8 rounded-[40px] bg-brand-gold/5 border border-brand-gold/10">
             <h4 className="text-xs font-black text-brand-gold uppercase tracking-[0.2em] mb-4">District Advisory</h4>
             <p className="text-sm font-black text-brand-slate leading-none mb-1">Kharif Season Alert</p>
             <p className="text-xs text-brand-slate/40 leading-relaxed">
               Seed distribution for Tiruppur district starts April 15. Ensure your land documents are updated in the registry to avoid delays.
             </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default FarmerDashboard;
