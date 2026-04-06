import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Settings, 
  Cpu, 
  ShieldCheck, 
  Database, 
  Globe, 
  Zap, 
  Lock, 
  Bell, 
  ChevronRight, 
  Save, 
  RefreshCw, 
  Activity,
  UserPlus,
  Layers,
  ArrowUpRight,
  Eye,
  Search,
  MoreVertical,
  X,
  Mail,
  HardDrive
} from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { toast } from 'sonner';

const SystemSettings = () => {
  const { profile } = useAuthStore();
  const [activeTab, setActiveTab] = useState('General');

  const tabs = [
    { id: 'General', icon: Globe },
    { id: 'Security', icon: ShieldCheck },
    { id: 'Data Hub', icon: Database },
    { id: 'AI Nodes', icon: Cpu },
    { id: 'Protocol', icon: Activity }
  ];

  return (
    <div className="space-y-12 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-10">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-deep/10 text-brand-deep text-[10px] font-black uppercase tracking-widest border border-brand-deep/20 mb-6">
            <Settings size={12} /> System Configuration Cluster
          </div>
          <h1 className="text-7xl font-black text-brand-slate tracking-tighter leading-[0.9] mb-4">Central <span className="text-brand-slate/20">Config.</span></h1>
          <p className="text-xl font-medium text-brand-slate/40 max-w-xl">Deep-level administrative control over regional registry protocols and AI verification endpoints.</p>
        </div>
        
        <div className="flex gap-4">
           <button className="px-10 py-5 rounded-[28px] bg-brand-deep text-white text-[10px] font-black uppercase tracking-[0.2em] hover:scale-105 active:scale-95 transition-all shadow-xl shadow-brand-deep/20 flex items-center gap-3">
              <Save size={18} /> Deploy to Nodes
           </button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-12">
        {/* Navigation Sidebar */}
        <div className="xl:col-span-3 space-y-6">
           <div className="glass-card p-4 rounded-[40px] border border-brand-earth/5 backdrop-blur-3xl overflow-hidden shadow-3xl">
              {tabs.map((tab) => (
                <button 
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-5 p-6 rounded-[32px] text-sm font-black transition-all group ${
                    activeTab === tab.id ? 'bg-brand-deep text-white shadow-2xl scale-105' : 'text-brand-slate/30 hover:bg-white hover:text-brand-deep'
                  }`}
                >
                  <div className={`p-2.5 rounded-2xl transition-all ${
                    activeTab === tab.id ? 'bg-brand-gold text-brand-deep' : 'bg-brand-slate/5 group-hover:bg-brand-deep/5 group-hover:text-brand-deep'
                  }`}>
                    <tab.icon size={22} />
                  </div>
                  <span className="uppercase tracking-widest text-[11px] font-black italic">{tab.id}</span>
                  {activeTab === tab.id && (
                    <motion.div layoutId="setting-active" className="ml-auto w-1.5 h-1.5 rounded-full bg-brand-gold" />
                  )}
                </button>
              ))}
           </div>

           <div className="glass-card-dark bg-brand-deep p-10 rounded-[48px] border border-white/5 shadow-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-24 h-24 bg-brand-gold/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
              <div className="relative z-10">
                 <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-brand-gold mb-8 rotate-6 group-hover:rotate-0 transition-transform">
                    <Activity size={24} />
                 </div>
                 <h4 className="text-lg font-black text-white tracking-tight italic mb-3">System Load</h4>
                 <div className="space-y-4">
                    <div className="flex justify-between items-center text-[9px] font-black uppercase text-white/30 tracking-widest">
                       <span>Database</span>
                       <span>24ms</span>
                    </div>
                    <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                       <motion.div initial={{ width: 0 }} animate={{ width: "35%" }} className="h-full bg-brand-gold shadow-[0_0_10px_#D4AF37]" />
                    </div>
                 </div>
              </div>
           </div>
        </div>

        {/* Settings Area */}
        <div className="xl:col-span-9 space-y-12">
           <AnimatePresence mode="wait">
              <motion.div 
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-12"
              >
                 <div className="glass-card p-16 rounded-[64px] border border-brand-earth/5 shadow-3xl bg-white/40">
                    <div className="flex items-center gap-5 mb-16">
                       <div className="w-16 h-16 rounded-[28px] bg-brand-offwhite flex items-center justify-center text-brand-deep border border-brand-earth/5 shadow-xl">
                          {tabs.find(t => t.id === activeTab)?.icon({ size: 32 })}
                       </div>
                       <div>
                          <h3 className="text-3xl font-black text-brand-slate uppercase tracking-tighter italic">{activeTab} Node Control</h3>
                          <p className="text-sm font-bold text-brand-slate/30 mt-1 uppercase tracking-widest">Regional Endpoint: SB_CORE_CBE</p>
                       </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                       <div className="space-y-10">
                          <div className="space-y-6">
                             <div className="flex items-center justify-between ml-2">
                                <div>
                                   <p className="text-sm font-black text-brand-slate uppercase italic">Maintenance Stream</p>
                                   <p className="text-[10px] font-bold text-brand-slate/30 tracking-tighter uppercase mt-1">Status: Operational</p>
                                </div>
                                <label className="relative inline-flex items-center cursor-pointer">
                                  <input type="checkbox" className="sr-only peer" defaultChecked />
                                  <div className="w-16 h-8 bg-brand-slate/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[4px] after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-7 after:transition-all peer-checked:bg-brand-earth shadow-inner"></div>
                                </label>
                             </div>
                             <div className="flex items-center justify-between ml-2">
                                <div>
                                   <p className="text-sm font-black text-brand-slate uppercase italic">AI Deep Triage</p>
                                   <p className="text-[10px] font-bold text-brand-slate/30 tracking-tighter uppercase mt-1">Status: Pulse Active</p>
                                </div>
                                <label className="relative inline-flex items-center cursor-pointer">
                                  <input type="checkbox" className="sr-only peer" defaultChecked />
                                  <div className="w-16 h-8 bg-brand-slate/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[4px] after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-7 after:transition-all peer-checked:bg-brand-earth shadow-inner"></div>
                                </label>
                             </div>
                             <div className="flex items-center justify-between ml-2">
                                <div>
                                   <p className="text-sm font-black text-brand-slate uppercase italic">Global Sync Node</p>
                                   <p className="text-[10px] font-bold text-brand-slate/30 tracking-tighter uppercase mt-1">Status: Encrypted Sync</p>
                                </div>
                                <label className="relative inline-flex items-center cursor-pointer">
                                  <input type="checkbox" className="sr-only peer" />
                                  <div className="w-16 h-8 bg-brand-slate/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[4px] after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-7 after:transition-all peer-checked:bg-brand-earth shadow-inner"></div>
                                </label>
                             </div>
                          </div>
                       </div>

                       <div className="space-y-10">
                          <div className="group">
                             <label className="block text-[10px] font-black uppercase tracking-widest text-brand-slate/30 mb-4 ml-6 italic">Regional Sync URL</label>
                             <div className="relative">
                                <Globe className="absolute left-6 top-1/2 -translate-y-1/2 text-brand-slate/20" size={18} />
                                <input readOnly value="https://api.cropcred.ai/v2.4/regional/cbe" className="w-full pl-16 pr-8 py-5 rounded-[28px] border-2 border-brand-earth/5 bg-brand-offwhite text-sm font-black text-brand-slate/40 focus:outline-none shadow-inner" />
                             </div>
                          </div>
                          <div className="group">
                             <label className="block text-[10px] font-black uppercase tracking-widest text-brand-slate/30 mb-4 ml-6 italic">Database Latency Cap (ms)</label>
                             <div className="relative">
                                <Zap className="absolute left-6 top-1/2 -translate-y-1/2 text-brand-gold" size={18} />
                                <input defaultValue="50" type="number" className="w-full pl-16 pr-8 py-5 rounded-[28px] border-2 border-brand-earth/5 bg-white text-sm font-black text-brand-slate focus:outline-none focus:border-brand-gold shadow-inner" />
                             </div>
                          </div>
                       </div>
                    </div>

                    <div className="mt-20 pt-16 border-t border-brand-earth/5 flex flex-col md:flex-row items-center justify-between gap-10">
                       <div className="flex items-center gap-6">
                          <div className="w-14 h-14 rounded-2xl bg-brand-earth/5 flex items-center justify-center text-brand-earth shadow-lg">
                             <ShieldCheck size={28} />
                          </div>
                          <div>
                             <p className="text-sm font-black text-brand-slate uppercase italic leading-none mb-1">Authenticated Protocol</p>
                             <p className="text-[10px] font-bold text-brand-slate/30 uppercase tracking-widest">TLS 1.3 Encryption Active</p>
                          </div>
                       </div>
                       <div className="flex gap-4">
                          <button className="px-8 py-4 rounded-[24px] border-2 border-brand-earth/10 text-[10px] font-black uppercase text-brand-slate tracking-widest hover:bg-brand-slate/5 transition-all">
                             Audit Pulse Logs
                          </button>
                          <button className="px-8 py-4 rounded-[24px] bg-brand-earth text-white text-[10px] font-black uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-xl">
                             Update Global Node
                          </button>
                       </div>
                    </div>
                 </div>

                 <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                    {[
                      { l: "Hard Storage", v: "1.2 TB", i: HardDrive, p: "45%" },
                      { l: "Registry Load", v: "High Pulse", i: Layers, p: "82%" },
                      { l: "Officer Sync", v: "Active Nodes", i: UserPlus, p: "100%" }
                    ].map(m => (
                      <div key={m.l} className="glass-card p-10 rounded-[48px] border border-brand-earth/5 group shadow-2xl relative overflow-hidden">
                         <div className="flex items-center justify-between mb-8">
                            <div className="w-10 h-10 rounded-xl bg-brand-offwhite flex items-center justify-center text-brand-slate/20 transition-transform group-hover:scale-110">
                               <m.i size={20} />
                            </div>
                            <span className="text-[10px] font-black text-brand-gold uppercase tracking-widest">Live Pulse</span>
                         </div>
                         <p className="text-[9px] font-black text-brand-slate/20 uppercase tracking-[0.3em] mb-1 italic">{m.l}</p>
                         <h4 className="text-2xl font-black text-brand-slate mb-6 italic">{m.v}</h4>
                         <div className="w-full h-1.5 bg-brand-slate/5 rounded-full overflow-hidden">
                            <motion.div initial={{ width: 0 }} animate={{ width: m.p }} className="h-full bg-brand-earth" />
                         </div>
                      </div>
                    ))}
                 </div>
              </motion.div>
           </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default SystemSettings;
