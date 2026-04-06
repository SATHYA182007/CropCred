import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  BarChart4, 
  TrendingUp, 
  ArrowUpRight, 
  ArrowDownRight, 
  Activity, 
  Users, 
  Database, 
  ShieldCheck, 
  Zap, 
  Calendar,
  Filter,
  Download,
  Share2,
  RefreshCw,
  Cpu,
  Globe,
  PieChart,
  Layers,
  Search
} from 'lucide-react';

const AdminAnalytics = () => {
  const [loading, setLoading] = useState(false);

  const stats = [
    { label: "Total Disbursement", value: "₹42.8M", change: "+12.4%", status: "up", color: "text-brand-earth" },
    { label: "AI Verification Rate", value: "98.2%", change: "+2.1%", status: "up", color: "text-blue-500" },
    { label: "Citizen Registry", value: "14,502", change: "+852", status: "up", color: "text-brand-gold" },
    { label: "System Uptime", value: "99.9%", change: "Optimized", status: "stable", color: "text-brand-deep" }
  ];

  const regionalData = [
    { district: "Tiruppur", value: 85, color: "bg-brand-earth" },
    { district: "Coimbatore", value: 72, color: "bg-blue-500" },
    { district: "Erode", value: 64, color: "bg-brand-gold" },
    { district: "Namakkal", value: 45, color: "bg-brand-deep" }
  ];

  return (
    <div className="space-y-12 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-10">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-deep/10 text-brand-deep text-[10px] font-black uppercase tracking-widest border border-brand-deep/20 mb-6">
            <PieChart size={12} /> Executive Intelligence Hub
          </div>
          <h1 className="text-7xl font-black text-brand-slate tracking-tighter leading-[0.9] mb-4">Analytics <span className="text-brand-slate/20">Pulse.</span></h1>
          <p className="text-xl font-medium text-brand-slate/40 max-w-xl">Deep-core data visualization for regional agricultural disbursement and system performance.</p>
        </div>
        
        <div className="flex gap-4">
           <div className="flex p-1.5 rounded-[28px] bg-brand-slate/5 border border-brand-earth/5 backdrop-blur-xl">
              <button className="px-6 py-3 rounded-[22px] text-[10px] font-black uppercase bg-brand-deep text-white shadow-xl">Real-time</button>
              <button className="px-6 py-3 rounded-[22px] text-[10px] font-black uppercase text-brand-slate/40">Historical</button>
           </div>
           <button className="p-4 rounded-[22px] bg-brand-offwhite border border-brand-earth/5 text-brand-slate/40 hover:text-brand-earth transition-all">
              <Download size={20} />
           </button>
        </div>
      </div>

      {/* Hero Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {stats.map((s, i) => (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            key={i} 
            className="glass-card p-12 rounded-[56px] border border-brand-earth/5 relative overflow-hidden group shadow-3xl hover:border-brand-gold/30 transition-all"
          >
            <div className="absolute top-0 right-0 w-24 h-24 bg-brand-gold/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-700" />
            <p className="text-[10px] font-black text-brand-slate/30 uppercase tracking-[0.3em] mb-3 leading-none italic">{s.label}</p>
            <h4 className="text-4xl font-black text-brand-slate tracking-tighter mb-4">{s.value}</h4>
            <div className="flex items-center gap-2">
               <div className={`p-1 rounded-full ${s.status === 'up' ? 'bg-green-500/10 text-green-500' : 'bg-brand-gold/10 text-brand-gold'}`}>
                  {s.status === 'up' ? <ArrowUpRight size={14} /> : <TrendingUp size={14} />}
               </div>
               <span className={`text-xs font-black uppercase tracking-widest ${s.status === 'up' ? 'text-green-500' : 'text-brand-gold'}`}>{s.change}</span>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-12">
        {/* Left: Main Chart Simulation */}
        <div className="xl:col-span-8 space-y-12">
           <div className="glass-card-dark bg-brand-deep rounded-[64px] p-16 border border-white/5 relative overflow-hidden group shadow-3xl min-h-[500px]">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(212,175,55,0.05)_0%,transparent_50%)] pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-full h-[60%] bg-gradient-to-t from-brand-gold/5 to-transparent pointer-events-none" />
              
              <div className="flex items-center justify-between mb-20 relative z-10">
                 <div>
                    <h3 className="text-3xl font-black text-white tracking-tight leading-none mb-3 italic">Disbursement Velocity</h3>
                    <p className="text-[11px] font-black text-white/30 uppercase tracking-[0.4em]">Multi-District Registry Pulse • Monthly Batch</p>
                 </div>
                 <div className="flex gap-4">
                    <div className="px-6 py-3 rounded-full bg-white/5 border border-white/10 text-brand-gold text-[10px] font-black uppercase tracking-[0.2em] flex items-center gap-2 animate-pulse">
                       <Globe size={14} /> Live Sync
                    </div>
                 </div>
              </div>

              {/* Simulated Chart Bars */}
              <div className="flex items-end justify-between h-48 gap-4 px-10 relative z-10">
                 {[40, 65, 45, 90, 55, 75, 40, 85, 60, 95, 70, 80].map((h, i) => (
                   <div key={i} className="flex-1 group/bar relative">
                      <motion.div 
                        initial={{ height: 0 }}
                        animate={{ height: `${h}%` }}
                        transition={{ delay: i * 0.05, duration: 1, ease: "circOut" }}
                        className={`w-full rounded-t-2xl bg-gradient-to-t from-brand-gold/20 to-brand-gold/80 group-hover/bar:bg-brand-gold transition-all relative shadow-[0_0_15px_rgba(212,175,55,0.2)]`}
                      />
                      <div className="absolute -top-10 left-1/2 -translate-x-1/2 opacity-0 group-hover/bar:opacity-100 transition-all">
                        <span className="text-[9px] font-black text-brand-gold bg-white/10 px-3 py-1 rounded-full border border-white/10">₹{h}M</span>
                      </div>
                   </div>
                 ))}
              </div>
              
              {/* Chart labels */}
              <div className="flex justify-between px-10 mt-10 pt-10 border-t border-white/5 relative z-10">
                 {['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'].map((m) => (
                   <span key={m} className="text-[9px] font-black text-white/20 uppercase tracking-widest">{m}</span>
                 ))}
              </div>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="glass-card p-12 rounded-[56px] border border-brand-earth/5 group shadow-2xl relative overflow-hidden">
                 <div className="flex items-center justify-between mb-10">
                    <h4 className="text-xl font-black text-brand-slate uppercase tracking-tight italic">AI Audit Depth</h4>
                    <Cpu size={24} className="text-brand-gold" />
                 </div>
                 <div className="space-y-8">
                    {[
                      { label: "OCR Accuracy", value: 99, color: "bg-green-500" },
                      { label: "Pattern Match", value: 84, color: "bg-blue-500" },
                      { label: "Risk Triage", value: 92, color: "bg-brand-gold" }
                    ].map(aud => (
                      <div key={aud.label} className="space-y-3">
                         <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-brand-slate/30">
                            <span>{aud.label}</span>
                            <span>{aud.value}%</span>
                         </div>
                         <div className="w-full h-2 bg-brand-slate/5 rounded-full overflow-hidden">
                            <motion.div 
                              initial={{ width: 0 }}
                              animate={{ width: `${aud.value}%` }}
                              className={`h-full ${aud.color}`}
                            />
                         </div>
                      </div>
                    ))}
                 </div>
              </div>

              <div className="glass-card p-12 rounded-[56px] border border-brand-earth/5 group shadow-2xl bg-brand-earth text-white flex flex-col justify-between overflow-hidden relative">
                 <div className="absolute top-0 right-0 w-80 h-80 bg-white/5 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
                 <div className="relative z-10">
                    <TrendingUp size={40} className="text-white/20 mb-10" />
                    <h4 className="text-3xl font-black tracking-tighter leading-none mb-4">Growth Matrix Optimization</h4>
                    <p className="text-sm font-medium text-white/40 leading-relaxed mb-10">
                      Regional adoption metrics indicate a 40% efficiency increase in document processing since AI v2.4 rollout.
                    </p>
                 </div>
                 <button className="relative z-10 w-full py-5 rounded-[28px] bg-white text-brand-earth font-black text-[10px] uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-xl">
                    Executive Report v2.0
                 </button>
              </div>
           </div>
        </div>

        {/* Right: Geographic Distribution */}
        <div className="xl:col-span-4 space-y-12">
           <div className="glass-card rounded-[56px] p-12 border border-brand-earth/5 shadow-3xl bg-white/60">
              <div className="flex items-center justify-between mb-12">
                  <div>
                    <h3 className="text-xl font-black text-brand-slate uppercase tracking-tight italic">Regional Load</h3>
                    <p className="text-[10px] font-black text-brand-slate/30 uppercase tracking-widest mt-1 italic">Active Node Distribution</p>
                  </div>
                  <Globe size={24} className="text-brand-slate/20" />
              </div>

              <div className="space-y-10">
                 {regionalData.map((reg) => (
                    <div key={reg.district} className="space-y-4 group">
                       <div className="flex justify-between items-center text-xs font-black uppercase tracking-widest">
                          <span className="text-brand-slate/40 group-hover:text-brand-slate transition-colors">{reg.district}</span>
                          <span className="text-brand-slate">{reg.value}%</span>
                       </div>
                       <div className="w-full h-3 bg-brand-slate/5 rounded-full overflow-hidden flex items-center px-1">
                          <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: `${reg.value}%` }}
                            className={`h-1 rounded-full ${reg.color} shadow-[0_0_10px_rgba(0,0,0,0.1)]`}
                          />
                       </div>
                    </div>
                 ))}
              </div>

              <div className="grid grid-cols-2 gap-4 mt-20 pt-10 border-t border-brand-earth/5">
                 <div className="text-center group">
                    <p className="text-2xl font-black text-brand-slate group-hover:text-brand-gold transition-colors">42.8M</p>
                    <p className="text-[9px] font-black text-brand-slate/20 uppercase tracking-[0.2em] mt-2">Active Funds</p>
                 </div>
                 <div className="text-center group">
                    <p className="text-2xl font-black text-brand-slate group-hover:text-brand-earth transition-colors">12.5k</p>
                    <p className="text-[9px] font-black text-brand-slate/20 uppercase tracking-[0.2em] mt-2">Verified Hubs</p>
                 </div>
              </div>
           </div>

           <div className="glass-card-dark bg-brand-deep rounded-[56px] p-12 border border-white/5 shadow-2xl relative overflow-hidden group">
              <div className="absolute bottom-0 right-0 w-32 h-32 bg-brand-gold/10 rounded-full blur-3xl translate-y-1/2 translate-x-1/2" />
              <div className="flex items-center gap-5 mb-10 relative z-10">
                 <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-brand-gold shadow-2xl rotate-3 group-hover:rotate-0 transition-transform">
                    <Layers size={28} />
                 </div>
                 <h4 className="text-xl font-black text-white tracking-tight leading-none italic">System Logs</h4>
              </div>
              <div className="space-y-6 relative z-10">
                 {[
                   { t: "11:20", msg: "Batch node sync: Success", meta: "ENV.2" },
                   { t: "11:05", msg: "Registry audit completed", meta: "AUD.X" },
                   { t: "10:52", msg: "New security layer active", meta: "SEC.7" }
                 ].map((log, i) => (
                   <div key={i} className="flex flex-col gap-1 border-b border-white/5 pb-4 last:border-0">
                      <div className="flex items-center justify-between font-mono text-[10px]">
                         <span className="text-brand-gold font-black italic">{log.t}</span>
                         <span className="text-white/10 uppercase font-black">{log.meta}</span>
                      </div>
                      <p className="text-[11px] font-bold text-white/40 mt-1">{log.msg}</p>
                   </div>
                 ))}
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default AdminAnalytics;
