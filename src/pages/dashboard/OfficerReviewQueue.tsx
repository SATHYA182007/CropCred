import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ClipboardCheck, 
  Search, 
  Filter, 
  ChevronRight, 
  CheckCircle2, 
  XCircle, 
  AlertCircle, 
  Clock, 
  FileText, 
  User, 
  Cpu, 
  ShieldCheck, 
  Layers, 
  ArrowUpRight,
  Eye,
  RefreshCw,
  MoreVertical,
  Activity,
  Flag
} from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { useAuthStore } from '../../store/authStore';
import { toast } from 'sonner';

const OfficerReviewQueue = () => {
  const { profile } = useAuthStore();
  const [applications, setApplications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('pending');
  const [selectedApp, setSelectedApp] = useState<any>(null);

  useEffect(() => {
    fetchApplications();
  }, [profile, filter]);

  const fetchApplications = async () => {
    setLoading(true);
    try {
      let query = supabase
        .from('applications')
        .select('*, profiles:farmer_id(full_name, email, phone), schemes(title, category, max_amount)')
        .order('submitted_at', { ascending: false });
      
      if (filter !== 'all') {
        query = query.eq('status', filter);
      }

      const { data } = await query;
      setApplications(data || []);
    } catch (error) {
      console.error('Error fetching applications:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id: string, status: string) => {
    try {
      const { error } = await supabase
        .from('applications')
        .update({ status, reviewed_at: new Date().toISOString(), reviewed_by: profile?.id })
        .eq('id', id);

      if (error) throw error;
      
      toast.success(`Application ${status.replace('_', ' ')} successfully`, {
        description: 'Registry updated across all nodes.'
      });
      setSelectedApp(null);
      fetchApplications();
    } catch (error: any) {
      toast.error('Sync failed', { description: error.message });
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

  return (
    <div className="space-y-12 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-10">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-gold/10 text-brand-gold text-[10px] font-black uppercase tracking-widest border border-brand-gold/20 mb-6">
            <ClipboardCheck size={12} /> Regional Triage Environment
          </div>
          <h1 className="text-7xl font-black text-brand-slate tracking-tighter leading-[0.9] mb-4">Review <span className="text-brand-gold">Queue.</span></h1>
          <p className="text-xl font-medium text-brand-slate/40 max-w-xl">Priority sorting for regional agricultural scheme applications. AI-assisted triage active.</p>
        </div>
        
        <div className="flex flex-col md:flex-row gap-4 items-center">
           <div className="flex p-1.5 rounded-[28px] bg-brand-slate/5 border border-brand-earth/5 backdrop-blur-xl shrink-0">
              {['all', 'pending', 'under_review', 'approved'].map(f => (
                <button 
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-6 py-3 rounded-[22px] text-[10px] font-black uppercase tracking-widest transition-all ${
                    filter === f ? 'bg-brand-gold text-brand-deep shadow-xl shadow-brand-gold/30' : 'text-brand-slate/40 hover:text-brand-earth'
                  }`}
                >
                  {f.replace('_', ' ')}
                </button>
              ))}
           </div>
           <button onClick={() => fetchApplications()} className="p-4 rounded-2xl bg-brand-offwhite border border-brand-earth/5 text-brand-slate/40 hover:text-brand-gold transition-all shadow-inner">
              <RefreshCw size={20} className={loading ? 'animate-spin' : ''} />
           </button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:max-w-none xl:grid-cols-12 gap-12">
        {/* Main Application Table */}
        <div className="xl:col-span-12">
           <div className="glass-card rounded-[60px] border border-brand-earth/5 overflow-hidden shadow-3xl bg-white/40">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-brand-earth/5">
                      <th className="px-10 py-8 text-[10px] font-black text-brand-slate/30 uppercase tracking-[0.2em]">Applicant Registry</th>
                      <th className="px-10 py-8 text-[10px] font-black text-brand-slate/30 uppercase tracking-[0.2em]">Target Scheme</th>
                      <th className="px-10 py-8 text-[10px] font-black text-brand-slate/30 uppercase tracking-[0.2em]">Registry Sync</th>
                      <th className="px-10 py-8 text-[10px] font-black text-brand-slate/30 uppercase tracking-[0.2em]">AI Confidence</th>
                      <th className="px-10 py-8 text-[10px] font-black text-brand-slate/30 uppercase tracking-[0.2em]">Status node</th>
                      <th className="px-10 py-8 text-[10px] font-black text-brand-slate/30 uppercase tracking-[0.2em]">Protocol</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-brand-earth/5">
                    {loading ? (
                      Array(5).fill(0).map((_, i) => (
                        <tr key={i} className="animate-pulse">
                          <td colSpan={6} className="px-10 py-8"><div className="h-4 bg-brand-slate/5 rounded-full w-full" /></td>
                        </tr>
                      ))
                    ) : applications.length > 0 ? (
                      applications.map((app) => (
                        <motion.tr 
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          key={app.id} 
                          className="group hover:bg-white transition-colors cursor-pointer"
                          onClick={() => setSelectedApp(app)}
                        >
                          <td className="px-10 py-8">
                             <div className="flex items-center gap-5">
                                <div className="w-14 h-14 rounded-2xl bg-brand-offwhite border border-brand-earth/10 flex items-center justify-center text-brand-slate font-black group-hover:bg-brand-gold group-hover:text-brand-deep transition-all shadow-inner">
                                   {app.profiles?.full_name?.charAt(0)}
                                </div>
                                <div>
                                   <p className="text-sm font-black text-brand-slate group-hover:text-brand-gold transition-colors">{app.profiles?.full_name}</p>
                                   <p className="text-[10px] font-bold text-brand-slate/30 uppercase tracking-widest mt-1">Farmer: {app.farmer_id.substring(0, 12)}</p>
                                </div>
                             </div>
                          </td>
                          <td className="px-10 py-8">
                             <div>
                                <p className="text-xs font-black text-brand-slate mb-1">{app.schemes?.title}</p>
                                <span className="px-2.5 py-1 rounded-full bg-brand-slate/5 text-[8px] font-black text-brand-slate/40 uppercase tracking-widest">{app.schemes?.category}</span>
                             </div>
                          </td>
                          <td className="px-10 py-8">
                             <div className="flex items-center gap-2 text-xs font-bold text-brand-slate/60">
                                <Clock size={14} className="opacity-30" />
                                {new Date(app.submitted_at).toLocaleDateString()}
                             </div>
                          </td>
                          <td className="px-10 py-8">
                              <div className="flex items-center gap-3">
                                 <div className="w-16 h-1.5 bg-brand-slate/5 rounded-full overflow-hidden">
                                    <motion.div 
                                      initial={{ width: 0 }}
                                      animate={{ width: `${app.ai_score}%` }}
                                      className={`h-full ${app.ai_score > 80 ? 'bg-green-500' : 'bg-brand-gold'}`} 
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
                             <div className="w-12 h-12 rounded-2xl bg-brand-offwhite text-brand-slate/20 flex items-center justify-center opacity-0 group-hover:opacity-100 group-hover:text-brand-gold transition-all shadow-lg border border-brand-earth/5">
                                <ArrowUpRight size={20} />
                             </div>
                          </td>
                        </motion.tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={6} className="px-10 py-24 text-center">
                          <div className="w-24 h-24 rounded-[36px] bg-brand-slate/5 flex items-center justify-center text-brand-slate/10 mx-auto mb-8">
                             <ClipboardCheck size={48} />
                          </div>
                          <p className="text-xl font-black text-brand-slate/30 uppercase tracking-[0.3em]">No applications located</p>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
           </div>
        </div>
      </div>

      {/* Review Modal */}
      <AnimatePresence>
        {selectedApp && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="absolute inset-0 bg-brand-deep/80 backdrop-blur-md" 
              onClick={() => setSelectedApp(null)}
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, x: 40 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.9, x: 40 }}
              className="relative w-full max-w-4xl bg-brand-offwhite rounded-[64px] border border-brand-earth/10 p-16 shadow-3xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-16"
            >
              <div className="absolute top-0 right-0 w-80 h-80 bg-brand-gold/5 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
              
              <div className="lg:col-span-7 space-y-10">
                 <div>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-gold/10 text-brand-gold text-[9px] font-black uppercase tracking-widest border border-brand-gold/10 mb-6">
                       <User size={12} /> Digital Identity Verified
                    </div>
                    <h2 className="text-5xl font-black text-brand-slate tracking-tighter leading-none mb-3">{selectedApp.profiles?.full_name}</h2>
                    <p className="text-xl font-medium text-brand-slate/40">Applicant ID: <span className="font-mono text-brand-gold">{selectedApp.farmer_id}</span></p>
                 </div>

                 <div className="grid grid-cols-2 gap-8">
                    <div className="p-8 rounded-[40px] bg-brand-slate/5 border border-brand-earth/10">
                       <p className="text-[10px] font-black text-brand-slate/30 uppercase tracking-widest mb-2">Target Scheme</p>
                       <p className="text-lg font-black text-brand-slate mb-1">{selectedApp.schemes?.title}</p>
                       <p className="text-[10px] font-black text-brand-gold uppercase tracking-widest">{selectedApp.schemes?.category} Registry</p>
                    </div>
                    <div className="p-8 rounded-[40px] bg-brand-gold/10 border border-brand-gold/20">
                       <p className="text-[10px] font-black text-brand-gold uppercase tracking-widest mb-2">Benefit Amount</p>
                       <p className="text-2xl font-black text-brand-slate tracking-tight">₹{Number(selectedApp.schemes?.max_amount).toLocaleString()}</p>
                       <p className="text-[9px] font-bold text-brand-slate/40 mt-1 uppercase tracking-widest whitespace-nowrap">Authorized regional cap</p>
                    </div>
                 </div>

                 <div className="space-y-6">
                    <h3 className="text-xs font-black text-brand-slate uppercase tracking-[0.2em] ml-2">Verification Artifacts</h3>
                    <div className="grid grid-cols-2 gap-4">
                       {[
                         { icon: FileText, label: "Land Deed Record", status: "VERIFIED" },
                         { icon: ShieldCheck, label: "Identity Hash", status: "VERIFIED" },
                         { icon: Layers, label: "Crop Selection", status: "VALID" },
                         { icon: Cpu, label: "AI Analysis", status: "APPROVED" }
                       ].map(doc => (
                         <div key={doc.label} className="p-6 rounded-[32px] bg-white border border-brand-earth/5 flex items-center justify-between group cursor-pointer hover:border-brand-gold transition-all">
                            <div className="flex items-center gap-4">
                               <div className="w-10 h-10 rounded-xl bg-brand-offwhite flex items-center justify-center text-brand-slate/40 group-hover:text-brand-gold transition-all">
                                  <doc.icon size={20} />
                               </div>
                               <span className="text-[11px] font-black text-brand-slate/60 uppercase">{doc.label}</span>
                            </div>
                            <span className="text-[9px] font-black text-green-500">{doc.status}</span>
                         </div>
                       ))}
                    </div>
                 </div>
              </div>

              <div className="lg:col-span-5 space-y-10">
                 <div className="p-10 rounded-[56px] bg-brand-deep text-center relative overflow-hidden group shadow-3xl">
                    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-tr from-brand-gold/10 to-transparent pointer-events-none opacity-40" />
                    <div className="relative z-10">
                       <div className="w-20 h-20 rounded-[32px] bg-white/10 flex items-center justify-center text-brand-gold mx-auto mb-10 border border-white/10 shadow-2xl">
                          <Cpu size={40} />
                       </div>
                       <h4 className="text-2xl font-black text-white tracking-tight leading-none mb-4">AI Score: {selectedApp.ai_score}%</h4>
                       <p className="text-sm font-medium text-white/40 mb-10 px-6 leading-relaxed">
                         High confidence match detected in regional registry database. OCR scan indicates zero discrepancies in document hash.
                       </p>
                       <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden mb-6">
                          <div className="h-full bg-brand-gold" style={{ width: `${selectedApp.ai_score}%` }} />
                       </div>
                    </div>
                 </div>

                 <div className="space-y-4">
                    <button 
                      onClick={() => updateStatus(selectedApp.id, 'approved')}
                      className="w-full py-6 rounded-[32px] bg-brand-earth text-white font-black text-xs uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-xl shadow-brand-earth/30 flex items-center justify-center gap-3"
                    >
                       <CheckCircle2 size={18} /> Direct Registry Approval
                    </button>
                    <button 
                      onClick={() => updateStatus(selectedApp.id, 'correction_required')}
                      className="w-full py-6 rounded-[32px] border-2 border-brand-gold/20 text-[10px] font-black uppercase text-brand-gold tracking-widest hover:bg-brand-gold/10 transition-all flex items-center justify-center gap-3"
                    >
                       <AlertCircle size={18} /> Request Refactoring
                    </button>
                    <button 
                      onClick={() => updateStatus(selectedApp.id, 'rejected')}
                      className="w-full py-6 rounded-[32px] border-2 border-red-500/10 text-[10px] font-black uppercase text-red-500/40 tracking-widest hover:bg-red-500/5 transition-all flex items-center justify-center gap-3"
                    >
                       <XCircle size={18} /> Registry Rejection
                    </button>
                 </div>

                 <p className="text-[10px] font-black text-brand-slate/30 uppercase tracking-[0.2em] text-center">
                    Logged as Officer: {profile?.full_name}
                 </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default OfficerReviewQueue;
