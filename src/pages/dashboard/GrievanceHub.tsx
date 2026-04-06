import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MessageSquare, 
  Search, 
  Send, 
  ChevronRight, 
  Clock, 
  CheckCircle2, 
  Activity,
  AlertCircle,
  Plus,
  ShieldCheck,
  ArrowUpRight,
  Filter,
  User,
  Inbox
} from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { useAuthStore } from '../../store/authStore';
import { toast } from 'sonner';

const GrievanceHub = () => {
  const { profile } = useAuthStore();
  const [grievances, setGrievances] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ title: '', description: '', priority: 'medium' });

  useEffect(() => {
    fetchGrievances();
  }, [profile]);

  const fetchGrievances = async () => {
    if (!profile) return;
    setLoading(true);
    try {
      const { data } = await supabase
        .from('grievances')
        .select('*, profiles:farmer_id(full_name)')
        .eq('farmer_id', profile.id)
        .order('created_at', { ascending: false });
      setGrievances(data || []);
    } catch (error) {
      console.error('Error fetching grievances:', error);
    } finally {
      setLoading(false);
    }
  };

  const submitGrievance = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!profile) return;
    
    try {
      const { error } = await supabase.from('grievances').insert([{
        farmer_id: profile.id,
        title: formData.title,
        description: formData.description,
        priority: formData.priority,
        status: 'open'
      }]);

      if (error) throw error;
      
      toast.success('Grievance logged in the digital registry', {
        description: 'An Agriculture Officer will review your case shortly.'
      });
      setShowModal(false);
      setFormData({ title: '', description: '', priority: 'medium' });
      fetchGrievances();
    } catch (error: any) {
      toast.error('Failed to log grievance', { description: error.message });
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
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-earth/10 text-brand-earth text-[10px] font-black uppercase tracking-widest border border-brand-earth/20 mb-6">
            <MessageSquare size={12} /> Regional Support Hub
          </div>
          <h1 className="text-7xl font-black text-brand-slate tracking-tighter leading-[0.9] mb-4">Grievance <span className="text-brand-earth">Pulse.</span></h1>
          <p className="text-xl font-medium text-brand-slate/40 max-w-xl">Direct administrative channel for resolving application bottlenecks and regional concerns.</p>
        </div>
        
        <div className="flex gap-4">
           <div className="hidden lg:flex p-1.5 rounded-[28px] bg-brand-slate/5 border border-brand-earth/5 backdrop-blur-xl">
              <div className="px-6 py-3 flex items-center gap-3">
                 <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_8px_#22C55E]" />
                 <span className="text-[10px] font-black uppercase text-brand-slate/30 tracking-widest">Support Node: Online</span>
              </div>
           </div>
           <button 
             onClick={() => setShowModal(true)}
             className="px-8 py-4 rounded-[28px] bg-brand-deep text-white text-[10px] font-black uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-xl shadow-brand-deep/20 flex items-center gap-2"
           >
              <Plus size={16} /> Log New Grievance
           </button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-12">
        {/* Left Column: Active Cases */}
        <div className="xl:col-span-8 space-y-12">
           <div className="space-y-6">
              {loading ? (
                Array(3).fill(0).map((_, i) => (
                  <div key={i} className="h-40 bg-brand-slate/5 animate-pulse rounded-[48px]" />
                ))
              ) : grievances.length > 0 ? (
                grievances.map((g, i) => (
                  <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    key={g.id}
                    className="glass-card hover:bg-white p-10 rounded-[56px] border border-brand-earth/5 group transition-all cursor-pointer shadow-3xl hover:border-brand-gold/30"
                  >
                    <div className="flex items-center justify-between mb-8">
                       <div className="flex items-center gap-5">
                          <div className="w-14 h-14 rounded-[24px] bg-brand-offwhite border border-brand-earth/10 flex items-center justify-center text-brand-slate opacity-40 group-hover:bg-brand-earth group-hover:text-white group-hover:opacity-100 transition-all shadow-inner">
                             <Inbox size={24} />
                          </div>
                          <div>
                             <p className="text-[10px] font-black text-brand-slate/30 uppercase tracking-[0.3em] mb-1">Case #{g.id.substring(0, 8)}</p>
                             <h4 className="text-xl font-black text-brand-slate group-hover:text-brand-earth transition-colors">{g.title}</h4>
                          </div>
                       </div>
                       <div className={`px-4 py-2 rounded-full border-2 text-[9px] font-black uppercase tracking-widest ${getPriorityStyle(g.priority)}`}>
                          {g.priority} PRIORITY
                       </div>
                    </div>

                    <p className="text-base text-brand-slate/50 leading-relaxed mb-10 max-w-2xl line-clamp-2">{g.description}</p>
                    
                    <div className="flex items-center justify-between pt-8 border-t border-brand-slate/5">
                       <div className="flex items-center gap-6">
                          <div className="flex items-center gap-2 text-xs font-bold text-brand-slate/30 uppercase">
                             <Clock size={14} /> Created {new Date(g.created_at).toLocaleDateString()}
                          </div>
                          <div className="w-px h-3 bg-brand-slate/10" />
                          <div className="flex items-center gap-2 text-xs font-bold text-brand-gold uppercase tracking-[0.2em] animate-pulse">
                             <Activity size={14} /> Tracking in Pulse
                          </div>
                       </div>
                       
                       <div className="flex items-center gap-3">
                          <span className="text-[9px] font-black text-brand-slate/20 uppercase tracking-widest px-4 py-2 rounded-full bg-brand-offwhite">{g.status.toUpperCase()}</span>
                          <div className="w-10 h-10 rounded-2xl bg-brand-offwhite flex items-center justify-center text-brand-slate opacity-20 group-hover:opacity-100 group-hover:bg-brand-earth group-hover:text-white transition-all shadow-lg">
                             <ChevronRight size={20} />
                          </div>
                       </div>
                    </div>
                  </motion.div>
                ))
              ) : (
                <div className="py-24 text-center glass-card rounded-[56px] border border-brand-earth/10">
                   <div className="w-20 h-20 rounded-[28px] bg-brand-slate/5 flex items-center justify-center text-brand-slate/20 mx-auto mb-8 shadow-inner">
                      <MessageSquare size={40} />
                   </div>
                   <p className="text-sm font-black text-brand-slate/30 uppercase tracking-[0.25em]">Registry Clear</p>
                   <p className="text-xs font-bold text-brand-slate/20 mt-3">All grievances are resolved.</p>
                </div>
              )}
           </div>
        </div>

        {/* Right Column: Support Modules */}
        <div className="xl:col-span-4 space-y-12">
           <div className="glass-card-dark bg-brand-deep rounded-[56px] p-12 border border-white/5 relative overflow-hidden group shadow-3xl text-center">
              <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-brand-gold/10 to-transparent pointer-events-none opacity-40 group-hover:opacity-60 transition-opacity" />
              <div className="relative z-10">
                 <div className="w-20 h-20 rounded-[32px] bg-white/10 flex items-center justify-center text-brand-gold mx-auto mb-10 border border-white/10 shadow-2xl group-hover:rotate-6 transition-transform">
                    <ShieldCheck size={40} />
                 </div>
                 <h4 className="text-2xl font-black text-white tracking-tight leading-none mb-4">Direct Access</h4>
                 <p className="text-sm font-medium text-white/40 mb-10 leading-relaxed">
                   Verified concerns are automatically synced with the nearest District Agriculture Office for priority handling.
                 </p>
                 <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 rounded-3xl bg-white/5 border border-white/10 text-center">
                       <p className="text-xl font-black text-white">2.4h</p>
                       <p className="text-[9px] font-black text-brand-gold uppercase tracking-widest mt-1">Avg Contact</p>
                    </div>
                    <div className="p-4 rounded-3xl bg-white/5 border border-white/10 text-center">
                       <p className="text-xl font-black text-white">100%</p>
                       <p className="text-[9px] font-black text-brand-gold uppercase tracking-widest mt-1">Registry Rate</p>
                    </div>
                 </div>
              </div>
           </div>

           <div className="glass-card p-10 rounded-[56px] border border-brand-earth/5">
              <h4 className="text-[10px] font-black text-brand-slate/40 uppercase tracking-[0.4em] mb-10 ml-2">Regional Guidelines</h4>
              <div className="space-y-6">
                 {[
                   { t: "Clarity", d: "Ensure issue descriptions matches your registry ID sync." },
                   { t: "Evidence", d: "Attach digital screenshots from the application hub." },
                   { t: "Priority", d: "Only mark as 'Critical' if local bank sync fails." }
                 ].map((g, i) => (
                   <div key={i} className="flex gap-4">
                      <div className="w-10 h-10 rounded-2xl bg-brand-slate/5 flex items-center justify-center text-brand-slate/40 font-black text-xs shrink-0">{i+1}</div>
                      <div>
                         <p className="text-sm font-black text-brand-slate">{g.t}</p>
                         <p className="text-[10px] font-bold text-brand-slate/40 leading-relaxed mt-1 uppercase tracking-widest">{g.d}</p>
                      </div>
                   </div>
                 ))}
              </div>
           </div>
        </div>
      </div>

      {/* Submission Modal */}
      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="absolute inset-0 bg-brand-deep/80 backdrop-blur-md" 
              onClick={() => setShowModal(false)}
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 40 }}
              className="relative w-full max-w-2xl bg-brand-offwhite rounded-[64px] border border-brand-earth/10 p-16 shadow-3xl overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-80 h-80 bg-brand-gold/5 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
              
              <h2 className="text-4xl font-black text-brand-slate tracking-tighter mb-4 leading-none">Log New <span className="text-brand-earth">Concern.</span></h2>
              <p className="text-base text-brand-slate/40 font-medium mb-12">Authorized system registry entry for regional support.</p>
              
              <form onSubmit={submitGrievance} className="space-y-8">
                 <div className="group">
                    <label className="block text-[10px] font-black uppercase tracking-widest text-brand-slate/40 mb-4 ml-6">Registry Identifier / Topic</label>
                    <input 
                      required
                      value={formData.title}
                      onChange={e => setFormData({...formData, title: e.target.value})}
                      placeholder="e.g. Subsidy Payment Delay in Tiruppur"
                      className="w-full px-8 py-5 rounded-[28px] border-2 border-brand-earth/5 bg-white text-sm font-bold focus:outline-none focus:border-brand-gold transition-all shadow-inner"
                    />
                 </div>
                 
                 <div className="grid grid-cols-2 gap-8">
                    <div className="group">
                       <label className="block text-[10px] font-black uppercase tracking-widest text-brand-slate/40 mb-4 ml-6">Case Priority</label>
                       <select 
                         value={formData.priority}
                         onChange={e => setFormData({...formData, priority: e.target.value})}
                         className="w-full px-8 py-5 rounded-[28px] border-2 border-brand-earth/5 bg-white text-sm font-bold focus:outline-none focus:border-brand-gold appearance-none transition-all cursor-pointer shadow-inner"
                       >
                          <option value="low">Low Priority</option>
                          <option value="medium">Medium Priority</option>
                          <option value="high">High Priority</option>
                          <option value="critical">Critical (Immediate Audit)</option>
                       </select>
                    </div>
                    <div className="group">
                       <label className="block text-[10px] font-black uppercase tracking-widest text-brand-slate/40 mb-4 ml-6">Regional Sync</label>
                       <div className="px-8 py-5 rounded-[28px] bg-brand-slate/5 border border-brand-earth/5 text-xs font-black text-brand-slate flex items-center justify-between opacity-50 shadow-inner">
                          <span>District: CBE-TIR</span>
                          <ShieldCheck size={16} />
                       </div>
                    </div>
                 </div>

                 <div className="group">
                    <label className="block text-[10px] font-black uppercase tracking-widest text-brand-slate/40 mb-4 ml-6">Detailed Pulse Description</label>
                    <textarea 
                      required
                      value={formData.description}
                      onChange={e => setFormData({...formData, description: e.target.value})}
                      rows={4}
                      placeholder="Specify your concern including registry IDs if applicable..."
                      className="w-full px-8 py-6 rounded-[36px] border-2 border-brand-earth/5 bg-white text-sm font-medium focus:outline-none focus:border-brand-gold transition-all shadow-inner resize-none"
                    />
                 </div>

                 <div className="flex gap-4 pt-6">
                    <button type="button" onClick={() => setShowModal(false)} className="flex-1 py-6 rounded-[32px] border-2 border-brand-earth/10 text-[10px] font-black uppercase text-brand-slate tracking-widest hover:bg-brand-slate/5 transition-all">
                       Abort Request
                    </button>
                    <button type="submit" className="flex-[2] py-6 rounded-[32px] bg-brand-earth text-white font-black text-[10px] uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-xl shadow-brand-earth/30 flex items-center justify-center gap-3">
                       Post to Registry Pulse <ArrowUpRight size={18} />
                    </button>
                 </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default GrievanceHub;
