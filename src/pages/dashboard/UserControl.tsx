import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, 
  Search, 
  Filter, 
  ChevronRight, 
  MoreVertical, 
  UserPlus, 
  ShieldCheck, 
  ShieldAlert, 
  UserCheck, 
  UserX,
  Database,
  ArrowUpRight,
  Eye,
  RefreshCw,
  Clock,
  MoreHorizontal,
  Mail,
  Phone,
  Settings,
  X
} from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { useAuthStore } from '../../store/authStore';
import { toast } from 'sonner';

const UserControl = () => {
  const { profile } = useAuthStore();
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeRole, setActiveRole] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchUsers();
  }, [activeRole]);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      let query = supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (activeRole !== 'all') {
        query = query.eq('role', activeRole);
      }

      const { data } = await query;
      setUsers(data || []);
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredUsers = users.filter(u => 
    u.full_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    u.email?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getRoleBadge = (role: string) => {
    switch (role) {
      case 'admin': return 'bg-red-500/10 text-red-500 border-red-500/20';
      case 'officer': return 'bg-brand-gold/10 text-brand-gold border-brand-gold/20';
      case 'farmer': return 'bg-brand-earth/10 text-brand-earth border-brand-earth/20';
      default: return 'bg-brand-slate/5 text-brand-slate/40 border-brand-slate/10';
    }
  };

  return (
    <div className="space-y-12 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-10">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-500 text-[10px] font-black uppercase tracking-widest border border-blue-500/20 mb-6">
            <Users size={12} /> Global Identity Mesh
          </div>
          <h1 className="text-7xl font-black text-brand-slate tracking-tighter leading-[0.9] mb-4">User <span className="text-brand-slate/20">Control.</span></h1>
          <p className="text-xl font-medium text-brand-slate/40 max-w-xl">Identity auditing and role escalation management for the regional agriculture network.</p>
        </div>
        
        <div className="flex flex-col md:flex-row gap-4 items-center">
           <div className="relative flex-1 md:w-80">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-brand-slate/30" size={20} />
              <input 
                type="text" 
                placeholder="Search Identity Hub..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-16 pr-8 py-5 rounded-[28px] border-2 border-brand-earth/5 bg-white text-sm font-bold focus:outline-none focus:border-brand-gold transition-all shadow-xl shadow-brand-slate/5"
              />
           </div>
           <div className="flex p-1.5 rounded-[28px] bg-brand-slate/5 border border-brand-earth/5 backdrop-blur-xl shrink-0">
              {['all', 'admin', 'officer', 'farmer'].map(r => (
                <button 
                  key={r}
                  onClick={() => setActiveRole(r)}
                  className={`px-6 py-3 rounded-[22px] text-[10px] font-black uppercase tracking-widest transition-all ${
                    activeRole === r ? 'bg-brand-deep text-white shadow-xl shadow-brand-deep/30' : 'text-brand-slate/40 hover:text-brand-earth'
                  }`}
                >
                  {r}
                </button>
              ))}
           </div>
        </div>
      </div>

      {/* Main Identity Registry Table */}
      <div className="glass-card rounded-[60px] border border-brand-earth/5 overflow-hidden shadow-3xl bg-white/40">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-brand-earth/5">
                <th className="px-10 py-8 text-[10px] font-black text-brand-slate/30 uppercase tracking-[0.2em]">Regional Identity</th>
                <th className="px-10 py-8 text-[10px] font-black text-brand-slate/30 uppercase tracking-[0.2em]">Contact Node</th>
                <th className="px-10 py-8 text-[10px] font-black text-brand-slate/30 uppercase tracking-[0.2em]">Role Auth</th>
                <th className="px-10 py-8 text-[10px] font-black text-brand-slate/30 uppercase tracking-[0.2em]">Last Pulse Sync</th>
                <th className="px-10 py-8 text-[10px] font-black text-brand-slate/30 uppercase tracking-[0.2em]">Admin Interface</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-earth/5">
              {loading ? (
                Array(5).fill(0).map((_, i) => (
                  <tr key={i} className="animate-pulse">
                    <td colSpan={5} className="px-10 py-8"><div className="h-4 bg-brand-slate/5 rounded-full w-full" /></td>
                  </tr>
                ))
              ) : filteredUsers.length > 0 ? (
                filteredUsers.map((u) => (
                  <motion.tr 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    key={u.id} 
                    className="group hover:bg-white transition-colors"
                  >
                    <td className="px-10 py-8">
                       <div className="flex items-center gap-5">
                          <div className={`w-14 h-14 rounded-2xl bg-brand-offwhite border border-brand-earth/10 flex items-center justify-center text-brand-slate/40 group-hover:bg-brand-deep group-hover:text-white transition-all shadow-inner font-black`}>
                             {u.full_name?.charAt(0)}
                          </div>
                          <div>
                             <p className="text-sm font-black text-brand-slate group-hover:text-brand-deep transition-colors">{u.full_name}</p>
                             <p className="text-[10px] font-bold text-brand-slate/30 uppercase tracking-widest mt-1">UUID: {u.id.substring(0, 8)}</p>
                          </div>
                       </div>
                    </td>
                    <td className="px-10 py-8">
                       <div className="space-y-1">
                          <div className="flex items-center gap-2 text-xs font-bold text-brand-slate/60">
                             <Mail size={12} className="opacity-30" /> {u.email}
                          </div>
                          <div className="flex items-center gap-2 text-xs font-bold text-brand-slate/30">
                             <Phone size={12} className="opacity-20" /> {u.phone || '+91 000-000-0000'}
                          </div>
                       </div>
                    </td>
                    <td className="px-10 py-8">
                       <span className={`px-4 py-1.5 rounded-full border-2 text-[9px] font-black uppercase tracking-widest ${getRoleBadge(u.role)}`}>
                          {u.role.toUpperCase()}
                       </span>
                    </td>
                    <td className="px-10 py-8">
                       <div className="flex items-center gap-2 text-xs font-bold text-brand-slate/30 uppercase tracking-widest">
                          <Clock size={14} className="opacity-20" />
                          {new Date(u.created_at).toLocaleDateString()}
                       </div>
                    </td>
                    <td className="px-10 py-8">
                       <div className="flex items-center gap-3">
                          <button className="p-3 rounded-2xl bg-brand-offwhite text-brand-slate/40 hover:text-brand-gold hover:bg-brand-gold/5 transition-all border border-brand-earth/5 shadow-inner">
                             <Settings size={18} />
                          </button>
                          <button className="p-3 rounded-2xl bg-brand-offwhite text-brand-slate/40 hover:text-blue-500 hover:bg-blue-500/5 transition-all border border-brand-earth/5 shadow-inner">
                             <Eye size={18} />
                          </button>
                          <button className="p-3 rounded-2xl bg-brand-offwhite text-brand-slate/40 hover:text-brand-earth transition-all border border-brand-earth/5 shadow-inner">
                             <MoreHorizontal size={18} />
                          </button>
                       </div>
                    </td>
                  </motion.tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="px-10 py-24 text-center">
                    <div className="w-24 h-24 rounded-[36px] bg-brand-slate/5 flex items-center justify-center text-brand-slate/10 mx-auto mb-8 shadow-inner">
                       <Users size={48} />
                    </div>
                    <p className="text-xl font-black text-brand-slate/30 uppercase tracking-[0.3em]">No identities located</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Admin Quick Action Footer */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
         {[
           { label: "Role Escalation", count: "12 Pending", icon: ShieldAlert, color: "text-brand-gold" },
           { label: "New Verifications", count: "45 Registry", icon: UserCheck, color: "text-brand-earth" },
           { label: "Security Audits", count: "0 Warnings", icon: ShieldCheck, color: "text-blue-500" }
         ].map((act, i) => (
           <div key={i} className="p-10 rounded-[56px] border border-brand-earth/5 group flex flex-col items-center justify-center text-center hover:bg-white transition-all shadow-3xl">
              <div className={`w-14 h-14 rounded-2xl bg-brand-offwhite flex items-center justify-center mb-6 transition-transform group-hover:scale-110 shadow-lg border border-brand-earth/5 ${act.color}`}>
                 <act.icon size={28} />
              </div>
              <h4 className="text-sm font-black text-brand-slate uppercase tracking-widest leading-none mb-2">{act.label}</h4>
              <p className="text-[10px] font-bold text-brand-slate/30 uppercase tracking-[0.2em]">{act.count}</p>
              <div className="mt-8 p-3 rounded-2xl bg-brand-offwhite text-brand-slate/20 opacity-0 group-hover:opacity-100 transition-all">
                 <ArrowUpRight size={20} />
              </div>
           </div>
         ))}
      </div>
    </div>
  );
};

export default UserControl;
