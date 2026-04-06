import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  FileText, 
  Search, 
  Filter, 
  ChevronRight, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  AlertCircle,
  Eye,
  Download,
  MoreVertical,
  ArrowUpRight
} from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { useAuthStore } from '../../store/authStore';

const ApplicationRegistry = () => {
  const { profile } = useAuthStore();
  const [applications, setApplications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchApplications();
  }, [profile]);

  const fetchApplications = async () => {
    if (!profile) return;
    setLoading(true);
    try {
      const { data } = await supabase
        .from('applications')
        .select('*, schemes(title, category)')
        .eq('farmer_id', profile.id)
        .order('submitted_at', { ascending: false });
      setApplications(data || []);
    } catch (error) {
      console.error('Error fetching applications:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-green-500/10 text-green-500 border-green-500/20';
      case 'rejected': return 'bg-red-500/10 text-red-500 border-red-500/20';
      case 'pending': return 'bg-brand-gold/10 text-brand-gold border-brand-gold/20';
      case 'under_review': return 'bg-blue-500/10 text-blue-500 border-blue-500/20';
      case 'correction_required': return 'bg-purple-500/10 text-purple-500 border-purple-500/20';
      default: return 'bg-brand-slate/5 text-brand-slate/40 border-brand-slate/10';
    }
  };

  const filteredApps = applications.filter(app => filter === 'all' || app.status === filter);

  return (
    <div className="space-y-12 max-w-7xl mx-auto">
      <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-10">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-earth/10 text-brand-earth text-[10px] font-black uppercase tracking-widest border border-brand-earth/20 mb-6">
            <FileText size={12} /> Digital Submission Logs
          </div>
          <h1 className="text-7xl font-black text-brand-slate tracking-tighter leading-[0.9] mb-4">Registry <span className="text-brand-earth">Archive.</span></h1>
          <p className="text-xl font-medium text-brand-slate/40 max-w-xl">Comprehensive history of your scheme applications and verification status.</p>
        </div>
        
        <div className="flex flex-col md:flex-row gap-4 items-center">
           <div className="flex p-1.5 rounded-[28px] bg-brand-slate/5 border border-brand-earth/5 backdrop-blur-xl shrink-0">
              {['all', 'pending', 'approved', 'under_review'].map(f => (
                <button 
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-6 py-3 rounded-[22px] text-[10px] font-black uppercase tracking-widest transition-all ${
                    filter === f ? 'bg-brand-earth text-white shadow-xl shadow-brand-earth/30' : 'text-brand-slate/40 hover:text-brand-earth'
                  }`}
                >
                  {f.replace('_', ' ')}
                </button>
              ))}
           </div>
           <button className="px-8 py-4 rounded-[28px] bg-brand-deep text-white text-[10px] font-black uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-xl shadow-brand-deep/20 flex items-center gap-2">
              <Download size={16} /> Export Logs
           </button>
        </div>
      </div>

      <div className="glass-card rounded-[56px] border border-brand-earth/5 overflow-hidden shadow-3xl bg-white/40">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-brand-earth/5">
                <th className="px-10 py-8 text-[10px] font-black text-brand-slate/30 uppercase tracking-[0.2em]">Scheme Module</th>
                <th className="px-10 py-8 text-[10px] font-black text-brand-slate/30 uppercase tracking-[0.2em]">Category</th>
                <th className="px-10 py-8 text-[10px] font-black text-brand-slate/30 uppercase tracking-[0.2em]">Submitted Date</th>
                <th className="px-10 py-8 text-[10px] font-black text-brand-slate/30 uppercase tracking-[0.2em]">AI Confidence</th>
                <th className="px-10 py-8 text-[10px] font-black text-brand-slate/30 uppercase tracking-[0.2em]">Registry Status</th>
                <th className="px-10 py-8 text-[10px] font-black text-brand-slate/30 uppercase tracking-[0.2em]">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-earth/5">
              {loading ? (
                Array(5).fill(0).map((_, i) => (
                  <tr key={i} className="animate-pulse">
                    <td colSpan={6} className="px-10 py-8"><div className="h-4 bg-brand-slate/5 rounded-full w-full" /></td>
                  </tr>
                ))
              ) : filteredApps.length > 0 ? (
                filteredApps.map((app) => (
                  <motion.tr 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    key={app.id} 
                    className="group hover:bg-white transition-colors"
                  >
                    <td className="px-10 py-8">
                       <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-2xl bg-brand-offwhite flex items-center justify-center text-brand-earth group-hover:bg-brand-earth group-hover:text-white transition-all shadow-inner">
                             <FileText size={20} />
                          </div>
                          <div>
                             <p className="text-sm font-black text-brand-slate">{app.schemes?.title}</p>
                             <p className="text-[10px] font-bold text-brand-slate/20 uppercase tracking-widest mt-1">ID: {app.id.substring(0, 8)}</p>
                          </div>
                       </div>
                    </td>
                    <td className="px-10 py-8">
                       <span className="px-3 py-1.5 rounded-full bg-brand-slate/5 text-[9px] font-black text-brand-slate/40 uppercase tracking-widest border border-brand-slate/10">{app.schemes?.category}</span>
                    </td>
                    <td className="px-10 py-8">
                       <div className="flex items-center gap-2 text-xs font-bold text-brand-slate/60">
                          <Clock size={14} className="opacity-30" />
                          {new Date(app.submitted_at).toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' })}
                       </div>
                    </td>
                    <td className="px-10 py-8">
                        <div className="flex items-center gap-3">
                           <div className="w-16 h-1.5 bg-brand-slate/5 rounded-full overflow-hidden">
                              <motion.div 
                                initial={{ width: 0 }}
                                animate={{ width: `${app.ai_score}%` }}
                                className="h-full bg-brand-gold" 
                              />
                           </div>
                           <span className="text-[10px] font-black text-brand-gold">{app.ai_score}%</span>
                        </div>
                    </td>
                    <td className="px-10 py-8">
                       <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border-2 text-[10px] font-black uppercase tracking-widest ${getStatusStyle(app.status)}`}>
                          <div className={`w-1.5 h-1.5 rounded-full ${app.status === 'approved' ? 'bg-green-500' : app.status === 'rejected' ? 'bg-red-500' : 'bg-brand-gold'} animate-pulse`} />
                          {app.status.replace('_', ' ')}
                       </div>
                    </td>
                    <td className="px-10 py-8">
                       <div className="flex items-center gap-3">
                          <button className="p-3 rounded-2xl bg-brand-offwhite text-brand-slate/40 hover:text-brand-earth hover:bg-brand-earth/10 transition-all border border-brand-earth/5 shadow-inner">
                             <Eye size={18} />
                          </button>
                          <button className="p-3 rounded-2xl bg-brand-offwhite text-brand-slate/40 hover:text-brand-earth hover:bg-brand-earth/10 transition-all border border-brand-earth/5 shadow-inner">
                             <MoreVertical size={18} />
                          </button>
                       </div>
                    </td>
                  </motion.tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-10 py-24 text-center">
                    <div className="w-20 h-20 rounded-[28px] bg-brand-slate/5 flex items-center justify-center text-brand-slate/20 mx-auto mb-6">
                       <Search size={32} />
                    </div>
                    <p className="text-sm font-black text-brand-slate/30 uppercase tracking-[0.2em]">No registry matches found</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* Help Footer */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
         <div className="p-10 rounded-[48px] bg-brand-gold/5 border border-brand-gold/10 group flex items-center justify-between">
            <div className="flex items-center gap-6">
               <div className="w-14 h-14 rounded-2xl bg-brand-gold/10 flex items-center justify-center text-brand-gold transition-transform group-hover:scale-110">
                  <AlertCircle size={28} />
               </div>
               <div>
                  <h4 className="text-lg font-black text-brand-slate leading-none mb-1 uppercase tracking-tight">Need to modify?</h4>
                  <p className="text-sm font-medium text-brand-slate/40">Open a correction request for pending files.</p>
               </div>
            </div>
            <button className="w-12 h-12 rounded-2xl bg-white border border-brand-earth/10 flex items-center justify-center text-brand-slate hover:text-brand-gold transition-all">
               <ArrowUpRight size={20} />
            </button>
         </div>
         <div className="p-10 rounded-[48px] bg-brand-earth/5 border border-brand-earth/10 group flex items-center justify-between">
            <div className="flex items-center gap-6">
               <div className="w-14 h-14 rounded-2xl bg-brand-earth/10 flex items-center justify-center text-brand-earth transition-transform group-hover:scale-110">
                  <CheckCircle2 size={28} />
               </div>
               <div>
                  <h4 className="text-lg font-black text-brand-slate leading-none mb-1 uppercase tracking-tight">Verified Status</h4>
                  <p className="text-sm font-medium text-brand-slate/40">Download your digital certificates here.</p>
               </div>
            </div>
            <button className="w-12 h-12 rounded-2xl bg-white border border-brand-earth/10 flex items-center justify-center text-brand-slate hover:text-brand-earth transition-all">
               <ArrowUpRight size={20} />
            </button>
         </div>
      </div>
    </div>
  );
};

export default ApplicationRegistry;
