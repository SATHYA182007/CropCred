import { create } from 'zustand';

interface Payment {
  id: number;
  date: string;
  amount: string;
  status: string;
}

interface YieldData {
  year: string;
  yield: number;
}

interface FarmerData {
  id: string;
  name: string;
  location: string;
  creditScore: number;
  loanEligibility: string;
  cropHealth: number;
  recentPayments: Payment[];
  climateResilience: number;
  soilHealth: number;
  yieldHistory: YieldData[];
}

interface BankerApplication {
  id: string;
  name: string;
  request: string;
  score: number;
  status: string;
}

interface AppState {
  farmerData: FarmerData | null;
  bankerApplications: BankerApplication[];
  isLoading: boolean;
  error: string | null;
  fetchFarmerData: (id: string) => Promise<void>;
  fetchBankerApplications: () => Promise<void>;
}

export const useAppStore = create<AppState>((set) => ({
  farmerData: null,
  bankerApplications: [],
  isLoading: false,
  error: null,

  fetchFarmerData: async (id: string) => {
    set({ isLoading: true, error: null });
    try {
      const response = await fetch(`http://localhost:5001/api/farmer/${id}`);
      if (!response.ok) throw new Error('Failed to fetch farmer data');
      const data = await response.json();
      set({ farmerData: data, isLoading: false });
    } catch (err: any) {
      set({ error: err.message, isLoading: false });
    }
  },

  fetchBankerApplications: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await fetch('http://localhost:5001/api/banker/applications');
      if (!response.ok) throw new Error('Failed to fetch applications');
      const data = await response.json();
      set({ bankerApplications: data, isLoading: false });
    } catch (err: any) {
      set({ error: err.message, isLoading: false });
    }
  }
}));
