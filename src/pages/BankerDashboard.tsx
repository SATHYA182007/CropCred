import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Cell
} from 'recharts';
import { bankerApplications, farmerData } from '../data/mockData';
import { Search, CheckCircle, XCircle, TrendingUp, Users } from 'lucide-react';

const statusColors: Record<string, string> = {
  Pending: 'bg-yellow-100 text-yellow-700',
  'Under Review': 'bg-blue-100 text-blue-700',
  Approved: 'bg-green-100 text-green-700',
  Rejected: 'bg-red-100 text-red-700',
};

const BankerDashboard = () => {
  const [selectedApp, setSelectedApp] = useState(bankerApplications[0]);
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = bankerApplications.filter(a =>
    a.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    a.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const radarData = [
    { subject: 'Climate', A: farmerData.climateResilience },
    { subject: 'Soil', A: farmerData.soilHealth },
    { subject: 'Repayment', A: 95 },
    { subject: 'Yield', A: 89 },
    { subject: 'Market', A: 75 },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Top Stats Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Total Applications', value: bankerApplications.length, icon: Users, color: 'text-brand-earth', bg: 'bg-brand-earth/10' },
          { label: 'Pending Review', value: bankerApplications.filter(a => a.status === 'Pending' || a.status === 'Under Review').length, icon: TrendingUp, color: 'text-yellow-600', bg: 'bg-yellow-50' },
          { label: 'Approved Today', value: bankerApplications.filter(a => a.status === 'Approved').length, icon: CheckCircle, color: 'text-green-600', bg: 'bg-green-50' },
          { label: 'Rejected', value: bankerApplications.filter(a => a.status === 'Rejected').length, icon: XCircle, color: 'text-red-500', bg: 'bg-red-50' },
        ].map((stat, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="glass-card rounded-2xl p-4 flex items-center gap-3"
          >
            <div className={`w-10 h-10 rounded-xl ${stat.bg} flex items-center justify-center`}>
              <stat.icon size={20} className={stat.color} />
            </div>
            <div>
              <p className="text-2xl font-bold text-brand-slate">{stat.value}</p>
              <p className="text-xs text-brand-slate/60">{stat.label}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar: Applications List */}
        <div className="w-full lg:w-80 flex-shrink-0 flex flex-col glass-card rounded-3xl p-5 gap-4 max-h-[75vh] overflow-hidden">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-bold text-brand-slate">Applications</h2>
            <span className="text-xs font-semibold text-brand-earth bg-brand-earth/10 px-2 py-1 rounded-full">{filtered.length} total</span>
          </div>
          
          <div className="relative">
            <input 
              type="text" 
              placeholder="Search by name or ID..." 
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-white/70 border border-brand-earth/20 text-sm focus:outline-none focus:ring-2 focus:ring-brand-earth/30"
            />
            <Search size={15} className="absolute left-3 top-3 text-brand-slate/40" />
          </div>

          <div className="overflow-y-auto flex-grow space-y-3 pr-1">
            {filtered.map((app) => (
              <motion.div
                key={app.id}
                whileHover={{ scale: 1.02 }}
                onClick={() => setSelectedApp(app)}
                className={`p-4 rounded-2xl cursor-pointer border transition-all ${
                  selectedApp.id === app.id 
                    ? 'bg-brand-earth text-white border-brand-earth shadow-lg shadow-brand-earth/20' 
                    : 'bg-white/60 border-transparent hover:border-brand-earth/30'
                }`}
              >
                <div className="flex justify-between items-start mb-1">
                  <div>
                    <h3 className={`font-semibold text-sm ${selectedApp.id === app.id ? 'text-white' : 'text-brand-slate'}`}>{app.name}</h3>
                    <p className={`text-xs ${selectedApp.id === app.id ? 'text-white/60' : 'text-brand-slate/50'}`}>{app.id}</p>
                  </div>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${selectedApp.id === app.id ? 'bg-white/20 text-white' : statusColors[app.status]}`}>
                    {app.status}
                  </span>
                </div>
                <div className="flex justify-between text-xs mt-2">
                  <span className={selectedApp.id === app.id ? 'text-white/80' : 'text-brand-slate/60'}>Req: {app.request}</span>
                  <span className={`font-bold ${selectedApp.id === app.id ? 'text-brand-gold' : 'text-brand-earth'}`}>Score: {app.score}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Main Dashboard */}
        <div className="flex-grow flex flex-col gap-6 min-w-0">
          {/* Applicant Header */}
          <motion.div 
            key={selectedApp.id}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card rounded-3xl p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
          >
            <div>
              <span className="text-xs font-bold tracking-widest text-brand-earth uppercase">{selectedApp.id}</span>
              <h1 className="text-2xl font-bold text-brand-slate mt-0.5">{selectedApp.name}</h1>
              <p className="text-brand-slate/60 mt-1 text-sm">Requesting <span className="font-semibold text-brand-slate">{selectedApp.request}</span> · Score: <span className="font-bold text-brand-earth">{selectedApp.score}</span></p>
            </div>
            <div className="flex gap-3 w-full sm:w-auto">
              <motion.button whileTap={{ scale: 0.95 }} className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl border border-red-400 text-red-500 font-medium text-sm hover:bg-red-50 transition-colors">
                <XCircle size={16} /> Reject
              </motion.button>
              <motion.button whileTap={{ scale: 0.95 }} className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-brand-earth text-white font-medium text-sm hover:bg-brand-deep shadow-lg shadow-brand-earth/30 transition-colors">
                <CheckCircle size={16} /> Approve
              </motion.button>
            </div>
          </motion.div>

          {/* Charts Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Radar Chart */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="glass-card rounded-3xl p-6 relative overflow-hidden"
            >
              <h3 className="text-base font-semibold text-brand-slate mb-1">Risk Profile Analysis</h3>
              <p className="text-xs text-brand-slate/50 mb-4">Multi-factor creditworthiness model</p>
              <div className="h-56 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                    <PolarGrid stroke="#e2e8f0" />
                    <PolarAngleAxis dataKey="subject" tick={{ fill: '#475569', fontSize: 11, fontWeight: 500 }} />
                    <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                    <Radar dataKey="A" stroke="#2D5A27" fill="#2D5A27" fillOpacity={0.5} strokeWidth={2} dot={{ fill: '#2D5A27', r: 3 }} />
                    <Tooltip contentStyle={{ borderRadius: '10px', border: 'none', fontSize: '12px' }} />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
              <div className="absolute top-4 right-4 bg-brand-earth/10 text-brand-earth text-xs font-bold px-3 py-1 rounded-full">
                AI Assessed
              </div>
            </motion.div>

            {/* Bar Chart */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 }}
              className="glass-card rounded-3xl p-6"
            >
              <h3 className="text-base font-semibold text-brand-slate mb-1">Yield History</h3>
              <p className="text-xs text-brand-slate/50 mb-4">Annual output in Tons/Hectare</p>
              <div className="h-56 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={farmerData.yieldHistory} margin={{ top: 5, right: 10, left: -25, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                    <XAxis dataKey="year" tick={{ fill: '#475569', fontSize: 11 }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fill: '#475569', fontSize: 11 }} axisLine={false} tickLine={false} />
                    <Tooltip 
                      cursor={{ fill: 'rgba(45,90,39,0.05)' }} 
                      contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)', fontSize: '12px' }} 
                    />
                    <Bar dataKey="yield" radius={[6, 6, 0, 0]} maxBarSize={48}>
                      {farmerData.yieldHistory.map((_, index) => (
                        <Cell 
                          key={`cell-${index}`} 
                          fill={index === farmerData.yieldHistory.length - 1 ? '#2D5A27' : '#C8A95B'} 
                        />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <p className="text-xs text-green-600 font-semibold mt-2">↑ 21% growth over 5 years</p>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BankerDashboard;
