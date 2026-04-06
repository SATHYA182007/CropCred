import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sprout, 
  Search, 
  Filter, 
  ChevronRight, 
  Zap, 
  ShieldCheck, 
  Layers, 
  Clock, 
  CheckCircle2, 
  Info,
  Tractor,
  Droplets,
  Coins,
  Cpu,
  ArrowUpRight
} from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { useAuthStore } from '../../store/authStore';
import { toast } from 'sonner';

const SchemeHub = () => {
  const { profile } = useAuthStore();
  const [schemes, setSchemes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', 'Subsidy', 'Insurance', 'Incentive', 'Equipment'];

  useEffect(() => {
    fetchSchemes();
  }, []);

  const fetchSchemes = async () => {
    setLoading(true);
    try {
      const { data } = await supabase
        .from('schemes')
        .select('*')
        .eq('status', 'active');
      setSchemes(data || []);
    } catch (error) {
      console.error('Error fetching schemes:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredSchemes = schemes.filter(s => {
    const matchesSearch = s.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         s.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === 'All' || s.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

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
      {/* Header & Search */}
      <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-10">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-gold/10 text-brand-gold text-[10px] font-black uppercase tracking-widest border border-brand-gold/20 mb-6">
            <Layers size={12} /> Digital Scheme Ecosystem
          </div>
          <h1 className="text-7xl font-black text-brand-slate tracking-tighter leading-[0.9] mb-4">Scheme <span className="text-brand-earth">Hub.</span></h1>
          <p className="text-xl font-medium text-brand-slate/40 max-w-xl">Curated agricultural support modules for verified local farmers.</p>
        </div>
        
        <div className="flex flex-col md:flex-row gap-4 w-full xl:w-auto">
           <div className="relative flex-1 md:w-80">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-brand-slate/30" size={20} />
              <input 
                type="text" 
                placeholder="Search Scheme Registry..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-16 pr-8 py-5 rounded-[28px] border-2 border-brand-earth/5 bg-white text-sm font-bold focus:outline-none focus:border-brand-gold transition-all shadow-xl shadow-brand-slate/5"
              />
           </div>
           <div className="flex p-1.5 rounded-[28px] bg-brand-slate/5 border border-brand-earth/5 backdrop-blur-xl">
              {categories.map(cat => (
                <button 
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-6 py-3 rounded-[22px] text-[10px] font-black uppercase tracking-widest transition-all ${
                    activeCategory === cat ? 'bg-brand-earth text-white shadow-xl shadow-brand-earth/30' : 'text-brand-slate/40 hover:text-brand-earth'
                  }`}
                >
                  {cat}
                </button>
              ))}
           </div>
        </div>
      </div>

      {/* Recommended for You Banner */}
      <div className="glass-card-dark bg-brand-deep rounded-[56px] p-12 overflow-hidden relative group">
         <div className="absolute top-0 right-0 w-[600px] h-full bg-gradient-to-l from-brand-gold/10 to-transparent pointer-events-none group-hover:from-brand-gold/20 transition-all duration-700" />
         <div className="relative z-10 flex flex-col md:flex-row items-center gap-12">
            <div className="w-24 h-24 rounded-[32px] bg-white/10 flex items-center justify-center text-brand-gold border border-white/10 shadow-2xl group-hover:rotate-6 transition-transform">
               <Cpu size={48} />
            </div>
            <div className="flex-1 text-center md:text-left">
               <p className="text-xs font-black text-brand-gold tracking-[0.4em] uppercase mb-3">AI Prediction Node</p>
               <h3 className="text-3xl font-black text-white tracking-tight leading-none mb-4">Optimized for Your District</h3>
               <p className="text-lg font-medium text-white/40 leading-relaxed max-w-2xl">
                 Based on the Tiruppur agricultural profile, your land size, and previous crop cycles, we've identified 3 high-impact schemes you are <span className="text-white font-bold underline decoration-brand-gold underline-offset-4 decoration-2">92% eligible</span> for.
               </p>
            </div>
            <button className="px-10 py-5 rounded-[32px] bg-white text-brand-deep font-black text-sm uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-2xl">
               Run Eligibility Audit
            </button>
         </div>
      </div>

      {/* Grid of Schemes */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {loading ? (
          Array(6).fill(0).map((_, i) => (
            <div key={i} className="h-[450px] bg-brand-slate/5 animate-pulse rounded-[48px]" />
          ))
        ) : filteredSchemes.length > 0 ? (
          filteredSchemes.map((scheme, i) => (
            <motion.div 
              key={scheme.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              whileHover={{ y: -10 }}
              className="glass-card flex flex-col justify-between p-10 rounded-[56px] border border-brand-earth/5 hover:border-brand-gold/40 transition-all group overflow-hidden relative shadow-3xl"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-brand-gold/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-700" />
              
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-10">
                   <div className="w-16 h-16 rounded-[24px] bg-brand-offwhite border border-brand-earth/10 flex items-center justify-center text-brand-earth bg-brand-offwhite group-hover:bg-brand-earth group-hover:text-white transition-all shadow-inner">
                      {getCategoryIcon(scheme.category)}
                   </div>
                   <div className="flex flex-col items-end">
                      <span className="px-3 py-1 rounded-full bg-brand-gold/10 text-brand-gold text-[9px] font-black uppercase tracking-widest border border-brand-gold/10">{scheme.category}</span>
                      <span className="text-[10px] font-bold text-brand-slate/20 mt-2 uppercase tracking-widest">{scheme.target_crop || 'Multi-Crop'}</span>
                   </div>
                </div>

                <h4 className="text-2xl font-black text-brand-slate leading-tight mb-4 group-hover:text-brand-earth transition-colors">{scheme.title}</h4>
                <p className="text-base font-medium text-brand-slate/40 leading-relaxed line-clamp-3 mb-8">{scheme.description}</p>
                
                <div className="space-y-4 mb-10">
                   <div className="flex items-center gap-3 text-xs font-bold text-brand-slate/60">
                      <Coins size={16} className="text-brand-gold" />
                      Benefit: <span className="text-brand-slate font-black">Up to ₹{Number(scheme.max_amount).toLocaleString()}</span>
                   </div>
                   <div className="flex items-center gap-3 text-xs font-bold text-brand-slate/60">
                      <Clock size={16} className="text-brand-slate/30" />
                      Duration: <span className="text-brand-slate font-black">Seasonal Period</span>
                   </div>
                </div>
              </div>

              <div className="pt-8 border-t border-brand-slate/5 relative z-10">
                 <button className="w-full flex items-center justify-between group/btn">
                    <span className="text-sm font-black text-brand-slate uppercase tracking-widest group-hover/btn:text-brand-earth transition-all">Enroll in Registry</span>
                    <div className="w-12 h-12 rounded-2xl bg-brand-earth/10 flex items-center justify-center text-brand-earth group-hover/btn:bg-brand-earth group-hover/btn:text-white group-hover/btn:scale-110 transition-all">
                       <ArrowUpRight size={20} />
                    </div>
                 </button>
              </div>
            </motion.div>
          ))
        ) : (
          <div className="col-span-full py-40 text-center">
             <div className="w-24 h-24 rounded-[36px] bg-brand-slate/5 flex items-center justify-center text-brand-slate/20 mx-auto mb-8 shadow-inner">
                <Search size={40} />
             </div>
             <h3 className="text-2xl font-black text-brand-slate/40 tracking-[0.2em] uppercase">No Modules Found</h3>
             <p className="text-base font-bold text-brand-slate/20 mt-4 max-w-sm mx-auto">Adjust your identifier filters or search query to explore the registry hub.</p>
          </div>
        )}
      </div>

      {/* Footer Info Node for Farmers */}
      <div className="p-12 rounded-[56px] bg-brand-earth/5 border border-brand-earth/10 flex flex-col md:flex-row items-center justify-between gap-10">
         <div className="flex items-center gap-6">
            <div className="w-14 h-14 rounded-[22px] bg-brand-earth/10 flex items-center justify-center text-brand-earth">
               <Info size={28} />
            </div>
            <div>
               <h4 className="text-lg font-black text-brand-slate leading-none mb-1 uppercase tracking-tight">Need Assistance?</h4>
               <p className="text-sm font-medium text-brand-slate/40">Our Agriculture Officers are ready to help you with the registry.</p>
            </div>
         </div>
         <div className="flex gap-4">
            <button className="px-8 py-4 rounded-[24px] glass-card border border-brand-earth/10 text-[10px] font-black uppercase text-brand-slate tracking-widest hover:bg-white transition-all">
               Documentation Guide
            </button>
            <button className="px-8 py-4 rounded-[24px] bg-brand-earth text-white text-[10px] font-black uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-xl shadow-brand-earth/20">
               Support Ticket
            </button>
         </div>
      </div>
    </div>
  );
};

export default SchemeHub;
