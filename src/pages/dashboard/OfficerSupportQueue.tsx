import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MessageSquare, 
  Search, 
  Filter, 
  ChevronRight, 
  CheckCircle2, 
  AlertCircle, 
  Clock, 
  User, 
  ShieldCheck, 
  ArrowUpRight,
  Send,
  MoreVertical,
  Flag,
  Activity,
  Inbox,
  RefreshCw
} from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { useAuthStore } from '../../store/authStore';
import { toast } from 'sonner';

const OfficerSupportQueue = () => {
  const { profile } = useAuthStore();
  const [grievances, setGrievances] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('open');
  const [selectedGrievance, setSelectedGrievance] = useState<any>(null);
  const [response, setResponse] = useState('');

  useEffect(() => {
    fetchGrievances();
  }, [profile, filter]);

  const fetchGrievances = async () => {
    setLoading(true);
    try {
      let query = supabase
        .from('grievances')
        .select('*, profiles:farmer_id(full_name, email, phone)')
        .order('created_at', { ascending: false });
      
      if (filter !== 'all') {
        query = query.eq('status', filter);
      }

      const { data } = await query;
      setGrievances(data || []);
    } catch (error) {
      console.error('Error fetching grievances:', error);
    } finally {
      setLoading(false);
    }
  };

  const submitResponse = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedGrievance || !profile) return;
    
    try {
      // 1. Add Response
      const { error: respError } = await supabase.from('grievance_responses').insert([{
        grievance_id: selectedGrievance.id,
        officer_id: profile.id,
        message: response
      }]);

      if (respError) throw respError;

      // 2. Update Status
      const { error: statusError } = await supabase
        .from('grievances')
        .update({ status: 'in_progress', updated_at: new Date().toISOString() })
        .eq('id', selectedGrievance.id);

      if (statusError) throw statusError;
      
      toast.success('Response logged in the digital registry', {
        description: 'Syncing with farmer portal...'
      });
      setSelectedGrievance(null);
      setResponse('');
      fetchGrievances();
    } catch (error: any) {
      toast.error('Sync failed', { description: error.message });
    }
  };

  const resolveGrievance = async (id: string) => {
    try {
      const { error } = await supabase
        .from('grievances')
        .update({ status: 'resolved', updated_at: new Date().toISOString() })
        .eq('id', id);

      if (error) throw error;
      
      toast.success('Case resolved and archived', {
        description: 'Registry status updated.'
      });
      setSelectedGrievance(null);
      fetchGrievances();
    } catch (error: any) {
      toast.error('Resolution failed', { description: error.message });
    }
  };

  const getPriorityStyle = (priority: string) => {
    switch (priority) {
      case 'critical': return 'bg-red-500/10 text-red-500 border-red-500/20';
      case 'high': return 'bg-brand-gold/10 text-brand-gold border-brand-gold/20';
      case 'medium': return 'bg-blue-500/10 text-blue-500 border-blue-500/20';
      default: return 'bg-brand-slate/5 text-brand-slate/40 border-brand-slate/10';
    }
  };

  return (
    <div className="space-y-12 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-10">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-gold/10 text-brand-gold text-[10px] font-black uppercase tracking-widest border border-brand-gold/20 mb-6">
            <MessageSquare size={12} /> Support Node Dashboard
          </div>
          <h1 className="text-7xl font-black text-brand-slate tracking-tighter leading-[0.9] mb-4">Farmer <span className="text-brand-gold">Support.</span></h1>
          <p className="text-xl font-medium text-brand-slate/40 max-w-xl">Regional service desk for addressing farmer grievances and application troubleshooting.</p>
        </div>
        
        <div className="flex flex-col md:flex-row gap-4 items-center">
           <div className="flex p-1.5 rounded-[28px] bg-brand-slate/5 border border-brand-earth/5 backdrop-blur-xl shrink-0">
              {['all', 'open', 'in_progress', 'resolved'].map(f => (
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
           <button onClick={() => fetchGrievances()} className="p-4 rounded-2xl bg-brand-offwhite border border-brand-earth/5 text-brand-slate/40 hover:text-brand-gold transition-all shadow-inner">
              <RefreshCw size={20} className={loading ? 'animate-spin' : ''} />
           </button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-12">
        {/* Main Support Queue Table */}
        <div className="xl:col-span-12">
           <div className="glass-card rounded-[60px] border border-brand-earth/5 overflow-hidden shadow-3xl bg-white/40">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-brand-earth/5">
                      <th className="px-10 py-8 text-[10px] font-black text-brand-slate/30 uppercase tracking-[0.2em]">Applicant Concern</th>
                      <th className="px-10 py-8 text-[10px] font-black text-brand-slate/30 uppercase tracking-[0.2em]">Priority Hub</th>
                      <th className="px-10 py-8 text-[10px] font-black text-brand-slate/30 uppercase tracking-[0.2em]">Reported Sync</th>
                      <th className="px-10 py-8 text-[10px] font-black text-brand-slate/30 uppercase tracking-[0.2em]">District Note</th>
                      <th className="px-10 py-8 text-[10px] font-black text-brand-slate/30 uppercase tracking-[0.2em]">Node Status</th>
                      <th className="px-10 py-8 text-[10px] font-black text-brand-slate/30 uppercase tracking-[0.2em]">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-brand-earth/5">
                    {loading ? (
                      Array(5).fill(0).map((_, i) => (
                        <tr key={i} className="animate-pulse">
                          <td colSpan={6} className="px-10 py-8"><div className="h-4 bg-brand-slate/5 rounded-full w-full" /></td>
                        </tr>
                      ))
                    ) : grievances.length > 0 ? (
                      grievances.map((g) => (
                        <motion.tr 
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          key={g.id} 
                          className="group hover:bg-white transition-colors cursor-pointer"
                          onClick={() => setSelectedGrievance(g)}
                        >
                          <td className="px-10 py-8">
                             <div className="flex items-center gap-5">
                                <div className="w-14 h-14 rounded-2xl bg-brand-offwhite border border-brand-earth/10 flex items-center justify-center text-brand-slate font-black group-hover:bg-brand-gold group-hover:text-brand-deep transition-all shadow-inner">
                                   <MessageSquare size={24} />
                                </div>
                                <div>
                                   <p className="text-sm font-black text-brand-slate group-hover:text-brand-gold transition-colors">{g.title}</p>
                                   <p className="text-[10px] font-bold text-brand-slate/30 uppercase tracking-widest mt-1">From: {g.profiles?.full_name}</p>
                                </div>
                             </div>
                          </td>
                          <td className="px-10 py-8">
                             <span className={`px-4 py-1.5 rounded-full border-2 text-[9px] font-black uppercase tracking-widest ${getPriorityStyle(g.priority)}`}>
                                {g.priority} PRIORITY
                             </span>
                          </td>
                          <td className="px-10 py-8">
                             <div className="flex items-center gap-2 text-xs font-bold text-brand-slate/60">
                                <Clock size={14} className="opacity-30" />
                                {new Date(g.created_at).toLocaleDateString()}
                             </div>
                          </td>
                          <td className="px-10 py-8">
                             <p className="text-[10px] font-black text-brand-slate/30 uppercase tracking-widest leading-none">TIRUPPUR-CBE</p>
                          </td>
                          <td className="px-10 py-8">
                             <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border-2 text-[10px] font-black uppercase tracking-widest ${
                               g.status === 'resolved' ? 'bg-green-500/10 text-green-500 border-green-500/20' : 
                               g.status === 'in_progress' ? 'bg-brand-gold/10 text-brand-gold border-brand-gold/20' : 
                               'bg-red-500/10 text-red-500 border-red-500/20'
                             }`}>
                                <div className={`w-1.5 h-1.5 rounded-full ${g.status === 'resolved' ? 'bg-green-500' : 'bg-red-500'} animate-pulse`} />
                                {g.status.replace('_', ' ')}
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
                          <div className="w-24 h-24 rounded-[36px] bg-brand-slate/5 flex items-center justify-center text-brand-slate/10 mx-auto mb-8 shadow-inner">
                             <Inbox size={48} />
                          </div>
                          <p className="text-xl font-black text-brand-slate/30 uppercase tracking-[0.3em]">Support Registry Empty</p>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
           </div>
        </div>
      </div>

      {/* Response Modal */}
      <AnimatePresence>
        {selectedGrievance && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="absolute inset-0 bg-brand-deep/80 backdrop-blur-md" 
              onClick={() => setSelectedGrievance(null)}
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
                       <Flag size={12} /> {selectedGrievance.priority.toUpperCase()} PRIORITY NODE
                    </div>
                    <h2 className="text-5xl font-black text-brand-slate tracking-tighter leading-none mb-3">{selectedGrievance.title}</h2>
                    <p className="text-xl font-medium text-brand-slate/40">From Farmer: <span className="font-black text-brand-slate">{selectedGrievance.profiles?.full_name}</span></p>
                 </div>

                 <div className="p-10 rounded-[48px] bg-brand-slate/5 border border-brand-earth/10 leading-relaxed text-brand-slate/60 text-lg">
                    {selectedGrievance.description}
                 </div>

                 <form onSubmit={submitResponse} className="space-y-6">
                    <h3 className="text-xs font-black text-brand-slate uppercase tracking-[0.2em] ml-2">Administrative Response Pulse</h3>
                    <textarea 
                      required
                      value={response}
                      onChange={e => setResponse(e.target.value)}
                      rows={4}
                      placeholder="Input official response for digital registry..."
                      className="w-full px-8 py-6 rounded-[36px] border-2 border-brand-earth/5 bg-white text-sm font-medium focus:outline-none focus:border-brand-gold transition-all shadow-inner resize-none"
                    />
                    <button type="submit" className="w-full py-5 rounded-[28px] bg-brand-deep text-white text-[10px] font-black uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-xl shadow-brand-deep/30 flex items-center justify-center gap-3">
                       Post Official Sync Response <Send size={16} />
                    </button>
                 </form>
              </div>

              <div className="lg:col-span-5 space-y-10">
                 <div className="p-10 rounded-[56px] bg-brand-gold/5 border border-brand-gold/10 shadow-xl">
                    <h4 className="text-xs font-black text-brand-gold uppercase tracking-[0.2em] mb-10 text-center">Applicant Metadata</h4>
                    <div className="space-y-8">
                       <div className="group">
                          <p className="text-[9px] font-black text-brand-slate/20 uppercase tracking-widest mb-1">Registry Email</p>
                          <p className="text-sm font-black text-brand-slate group-hover:text-brand-gold transition-colors">{selectedGrievance.profiles?.email}</p>
                       </div>
                       <div className="group">
                          <p className="text-[9px] font-black text-brand-slate/20 uppercase tracking-widest mb-1">Authenticated Phone</p>
                          <p className="text-sm font-black text-brand-slate group-hover:text-brand-gold transition-colors">{selectedGrievance.profiles?.phone || '+91 98XXX XXX00'}</p>
                       </div>
                       <div className="group">
                          <p className="text-[9px] font-black text-brand-slate/20 uppercase tracking-widest mb-1">District Node</p>
                          <p className="text-sm font-black text-brand-slate group-hover:text-brand-gold transition-colors">TIRUPPUR-CENTRAL</p>
                       </div>
                    </div>
                 </div>

                 <div className="space-y-4">
                    <button 
                      onClick={() => resolveGrievance(selectedGrievance.id)}
                      className="w-full py-6 rounded-[32px] bg-brand-earth text-white font-black text-xs uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-xl shadow-brand-earth/30 flex items-center justify-center gap-3"
                    >
                       <CheckCircle2 size={18} /> Mark as Resolved
                    </button>
                    <div className="p-8 rounded-[40px] bg-brand-deep border border-brand-gold/10 text-center group overflow-hidden relative">
                       <div className="absolute top-0 right-0 w-20 h-20 bg-brand-gold/5 rounded-full blur-xl -translate-y-1/2 translate-x-1/2" />
                       <div className="relative z-10">
                          <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-brand-gold mx-auto mb-6">
                             <ShieldCheck size={24} />
                          </div>
                          <p className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em] mb-2 leading-none">Status: Encrypted Sync</p>
                          <p className="text-xs font-bold text-white leading-relaxed">
                            Communication is logged for regional audit trail.
                          </p>
                       </div>
                    </div>
                 </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default OfficerSupportQueue;
