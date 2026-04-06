import { Outlet } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Sprout, Menu, X } from 'lucide-react';

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Features', href: '#features' },
  { label: 'For Institutions', href: '#institutions' },
  { label: 'Contact', href: '#contact' },
];

const PublicLayout = () => {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'glass-card shadow-lg border-b border-white/30' : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2">
              <motion.div whileHover={{ rotate: 180 }} transition={{ duration: 0.4 }}
                className="bg-brand-earth p-2 rounded-lg text-white shadow-md">
                <Sprout size={22} />
              </motion.div>
              <span className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-brand-deep to-brand-earth">
                CropCred
              </span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-6">
              {navLinks.map(link => (
                <a key={link.label} href={link.href}
                  className="text-sm font-medium text-brand-slate/70 hover:text-brand-earth transition-colors">
                  {link.label}
                </a>
              ))}
            </nav>

            {/* CTAs */}
            <div className="hidden md:flex items-center gap-3">
              <motion.button
                whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
                onClick={() => navigate('/auth/role-select')}
                className="px-5 py-2 rounded-full border border-brand-earth/30 text-brand-earth text-sm font-medium hover:bg-brand-earth/5 transition-colors">
                Login
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
                onClick={() => navigate('/auth/role-select')}
                className="px-5 py-2 rounded-full bg-brand-earth text-white text-sm font-semibold hover:bg-brand-deep transition-colors shadow-lg shadow-brand-earth/30">
                Get Started
              </motion.button>
            </div>

            {/* Mobile menu toggle */}
            <button className="md:hidden p-2 text-brand-slate" onClick={() => setMobileOpen(!mobileOpen)}>
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden glass-card border-t border-white/30 px-6 py-4 flex flex-col gap-3"
            >
              {navLinks.map(link => (
                <a key={link.label} href={link.href} onClick={() => setMobileOpen(false)}
                  className="text-sm font-medium text-brand-slate/80 hover:text-brand-earth">
                  {link.label}
                </a>
              ))}
              <div className="flex gap-2 pt-2 border-t border-brand-earth/10">
                <button onClick={() => navigate('/auth/role-select')}
                  className="flex-1 py-2 border border-brand-earth/30 text-brand-earth text-sm font-medium rounded-full">
                  Login
                </button>
                <button onClick={() => navigate('/auth/role-select')}
                  className="flex-1 py-2 bg-brand-earth text-white text-sm font-medium rounded-full">
                  Get Started
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      <main className="flex-grow pt-16">
        <Outlet />
      </main>

      {/* Footer */}
      <footer id="contact" className="bg-brand-deep text-white/70 pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
            <div className="md:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <Sprout size={24} className="text-brand-gold" />
                <span className="text-xl font-bold text-white">CropCred</span>
              </div>
              <p className="text-sm leading-relaxed max-w-xs">
                AI-powered agricultural credit scoring platform bridging farmers and financial institutions with data-driven trust.
              </p>
              <div className="flex gap-3 mt-6">
                {['Twitter', 'LinkedIn', 'GitHub'].map(s => (
                  <a key={s} href="#" className="text-xs font-semibold bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-full transition-colors">{s}</a>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#features" className="hover:text-brand-gold transition-colors">Features</a></li>
                <li><a href="#how-it-works" className="hover:text-brand-gold transition-colors">How It Works</a></li>
                <li><a href="#institutions" className="hover:text-brand-gold transition-colors">For Banks</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-brand-gold transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-brand-gold transition-colors">Careers</a></li>
                <li><a href="#contact" className="hover:text-brand-gold transition-colors">Contact</a></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-xs">&copy; {new Date().getFullYear()} CropCred Intelligence. All rights reserved.</p>
            <div className="flex gap-4 text-xs">
              <a href="#" className="hover:text-brand-gold">Privacy Policy</a>
              <a href="#" className="hover:text-brand-gold">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PublicLayout;
