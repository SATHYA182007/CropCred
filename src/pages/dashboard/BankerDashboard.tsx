import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Cell
} from 'recharts';
import { bankerApplications, farmerData } from '../../data/mockData';
import { Search, CheckCircle, XCircle, TrendingUp, Users, Clock, AlertTriangle } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';

const statusColors: Record<string, string> = {
  Pending: 'bg-yellow-100 text-yellow-700',
  'Under Review': 'bg-blue-100 text-blue-700',
  Approved: 'bg-green-100 text-green-700',
  Rejected: 'bg-red-100 text-red-700',
};

const BankerDashboard = () => {
  const { profile } = useAuthStore();
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

  const stats = [
    { icon: Users, label: 'Total Applications', value: bankerApplications.length, color: 'text-brand-earth', bg: 'bg-brand-earth/10' },
    { icon: Clock, label: 'Pending Review', value: bankerApplications.filter(a => a.status === 'Pending' || a.status === 'Under Review').length, color: 'text-yellow-600', bg: 'bg-yellow-50' },
    { icon: CheckCircle, label: 'Approved', value: bankerApplications.filter(a => a.status === 'Approved').length, color: 'text-green-600', bg: 'bg-green-50' },
    { icon: XCircle, label: 'Rejected', value: bankerApplications.filter(a => a.status === 'Rejected').length, color: 'text-red-500', bg: 'bg-red-50' },
  ];

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <p className="text-xs font-bold tracking-widest text-brand-gold uppercase">Banker Panel</p>
        <h1 className="text-2xl md:text-3xl font-extrabold text-brand-slate mt-1">
          Welcome, {profile?.full_name ?? 'Banker'} 👋
        </h1>
        <p className="text-brand-slate/50 text-sm mt-1">State Bank of India · Nashik Main Branch</p>
      </div>

      {/* Stats Bar */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s, i) => (
          <motion.div key={s.label}
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.07 }}
            className="glass-card rounded-2xl p-5 flex items-center gap-4"
          >
            <div className={`w-11 h-11 ${s.bg} rounded-xl flex items-center justify-center flex-shrink-0`}>
              <s.icon size={20} className={s.color} />
            </div>
            <div>
              <p className="text-2xl font-extrabold text-brand-slate">{s.value}</p>
              <p className="text-xs text-brand-slate/50 leading-tight">{s.label}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Main layout: sidebar list + detail panel */}
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Applications Sidebar */}
        <div className="w-full lg:w-72 flex-shrink-0 glass-card rounded-3xl p-5 flex flex-col gap-4 max-h-[calc(100vh-280px)] overflow-hidden">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-brand-slate">Applications</h2>
            <span className="text-xs font-bold text-brand-earth bg-brand-earth/10 px-2 py-1 rounded-full">{filtered.length}</span>
          </div>
          <div className="relative">
            <input type="text" placeholder="Search..." value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-white/70 border border-brand-earth/20 text-sm focus:outline-none focus:ring-2 focus:ring-brand-earth/30"
            />
            <Search size={15} className="absolute left-3 top-3 text-brand-slate/40" />
          </div>
          <div className="overflow-y-auto flex-grow space-y-2.5 pr-1">
            {filtered.map(app => (
              <motion.div key={app.id} whileHover={{ scale: 1.02 }}
                onClick={() => setSelectedApp(app)}
                className={`p-4 rounded-2xl cursor-pointer border transition-all ${
                  selectedApp.id === app.id
                    ? 'bg-brand-earth text-white border-brand-earth shadow-lg shadow-brand-earth/20'
                    : 'bg-white/60 border-transparent hover:border-brand-earth/30'
                }`}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className={`font-bold text-sm ${selectedApp.id === app.id ? 'text-white' : 'text-brand-slate'}`}>{app.name}</h3>
                    <p className={`text-xs mt-0.5 ${selectedApp.id === app.id ? 'text-white/60' : 'text-brand-slate/50'}`}>{app.id}</p>
                  </div>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-bold ${selectedApp.id === app.id ? 'bg-white/20 text-white' : statusColors[app.status]}`}>
                    {app.status}
                  </span>
                </div>
                <div className="flex justify-between mt-2 text-xs">
                  <span className={selectedApp.id === app.id ? 'text-white/70' : 'text-brand-slate/50'}>{app.request}</span>
                  <span className={`font-bold ${selectedApp.id === app.id ? 'text-brand-gold' : 'text-brand-earth'}`}>Score: {app.score}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Detail Panel */}
        <div className="flex-grow flex flex-col gap-5 min-w-0">
          {/* Applicant Header */}
          <motion.div key={selectedApp.id} initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
            className="glass-card rounded-3xl p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
          >
            <div>
              <span className="text-xs font-bold tracking-widest text-brand-earth uppercase">{selectedApp.id}</span>
              <h1 className="text-2xl font-extrabold text-brand-slate mt-0.5">{selectedApp.name}</h1>
              <p className="text-sm text-brand-slate/60 mt-1">Requesting <span className="font-bold text-brand-slate">{selectedApp.request}</span> · Score: <span className="font-bold text-brand-earth">{selectedApp.score}</span></p>
            </div>
            <div className="flex gap-3">
              <motion.button whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-red-400 text-red-500 text-sm font-semibold hover:bg-red-50 transition-colors">
                <XCircle size={16} /> Reject
              </motion.button>
              <motion.button whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-brand-earth text-white text-sm font-semibold hover:bg-brand-deep shadow-lg shadow-brand-earth/30 transition-colors">
                <CheckCircle size={16} /> Approve
              </motion.button>
            </div>
          </motion.div>

          {/* Charts */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
              className="glass-card rounded-3xl p-6 relative overflow-hidden"
            >
              <h3 className="text-sm font-bold text-brand-slate mb-1">Risk Profile Analysis</h3>
              <p className="text-xs text-brand-slate/40 mb-4">AI multi-factor model</p>
              <div className="h-56">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                    <PolarGrid stroke="#e2e8f0" />
                    <PolarAngleAxis dataKey="subject" tick={{ fill: '#475569', fontSize: 11 }} />
                    <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                    <Radar dataKey="A" stroke="#2D5A27" fill="#2D5A27" fillOpacity={0.5} strokeWidth={2} dot={{ fill: '#2D5A27', r: 3 }} />
                    <Tooltip contentStyle={{ borderRadius: '10px', border: 'none', fontSize: '12px' }} />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
              <div className="absolute top-4 right-4 bg-brand-earth/10 text-brand-earth text-xs font-bold px-2 py-1 rounded-full">AI Assessed</div>
            </motion.div>

            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.1 }}
              className="glass-card rounded-3xl p-6"
            >
              <h3 className="text-sm font-bold text-brand-slate mb-1">Yield History</h3>
              <p className="text-xs text-brand-slate/40 mb-4">Tons per Hectare</p>
              <div className="h-56">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={farmerData.yieldHistory} margin={{ top: 5, right: 10, left: -25, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="year" tick={{ fill: '#475569', fontSize: 11 }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fill: '#475569', fontSize: 11 }} axisLine={false} tickLine={false} />
                    <Tooltip cursor={{ fill: 'rgba(45,90,39,0.05)' }} contentStyle={{ borderRadius: '12px', border: 'none', fontSize: '12px' }} />
                    <Bar dataKey="yield" radius={[6, 6, 0, 0]} maxBarSize={44}>
                      {farmerData.yieldHistory.map((_, i) => (
                        <Cell key={i} fill={i === farmerData.yieldHistory.length - 1 ? '#2D5A27' : '#C8A95B'} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <p className="text-xs text-green-600 font-bold mt-1">↑ 21% growth over 5 years</p>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BankerDashboard;
