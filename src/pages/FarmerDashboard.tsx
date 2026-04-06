import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { RadialBarChart, RadialBar, ResponsiveContainer, PolarAngleAxis } from 'recharts';
import { farmerData as mockFarmerData } from '../data/mockData';
import { IndianRupee, Leaf, CalendarCheck, Mic } from 'lucide-react';

const FarmerDashboard = () => {
  // Use mock data directly — no API dependency, instant load
  const data = mockFarmerData;
  const creditScorePercent = (data.creditScore / 1000) * 100;

  const chartData = [
    { name: 'Base', value: 100, fill: 'transparent' },
    { name: 'Score', value: creditScorePercent, fill: '#2D5A27' }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header section with voice assistant */}
      <div className="flex justify-between items-center mb-10">
        <div>
          <p className="text-xs font-bold tracking-widest text-brand-gold uppercase mb-1">Farmer ID: {data.id}</p>
          <h1 className="text-3xl font-bold text-brand-slate">Welcome back, {data.name}</h1>
          <p className="text-brand-slate/60 mt-1">{data.location}</p>
        </div>
        
        <motion.button 
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="bg-brand-gold text-white p-4 rounded-full shadow-lg shadow-brand-gold/30 hover:bg-yellow-600 transition-colors z-10 hidden sm:flex items-center gap-2 px-6 rounded-full"
        >
          <Mic size={20} />
          <span className="text-sm font-semibold">Voice Assistant</span>
        </motion.button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Main Credit Score Card */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="col-span-1 md:col-span-1 glass-card rounded-3xl p-8 flex flex-col items-center justify-center relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-brand-gold/10 rounded-bl-full pointer-events-none" />
          <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-brand-earth/5 rounded-full pointer-events-none" />
          
          <h2 className="text-lg font-semibold text-brand-slate mb-4">CropCred Score</h2>
          <div className="w-52 h-52 relative">
            <ResponsiveContainer width="100%" height="100%">
              <RadialBarChart cx="50%" cy="50%" innerRadius="80%" outerRadius="100%" barSize={14} data={chartData} startAngle={90} endAngle={-270}>
                <PolarAngleAxis type="number" domain={[0, 100]} angleAxisId={0} tick={false} />
                <RadialBar 
                  background={{ fill: '#e2e8f0' }} 
                  dataKey="value" 
                  cornerRadius={10}
                />
              </RadialBarChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-5xl font-black text-brand-deep tracking-tighter">{data.creditScore}</span>
              <span className="text-xs text-brand-slate/50 font-medium">/ 1000</span>
            </div>
          </div>
          
          <div className="mt-6 text-center">
            <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-green-100 text-green-700 text-sm font-semibold">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
              Excellent Standing
            </span>
          </div>

          <div className="w-full mt-6 space-y-3">
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-brand-slate/60">Climate Resilience</span>
                <span className="font-semibold text-brand-slate">{data.climateResilience}%</span>
              </div>
              <div className="h-2 bg-brand-earth/10 rounded-full">
                <div className="h-2 bg-brand-earth rounded-full" style={{ width: `${data.climateResilience}%` }} />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-brand-slate/60">Soil Health</span>
                <span className="font-semibold text-brand-slate">{data.soilHealth}%</span>
              </div>
              <div className="h-2 bg-brand-earth/10 rounded-full">
                <div className="h-2 bg-yellow-400 rounded-full" style={{ width: `${data.soilHealth}%` }} />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Info Cards */}
        <div className="col-span-1 md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="glass-card rounded-3xl p-6 group hover:border-brand-earth/30 transition-colors flex flex-col"
          >
            <div className="w-12 h-12 bg-brand-earth/10 text-brand-earth rounded-2xl flex items-center justify-center mb-4 group-hover:bg-brand-earth group-hover:text-white transition-colors">
              <IndianRupee size={24} />
            </div>
            <h3 className="text-sm font-medium text-brand-slate/60 mb-1">Loan Eligibility</h3>
            <p className="text-3xl font-bold text-brand-slate mt-auto">{data.loanEligibility}</p>
            <div className="mt-4 pt-4 border-t border-brand-earth/10 text-xs text-brand-gold font-semibold flex items-center gap-1">
              <span className="w-2 h-2 bg-brand-gold rounded-full"></span>
              Pre-approved for KCC Loan
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="glass-card rounded-3xl p-6 group hover:border-brand-earth/30 transition-colors bg-gradient-to-br from-white/70 to-green-50/70 flex flex-col"
          >
            <div className="w-12 h-12 bg-green-100 text-green-600 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-green-600 group-hover:text-white transition-colors">
              <Leaf size={24} />
            </div>
            <h3 className="text-sm font-medium text-brand-slate/60 mb-1">Crop Health Index</h3>
            <p className="text-3xl font-bold text-green-700 mt-auto">{data.cropHealth}%</p>
            <div className="mt-4 pt-4 border-t border-brand-earth/10">
              <div className="h-2 bg-green-100 rounded-full">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${data.cropHealth}%` }}
                  transition={{ duration: 1, delay: 0.5 }}
                  className="h-2 bg-green-500 rounded-full shadow-[0_0_8px_rgba(34,197,94,0.6)]"
                />
              </div>
              <p className="text-xs text-green-600 font-medium mt-2">Based on recent NDVI scan</p>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="col-span-1 sm:col-span-2 glass-card rounded-3xl p-6"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                <CalendarCheck size={20} />
              </div>
              <h3 className="text-lg font-semibold text-brand-slate">Recent Repayments</h3>
              <span className="ml-auto text-xs font-semibold text-green-600 bg-green-50 px-3 py-1 rounded-full">100% On-Time</span>
            </div>
            <div className="space-y-3">
              {data.recentPayments.map((payment, i) => (
                <motion.div 
                  key={payment.id} 
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + i * 0.1 }}
                  className="flex justify-between items-center p-4 rounded-2xl bg-white/50 border border-white hover:border-brand-earth/20 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-600 font-bold text-sm">{i+1}</div>
                    <div>
                      <p className="font-semibold text-brand-slate">{payment.amount}</p>
                      <p className="text-xs text-brand-slate/50">{payment.date}</p>
                    </div>
                  </div>
                  <span className="px-3 py-1 bg-green-100 text-green-700 text-xs rounded-full font-medium">
                    ✓ {payment.status}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>

        </div>
      </div>

      {/* Floating Action Button for Mobile */}
      <motion.button 
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-6 right-6 bg-brand-gold text-white p-4 rounded-full shadow-2xl sm:hidden z-50 flex items-center justify-center"
      >
        <Mic size={24} />
      </motion.button>
    </div>
  );
};

export default FarmerDashboard;
