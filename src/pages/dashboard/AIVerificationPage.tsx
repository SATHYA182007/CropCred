import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Cpu, 
  Search, 
  ShieldCheck, 
  Zap, 
  AlertCircle, 
  CheckCircle2, 
  XCircle, 
  FileSearch, 
  Layers, 
  Activity, 
  ChevronRight, 
  ArrowUpRight,
  Database,
  Lock,
  Loader2,
  Scan,
  RefreshCcw,
  Eye,
  FileText
} from 'lucide-react';
import { toast } from 'sonner';

interface VerificationResult {
  id: string;
  farmer: string;
  document: string;
  category: string;
  confidence: number;
  status: 'pending' | 'processing' | 'verified' | 'flagged';
  details: string[];
}

const AIVerificationPage = () => {
  const [queue, setQueue] = useState<VerificationResult[]>([
    { id: 'V-9012', farmer: 'Lakshmi Narayan', document: 'Land Deed A-12', category: 'Registry Sync', confidence: 98, status: 'verified', details: ['Geo-tag Match: 100%', 'Registry ID: Valid', 'OCR Consistency: High'] },
    { id: 'V-9013', farmer: 'Murugan Thangavel', document: 'Caste Certificate', category: 'Identity Verification', confidence: 62, status: 'flagged', details: ['Signature Discrepancy', 'Stamp Clarity: Low', 'Date Mismatch: Flagged'] },
    { id: 'V-9014', farmer: 'Ramesh Kumar', document: 'Bank Passbook', category: 'Finance Check', confidence: 0, status: 'pending', details: [] },
    { id: 'V-9015', farmer: 'Arun Varma', document: 'Aadhar Card', category: 'Identity Verification', confidence: 0, status: 'pending', details: [] },
  ]);

  const [activeAnalysis, setActiveAnalysis] = useState<VerificationResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [progress, setProgress] = useState(0);

  const startAnalysis = (item: VerificationResult) => {
    if (item.status !== 'pending') return;
    
    setActiveAnalysis(item);
    setIsAnalyzing(true);
    setProgress(0);
    
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          completeAnalysis(item);
          return 100;
        }
        return prev + 5;
      });
    }, 150);
  };

  const completeAnalysis = (item: VerificationResult) => {
    const isFlagged = Math.random() > 0.7;
    const confidence = isFlagged ? 65 : 94 + Math.floor(Math.random() * 5);
    
    setQueue(prev => prev.map(q => q.id === item.id ? { 
      ...q, 
      status: isFlagged ? 'flagged' : 'verified', 
      confidence,
      details: isFlagged 
        ? ['Incomplete Seal', 'Image Resolution: Low'] 
        : ['Blockchain Hash: Valid', 'OCR Cross-Check: Success', 'Regional Registry: Confirmed']
    } : q));
    
    setIsAnalyzing(false);
    toast.success(`AI Verification Complete for ${item.farmer}`, {
      description: isFlagged ? 'Flagged for manual review.' : 'Verified with high confidence.'
    });
  };

  const VerificationCard = ({ item }: { item: VerificationResult }) => (
    <motion.div 
      layout
      whileHover={{ y: -5 }}
      className={`glass-card p-8 rounded-[40px] border transition-all group relative overflow-hidden ${
        item.status === 'verified' ? 'hover:border-green-500/30' : 
        item.status === 'flagged' ? 'hover:border-red-500/30' : 'hover:border-brand-gold/30'
      }`}
    >
      <div className="flex items-center justify-between mb-8 relative z-10">
        <div className="flex items-center gap-4">
           <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all ${
             item.status === 'verified' ? 'bg-green-500/10 text-green-500' :
             item.status === 'flagged' ? 'bg-red-500/10 text-red-500' :
             'bg-brand-slate/5 text-brand-slate/30 group-hover:bg-brand-gold group-hover:text-white'
           }`}>
              {item.status === 'pending' ? <Scan size={28} /> : 
               item.status === 'verified' ? <ShieldCheck size={28} /> : <AlertCircle size={28} />}
           </div>
           <div>
              <p className="text-[10px] font-black text-brand-slate/30 uppercase tracking-[0.2em] mb-1">Queue ID: {item.id}</p>
              <h4 className="text-lg font-black text-brand-slate truncate max-w-[200px]">{item.farmer}</h4>
           </div>
        </div>
        
        <div className="text-right">
           <p className="text-[10px] font-black text-brand-slate/30 uppercase tracking-widest mb-1">Confidence</p>
           <p className={`text-2xl font-black ${
             item.confidence > 90 ? 'text-green-500' : 
             item.confidence > 70 ? 'text-brand-gold' : 
             item.confidence > 0 ? 'text-red-500' : 'text-brand-slate/20'
           }`}>{item.confidence}%</p>
        </div>
      </div>

      <div className="space-y-4 mb-8 relative z-10">
         <div className="flex items-center justify-between text-xs font-bold">
            <span className="text-brand-slate/40 uppercase tracking-tighter">Document Type</span>
            <span className="text-brand-slate">{item.document}</span>
         </div>
         <div className="flex items-center justify-between text-xs font-bold">
            <span className="text-brand-slate/40 uppercase tracking-tighter">Analysis Track</span>
            <span className="text-brand-gold">{item.category}</span>
         </div>
      </div>

      <div className="relative z-10">
        {item.status === 'pending' ? (
          <button 
            onClick={() => startAnalysis(item)}
            className="w-full py-4 rounded-[24px] bg-brand-deep text-white font-black text-[10px] uppercase tracking-widest hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2"
          >
            <Zap size={14} fill="currentColor" /> Initiate AI Pulse
          </button>
        ) : (
          <div className="space-y-3">
             <div className="flex flex-wrap gap-2">
                {item.details.map((d, i) => (
                  <span key={i} className="px-3 py-1 rounded-full bg-brand-slate/5 text-[9px] font-bold text-brand-slate/50 border border-brand-slate/10">{d}</span>
                ))}
             </div>
             <button className="w-full flex items-center justify-center gap-2 text-[10px] font-black text-brand-gold uppercase tracking-widest hover:underline mt-4">
                View OCR Artifact <Eye size={12} />
             </button>
          </div>
        )}
      </div>
    </motion.div>
  );

  return (
    <div className="space-y-12 max-w-7xl mx-auto">
      {/* Header Layer */}
      <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-10">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-gold/10 text-brand-gold text-[10px] font-black uppercase tracking-widest border border-brand-gold/20 mb-6">
            <Cpu size={12} /> Automated Analysis Environment
          </div>
          <h1 className="text-7xl font-black text-brand-slate tracking-tighter leading-[0.9] mb-4">AI <span className="text-brand-gold">Verify.</span></h1>
          <p className="text-xl font-medium text-brand-slate/40 max-w-xl">Intelligent document triaging and OCR cross-referencing system for regional registry.</p>
        </div>
        <div className="flex gap-4">
           <div className="glass-card p-4 rounded-[32px] flex items-center gap-6 border border-brand-earth/10">
              <div className="flex flex-col">
                 <span className="text-[9px] font-black text-brand-slate/30 uppercase tracking-[0.2em] mb-1">Queue Load</span>
                 <div className="flex items-center gap-3">
                    <span className="text-xl font-black text-brand-slate">{queue.length} Tasks</span>
                    <div className="w-2 h-2 rounded-full bg-brand-gold animate-pulse shadow-[0_0_8px_#D4AF37]" />
                 </div>
              </div>
              <div className="w-px h-10 bg-brand-earth/10" />
              <button onClick={() => setQueue(prev => prev.map(q => ({...q, status: 'pending', confidence: 0, details: []})))} className="p-3 rounded-2xl bg-brand-earth/5 text-brand-earth hover:bg-brand-earth hover:text-white transition-all">
                <RefreshCcw size={20} />
              </button>
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-12">
        {/* Left: Active Analysis Terminal */}
        <div className="xl:col-span-8 space-y-12">
           <div className="glass-card-dark bg-premium-dark rounded-[64px] p-16 border border-white/5 relative overflow-hidden group shadow-3xl min-h-[500px]">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(212,175,55,0.1)_0%,transparent_50%)] pointer-events-none" />
              
              {!activeAnalysis ? (
                <div className="h-full flex flex-col items-center justify-center text-center py-20 pointer-events-none opacity-20">
                    <Cpu size={80} className="text-brand-gold mb-10 animate-pulse" />
                    <h3 className="text-2xl font-black text-white tracking-[0.2em] uppercase">Ready for Analysis Pulse</h3>
                    <p className="text-sm font-bold text-white/40 mt-4">Select an item from the registry queue to initiate the AI verification track.</p>
                </div>
              ) : (
                <AnimatePresence mode="wait">
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="relative z-10"
                  >
                    <div className="flex items-center justify-between mb-16">
                       <div className="flex items-center gap-5">
                          <div className="w-16 h-16 rounded-[28px] bg-white/5 border border-white/10 flex items-center justify-center text-brand-gold shadow-2xl">
                             <FileSearch size={32} />
                          </div>
                          <div>
                             <h3 className="text-3xl font-black text-white tracking-tight mb-2">Analyzing: {activeAnalysis.farmer}</h3>
                             <p className="text-[11px] font-black text-white/30 uppercase tracking-[0.4em]">OCR Pipeline • Regional Registry Cross-Check</p>
                          </div>
                       </div>
                       <div className="flex items-center gap-3 px-6 py-3 rounded-full bg-brand-gold/10 border border-brand-gold/20">
                          <Loader2 size={16} className="text-brand-gold animate-spin" />
                          <span className="text-[10px] font-black text-brand-gold uppercase tracking-[0.2em]">Live Pulse...</span>
                       </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
                       <div className="space-y-10">
                          <div className="space-y-4">
                             <div className="flex justify-between items-center">
                                <span className="text-[10px] font-black text-white/30 uppercase tracking-widest">Processing Layer: {progress < 40 ? 'OCR SCAN' : progress < 80 ? 'REGISTRY SYNC' : 'RISK MODEL'}</span>
                                <span className="text-sm font-black text-brand-gold">{progress}%</span>
                             </div>
                             <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                                <motion.div 
                                  initial={{ width: 0 }}
                                  animate={{ width: `${progress}%` }}
                                  className="h-full bg-brand-gold shadow-[0_0_15px_#D4AF37]"
                                />
                             </div>
                          </div>
                          
                          <div className="grid grid-cols-2 gap-4">
                             {[
                               { label: 'Blockchain Hash', status: progress > 30 ? 'VALID' : 'WAITING' },
                               { label: 'Satellite Sync', status: progress > 50 ? 'SYNCED' : 'WAITING' },
                               { label: 'Doc Clarity', status: progress > 70 ? 'OPTIMAL' : 'WAITING' },
                               { label: 'Pattern Match', status: progress > 90 ? 'PASSED' : 'WAITING' },
                             ].map(p => (
                               <div key={p.label} className="p-4 rounded-2xl bg-white/5 border border-white/10">
                                  <p className="text-[9px] font-black text-white/20 uppercase tracking-widest mb-1">{p.label}</p>
                                  <p className={`text-xs font-black ${p.status === 'WAITING' ? 'text-white/20' : 'text-green-400'}`}>{p.status}</p>
                               </div>
                             ))}
                          </div>
                       </div>

                       <div className="relative group">
                          <div className="absolute inset-0 bg-brand-gold/5 rounded-[40px] blur-3xl opacity-50 group-hover:opacity-100 transition-opacity" />
                          <div className="relative aspect-square rounded-[40px] border-2 border-white/5 bg-black/40 flex items-center justify-center overflow-hidden">
                             <div className="absolute top-0 left-0 w-full h-full p-8 font-mono text-[8px] text-brand-gold/20 break-all leading-tight select-none">
                                {Array(50).fill(0).map((_, i) => (
                                  <span key={i}>{Math.random().toString(36).substring(2)} </span>
                                ))}
                             </div>
                             <div className="relative z-10 w-48 h-48 border-2 border-brand-gold/30 rounded-xl flex items-center justify-center p-4">
                                <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-brand-gold" />
                                <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-brand-gold" />
                                <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-brand-gold" />
                                <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-brand-gold" />
                                <Database size={64} className="text-brand-gold animate-pulse" />
                             </div>
                             {/* Scanning line animation */}
                             <motion.div 
                               animate={{ top: ['0%', '100%', '0%'] }}
                               transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
                               className="absolute left-0 right-0 h-0.5 bg-brand-gold/50 shadow-[0_0_20px_#D4AF37] pointer-events-none z-20"
                             />
                          </div>
                       </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              )}
           </div>

           {/* AI Verification Guidelines */}
           <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="glass-card p-10 rounded-[56px] border border-brand-earth/5 group">
                 <div className="flex items-center gap-4 mb-8">
                    <div className="w-14 h-14 rounded-[24px] bg-brand-earth/10 flex items-center justify-center text-brand-earth">
                       <ShieldCheck size={28} />
                    </div>
                    <h4 className="text-2xl font-black text-brand-slate tracking-tight">Trust Protocol</h4>
                 </div>
                 <ul className="space-y-4">
                    {[
                      "95%+ Confidence: Automated Approval Track",
                      "70%-95% Confidence: Manual Officer Review Required",
                      "<70% Confidence: Auto-Flag for Identity Audit",
                      "Geo-tag Mismatch: High Risk Warning"
                    ].map((step, i) => (
                      <li key={i} className="flex items-start gap-4 text-xs font-bold text-brand-slate/50">
                        <div className="w-1.5 h-1.5 rounded-full bg-brand-gold mt-1.5 flex-shrink-0" />
                        {step}
                      </li>
                    ))}
                 </ul>
              </div>

              <div className="glass-card p-10 rounded-[56px] border border-brand-earth/5 group">
                 <div className="flex items-center gap-4 mb-8">
                    <div className="w-14 h-14 rounded-[24px] bg-blue-500/10 flex items-center justify-center text-blue-500">
                       <Layers size={28} />
                    </div>
                    <h4 className="text-2xl font-black text-brand-slate tracking-tight">Model Updates</h4>
                 </div>
                 <div className="p-6 bg-brand-offwhite rounded-[32px] border border-brand-earth/10">
                    <div className="flex justify-between items-center mb-4">
                       <span className="text-[10px] font-black uppercase text-brand-slate/40 tracking-widest">Active Model</span>
                       <span className="text-[10px] font-black text-blue-500 uppercase">CropCred v2.4-PRO</span>
                    </div>
                    <div className="flex items-center gap-4">
                       <div className="flex-1 h-2 bg-brand-slate/5 rounded-full overflow-hidden">
                          <div className="w-full h-full bg-blue-500" />
                       </div>
                       <span className="text-[10px] font-black text-brand-slate">STABLE</span>
                    </div>
                    <p className="text-[10px] text-brand-slate/40 mt-4 leading-relaxed font-bold">Model is optimized for regional land records and Aadhar OCR recognition.</p>
                 </div>
              </div>
           </div>
        </div>

        {/* Right: Registry Queue */}
        <div className="xl:col-span-4 space-y-12">
           <div className="glass-card rounded-[56px] p-10 border border-brand-earth/5 shadow-3xl">
              <div className="flex items-center justify-between mb-10">
                  <div>
                    <h3 className="text-xl font-black text-brand-slate tracking-tight">Registry Queue</h3>
                    <p className="text-[10px] font-black text-brand-slate/30 uppercase tracking-widest">Pending Verification</p>
                  </div>
                  <Search size={20} className="text-brand-slate/30" />
              </div>

              <div className="space-y-4">
                 {queue.map((item) => (
                    <VerificationCard key={item.id} item={item} />
                 ))}
                 
                 {queue.filter(q => q.status === 'pending').length === 0 && (
                   <div className="py-10 text-center opacity-30 select-none">
                      <CheckCircle2 size={40} className="mx-auto mb-4 text-brand-earth" />
                      <p className="text-[10px] font-black uppercase tracking-[0.2em]">Queue Fully Verified</p>
                   </div>
                 )}
              </div>

              <button className="w-full py-5 rounded-[32px] border-2 border-brand-earth/10 text-[10px] font-black uppercase text-brand-slate tracking-widest hover:bg-brand-offwhite transition-all mt-8">
                 Refresh Global Feed
              </button>
           </div>

           <div className="glass-card-dark bg-brand-deep rounded-[56px] p-10 border border-white/5 shadow-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-brand-gold/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
              <div className="flex items-center gap-4 mb-8 relative z-10">
                 <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-brand-gold">
                    <Activity size={24} />
                 </div>
                 <h4 className="text-lg font-black text-white tracking-tight">System Logs</h4>
              </div>
              <div className="space-y-4 relative z-10">
                 {[
                   { t: "14:20", msg: "Model v2.4 initialized", meta: "ENV.ROOT" },
                   { t: "14:15", msg: "OCR Engine calibrated", meta: "VERIFY.PULSE" },
                   { t: "14:12", msg: "Satellite link established", meta: "DISTRICT.CBE" }
                 ].map((log, i) => (
                   <div key={i} className="flex items-center gap-4 py-2 border-b border-white/5 font-mono text-[9px]">
                      <span className="text-brand-gold">{log.t}</span>
                      <span className="text-white/40 flex-1">{log.msg}</span>
                      <span className="text-white/10 uppercase">{log.meta}</span>
                   </div>
                 ))}
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default AIVerificationPage;
