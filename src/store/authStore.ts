import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { supabase } from '../lib/supabase';
import type { User, Session } from '@supabase/supabase-js';

type Role = 'farmer' | 'officer' | 'admin';

interface Profile {
  id: string;
  full_name: string;
  email: string;
  role: Role;
  phone?: string | null;
  avatar_url?: string | null;
}

interface AuthState {
  user: User | null;
  profile: Profile | null;
  session: Session | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  
  setSession: (session: Session | null) => void;
  fetchProfile: (userId: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<{ error: string | null; role: Role | null }>;
  signOut: () => Promise<void>;
  initialize: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      profile: null,
      session: null,
      isLoading: true,
      isAuthenticated: false,

      setSession: (session) => {
        set({ session, user: session?.user ?? null, isAuthenticated: !!session });
      },

      fetchProfile: async (userId: string) => {
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', userId)
          .single();
        
        if (!error && data) {
          set({ profile: data as Profile });
        }
      },

      signIn: async (email, password) => {
        set({ isLoading: true });
        try {
          const { data, error } = await supabase.auth.signInWithPassword({ email, password });
          
          if (error) {
            console.error('Auth Error:', error.message);
            set({ isLoading: false });
            return { error: error.message, role: null };
          }

          if (data.session && data.user) {
            set({ session: data.session, user: data.user, isAuthenticated: true });
            
            // Try fetching profile with 10s timeout
            const profilePromise = get().fetchProfile(data.user.id);
            const timeoutPromise = new Promise((_, reject) => setTimeout(() => reject('Profile fetch timed out'), 10000));
            
            try {
              await Promise.race([profilePromise, timeoutPromise]);
            } catch (e) {
              console.warn('Profile fetch failed or timed out:', e);
            }
            
            const profile = get().profile;
            set({ isLoading: false });
            return { error: null, role: profile?.role ?? null };
          }

          set({ isLoading: false });
          return { error: 'Authentication failed: No session established.', role: null };
        } catch (e: any) {
          console.error('Login Exception:', e);
          set({ isLoading: false });
          return { error: e.message || 'An unexpected error occurred during sign in.', role: null };
        }
      },

      signOut: async () => {
        await supabase.auth.signOut();
        set({ user: null, profile: null, session: null, isAuthenticated: false });
      },

      initialize: async () => {
        set({ isLoading: true });
        const { data: { session } } = await supabase.auth.getSession();
        
        if (session?.user) {
          set({ session, user: session.user, isAuthenticated: true });
          await get().fetchProfile(session.user.id);
        }
        
        set({ isLoading: false });

        supabase.auth.onAuthStateChange(async (_event, session) => {
          set({ session, user: session?.user ?? null, isAuthenticated: !!session });
          if (session?.user) {
            await get().fetchProfile(session.user.id);
          } else {
            set({ profile: null });
          }
        });
      },
    }),
    {
      name: 'cropcred-auth',
      partialize: (state) => ({ session: state.session, profile: state.profile }),
    }
  )
);
