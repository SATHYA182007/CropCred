import { motion, useScroll, useTransform } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  Sprout, 
  ShieldCheck, 
  ChevronRight, 
  Activity, 
  BarChart3, 
  Cpu, 
  Users, 
  Database,
  CheckCircle2,
  Lock,
  Workflow,
  HelpCircle,
  Clock,
  Globe,
  FileText,
  TrendingUp,
  Building2
} from 'lucide-react';
import DashboardMockup from '../components/landing/DashboardMockup';

const LandingPage = () => {
  const navigate = useNavigate();
  const { scrollYProgress } = useScroll();
  const yScale = useTransform(scrollYProgress, [0, 1], [0.8, 1]);

  const features = [
    {
      icon: Cpu,
      title: "AI Verification Engine",
      description: "Automated document OCR and validation reduces processing time from weeks to seconds.",
      color: "text-brand-gold",
      bg: "bg-brand-gold/10"
    },
    {
      icon: Workflow,
      title: "Smart Workflows",
      description: "Automated routing of applications and grievances based on category, priority, and region.",
      color: "text-green-500",
      bg: "bg-green-500/10"
    },
    {
      icon: BarChart3,
      title: "Executive Analytics",
      description: "Real-time insights for department heads to monitor the progress of agricultural schemes.",
      color: "text-blue-500",
      bg: "bg-blue-500/10"
    }
  ];

  const adminRoles = [
    {
      role: "Farmer",
      features: ["Single-click scheme applications", "Real-time grievance tracking", "Digital land record storage"]
    },
    {
      role: "Agriculture Officer",
      features: ["AI-assisted application review", "Automated document verification", "Digital case management"]
    },
    {
      role: "Department Head",
      features: ["Dynamic scheme performance reports", "District-level productivity metrics", "Transparent approval pipelines"]
    }
  ];

  return (
    <div className="min-h-screen bg-brand-offwhite">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass-card px-6 py-4 flex items-center justify-between border-b border-brand-earth/10">
        <div className="flex items-center gap-2.5">
          <div className="bg-brand-earth p-2.5 rounded-xl text-white shadow-lg shadow-brand-earth/20">
            <Sprout size={24} />
          </div>
          <span className="text-2xl font-black text-brand-slate tracking-tight">CropCred <span className="text-brand-gold">AI</span></span>
        </div>
        <div className="hidden md:flex items-center gap-8">
          <a href="#features" className="text-sm font-semibold text-brand-slate/70 hover:text-brand-earth transition-colors">Features</a>
          <a href="#governance" className="text-sm font-semibold text-brand-slate/70 hover:text-brand-earth transition-colors">Governance</a>
          <a href="#security" className="text-sm font-semibold text-brand-slate/70 hover:text-brand-earth transition-colors">Security</a>
        </div>
        <div className="flex items-center gap-4">
          <button onClick={() => navigate('/auth/role-select')} className="text-sm font-bold text-brand-slate hover:text-brand-earth transition-colors">Login</button>
          <button onClick={() => navigate('/auth/role-select')} className="px-6 py-2.5 rounded-xl bg-brand-earth text-white text-sm font-bold shadow-lg shadow-brand-earth/30 hover:scale-105 active:scale-95 transition-all">Get Started</button>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="relative pt-32 pb-20 px-6 overflow-hidden">
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-[800px] h-[800px] bg-brand-gold/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-brand-earth/5 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-earth/10 text-brand-earth text-sm font-bold border border-brand-earth/20 mb-8">
              <Activity size={16} /> 
              <span>AI for Smart Agriculture Administration</span>
            </div>
            <h1 className="text-6xl md:text-7xl font-black text-brand-slate leading-[1.1] tracking-tight mb-8">
              Governance for the <span className="text-brand-earth">Next Gen</span> of Farmers.
            </h1>
            <p className="text-xl text-brand-slate/60 leading-relaxed mb-10 max-w-lg">
              Digitizing and automating agricultural office operations with AI-powered verification, transparent scheme approvals, and intelligent grievance handling.
            </p>
            <div className="flex flex-col sm:flex-row gap-5">
              <button 
                onClick={() => navigate('/auth/role-select')}
                className="group px-8 py-4 rounded-2xl bg-brand-earth text-white font-bold flex items-center justify-center gap-3 shadow-xl shadow-brand-earth/30 hover:scale-105 transition-all"
              >
                Launch Platform <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="px-8 py-4 rounded-2xl glass-card border border-brand-earth/10 text-brand-slate font-bold hover:bg-white transition-all">
                Request Demo
              </button>
            </div>

            <div className="mt-12 flex items-center gap-8">
              <div className="flex -space-x-4">
                {[1,2,3,4].map(i => (
                  <div key={i} className="w-12 h-12 rounded-full border-4 border-white bg-brand-earth overflow-hidden flex items-center justify-center text-white text-xs font-bold">
                    {String.fromCharCode(64 + i)}
                  </div>
                ))}
              </div>
              <div className="text-sm">
                <p className="font-bold text-brand-slate">Used by 1,200+ Officers</p>
                <p className="text-brand-slate/50">Across 14 Agriculture Districts</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative"
          >
            <DashboardMockup />
          </motion.div>
        </div>
      </header>

      {/* Trust Section */}
      <section className="py-12 border-y border-brand-earth/5 bg-white/30 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-center text-[10px] font-black uppercase tracking-[0.3em] text-brand-slate/30 mb-8">Trusted by State Authorities & Global Institutions</p>
          <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24 opacity-40 grayscale hover:grayscale-0 transition-all duration-500">
            {[
              { icon: Building2, name: "Dept. of Agri" },
              { icon: ShieldCheck, name: "Govt. Security" },
              { icon: Globe, name: "World Bank" },
              { icon: Sprout, name: "Green India" },
              { icon: Database, name: "NIC India" }
            ].map((p, i) => (
              <div key={i} className="flex items-center gap-2">
                <p.icon size={24} className="text-brand-slate" />
                <span className="font-black text-xl tracking-tighter text-brand-slate">{p.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section id="governance" className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { val: "24/7", label: "Grievance Support" },
              { val: "10x", label: "Faster Processing" },
              { val: "100%", label: "Data Integrity" },
              { val: "0.5s", label: "AI Verification" }
            ].map((stat, i) => (
              <div key={i} className="text-center p-8 rounded-[32px] glass-card border border-brand-gold/10">
                <p className="text-5xl font-black text-brand-earth mb-2">{stat.val}</p>
                <p className="text-sm font-bold text-brand-slate/40 uppercase tracking-widest">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-brand-deep relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#C8A95B 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-brand-gold font-bold uppercase tracking-widest mb-4">Core Modules</h2>
            <h3 className="text-4xl md:text-5xl font-black text-white leading-tight">
              Administrative transformation powered by intelligence.
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -10 }}
                className="bg-white/5 backdrop-blur-xl border border-white/10 p-10 rounded-[40px] group"
              >
                <div className={`w-16 h-16 ${feature.bg} rounded-2xl flex items-center justify-center ${feature.color} mb-8 group-hover:scale-110 transition-transform`}>
                  <feature.icon size={32} />
                </div>
                <h4 className="text-2xl font-bold text-white mb-4">{feature.title}</h4>
                <p className="text-white/50 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Role Based Section */}
          <div className="mt-24 grid grid-cols-1 lg:grid-cols-3 gap-8">
            {adminRoles.map((role, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white/5 backdrop-blur-xl border border-white/10 p-10 rounded-[40px] transition-colors"
                whileHover={{ y: -5, backgroundColor: 'rgba(255, 255, 255, 0.08)', borderColor: 'rgba(212, 175, 55, 0.4)' }}
              >
                <div className="w-12 h-12 rounded-2xl bg-brand-gold/10 flex items-center justify-center text-brand-gold mb-8">
                  <Users size={24} />
                </div>
                <h5 className="text-xl font-bold text-white mb-6">
                  For {role.role}
                </h5>
                <ul className="space-y-4">
                  {role.features.map((f, j) => (
                    <li key={j} className="flex items-center gap-3 text-sm text-white/60">
                      <div className="w-5 h-5 rounded-full bg-green-500/10 flex items-center justify-center flex-shrink-0">
                        <CheckCircle2 size={12} className="text-green-400" />
                      </div>
                      {f}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          {/* Governance Pipeline - How it Works */}
          <div className="mt-32">
            <div className="text-center mb-20">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-gold/10 text-brand-gold text-xs font-black uppercase tracking-widest border border-brand-gold/20 mb-6">
                <Workflow size={14} />
                <span>The Governance Pipeline</span>
              </div>
              <h3 className="text-4xl md:text-5xl font-black text-white leading-tight">
                How AI digitizes the <span className="text-brand-gold italic">workflow.</span>
              </h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
              <div className="hidden md:block absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent -z-10" />
              {[
                { step: "01", icon: FileText, title: "Data Ingestion", desc: "Digital land records and scheme applications are ingested via secure encrypted APIs." },
                { step: "02", icon: Cpu, title: "AI Verification", desc: "Advanced OCR engines and fraud detectors validate documents in real-time." },
                { step: "03", icon: CheckCircle2, title: "Instant Approval", desc: "Verified applications are routed to officers for one-click administrative approval." }
              ].map((item, i) => (
                <motion.div 
                  key={i} 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.2 }}
                  className="text-center group"
                >
                  <div className="w-24 h-24 rounded-[40px] bg-white/5 border border-white/10 flex items-center justify-center text-brand-gold mx-auto mb-10 group-hover:scale-110 group-hover:bg-brand-gold/10 transition-all duration-500 shadow-xl">
                    <item.icon size={40} />
                  </div>
                  <p className="text-[10px] font-black text-brand-gold uppercase tracking-[0.3em] mb-4">{item.step}. Phase</p>
                  <h4 className="text-2xl font-bold text-white mb-4">{item.title}</h4>
                  <p className="text-sm text-white/40 leading-relaxed max-w-xs mx-auto">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* AI Trust Section */}
      <section id="security" className="py-24 px-6">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-20">
          <div className="flex-1">
            <div className="w-16 h-16 bg-brand-gold/10 text-brand-gold rounded-2xl flex items-center justify-center mb-10">
              <Lock size={32} />
            </div>
            <h3 className="text-5xl font-black text-brand-slate leading-tight mb-8">
              Enterprise-Grade <span className="text-brand-earth">Security & Trust.</span>
            </h3>
            <p className="text-lg text-brand-slate/60 leading-relaxed mb-10">
              CropCred AI implements multi-factor authentication, end-to-end encryption for farmer data, and advanced Row-Level Security (RLS) to ensure that only authorized officers can access sensitive agricultural records.
            </p>
            <div className="flex gap-10">
              <div>
                <p className="text-2xl font-black text-brand-slate">SLA 99.9%</p>
                <p className="text-sm font-bold text-brand-slate/40 uppercase tracking-widest">Uptime Guarantee</p>
              </div>
              <div className="w-px h-12 bg-brand-earth/10" />
              <div>
                <p className="text-2xl font-black text-brand-slate">ISO 27001</p>
                <p className="text-sm font-bold text-brand-slate/40 uppercase tracking-widest">Certified Ops</p>
              </div>
            </div>
          </div>
          <div className="flex-1 grid grid-cols-2 gap-6 relative">
            <div className="absolute -inset-10 bg-brand-gold/5 rounded-full blur-3xl -z-10" />
            {[
              { icon: Sprout, title: "Data Accuracy", desc: "AI-powered cross-referencing with satellite and land imagery." },
              { icon: ShieldCheck, title: "Zero Fraud", desc: "Multi-stage verification ensures schemes reach genuine farmers." },
              { icon: TrendingUp, title: "Fast Tracking", desc: "Priority routing for drought-affected or critical regions." },
              { icon: Clock, title: "24/7 Ops", desc: "Autonomous grievance handling available around the clock." }
            ].map((card, i) => (
              <motion.div 
                key={i} 
                whileHover={{ y: -5 }}
                className="glass-card-dark p-8 rounded-[40px] border border-white/5 first:mt-12 odd:mt-0 even:mt-12 bg-white/[0.02]"
              >
                <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center text-brand-gold mb-6">
                  <card.icon size={24} />
                </div>
                <h4 className="text-xl font-bold mb-4">{card.title}</h4>
                <p className="text-sm text-white/50 leading-relaxed">{card.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-brand-offwhite relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16">
            <HelpCircle size={48} className="text-brand-earth/20 mx-auto mb-6" />
            <h3 className="text-4xl font-black text-brand-slate">Frequently Asked Questions</h3>
          </div>
          <div className="space-y-6">
            {[
              { q: "How accurate is the AI verification?", a: "Our models are trained on over 2 million land records and achieve a 99.4% accuracy rate in document validation and person identification." },
              { q: "Can it integrate with existing government portals?", a: "Yes, CropCred AI provides a robust API suite that integrates seamlessly with existing state-level agricultural and financial portals." },
              { q: "Is the data secured with encryption?", a: "All status and personal entity data are encrypted using AES-256 at rest and TLS 1.3 in transit, following international cybersecurity standards." },
              { q: "What happens if a farmer has no digital records?", a: "Our AI Verification Engine includes a 'Hybrid-Input' mode where field officers can upload high-res photos of physical documents for OCR processing." }
            ].map((faq, i) => (
              <details key={i} className="group glass-card border-brand-earth/5 rounded-[24px] p-2 overflow-hidden transition-all duration-300 open:bg-white shadow-sm">
                <summary className="list-none px-6 py-4 flex items-center justify-between cursor-pointer font-bold text-brand-slate">
                  {faq.q}
                  <ChevronRight size={18} className="text-brand-earth group-open:rotate-90 transition-transform" />
                </summary>
                <div className="px-6 pb-6 pt-2 text-sm text-brand-slate/60 leading-relaxed">
                  {faq.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6">
        <motion.div 
          style={{ scale: yScale }}
          className="max-w-7xl mx-auto bg-brand-earth rounded-[60px] p-16 md:p-24 text-center relative overflow-hidden shadow-3xl shadow-brand-earth/40"
        >
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-white/5 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2" />
          <div className="relative z-10">
            <h3 className="text-5xl md:text-7xl font-black text-white mb-10 max-w-4xl mx-auto leading-[1.1]">
              Ready to modernize <span className="text-brand-gold uppercase italic">agriculture administration?</span>
            </h3>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <button 
                onClick={() => navigate('/auth/role-select')}
                className="px-10 py-5 rounded-3xl bg-white text-brand-earth font-black text-lg hover:scale-105 active:scale-95 shadow-2xl transition-all"
              >
                Join the Platform
              </button>
              <button className="px-10 py-5 rounded-3xl bg-transparent border-2 border-white/30 text-white font-black text-lg hover:bg-white/10 transition-all">
                Contact Government Support
              </button>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-brand-earth/5 text-center">
        <div className="flex items-center justify-center gap-2 mb-6 opacity-30">
          <Sprout size={20} className="text-brand-earth" />
          <span className="text-sm font-bold text-brand-slate tracking-tighter uppercase">CropCred AI</span>
        </div>
        <p className="text-sm text-brand-slate/40">
          &copy; 2026 CropCred Governance Systems. Built for Smart Agriculture.
        </p>
      </footer>
    </div>
  );
};

export default LandingPage;
