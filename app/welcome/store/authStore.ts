import { create } from 'zustand';
import { getAuthData, storeAuthData } from '../components/email-login';
import { AuthResponse } from '@/app/lib/types';

interface AuthStore {
  auth: AuthResponse | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  showRefreshPrompt: boolean;
  setAuth: (auth: AuthResponse | null) => void;  // accepts null
  refreshToken: () => Promise<boolean>;
  logout: () => void;
  hideRefreshPrompt: () => void;
}

export const useAuthStore = create<AuthStore>((set, get) => ({
  auth: getAuthData(),
  isAuthenticated: !!getAuthData()?.access_token,
  isLoading: false,
  showRefreshPrompt: false,

  setAuth: (auth: AuthResponse | null) => {  // Fixed: parameter type matches interface
    if (auth) {  // Add null check before storing
      storeAuthData(auth);
    }
    set({ auth, isAuthenticated: !!auth?.access_token });
  },

  refreshToken: async () => {
    set({ isLoading: true });
    try {
      const currentAuth = get().auth;
      if (!currentAuth?.refresh_token) return false;

      const response = await fetch('https://gateway-cus-acc.gov.bw/auth/refresh-token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token: currentAuth.refresh_token }),
      });

      const newAuth = await response.json();
      if (newAuth.access_token) {
        get().setAuth(newAuth);
        set({ showRefreshPrompt: false });
        return true;
      }
      return false;
    } catch (error) {
      console.error('Token refresh failed:', error);
      return false;
    } finally {
      set({ isLoading: false });
    }
  },

  logout: () => {
    set({ auth: null, isAuthenticated: false });
    localStorage.removeItem('authData');
  },

  hideRefreshPrompt: () => set({ showRefreshPrompt: false }),
}));