import { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { Eye, EyeOff, Tractor, ShieldCheck, Sprout, ArrowLeft, Zap, Building, ChevronRight, Activity, Database, Lock } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';

const schema = z.object({
  email: z.string().email('Please enter a valid email'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});
type FormData = z.infer<typeof schema>;

type Role = 'farmer' | 'officer' | 'admin';

const roleConfig: Record<Role, {
  icon: React.ElementType;
  title: string;
  color: string;
  bg: string;
  demoEmail: string;
  demoPassword: string;
  dashboardPath: string;
  accent: string;
  stats: [string, string][];
}> = {
  farmer: {
    icon: Tractor,
    title: 'Farmer',
    color: 'text-brand-earth',
    bg: 'bg-brand-earth',
    demoEmail: 'farmer@cropcred.ai',
    demoPassword: 'Farmer@123',
    dashboardPath: '/dashboard/farmer',
    accent: 'bg-green-500/10',
    stats: [['92%', 'Scheme Hub Success'], ['0.5s', 'AI Doc Scan'], ['24h', 'Avg Approval'], ['100%', 'Secure Profile']]
  },
  officer: {
    icon: Building,
    title: 'Agriculture Officer',
    color: 'text-brand-gold',
    bg: 'bg-brand-gold',
    demoEmail: 'officer@cropcred.ai',
    demoPassword: 'Officer@123',
    dashboardPath: '/dashboard/officer',
    accent: 'bg-yellow-500/10',
    stats: [['42', 'Pending Reviews'], ['85%', 'AI Confidence'], ['10', 'Regional Reports'], ['24/7', 'Live Monitor']]
  },
  admin: {
    icon: ShieldCheck,
    title: 'Admin',
    color: 'text-brand-slate',
    bg: 'bg-brand-slate',
    demoEmail: 'admin@cropcred.ai',
    demoPassword: 'Admin@123',
    dashboardPath: '/dashboard/admin',
    accent: 'bg-slate-500/10',
    stats: [['14', 'Active Districts'], ['85k+', 'Farmer Database'], ['1.2k', 'System Staff'], ['99.9%', 'Platform Uptime']]
  },
};

const LoginPage = () => {
  const { role } = useParams<{ role: string }>();
  const navigate = useNavigate();
  const { signIn } = useAuthStore();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const config = roleConfig[role as Role] ?? roleConfig.farmer;
  const Icon = config.icon;

  const { register, handleSubmit, setValue, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const fillDemo = () => {
    const demoEmail = config.demoEmail;
    const demoPassword = config.demoPassword;
    
    setValue('email', demoEmail);
    setValue('password', demoPassword);
    
    toast.success('Demo credentials filled! Establishing secure protocol...', {
      icon: <Zap size={16} className="text-brand-gold" />
    });
    
    // Auto-submit after a brief delay for visual feedback
    setTimeout(() => {
      onSubmit({ email: demoEmail, password: demoPassword });
    }, 800);
  };

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    
    // Safety fallback: Reset loading state after 12 seconds in case of network stall
    const timeoutId = setTimeout(() => {
      if (isLoading) {
        setIsLoading(false);
        toast.error('Identity verification taking longer than expected. Please retry.');
      }
    }, 12000);

    try {
      const { error, role: userRole } = await signIn(data.email, data.password);
      clearTimeout(timeoutId);

      if (error) {
        toast.error(error);
        setIsLoading(false);
        return;
      }

      toast.success(`Identity Verified: Welcome, ${config.title}`, {
        description: 'Establishing secure administration session...'
      });
      
      const dashPath = userRole ? roleConfig[userRole as Role]?.dashboardPath : config.dashboardPath;
      setTimeout(() => navigate(dashPath || '/'), 1000);
    } catch (e: any) {
      clearTimeout(timeoutId);
      toast.error('Critical failure: Unable to establish node session.');
      console.error(e);
      setIsLoading(false);
    }
  };

  return (
    <div className="h-screen bg-brand-offwhite flex relative overflow-hidden">
      {/* Premium background effects */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-[800px] h-[800px] bg-brand-gold/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-brand-earth/5 rounded-full blur-[100px] pointer-events-none" />

      {/* Left panel: Brand & Stats */}
      <div className="hidden lg:flex w-1/2 relative overflow-hidden bg-brand-deep border-r border-white/5 p-12 flex-col justify-between">
        <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 30% 70%, #D4AF37 0%, transparent 50%), radial-gradient(circle at 70% 20%, white 0%, transparent 40%)' }} />
        
        <div className="relative z-10 space-y-8">
          {/* Back button above logo */}
          <Link to="/auth/role-select" className="inline-flex items-center gap-2 text-[10px] font-black text-white/30 hover:text-white uppercase tracking-widest transition-all group">
            <ArrowLeft size={12} className="group-hover:-translate-x-1 transition-transform" /> Back to Role Selection
          </Link>

          <Link to="/" className="flex items-center gap-3 group">
            <div className="bg-brand-gold p-2 rounded-xl text-brand-deep shadow-2xl group-hover:scale-110 transition-transform">
              <Sprout size={20} />
            </div>
            <span className="text-2xl font-black text-white tracking-tight">CROP<span className="text-brand-gold">CRED</span> <span className="text-white/30 text-base">AI</span></span>
          </Link>
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="relative z-10 max-w-lg mb-auto mt-12">
          <h2 className="text-4xl font-black text-white leading-[1.1] tracking-tight mb-4">
            Access <span className="text-brand-gold italic">{config.title}</span> <br /> Control Center.
          </h2>
          <p className="text-base text-white/40 leading-relaxed font-medium mb-8">
            Enter the secure agricultural oversight ecosystem and manage digital scheme registries.
          </p>

          <div className="grid grid-cols-2 gap-4 mt-8">
            {[
              ['99.9%', 'Uptime'],
              ['1.2s', 'AI Speed'],
              ['256-bit', 'AES'],
              ['Live', 'Status']
            ].map(([val, label]) => (
              <div key={label} className="bg-white/5 backdrop-blur-xl border border-white/5 rounded-xl p-4 group hover:bg-white/10 transition-all">
                <p className="text-xl font-black text-white group-hover:text-brand-gold transition-colors">{val}</p>
                <p className="text-[8px] font-black uppercase tracking-widest text-white/30 mt-1">{label}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 space-y-3">
             <div className="flex items-center gap-3 p-3 rounded-xl bg-gradient-to-r from-brand-gold/10 to-transparent border-l-2 border-brand-gold">
                <div className="w-8 h-8 rounded-lg bg-brand-gold/20 flex items-center justify-center text-brand-gold">
                  <Database size={14} />
                </div>
                <div>
                   <p className="text-[10px] font-black text-white uppercase tracking-widest">Database Sync</p>
                   <p className="text-[10px] text-white/40 font-medium leading-none mt-1">Real-time registry active.</p>
                </div>
             </div>
             <div className="flex items-center gap-3 p-3 rounded-xl bg-gradient-to-r from-green-500/10 to-transparent border-l-2 border-green-500">
                <div className="w-8 h-8 rounded-lg bg-green-500/20 flex items-center justify-center text-green-500">
                  <Zap size={14} />
                </div>
                <div>
                   <p className="text-[10px] font-black text-white uppercase tracking-widest">AI Proxy Active</p>
                   <p className="text-[10px] text-white/40 font-medium leading-none mt-1">Verification nodes operational.</p>
                </div>
             </div>
          </div>
        </motion.div>

        <div className="relative z-10 flex items-center gap-6 opacity-30 mt-6 scale-90 origin-left">
          <div className="flex items-center gap-2 text-white">
            <Lock size={12} />
            <span className="text-[8px] font-black uppercase tracking-widest">TLS 1.3</span>
          </div>
          <div className="w-1 h-1 bg-white/20 rounded-full" />
          <div className="flex items-center gap-2 text-white">
            <Activity size={12} />
            <span className="text-[8px] font-black uppercase tracking-widest">Nodes OK</span>
          </div>
        </div>
      </div>

      {/* Right panel: Form */}
      <div className="flex-1 flex flex-col items-center p-8 lg:p-12 overflow-hidden bg-brand-offwhite relative">
        <div className="w-full max-w-sm my-auto">

          <div className="mb-4">
            <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full ${config.accent} border border-brand-gold/20`}>
              <Icon size={12} className="text-brand-gold" />
              <span className="text-[9px] font-black uppercase tracking-widest text-brand-gold">{config.title} Identity</span>
            </div>
          </div>
          <h1 className="text-3xl font-black text-brand-slate tracking-tight mb-2">Sign <span className="text-brand-earth">In.</span></h1>
          <p className="text-sm font-medium text-brand-slate/30 mb-8">Authorized access only. Enter platform credentials.</p>


          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Email Field */}
            <div className="group">
              <label className="block text-[11px] font-black uppercase tracking-widest text-brand-slate/40 mb-3 ml-2">Administrative Email</label>
              <div className="relative">
                <div className="absolute left-5 top-1/2 -translate-y-1/2 text-brand-slate/30 group-focus-within:text-brand-earth transition-colors">
                  <Database size={18} />
                </div>
                <input
                  {...register('email')}
                  type="email"
                  placeholder="name@cropcred.ai"
                  className="w-full pl-14 pr-6 py-5 rounded-[24px] border-2 border-brand-earth/5 bg-white text-brand-slate font-bold text-sm focus:outline-none focus:ring-4 focus:ring-brand-earth/5 focus:border-brand-earth transition-all placeholder:text-brand-slate/20"
                />
              </div>
              {errors.email && <p className="text-xs font-bold text-red-500 mt-3 ml-2">{errors.email.message}</p>}
            </div>

            {/* Password Field */}
            <div className="group">
              <div className="flex justify-between items-center mb-3">
                <label className="text-[11px] font-black uppercase tracking-widest text-brand-slate/40 ml-2">Secure Passkey</label>
                <a href="#" className="text-[10px] font-black text-brand-earth uppercase tracking-widest hover:underline">Revive Access</a>
              </div>
              <div className="relative">
                <div className="absolute left-5 top-1/2 -translate-y-1/2 text-brand-slate/30 group-focus-within:text-brand-earth transition-colors">
                  <ShieldCheck size={18} />
                </div>
                <input
                  {...register('password')}
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••••••"
                  className="w-full pl-14 pr-16 py-4 rounded-2xl border-2 border-brand-earth/5 bg-white text-brand-slate font-bold text-sm focus:outline-none focus:ring-4 focus:ring-brand-earth/5 focus:border-brand-earth transition-all placeholder:text-brand-slate/20"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-6 top-1/2 -translate-y-1/2 text-brand-slate/20 hover:text-brand-earth transition-colors p-2"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {errors.password && <p className="text-xs font-bold text-red-500 mt-3 ml-2">{errors.password.message}</p>}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-4 rounded-2xl font-black text-white text-sm tracking-widest flex items-center justify-center gap-3 shadow-xl transition-all active:scale-[0.98] mt-4 ${config.bg} shadow-${config.bg}/20 overflow-hidden relative group`}
            >
              <div className="absolute inset-0 bg-white/10 translate-y-full hover:translate-y-0 transition-transform duration-500" />
              {isLoading ? (
                <div className="flex items-center gap-3">
                   <div className="w-5 h-5 border-3 border-white/30 border-t-white rounded-full animate-spin" />
                   <span className="relative z-10 uppercase tracking-widest text-[10px]">Verifying...</span>
                </div>
              ) : (
                <span className="flex items-center gap-2 relative z-10 uppercase tracking-widest">
                  Establish Protocol <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </span>
              )}
            </button>

            {/* Simple Demo Button */}
            <button
               type="button"
               onClick={fillDemo}
               className="w-full mt-4 py-3 rounded-xl border border-brand-gold/20 text-brand-gold text-[10px] font-black uppercase tracking-[0.2em] hover:bg-brand-gold/5 transition-all flex items-center justify-center gap-2"
            >
               <Zap size={12} fill="currentColor" /> Use Demo Credentials
            </button>
          </form>

          <p className="text-center mt-8 text-[10px] font-black text-brand-slate/20 uppercase tracking-[0.2em]">
            &copy; 2026 cropcred ai • secure gov node
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
