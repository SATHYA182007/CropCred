import { useState } from 'react';
import { motion } from 'framer-motion';
import { RefreshCw, Map as MapIcon, Layers, ShieldCheck } from 'lucide-react';

const SatelliteView = () => {
  const [isSyncing, setIsSyncing] = useState(false);

  const handleSync = () => {
    setIsSyncing(true);
    setTimeout(() => setIsSyncing(false), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 h-[calc(100vh-64px)] flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-brand-slate">Satellite Assessment</h1>
          <p className="text-brand-slate/60 mt-1">Real-time NDVI multi-spectral imagery</p>
        </div>
        
        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleSync}
          disabled={isSyncing}
          className="flex items-center gap-2 bg-white text-brand-earth border border-brand-earth/20 px-6 py-3 rounded-xl shadow-sm hover:bg-brand-earth hover:text-white transition-colors disabled:opacity-50"
        >
          <RefreshCw size={18} className={isSyncing ? "animate-spin" : ""} />
          {isSyncing ? "Syncing..." : "Sync Data"}
        </motion.button>
      </div>

      <div className="flex-grow grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Main Map View */}
        <div className="lg:col-span-3 glass-card rounded-3xl overflow-hidden relative shadow-inner h-[60vh] lg:h-auto">
          {/* Mock Map Background */}
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1590682680695-43b964a3ae55?w=1600&q=80')] bg-cover bg-center" />
          
          {/* NDVI Heatmap Overlay */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            transition={{ duration: 1.5 }}
            className="absolute inset-0 bg-gradient-to-tr from-green-500/40 via-yellow-400/20 to-green-600/50 mix-blend-overlay" 
          />
          
          {/* Farm Boundaries Mock */}
          <div className="absolute inset-0 flex items-center justify-center p-12">
             <svg viewBox="0 0 100 100" className="w-[80%] max-w-md h-auto drop-shadow-2xl overflow-visible">
              <motion.path
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 2, ease: "easeInOut" }}
                d="M 20 20 L 80 15 L 90 70 L 15 85 Z"
                fill="rgba(45, 90, 39, 0.2)"
                stroke="#C8A95B"
                strokeWidth="2"
                strokeDasharray="4 2"
              />
              <motion.circle 
                initial={{ scale: 0 }}
                animate={{ scale: [0, 1.2, 1] }} 
                transition={{ delay: 2, duration: 0.5 }}
                cx="50" cy="50" r="3" fill="#ffffff" stroke="#C8A95B" strokeWidth="1" 
              />
            </svg>
          </div>

          {/* Map Controls */}
          <div className="absolute top-6 right-6 flex flex-col gap-2">
            <button className="p-3 bg-white/90 backdrop-blur rounded-xl shadow-lg hover:text-brand-earth transition-colors">
              <Layers size={20} />
            </button>
            <button className="p-3 bg-white/90 backdrop-blur rounded-xl shadow-lg hover:text-brand-earth transition-colors">
              <MapIcon size={20} />
            </button>
          </div>

          {/* Overlay Status */}
          <div className="absolute bottom-6 left-6 right-6">
            <div className="glass-card-dark rounded-2xl p-4 flex items-center justify-between shadow-2xl">
              <div className="flex items-center gap-3">
                <ShieldCheck size={28} className="text-green-400" />
                <div>
                  <h4 className="font-semibold text-white">Verified Polygon: 1.2 Hectares</h4>
                  <p className="text-xs text-white/70">Last synced: Today, 08:30 AM</p>
                </div>
              </div>
              <div className="bg-brand-earth text-white px-4 py-2 rounded-lg text-sm font-bold shadow-inner border border-white/20">
                ACTIVE
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar Metrics */}
        <div className="lg:col-span-1 space-y-6 flex flex-col">
          <motion.div 
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="glass-card rounded-3xl p-6"
          >
            <h3 className="text-sm font-medium text-brand-slate/60 mb-4">Crop Health %</h3>
            <div className="flex items-end gap-2 mb-2">
              <span className="text-4xl font-bold text-green-600">92%</span>
              <span className="text-sm text-green-600 font-medium mb-1">↑ 4%</span>
            </div>
            <div className="w-full bg-brand-earth/10 h-2 rounded-full overflow-hidden mt-4">
              <div className="bg-gradient-to-r from-green-400 to-green-600 h-full w-[92%] rounded-full shadow-[0_0_10px_rgba(22,163,74,0.5)]" />
            </div>
          </motion.div>

          <motion.div 
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="glass-card rounded-3xl p-6"
          >
            <h3 className="text-sm font-medium text-brand-slate/60 mb-4">Soil Moisture</h3>
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full border-4 border-blue-100 flex items-center justify-center relative">
                 <svg className="absolute inset-0 w-full h-full -rotate-90">
                   <circle cx="28" cy="28" r="28" fill="transparent" stroke="#3b82f6" strokeWidth="4" strokeDasharray="175" strokeDashoffset="45" className="translate-x-1 translate-y-1" />
                 </svg>
                 <span className="text-lg font-bold text-blue-600 z-10">75%</span>
              </div>
              <div>
                <p className="text-sm font-semibold text-brand-slate w-full">Optimal Level</p>
                <p className="text-xs text-brand-slate/60">No irrigation needed currently.</p>
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="glass-card rounded-3xl p-6 flex-grow"
          >
            <h3 className="text-sm font-medium text-brand-slate/60 mb-4">Risk Factors</h3>
            <ul className="space-y-4">
              <li className="flex items-center justify-between text-sm">
                <span className="text-brand-slate">Pest Probability</span>
                <span className="text-green-600 font-semibold bg-green-50 px-2 py-1 rounded">Low (12%)</span>
              </li>
              <li className="flex items-center justify-between text-sm">
                <span className="text-brand-slate">Water Stress</span>
                <span className="text-green-600 font-semibold bg-green-50 px-2 py-1 rounded">None</span>
              </li>
              <li className="flex items-center justify-between text-sm">
                <span className="text-brand-slate">Weather Risk</span>
                <span className="text-yellow-600 font-semibold bg-yellow-50 px-2 py-1 rounded">Moderate</span>
              </li>
            </ul>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default SatelliteView;
