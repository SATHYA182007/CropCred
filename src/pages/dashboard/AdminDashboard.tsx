import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  BarChart3, 
  ShieldCheck, 
  Activity, 
  TrendingUp, 
  TrendingDown, 
  Database, 
  Cpu, 
  Globe, 
  Lock,
  ChevronRight,
  Layers,
  ArrowUpRight,
  Filter,
  Search,
  Bell,
  Settings,
  AlertTriangle
} from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { useAuthStore } from '../../store/authStore';

const AdminDashboard = () => {
  const { profile } = useAuthStore();
  const [stats, setStats] = useState({
    totalFarmers: 0,
    totalOfficers: 0,
    totalApplications: 0,
    approvalRate: 0,
    totalDisbursed: 0,
    systemUptime: '99.98%'
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAdminData();
  }, [profile]);

  const fetchAdminData = async () => {
    setLoading(true);
    try {
      const { count: farmerCount } = await supabase.from('profiles').select('*', { count: 'exact', head: true }).eq('role', 'farmer');
      const { count: officerCount } = await supabase.from('profiles').select('*', { count: 'exact', head: true }).eq('role', 'officer');
      const { count: appCount } = await supabase.from('applications').select('*', { count: 'exact', head: true });
      
      const { data: approvedApps } = await supabase.from('applications').select('id').eq('status', 'approved');
      const approveRate = appCount ? (approvedApps ? (approvedApps.length / appCount) * 100 : 0) : 0;

      const { data: schemes } = await supabase.from('schemes').select('max_amount');
      const totalPotential = schemes?.reduce((acc, s) => acc + (Number(s.max_amount) || 0), 0) || 0;

      setStats({
        totalFarmers: farmerCount || 0,
        totalOfficers: officerCount || 0,
        totalApplications: appCount || 0,
        approvalRate: Math.round(approveRate),
        totalDisbursed: 42.8, // Demo: in Millions
        systemUptime: '99.98%'
      });
    } catch (error) {
      console.error('Error fetching admin data:', error);
    } finally {
      setLoading(false);
    }
  };

  const AnalyticCard = ({ icon: Icon, label, value, subtext, trend, color }: any) => (
    <motion.div 
      whileHover={{ y: -5 }}
      className="glass-card-dark p-10 rounded-[56px] border border-white/5 hover:border-brand-gold/40 transition-all group relative overflow-hidden"
    >
      <div className={`absolute top-0 right-0 w-40 h-40 ${color}/5 rounded-full blur-[60px] -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-1000`} />
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-8">
           <div className={`w-16 h-16 rounded-[24px] ${color}/10 border border-${color}/20 flex items-center justify-center text-brand-gold shadow-2xl`}>
             <Icon size={32} />
           </div>
           {trend && (
             <div className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${trend > 0 ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'}`}>
                {trend > 0 ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                {Math.abs(trend)}%
             </div>
           )}
        </div>
        <p className="text-[10px] font-black text-white/30 uppercase tracking-[0.4em] mb-3">{label}</p>
        <p className="text-5xl font-black text-white tracking-tighter leading-none mb-6">{value}</p>
        <div className="flex items-center gap-2 text-[10px] font-black text-white/20 uppercase tracking-widest">
           <Activity size={14} className="text-brand-gold" />
           {subtext}
        </div>
      </div>
    </motion.div>
  );

  return (
    <div className="space-y-12 max-w-7xl mx-auto">
      {/* Header Layer */}
      <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-10">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-gold/10 text-brand-gold text-[10px] font-black uppercase tracking-widest border border-brand-gold/20 mb-6">
            <Lock size={12} /> Root Administrative Access
          </div>
          <h1 className="text-7xl font-black text-brand-slate tracking-tighter leading-[0.9] mb-4">Control <span className="text-brand-earth">Center.</span></h1>
          <p className="text-xl font-medium text-brand-slate/40 max-w-xl">Central Oversight & Nationwide Agriculture Statistics for District Department Heads.</p>
        </div>
        <div className="flex flex-wrap gap-4">
           <div className="px-8 py-4 rounded-[32px] glass-card border border-brand-earth/10 flex items-center gap-4 bg-white/50 shadow-2xl">
              <div className="w-10 h-10 rounded-2xl bg-green-500/10 flex items-center justify-center text-green-500">
                 <Activity size={24} />
              </div>
              <div className="text-left">
                 <p className="text-[9px] font-black text-brand-slate/30 uppercase tracking-widest leading-none mb-1">System Health</p>
                 <p className="text-sm font-black text-brand-slate">OPTIMAL PERFORMANCE</p>
              </div>
           </div>
           <button className="px-8 py-5 rounded-[32px] bg-brand-slate text-white text-xs font-black uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-2xl shadow-brand-slate/30 flex items-center gap-3">
             <Layers size={18} /> Scheme Management
           </button>
        </div>
      </div>

      {/* Primary Analytics Ridge */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        <AnalyticCard 
          icon={Users} 
          label="Farmer Population" 
          value={stats.totalFarmers.toLocaleString()} 
          subtext="Verified digital identities"
          color="bg-brand-gold"
          trend={14}
        />
        <AnalyticCard 
          icon={Database} 
          label="Service Applications" 
          value={stats.totalApplications.toLocaleString()} 
          subtext="Registry-managed packets"
          color="bg-blue-500"
          trend={8.2}
        />
        <AnalyticCard 
          icon={ShieldCheck} 
          label="Verification Success" 
          value={`${stats.approvalRate}%`} 
          subtext="Admin approval pipeline"
          color="bg-green-500"
          trend={2.4}
        />
      </div>

      <div className="grid grid-cols-1 xl:max-w-none xl:grid-cols-12 gap-12">
        {/* Real-time Insights Module (Main) */}
        <div className="xl:col-span-8 space-y-12">
           <div className="glass-card-dark bg-premium-dark rounded-[64px] p-16 border border-white/5 relative overflow-hidden group shadow-3xl">
              <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-brand-gold/10 to-transparent pointer-events-none opacity-40 group-hover:opacity-60 transition-opacity" />
              
              <div className="flex items-center justify-between mb-16 relative z-10">
                <div className="flex items-center gap-5">
                  <div className="w-16 h-16 rounded-[28px] bg-brand-gold/10 border border-brand-gold/20 flex items-center justify-center text-brand-gold shadow-2xl transition-transform group-hover:rotate-6">
                    <BarChart3 size={32} />
                  </div>
                  <div>
                    <h3 className="text-3xl font-black text-white tracking-tight leading-none mb-3">Nationwide Agri-Status</h3>
                    <p className="text-[11px] font-black text-white/30 uppercase tracking-[0.4em]">Multi-District Synchronization • Live Feed</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="px-6 py-2 rounded-full border border-white/10 text-[9px] font-black text-white/40 uppercase tracking-widest flex items-center gap-2">
                    <Globe size={12} className="text-blue-400" /> SYNC: STABLE
                  </div>
                </div>
              </div>

              {/* Data Visualization Placeholder / Custom Grid */}
              <div className="relative z-10 h-80 flex items-end justify-between gap-6 px-4">
                  {[35, 60, 45, 80, 55, 95, 75, 40, 85, 65, 90, 75].map((h, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center group/bar">
                      <motion.div 
                        initial={{ height: 0 }}
                        animate={{ height: `${h}%` }}
                        transition={{ delay: i * 0.05, duration: 1.2, ease: "circOut" }}
                        className="w-full bg-gradient-to-t from-brand-gold/20 to-brand-gold rounded-t-2xl shadow-xl shadow-brand-gold/10 group-hover/bar:from-brand-gold/40 group-hover/bar:to-white transition-all relative overflow-hidden"
                      >
                         <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(90deg,transparent_0%,rgba(255,255,255,0.1)_50%,transparent_100%)] animate-[shimmer_2s_infinite]" />
                      </motion.div>
                      <span className="text-[9px] font-black text-white/20 uppercase tracking-widest mt-6 group-hover/bar:text-brand-gold transition-colors">D-{i+1}</span>
                    </div>
                  ))}
              </div>

              <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-10 relative z-10 border-t border-white/5 pt-16">
                 <div>
                    <p className="text-[10px] font-black text-white/30 uppercase tracking-widest mb-2">Registry Velocity</p>
                    <p className="text-2xl font-black text-white">+24.8% <span className="text-xs text-green-400">INC</span></p>
                    <div className="w-full h-1 bg-white/5 rounded-full mt-4">
                       <div className="w-[74%] h-full bg-brand-gold shadow-[0_0_10px_#D4AF37]" />
                    </div>
                 </div>
                 <div>
                    <p className="text-[10px] font-black text-white/30 uppercase tracking-widest mb-2">Officer Utilization</p>
                    <p className="text-2xl font-black text-white">88.2% <span className="text-xs text-brand-gold">HIGH</span></p>
                    <div className="w-full h-1 bg-white/5 rounded-full mt-4">
                       <div className="w-[88%] h-full bg-blue-500 shadow-[0_0_10px_-#3B82F6]" />
                    </div>
                 </div>
                 <div>
                    <p className="text-[10px] font-black text-white/30 uppercase tracking-widest mb-2">Grievance Rate</p>
                    <p className="text-2xl font-black text-white">2.1% <span className="text-xs text-green-400">LOW</span></p>
                    <div className="w-full h-1 bg-white/5 rounded-full mt-4">
                       <div className="w-[21%] h-full bg-green-500 shadow-[0_0_10px_#22C55E]" />
                    </div>
                 </div>
              </div>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="glass-card p-12 rounded-[56px] border border-brand-earth/5 group hover:border-brand-gold/30 transition-all shadow-3xl">
                 <div className="flex items-center gap-4 mb-10">
                    <div className="w-14 h-14 rounded-[24px] bg-brand-earth/10 flex items-center justify-center text-brand-earth group-hover:bg-brand-earth group-hover:text-white transition-all">
                       <Cpu size={28} />
                    </div>
                    <h4 className="text-2xl font-black text-brand-slate tracking-tight leading-none mb-1">AI Oversight</h4>
                 </div>
                 <div className="space-y-6">
                    <p className="text-sm font-medium text-brand-slate/50 leading-relaxed">
                      Verification engine performing <span className="text-brand-slate font-black">4,200 scans/hr</span> with <span className="text-brand-gold font-black">99.2% accuracy</span> against regional databases.
                    </p>
                    <div className="p-6 bg-brand-offwhite rounded-[32px] border border-brand-gold/10">
                       <div className="flex items-center justify-between mb-4">
                          <span className="text-[10px] font-black uppercase text-brand-slate/40 tracking-widest">Confidence Index</span>
                          <span className="text-xs font-black text-brand-gold">SUPERIOR</span>
                       </div>
                       <div className="flex -space-x-2">
                          {[1,2,3,4,5].map(i => (
                            <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-brand-earth/10 text-brand-earth text-[10px] font-black flex items-center justify-center">v</div>
                          ))}
                       </div>
                    </div>
                 </div>
              </div>

              <div className="glass-card p-12 rounded-[56px] border border-brand-earth/5 group hover:border-blue-500/30 transition-all shadow-3xl">
                 <div className="flex items-center gap-4 mb-10">
                    <div className="w-14 h-14 rounded-[24px] bg-blue-500/10 flex items-center justify-center text-blue-500 group-hover:bg-blue-500 group-hover:text-white transition-all">
                       <Database size={28} />
                    </div>
                    <h4 className="text-2xl font-black text-brand-slate tracking-tight leading-none mb-1">Data Resilience</h4>
                 </div>
                 <div className="space-y-6">
                    <p className="text-sm font-medium text-brand-slate/50 leading-relaxed">
                      Secure distributed node monitoring for <span className="text-brand-slate font-black">1.4TB</span> of farmer document records stored in Supabase Vault.
                    </p>
                    <div className="p-6 bg-brand-offwhite rounded-[32px] border border-brand-earth/10">
                         <div className="flex justify-between items-center mb-1">
                            <span className="text-[9px] font-black text-brand-slate/30 uppercase tracking-widest">Registry Load</span>
                            <span className="text-[9px] font-black text-brand-slate/30 uppercase tracking-widest">42%</span>
                         </div>
                         <div className="w-full h-1.5 bg-brand-slate/5 rounded-full overflow-hidden">
                            <div className="w-[42%] h-full bg-blue-500" />
                         </div>
                         <p className="text-[10px] font-bold text-brand-slate/50 mt-4 italic">Next scheduled automated backup: 02:00 AM</p>
                    </div>
                 </div>
              </div>
           </div>
        </div>

        {/* System Activity & Reports Node (Right) */}
        <div className="xl:col-span-4 space-y-12">
           <div className="glass-card rounded-[56px] p-12 border border-brand-earth/5 shadow-3xl">
              <div className="flex items-center justify-between mb-12">
                 <h4 className="text-sm font-black text-brand-slate uppercase tracking-widest">Staff Deployment</h4>
                 <div className="w-8 h-8 rounded-full bg-brand-gold/10 text-brand-gold flex items-center justify-center"><ChevronRight size={16} /></div>
              </div>
              <div className="space-y-8">
                 {[
                   { name: "Priya Nair", role: "Senior Officer", district: "Coimbatore", status: "Active" },
                   { name: "Sanjay Gupta", role: "Verification Specialist", district: "Salem", status: "In Meeting" },
                   { name: "Anjali Menon", role: "Grievance Manager", district: "Madurai", status: "Active" }
                 ].map((staff, i) => (
                   <div key={i} className="flex items-center gap-5 group cursor-pointer">
                      <div className="w-14 h-14 rounded-2xl bg-brand-offwhite border border-brand-earth/10 flex items-center justify-center text-brand-slate font-black group-hover:bg-brand-earth group-hover:text-white transition-all shadow-inner">
                        {staff.name.charAt(0)}
                      </div>
                      <div className="flex-1 min-w-0">
                         <p className="text-sm font-black text-brand-slate truncate">{staff.name}</p>
                         <p className="text-[10px] font-bold text-brand-slate/40 uppercase tracking-widest">{staff.role} • {staff.district}</p>
                      </div>
                      <div className={`w-2 h-2 rounded-full ${staff.status === 'Active' ? 'bg-green-500' : 'bg-brand-gold'} animate-pulse`} />
                   </div>
                 ))}
                 <button className="w-full py-4 rounded-[28px] border-2 border-brand-earth/10 text-[10px] font-black uppercase text-brand-slate tracking-widest hover:bg-brand-offwhite transition-all">
                    Expand Staff Registry
                 </button>
              </div>
           </div>

           <div className="p-12 rounded-[56px] bg-red-500/5 border border-red-500/10 group relative overflow-hidden shadow-2xl">
              <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
              <div className="flex items-center gap-4 mb-10">
                 <div className="w-14 h-14 rounded-[24px] bg-red-500/10 flex items-center justify-center text-red-500 shadow-xl shadow-red-500/10 group-hover:scale-110 transition-transform">
                    <AlertTriangle size={28} />
                 </div>
                 <h4 className="text-xl font-black text-brand-slate tracking-tight leading-none mb-1">System Alerts</h4>
              </div>
              <div className="space-y-5">
                 <div className="p-5 bg-white rounded-3xl border border-red-200 shadow-sm relative group/alert">
                    <div className="flex items-center justify-between mb-2">
                       <span className="text-[10px] font-black text-red-500 uppercase tracking-widest leading-none">Security Node</span>
                       <span className="text-[9px] font-bold text-slate-300 uppercase">12m ago</span>
                    </div>
                    <p className="text-xs font-black text-brand-slate mb-1">Unauthorized Sync Attempt</p>
                    <p className="text-[10px] font-medium text-brand-slate/40 leading-relaxed mb-4">Location: Madurai Node ID: SYNC-02A. Request challenged and blocked.</p>
                    <button className="text-[10px] font-black text-brand-slate uppercase tracking-widest hover:underline flex items-center gap-1">Investigate <ArrowUpRight size={14} /></button>
                 </div>
              </div>
           </div>

           <div className="glass-card-dark bg-brand-deep rounded-[56px] p-12 border border-white/5 shadow-3xl text-center relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-brand-gold/10 to-transparent pointer-events-none opacity-40" />
              <div className="relative z-10">
                 <div className="w-20 h-20 rounded-[32px] bg-white/10 flex items-center justify-center text-brand-gold mx-auto mb-10 border border-white/10 shadow-2xl group-hover:scale-110 transition-transform">
                    <TrendingUp size={40} />
                 </div>
                 <h4 className="text-2xl font-black text-white tracking-tight leading-none mb-4">Export Stats</h4>
                 <p className="text-sm font-medium text-white/40 mb-10 max-w-xs mx-auto">Generate nationwide agriculture administration reports for the Ministry of Agriculture.</p>
                 <button className="w-full py-5 rounded-[32px] bg-brand-gold text-brand-deep font-black text-xs uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-2xl shadow-brand-gold/30">
                    Compile Audit Data
                 </button>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
