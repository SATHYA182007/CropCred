import { motion } from 'framer-motion';
import { 
  ShieldCheck, 
  Activity, 
  Search, 
  Database, 
  CheckCircle2, 
  AlertCircle,
  TrendingUp
} from 'lucide-react';
import { AreaChart, Area, ResponsiveContainer, Tooltip } from 'recharts';

const chartData = [
  { name: 'Mon', value: 3400 },
  { name: 'Tue', value: 4200 },
  { name: 'Wed', value: 3100 },
  { name: 'Thu', value: 5800 },
  { name: 'Fri', value: 5200 },
  { name: 'Sat', value: 6100 },
  { name: 'Sun', value: 7500 },
];

const DashboardMockup = () => {
  return (
    <div className="relative group">
      {/* Background Glows */}
      <div className="absolute -inset-20 bg-brand-gold/10 rounded-full blur-[100px] opacity-50 group-hover:opacity-100 transition-opacity pointer-events-none" />
      <div className="absolute top-1/2 -right-20 w-80 h-80 bg-brand-earth/20 rounded-full blur-[80px] pointer-events-none" />

      {/* Main Dashboard Frame */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, rotate: -2 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative glass-card-dark rounded-[48px] p-8 border border-white/10 shadow-3xl overflow-hidden aspect-[1.4] flex flex-col"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/5 pb-6 mb-8">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-brand-gold/20 flex items-center justify-center text-brand-gold shadow-inner">
              <ShieldCheck size={28} />
            </div>
            <div>
              <p className="text-[10px] text-white/40 font-black uppercase tracking-[0.2em]">Live Infrastructure</p>
              <h2 className="text-xl font-bold text-white tracking-tight">CropCred <span className="text-brand-gold">AI Monitor</span></h2>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex -space-x-2">
              {[1, 2, 3].map(i => (
                <div key={i} className="w-8 h-8 rounded-full border-2 border-brand-deep bg-brand-earth flex items-center justify-center text-[10px] font-bold text-white overflow-hidden shadow-lg">
                  {String.fromCharCode(64+i)}
                </div>
              ))}
            </div>
            <div className="px-5 py-2 rounded-full bg-green-500/10 text-green-400 text-[10px] font-black border border-green-500/20 shadow-lg glow-green-sm flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              SYSTEM ACTIVE
            </div>
          </div>
        </div>

        {/* Analytics Grid */}
        <div className="grid grid-cols-12 gap-6 flex-1 min-h-0">
          {/* Main Chart Area */}
          <div className="col-span-8 space-y-6">
            <div className="glass-card-dark bg-white/[0.02] p-6 rounded-[32px] border border-white/5 flex-1 flex flex-col h-full">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <p className="text-[10px] text-white/30 uppercase font-bold tracking-widest">Disbursement Trends</p>
                  <p className="text-2xl font-black text-white">₹ 4.2 Cr <span className="text-xs text-green-400 ml-2 font-bold">+18.4%</span></p>
                </div>
                <div className="flex gap-2">
                  <div className="px-3 py-1 rounded-lg bg-white/5 text-[10px] font-bold">1W</div>
                  <div className="px-3 py-1 rounded-lg bg-brand-gold/20 text-brand-gold text-[10px] font-bold border border-brand-gold/10">1M</div>
                </div>
              </div>
              <div className="flex-1 h-[140px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={chartData}>
                    <defs>
                      <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#D4AF37" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#D4AF37" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#0F291B', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }}
                      itemStyle={{ color: '#D4AF37' }}
                    />
                    <Area type="monotone" dataKey="value" stroke="#D4AF37" fillOpacity={1} fill="url(#colorValue)" strokeWidth={3} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Sub-metrics */}
            <div className="grid grid-cols-2 gap-4">
              <div className="glass-card-dark bg-white/[0.02] p-5 rounded-[24px] border border-white/5">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 rounded-lg bg-blue-500/10 text-blue-400 flex items-center justify-center">
                    <Activity size={18} />
                  </div>
                  <p className="text-[10px] text-white/40 font-bold uppercase tracking-widest">Processing Speed</p>
                </div>
                <p className="text-2xl font-black text-white">0.42s <span className="text-[10px] text-white/30 lowercase ml-1">/ app</span></p>
              </div>
              <div className="glass-card-dark bg-white/[0.02] p-5 rounded-[24px] border border-white/5">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 rounded-lg bg-red-500/10 text-red-100 flex items-center justify-center">
                    <AlertCircle size={18} />
                  </div>
                  <p className="text-[10px] text-white/40 font-bold uppercase tracking-widest">Fraud Blocked</p>
                </div>
                <p className="text-2xl font-black text-white">1,240 <span className="text-[10px] text-brand-gold uppercase ml-1">Verified</span></p>
              </div>
            </div>
          </div>

          {/* Activity Sidebar */}
          <div className="col-span-4 flex flex-col gap-4">
            <div className="glass-card-dark bg-white/[0.02] p-6 rounded-[32px] border border-white/5 flex-1 overflow-hidden">
              <div className="flex items-center justify-between mb-6">
                <p className="text-[10px] text-white/30 uppercase font-black">AI Verification Logs</p>
                <Search size={14} className="text-white/20" />
              </div>
              <div className="space-y-4">
                {[
                  { id: "#CC-450", status: "Auto-Verified", score: "99.8%", color: "text-green-400" },
                  { id: "#CC-451", status: "OCR Match", score: "94.2%", color: "text-brand-gold" },
                  { id: "#CC-452", status: "Validated", score: "100%", color: "text-green-400" },
                  { id: "#CC-453", status: "Review", score: "88.5%", color: "text-white/40" },
                ].map((log, i) => (
                  <motion.div 
                    initial={{ x: 20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 1 + i * 0.1 }}
                    key={log.id} 
                    className="flex flex-col gap-1 border-b border-white/5 pb-3 last:border-0"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[10px] text-white/50">{log.id}</span>
                      <span className={`text-[9px] font-black uppercase tracking-tighter ${log.color}`}>{log.status}</span>
                    </div>
                    <div className="w-full h-1 bg-white/5 rounded-full mt-1.5 overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: log.score }}
                        transition={{ delay: 1.5 + i * 0.1, duration: 1 }}
                        className={`h-full ${log.color.replace('text-', 'bg-')} opacity-50`} 
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Floating Interactive Elements */}
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-12 -left-12 glass-card p-6 rounded-3xl border-brand-gold/20 flex items-center gap-4 shadow-3xl bg-white/[0.8] backdrop-blur-2xl"
      >
        <div className="w-14 h-14 rounded-2xl bg-brand-gold/10 flex items-center justify-center text-brand-gold shadow-xl">
          <Database size={28} />
        </div>
        <div>
          <p className="text-[10px] font-black text-brand-slate/40 uppercase tracking-widest">Farmers Vault</p>
          <div className="flex items-baseline gap-1">
            <p className="text-2xl font-black text-brand-slate">85,420</p>
            <p className="text-[10px] text-green-600 font-bold tracking-tighter">+1.2k / mo</p>
          </div>
        </div>
      </motion.div>

      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -bottom-10 -right-10 glass-card-dark p-6 rounded-3xl border border-white/10 flex items-center gap-4 bg-brand-deep/90 shadow-3xl backdrop-blur-2xl"
      >
        <div className="w-12 h-12 rounded-2xl bg-green-500/20 flex items-center justify-center text-green-400">
          <TrendingUp size={24} />
        </div>
        <div>
          <p className="text-[10px] font-black text-white/40 uppercase tracking-widest">Governance Score</p>
          <p className="text-2xl font-black text-brand-gold">A+</p>
        </div>
      </motion.div>

      {/* Floating Status Badge */}
      <motion.div
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 3, repeat: Infinity }}
        className="absolute bottom-1/4 -right-20 glass-card p-3 rounded-2xl border-white bg-white/90 shadow-2xl z-20 flex items-center gap-3"
      >
        <CheckCircle2 size={18} className="text-green-500" />
        <span className="text-xs font-bold text-brand-slate">Scheme #902 Approved</span>
      </motion.div>
    </div>
  );
};

export default DashboardMockup;
