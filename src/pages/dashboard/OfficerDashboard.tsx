import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ClipboardCheck, 
  Users, 
  MessageSquare, 
  AlertCircle, 
  Search, 
  Filter, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  ChevronRight, 
  FileText,
  ShieldCheck,
  Cpu,
  Zap,
  Activity,
  ArrowUpRight,
  TrendingDown,
  TrendingUp,
  Inbox
} from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { useAuthStore } from '../../store/authStore';
import { toast } from 'sonner';

const OfficerDashboard = () => {
  const { profile } = useAuthStore();
  const [stats, setStats] = useState({
    pendingReviews: 0,
    flaggedApps: 0,
    resolvedGrievances: 0,
    totalFarmersDistrict: 0
  });
  const [pendingApplications, setPendingApplications] = useState<any[]>([]);
  const [recentGrievances, setRecentGrievances] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOfficerData();
  }, [profile]);

  const fetchOfficerData = async () => {
    if (!profile) return;
    setLoading(true);
    try {
      // Fetch Stats
      const { count: pendingCount } = await supabase
        .from('applications')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'pending');

      const { count: flaggedCount } = await supabase
        .from('applications')
        .select('*', { count: 'exact', head: true })
        .lt('ai_score', 70);

      const { count: farmerCount } = await supabase
        .from('farmer_profiles')
        .select('*', { count: 'exact', head: true });

      setStats({
        pendingReviews: pendingCount || 0,
        flaggedApps: flaggedCount || 0,
        resolvedGrievances: 12, // Demo data
        totalFarmersDistrict: farmerCount || 0
      });

      // Fetch Pending Applications with Farmer & Scheme details
      const { data: apps } = await supabase
        .from('applications')
        .select('*, profiles:farmer_id(full_name, email), schemes(title, category)')
        .eq('status', 'pending')
        .order('submitted_at', { ascending: false })
        .limit(5);
      
      setPendingApplications(apps || []);

      // Fetch Recent Grievances
      const { data: grievances } = await supabase
        .from('grievances')
        .select('*, profiles:farmer_id(full_name)')
        .order('created_at', { ascending: false })
        .limit(3);
      
      setRecentGrievances(grievances || []);

    } catch (error) {
      console.error('Error fetching officer data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'text-red-600 bg-red-100 border-red-200';
      case 'high': return 'text-brand-gold bg-brand-gold/10 border-brand-gold/20';
      case 'medium': return 'text-blue-600 bg-blue-100 border-blue-200';
      default: return 'text-slate-600 bg-slate-100 border-slate-200';
    }
  };

  const StatPanel = ({ icon: Icon, label, value, subtext, color, trend }: any) => (
    <motion.div 
      whileHover={{ y: -5 }}
      className="glass-card p-10 rounded-[48px] border border-brand-earth/5 hover:border-brand-gold/30 transition-all group overflow-hidden relative"
    >
      <div className={`absolute top-0 right-0 w-32 h-32 ${color}/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-700`} />
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-8">
           <div className={`w-14 h-14 rounded-2xl ${color} flex items-center justify-center text-white shadow-xl shadow-${color.split('-')[1]}/20 group-hover:rotate-3 group-hover:scale-110 transition-all`}>
             <Icon size={28} />
           </div>
           {trend && (
             <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${trend > 0 ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}>
                {trend > 0 ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                {Math.abs(trend)}%
             </div>
           )}
        </div>
        <p className="text-[10px] font-black text-brand-slate/40 uppercase tracking-[0.3em] mb-2">{label}</p>
        <p className="text-4xl font-black text-brand-slate tracking-tighter">{value}</p>
        <p className="text-xs font-bold text-brand-slate/30 mt-4 flex items-center gap-2">
          <CheckCircle2 size={14} className="text-brand-earth/40" />
          {subtext}
        </p>
      </div>
    </motion.div>
  );

  return (
    <div className="space-y-12 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-gold/10 text-brand-gold text-[10px] font-black uppercase tracking-widest border border-brand-gold/20 mb-4">
            <Cpu size={12} /> Regional Admin Node
          </div>
          <h1 className="text-6xl font-black text-brand-slate tracking-tight leading-none mb-2 underline decoration-brand-gold/20 decoration-8 underline-offset-8">Admin <span className="text-brand-gold">Desk.</span></h1>
          <p className="text-xl font-medium text-brand-slate/40">Agriculture Officer Dashboard for Regional Services & Verification.</p>
        </div>
        <div className="flex items-center gap-5">
           <div className="hidden md:flex flex-col items-end px-6 border-r border-brand-earth/10">
             <span className="text-[10px] font-black text-brand-slate/30 uppercase tracking-widest mb-1">Queue Status</span>
             <span className="text-xs font-black text-brand-gold">ACTIVE LOAD: HIGH</span>
           </div>
           <button className="px-8 py-4 rounded-3xl bg-brand-deep text-white text-xs font-black uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-2xl shadow-brand-deep/30 flex items-center gap-2">
             <Inbox size={18} /> Open Service Queue
           </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <StatPanel 
          icon={ClipboardCheck} 
          label="Review Queue" 
          value={stats.pendingReviews} 
          subtext="Pending farmer applications"
          color="bg-brand-earth"
          trend={12}
        />
        <StatPanel 
          icon={AlertCircle} 
          label="AI Exceptions" 
          value={stats.flaggedApps} 
          subtext="Flagged for manual review"
          color="bg-red-500"
          trend={-4}
        />
        <StatPanel 
          icon={MessageSquare} 
          label="Support Node" 
          value={stats.resolvedGrievances} 
          subtext="Grievances handled this month"
          color="bg-brand-gold"
          trend={24}
        />
        <StatPanel 
          icon={Users} 
          label="District Farmers" 
          value={stats.totalFarmersDistrict} 
          subtext="Digitized in Tiruppur region"
          color="bg-brand-slate"
          trend={8}
        />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-12">
        {/* Main Review Section */}
        <div className="xl:col-span-2 space-y-12">
          
          <div className="glass-card rounded-[60px] p-12 border border-brand-earth/5 relative overflow-hidden group shadow-3xl">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-gold/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 pointer-events-none group-hover:scale-110 transition-transform duration-1000" />
            
            <div className="flex items-center justify-between mb-12 relative z-10">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-[24px] bg-brand-earth/10 flex items-center justify-center text-brand-earth border border-brand-earth/10">
                  <Activity size={32} />
                </div>
                <div>
                  <h3 className="text-2xl font-black text-brand-slate tracking-tight leading-none mb-2">Priority Review Queue</h3>
                  <p className="text-[11px] font-black text-brand-slate/30 uppercase tracking-[0.3em]">AI Sorted Applications • High Confidence</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <button className="w-10 h-10 rounded-2xl glass-card flex items-center justify-center text-brand-slate/40 hover:text-brand-earth transition-all">
                  <Filter size={18} />
                </button>
                <button className="px-6 py-2.5 rounded-2xl glass-card border border-brand-earth/10 text-[10px] font-black uppercase text-brand-slate tracking-widest hover:bg-white transition-all">
                  View Full Registry
                </button>
              </div>
            </div>

            <div className="space-y-6 relative z-10">
              {loading ? (
                Array(3).fill(0).map((_, i) => (
                  <div key={i} className="h-28 bg-brand-slate/5 animate-pulse rounded-[36px]" />
                ))
              ) : pendingApplications.length > 0 ? (
                pendingApplications.map((app) => (
                  <motion.div 
                    key={app.id}
                    layoutId={app.id}
                    className="p-8 bg-white/50 border border-brand-earth/5 rounded-[40px] hover:border-brand-gold/40 hover:bg-white transition-all group cursor-pointer shadow-sm hover:shadow-2xl"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-6">
                        <div className="w-16 h-16 rounded-[20px] bg-brand-slate/5 flex items-center justify-center text-brand-slate/40 group-hover:bg-brand-earth group-hover:text-white transition-all shadow-inner">
                          <FileText size={24} />
                        </div>
                        <div>
                          <div className="flex items-center gap-3">
                            <p className="text-lg font-black text-brand-slate">{app.profiles?.full_name}</p>
                            <span className="px-2.5 py-1 rounded-full bg-brand-gold/10 text-brand-gold text-[9px] font-black uppercase tracking-widest">{app.schemes?.category}</span>
                          </div>
                          <p className="text-sm font-bold text-brand-slate/40 mt-1">{app.schemes?.title}</p>
                          <div className="flex items-center gap-4 mt-3">
                             <div className="flex items-center gap-1.5 text-[10px] font-black text-brand-slate/30 uppercase tracking-widest">
                               <Clock size={11} /> {new Date(app.submitted_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                             </div>
                             <div className="w-px h-3 bg-brand-slate/10" />
                             <div className="flex items-center gap-1.5 text-[10px] font-black text-brand-earth uppercase tracking-widest">
                               <Zap size={11} fill="currentColor" /> AI Score: {app.ai_score}%
                             </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-8">
                         <div className="text-right hidden sm:block">
                            <p className="text-[9px] font-black text-brand-slate/20 uppercase tracking-widest mb-1">Status node</p>
                            <span className="text-[10px] font-black text-brand-gold animate-pulse uppercase tracking-[0.2em]">{app.status.replace('_', ' ')}</span>
                         </div>
                         <button className="w-14 h-14 rounded-[20px] bg-brand-offwhite border border-brand-earth/10 flex items-center justify-center text-brand-slate opacity-20 group-hover:opacity-100 group-hover:bg-brand-earth group-hover:text-white group-hover:scale-110 transition-all shadow-xl shadow-transparent group-hover:shadow-brand-earth/20">
                            <ChevronRight size={24} />
                         </button>
                      </div>
                    </div>
                  </motion.div>
                ))
              ) : (
                <div className="p-24 text-center">
                   <div className="w-20 h-20 rounded-[28px] bg-brand-slate/5 flex items-center justify-center text-brand-slate/20 mx-auto mb-6">
                      <CheckCircle2 size={40} />
                   </div>
                   <p className="text-sm font-black text-brand-slate/30 uppercase tracking-[0.25em]">Registry Queue Empty</p>
                   <p className="text-xs font-bold text-brand-slate/20 mt-2">All applications processed for your district.</p>
                </div>
              )}
            </div>
          </div>

          {/* District Performance AI Insights */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
             <div className="glass-card-dark p-8 rounded-[48px] overflow-hidden relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-brand-gold/10 to-transparent pointer-events-none" />
                <div className="relative z-10 flex items-center gap-4 mb-6">
                   <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-brand-gold">
                      <TrendingUp size={24} />
                   </div>
                   <h4 className="text-lg font-black text-white tracking-tight">System Productivity</h4>
                </div>
                <div className="space-y-4 relative z-10">
                   <p className="text-sm font-medium text-white/50 leading-relaxed">
                     District approval velocity increased by <span className="text-brand-gold font-black italic">14.2%</span> compared to last month. AI automated verification is handling <span className="text-white font-bold">78%</span> of documentation triage.
                   </p>
                   <div className="h-40 bg-white/5 rounded-[32px] border border-white/5 flex items-end justify-between p-6 overflow-hidden">
                      {[40, 65, 45, 90, 70, 85, 95].map((h, i) => (
                        <motion.div 
                          initial={{ height: 0 }}
                          animate={{ height: `${h}%` }}
                          transition={{ delay: i * 0.1, duration: 1 }}
                          key={i} 
                          className="w-4 bg-brand-gold/40 rounded-t-lg group-hover:bg-brand-gold transition-colors shadow-2xl shadow-brand-gold/20"
                        />
                      ))}
                   </div>
                </div>
             </div>

             <div className="glass-card p-10 rounded-[48px] border border-brand-earth/5 group">
                <div className="flex items-center gap-4 mb-8">
                   <div className="w-12 h-12 rounded-2xl bg-brand-earth/10 flex items-center justify-center text-brand-earth">
                      <ShieldCheck size={24} />
                   </div>
                   <h4 className="text-lg font-black text-brand-slate tracking-tight">Trust Registry Status</h4>
                </div>
                <div className="space-y-6">
                   {[
                     { label: "Valid Document Hub", val: "94.8%" },
                     { label: "Duplicate Entry Check", val: "100%" },
                     { label: "Farmer Verification Rate", val: "88.2%" }
                   ].map(item => (
                     <div key={item.label}>
                       <div className="flex justify-between items-center mb-2">
                         <span className="text-[10px] font-black text-brand-slate/40 uppercase tracking-widest">{item.label}</span>
                         <span className="text-xs font-black text-brand-slate">{item.val}</span>
                       </div>
                       <div className="w-full h-1.5 bg-brand-slate/5 rounded-full overflow-hidden">
                         <motion.div 
                           initial={{ width: 0 }}
                           animate={{ width: item.val }}
                           transition={{ duration: 1 }}
                           className="h-full bg-brand-earth"
                         />
                       </div>
                     </div>
                   ))}
                </div>
             </div>
          </div>
        </div>

        {/* Support & Alerts Section */}
        <div className="space-y-12">
          
          {/* Recent Grievances Hub */}
          <div className="glass-card-dark bg-brand-slate rounded-[48px] p-10 border border-white/5 relative overflow-hidden group shadow-3xl">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-tr from-brand-gold/10 to-transparent pointer-events-none opacity-40 group-hover:opacity-60 transition-opacity" />
            
            <div className="flex items-center justify-between mb-10 relative z-10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-white/10 flex items-center justify-center text-brand-gold">
                   <MessageSquare size={20} />
                </div>
                <h3 className="text-lg font-black text-white tracking-tight uppercase">Support Hub</h3>
              </div>
              <span className="w-6 h-6 rounded-full bg-red-500 text-white text-[10px] font-black flex items-center justify-center shadow-lg shadow-red-500/30">2</span>
            </div>

            <div className="space-y-5 relative z-10">
               {recentGrievances.map((g) => (
                 <div key={g.id} className="p-6 bg-white/5 border border-white/10 rounded-[32px] hover:bg-white/10 transition-all cursor-pointer group/item">
                    <div className="flex items-center justify-between mb-3">
                       <span className={`px-2.5 py-1 rounded-full text-[8px] font-black uppercase tracking-widest border ${getPriorityColor(g.priority)}`}>
                         {g.priority} PRIORITY
                       </span>
                       <span className="text-[9px] font-bold text-white/30">{new Date(g.created_at).toLocaleDateString()}</span>
                    </div>
                    <p className="text-sm font-black text-white mb-1 group-hover/item:text-brand-gold transition-colors">{g.title}</p>
                    <p className="text-[10px] font-bold text-white/30 uppercase tracking-widest leading-none">Farmer: {g.profiles?.full_name}</p>
                    <div className="flex items-center justify-between mt-6">
                       <div className="flex items-center -space-x-2">
                          {[1,2].map(i => (
                            <div key={i} className="w-6 h-6 rounded-full border-2 border-brand-slate bg-brand-gold text-brand-deep text-[8px] font-black flex items-center justify-center">O</div>
                          ))}
                          <div className="w-12 h-6 flex items-center justify-center text-[8px] font-bold text-white/20 ml-2">Assigned</div>
                       </div>
                       <ArrowUpRight size={16} className="text-white/20 group-hover/item:text-white transition-all translate-y-1 -translate-x-1" />
                    </div>
                 </div>
               ))}
            </div>

            <button className="w-full py-4 rounded-[24px] bg-white text-brand-deep font-black text-xs uppercase tracking-widest hover:scale-105 active:scale-95 transition-all mt-8">
               Resolve Support Queue
            </button>
          </div>

          {/* Quick Registry Stats */}
          <div className="glass-card p-10 rounded-[48px] border border-brand-gold/5">
             <h4 className="text-[10px] font-black text-brand-slate/40 uppercase tracking-[0.3em] mb-8 ml-2 text-center">Platform Registry Analytics</h4>
             <div className="space-y-8">
                <div className="flex items-center justify-between gap-6">
                   <div className="flex-1">
                      <p className="text-2xl font-black text-brand-slate tracking-tight">85,210</p>
                      <p className="text-[10px] font-black text-brand-slate/30 uppercase tracking-widest mt-1">Certified Farmers</p>
                   </div>
                   <div className="flex-1 text-right">
                      <p className="text-2xl font-black text-brand-earth tracking-tight">₹42.8M</p>
                      <p className="text-[10px] font-black text-brand-slate/30 uppercase tracking-widest mt-1">Disbursed Subsidies</p>
                   </div>
                </div>
                <div className="h-px w-full bg-brand-slate/5" />
                <div className="space-y-4">
                   <div className="flex items-center justify-between text-xs font-bold">
                      <span className="text-brand-slate/40 uppercase tracking-widest text-[9px]">Server Trust Level</span>
                      <span className="text-brand-earth">EXCELLENT</span>
                   </div>
                   <div className="flex items-center justify-between text-xs font-bold">
                      <span className="text-brand-slate/40 uppercase tracking-widest text-[9px]">Grievance Resolution</span>
                      <span className="text-brand-slate">98.2%</span>
                   </div>
                </div>
             </div>
          </div>

          {/* Regional Information Node */}
          <div className="p-10 rounded-[48px] bg-brand-earth/5 border border-brand-earth/10 group relative overflow-hidden">
             <div className="absolute top-0 right-0 w-24 h-24 bg-brand-earth/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
             <h4 className="text-xs font-black text-brand-earth uppercase tracking-[0.2em] mb-6">Regional Protocol</h4>
             <p className="text-[10px] text-brand-slate/50 leading-relaxed font-bold uppercase tracking-widest mb-2">District: TIRUPPUR-COIMBATORE</p>
             <p className="text-sm font-black text-brand-slate mb-4 leading-tight">Monthly Scheme Audit: <br /><span className="text-brand-earth underline decoration-2 underline-offset-4 decoration-brand-earth/20">Active Session</span></p>
             <button className="text-[10px] font-black text-brand-earth uppercase tracking-widest flex items-center gap-2 group/btn">
               Download Operational Manual <ArrowUpRight size={14} className="group-hover/btn:rotate-45 transition-transform" />
             </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default OfficerDashboard;
