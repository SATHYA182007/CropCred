import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, 
  Search, 
  Edit3, 
  Trash2, 
  ChevronRight, 
  Sprout, 
  Coins, 
  Tractor, 
  ShieldCheck, 
  Layers, 
  ArrowUpRight,
  Eye,
  RefreshCw,
  Clock,
  MoreVertical,
  Activity,
  Droplets,
  Database,
  Cpu,
  Archive,
  Save,
  X
} from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { useAuthStore } from '../../store/authStore';
import { toast } from 'sonner';

const SchemeManagement = () => {
  const { profile } = useAuthStore();
  const [schemes, setSchemes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingScheme, setEditingScheme] = useState<any>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'Subsidy',
    max_amount: '',
    target_crop: '',
    status: 'active'
  });

  useEffect(() => {
    fetchSchemes();
  }, []);

  const fetchSchemes = async () => {
    setLoading(true);
    try {
      const { data } = await supabase
        .from('schemes')
        .select('*')
        .order('created_at', { ascending: false });
      setSchemes(data || []);
    } catch (error) {
      console.error('Error fetching schemes:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingScheme) {
        const { error } = await supabase
          .from('schemes')
          .update(formData)
          .eq('id', editingScheme.id);
        if (error) throw error;
        toast.success('Scheme registry updated', { description: 'Global nodes synchronized.' });
      } else {
        const { error } = await supabase
          .from('schemes')
          .insert([formData]);
        if (error) throw error;
        toast.success('New scheme module initialized', { description: 'Live in farmer marketplace.' });
      }
      setShowModal(false);
      resetForm();
      fetchSchemes();
    } catch (error: any) {
      toast.error('Registry sync failed', { description: error.message });
    }
  };

  const deleteScheme = async (id: string) => {
    if (!confirm('Archive this module from the regional marketplace?')) return;
    try {
      const { error } = await supabase.from('schemes').delete().eq('id', id);
      if (error) throw error;
      toast.success('Module archived');
      fetchSchemes();
    } catch (error: any) {
      toast.error('Archive failed', { description: error.message });
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      category: 'Subsidy',
      max_amount: '',
      target_crop: '',
      status: 'active'
    });
    setEditingScheme(null);
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Subsidy': return <Coins size={24} />;
      case 'Insurance': return <ShieldCheck size={24} />;
      case 'Equipment': return <Tractor size={24} />;
      case 'Incentive': return <Droplets size={24} />;
      default: return <Sprout size={24} />;
    }
  };

  return (
    <div className="space-y-12 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-10">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-earth/10 text-brand-earth text-[10px] font-black uppercase tracking-widest border border-brand-earth/20 mb-6">
            <Database size={12} /> Global Registry Governance
          </div>
          <h1 className="text-7xl font-black text-brand-slate tracking-tighter leading-[0.9] mb-4">Module <span className="text-brand-earth">Control.</span></h1>
          <p className="text-xl font-medium text-brand-slate/40 max-w-xl">Centralized administration for agricultural scheme injection and lifecycle management.</p>
        </div>
        
        <div className="flex gap-4">
           <div className="hidden lg:flex p-1.5 rounded-[28px] bg-brand-slate/5 border border-brand-earth/5 backdrop-blur-xl">
              <div className="px-6 py-3 flex items-center gap-3">
                 <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse shadow-[0_0_8px_#3B82F6]" />
                 <span className="text-[10px] font-black uppercase text-brand-slate/30 tracking-widest">Protocol: Direct Inject</span>
              </div>
           </div>
           <button 
             onClick={() => { resetForm(); setShowModal(true); }}
             className="px-8 py-4 rounded-[28px] bg-brand-deep text-white text-[10px] font-black uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-xl shadow-brand-deep/20 flex items-center gap-2"
           >
              <Plus size={16} /> Deploy New Module
           </button>
        </div>
      </div>

      {/* Stats Layer */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {[
          { label: "Active Modules", value: schemes.length, icon: Layers, color: "text-brand-earth" },
          { label: "Regional Sync", value: "100%", icon: Activity, color: "text-blue-500" },
          { label: "Marketplace Load", value: "Active", icon: Cpu, color: "text-brand-gold" },
          { label: "Citizen Reach", value: "45.2k", icon: ShieldCheck, color: "text-green-500" }
        ].map((s, i) => (
          <div key={i} className="glass-card p-10 rounded-[56px] border border-brand-earth/5 shadow-2xl relative overflow-hidden group">
            <div className={`absolute top-0 right-0 w-24 h-24 rounded-full blur-3xl opacity-5 -translate-y-1/2 translate-x-1/2 bg-current ${s.color}`} />
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110 shadow-lg border border-brand-earth/5 ${s.color} bg-brand-offwhite`}>
              <s.icon size={24} />
            </div>
            <p className="text-[10px] font-black text-brand-slate/30 uppercase tracking-[0.3em] mb-1">{s.label}</p>
            <p className="text-3xl font-black text-brand-slate tracking-tight">{s.value}</p>
          </div>
        ))}
      </div>

      {/* Main Registry Table */}
      <div className="glass-card rounded-[60px] border border-brand-earth/5 overflow-hidden shadow-3xl bg-white/40">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-brand-earth/5">
                <th className="px-10 py-8 text-[10px] font-black text-brand-slate/30 uppercase tracking-[0.2em]">Scheme identifier</th>
                <th className="px-10 py-8 text-[10px] font-black text-brand-slate/30 uppercase tracking-[0.2em]">Category node</th>
                <th className="px-10 py-8 text-[10px] font-black text-brand-slate/30 uppercase tracking-[0.2em]">Auth Limit</th>
                <th className="px-10 py-8 text-[10px] font-black text-brand-slate/30 uppercase tracking-[0.2em]">Status</th>
                <th className="px-10 py-8 text-[10px] font-black text-brand-slate/30 uppercase tracking-[0.2em]">Control Protocol</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-earth/5">
              {loading ? (
                Array(5).fill(0).map((_, i) => (
                  <tr key={i} className="animate-pulse">
                    <td colSpan={5} className="px-10 py-8"><div className="h-4 bg-brand-slate/5 rounded-full w-full" /></td>
                  </tr>
                ))
              ) : schemes.length > 0 ? (
                schemes.map((s) => (
                  <motion.tr 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    key={s.id} 
                    className="group hover:bg-white transition-colors"
                  >
                    <td className="px-10 py-8">
                       <div className="flex items-center gap-5">
                          <div className="w-14 h-14 rounded-2xl bg-brand-offwhite border border-brand-earth/10 flex items-center justify-center text-brand-earth font-black group-hover:bg-brand-earth group-hover:text-white transition-all shadow-inner">
                             {getCategoryIcon(s.category)}
                          </div>
                          <div>
                             <p className="text-sm font-black text-brand-slate group-hover:text-brand-earth transition-colors">{s.title}</p>
                             <p className="text-[10px] font-bold text-brand-slate/30 uppercase tracking-widest mt-1">Ref ID: {s.id.substring(0, 10)}</p>
                          </div>
                       </div>
                    </td>
                    <td className="px-10 py-8">
                       <span className="px-3 py-1.5 rounded-full bg-brand-slate/5 text-[9px] font-black text-brand-slate/40 uppercase tracking-widest border border-brand-slate/10">{s.category}</span>
                    </td>
                    <td className="px-10 py-8">
                       <p className="text-sm font-black text-brand-slate">₹{Number(s.max_amount).toLocaleString()}</p>
                       <p className="text-[10px] font-bold text-brand-gold uppercase mt-1 tracking-widest">Max Disbursement</p>
                    </td>
                    <td className="px-10 py-8">
                       <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-[9px] font-black uppercase tracking-widest ${
                         s.status === 'active' ? 'bg-green-500/10 text-green-500 border-green-500/10' : 'bg-brand-slate/5 text-brand-slate/30 border-brand-slate/10'
                       }`}>
                          <div className={`w-1.5 h-1.5 rounded-full ${s.status === 'active' ? 'bg-green-500' : 'bg-brand-slate/30'} animate-pulse`} />
                          {s.status}
                       </div>
                    </td>
                    <td className="px-10 py-8 text-right">
                       <div className="flex items-center gap-3">
                          <button 
                            onClick={() => { setEditingScheme(s); setFormData(s); setShowModal(true); }}
                            className="p-3 rounded-2xl bg-brand-offwhite text-brand-slate/40 hover:text-brand-gold hover:bg-brand-gold/5 transition-all border border-brand-earth/5 shadow-inner"
                          >
                             <Edit3 size={18} />
                          </button>
                          <button 
                            onClick={() => deleteScheme(s.id)}
                            className="p-3 rounded-2xl bg-brand-offwhite text-brand-slate/40 hover:text-red-500 hover:bg-red-500/5 transition-all border border-brand-earth/5 shadow-inner"
                          >
                             <Trash2 size={18} />
                          </button>
                          <button className="p-3 rounded-2xl bg-brand-offwhite text-brand-slate/40 hover:text-brand-earth transition-all border border-brand-earth/5 shadow-inner">
                             <MoreVertical size={18} />
                          </button>
                       </div>
                    </td>
                  </motion.tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="px-10 py-24 text-center">
                    <div className="w-24 h-24 rounded-[36px] bg-brand-slate/5 flex items-center justify-center text-brand-slate/10 mx-auto mb-8 shadow-inner">
                       <Archive size={48} />
                    </div>
                    <p className="text-xl font-black text-brand-slate/30 uppercase tracking-[0.3em]">Scheme Registry is empty</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Editor Modal */}
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
              className="relative w-full max-w-3xl bg-brand-offwhite rounded-[64px] border border-brand-earth/10 p-16 shadow-3xl overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-80 h-80 bg-brand-gold/5 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
              
              <div className="flex items-center justify-between mb-12">
                 <div>
                    <h2 className="text-4xl font-black text-brand-slate tracking-tighter leading-none mb-4">{editingScheme ? 'Update' : 'Initialize'} <span className="text-brand-earth">Module.</span></h2>
                    <p className="text-base text-brand-slate/40 font-medium">Injection details for agricultural citizen registry.</p>
                 </div>
                 <button onClick={() => setShowModal(false)} className="w-14 h-14 rounded-2xl bg-brand-slate/5 flex items-center justify-center text-brand-slate hover:bg-brand-slate/10 transition-all">
                    <X size={24} />
                 </button>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-10">
                 <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="group">
                       <label className="block text-[10px] font-black uppercase tracking-widest text-brand-slate/40 mb-4 ml-6">Scheme Identifier Title</label>
                       <input 
                         required
                         value={formData.title}
                         onChange={e => setFormData({...formData, title: e.target.value})}
                         className="w-full px-8 py-5 rounded-[28px] border-2 border-brand-earth/5 bg-white text-sm font-bold focus:outline-none focus:border-brand-gold transition-all shadow-inner"
                       />
                    </div>
                    <div className="group">
                       <label className="block text-[10px] font-black uppercase tracking-widest text-brand-slate/40 mb-4 ml-6">Registry category</label>
                       <select 
                         value={formData.category}
                         onChange={e => setFormData({...formData, category: e.target.value})}
                         className="w-full px-8 py-5 rounded-[28px] border-2 border-brand-earth/5 bg-white text-sm font-bold focus:outline-none focus:border-brand-gold appearance-none transition-all cursor-pointer shadow-inner"
                       >
                          <option value="Subsidy">National Subsidy Node</option>
                          <option value="Insurance">Regional Insurance Mesh</option>
                          <option value="Equipment">Equipment Asset Lease</option>
                          <option value="Incentive">Direct Citizen Incentive</option>
                       </select>
                    </div>
                 </div>

                 <div className="grid grid-cols-2 gap-8">
                    <div className="group">
                       <label className="block text-[10px] font-black uppercase tracking-widest text-brand-slate/40 mb-4 ml-6">Authorized Registry Cap (₹)</label>
                       <input 
                         required type="number"
                         value={formData.max_amount}
                         onChange={e => setFormData({...formData, max_amount: e.target.value})}
                         className="w-full px-8 py-5 rounded-[28px] border-2 border-brand-earth/5 bg-white text-sm font-black focus:outline-none focus:border-brand-gold transition-all shadow-inner"
                       />
                    </div>
                    <div className="group">
                       <label className="block text-[10px] font-black uppercase tracking-widest text-brand-slate/40 mb-4 ml-6">Target Crop Sync</label>
                       <input 
                         value={formData.target_crop}
                         onChange={e => setFormData({...formData, target_crop: e.target.value})}
                         placeholder="e.g. Paddy, Cotton, Universal"
                         className="w-full px-8 py-5 rounded-[28px] border-2 border-brand-earth/5 bg-white text-sm font-bold focus:outline-none focus:border-brand-gold transition-all shadow-inner"
                       />
                    </div>
                 </div>

                 <div className="group">
                    <label className="block text-[10px] font-black uppercase tracking-widest text-brand-slate/40 mb-4 ml-6">Comprehensive Module Specs</label>
                    <textarea 
                      required
                      value={formData.description}
                      onChange={e => setFormData({...formData, description: e.target.value})}
                      rows={4}
                      className="w-full px-8 py-6 rounded-[36px] border-2 border-brand-earth/5 bg-white text-sm font-medium focus:outline-none focus:border-brand-gold transition-all shadow-inner resize-none"
                    />
                 </div>

                 <div className="flex gap-4 pt-4">
                    <button type="submit" className="flex-1 py-6 rounded-[32px] bg-brand-earth text-white font-black text-[11px] uppercase tracking-[0.2em] hover:scale-105 active:scale-95 transition-all shadow-xl shadow-brand-earth/30 flex items-center justify-center gap-3">
                       <Save size={18} /> Synchronize to Global Pulse
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

export default SchemeManagement;
