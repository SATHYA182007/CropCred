import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Tractor, ShieldCheck, ArrowRight, ArrowLeft, Sprout, Building } from 'lucide-react';
import { Link } from 'react-router-dom';

const roles = [
  {
    id: 'farmer',
    icon: Tractor,
    title: 'Farmer',
    description: 'Access digital schemes, track your land applications, and resolve grievances faster with AI assistance.',
    color: 'from-green-500 to-brand-earth',
    bg: 'bg-green-50',
    iconColor: 'text-brand-earth',
    border: 'hover:border-brand-earth/50',
    pill: 'bg-green-100 text-green-700',
  },
  {
    id: 'officer',
    icon: Building,
    title: 'Agriculture Officer',
    description: 'Process applications, verify digital documents with AI, and manage regional agricultural services.',
    color: 'from-brand-gold to-yellow-600',
    bg: 'bg-yellow-50',
    iconColor: 'text-brand-gold',
    border: 'hover:border-brand-gold/50',
    pill: 'bg-yellow-100 text-yellow-700',
  },
  {
    id: 'admin',
    icon: ShieldCheck,
    title: 'Admin',
    description: 'Full oversight of platform metrics, user management, and nationwide agriculture administration.',
    color: 'from-brand-slate to-black',
    bg: 'bg-slate-100',
    iconColor: 'text-brand-slate',
    border: 'hover:border-brand-slate/50',
    pill: 'bg-slate-200 text-slate-700',
  },
];

const container = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12 } }
};

const card = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

const RoleSelectPage = () => {
  const navigate = useNavigate();

  return (
    <div className="h-screen bg-brand-offwhite flex flex-col items-center justify-center px-6 relative overflow-hidden">
      {/* Premium background effects */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-[800px] h-[800px] bg-brand-gold/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-brand-earth/5 rounded-full blur-[100px] pointer-events-none" />

      {/* Top-left Back to Home */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="absolute top-10 left-10 z-20"
      >
        <Link
          to="/"
          className="flex items-center gap-2 group px-6 py-3 rounded-2xl glass-card border border-brand-earth/10 hover:border-brand-earth/30 transition-all shadow-sm hover:shadow-xl"
        >
          <ArrowLeft size={18} className="text-brand-earth group-hover:-translate-x-1 transition-transform" />
          <Sprout size={18} className="text-brand-earth" />
          <span className="text-sm font-black text-brand-slate tracking-tight">CROP<span className="text-brand-gold">CRED</span></span>
        </Link>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8 relative z-10"
      >
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-earth/10 text-brand-earth text-[10px] font-black uppercase tracking-widest mb-6 border border-brand-earth/20">
          Smart Governance Access
        </div>
        <h1 className="text-4xl md:text-5xl font-black text-brand-slate mb-4 tracking-tight leading-[1.1]">
          Identity <span className="text-brand-earth">Verification.</span>
        </h1>
        <p className="text-lg text-brand-slate/50 max-w-lg mx-auto font-medium">
          Select your administrative role to access the CropCred AI ecosystem for governance and services.
        </p>
      </motion.div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl relative z-10"
      >
        {roles.map((role) => (
          <motion.div key={role.id} variants={card}
            whileHover={{ y: -5, scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            onClick={() => navigate(`/auth/login/${role.id}`)}
            className={`glass-card rounded-[32px] p-8 border-2 border-transparent ${role.border} cursor-pointer transition-all duration-300 group flex flex-col items-start gap-6 shadow-2xl hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)]`}
          >
            <div className={`w-16 h-16 ${role.bg} rounded-[24px] flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-500`}>
              <role.icon size={32} className={role.iconColor} />
            </div>

            <div className="flex-1">
              <span className={`text-[10px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full ${role.pill} mb-4 inline-block`}>
                {role.id === 'officer' ? 'Staff Role' : 'User Role'}
              </span>
              <h2 className="text-3xl font-black text-brand-slate mt-2 mb-4 tracking-tight leading-none group-hover:text-brand-earth transition-colors">{role.title}</h2>
              <p className="text-brand-slate/50 text-sm leading-relaxed font-medium">{role.description}</p>
            </div>

            <div className={`w-full flex items-center justify-between px-6 py-4 rounded-2xl bg-gradient-to-r ${role.color} text-white font-black text-sm shadow-xl group-hover:shadow-[0_10px_30px_-10px_rgba(0,0,0,0.3)] transition-all`}>
              Enter {role.title} Portal
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </div>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mt-12 flex items-center gap-6 opacity-40 grayscale hover:grayscale-0 transition-all duration-500"
      >
        <div className="flex items-center gap-2">
          <ShieldCheck size={16} />
          <span className="text-xs font-bold uppercase tracking-widest">ISO 27001</span>
        </div>
        <div className="w-px h-4 bg-brand-slate/20" />
        <div className="flex items-center gap-2">
          <Sprout size={16} />
          <span className="text-xs font-bold uppercase tracking-widest">AgriTech Standard</span>
        </div>
      </motion.div>
    </div>
  );
};

export default RoleSelectPage;
