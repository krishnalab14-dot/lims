import { create } from 'zustand';
import { authService } from '../services/authService';

interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  labId?: string;
}

interface AuthStore {
  user: User | null;
  accessToken: string | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  setUser: (user: User | null) => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  accessToken: null,
  isAuthenticated: false,

  login: async (email: string, password: string) => {
    try {
      const response = await authService.login(email, password);
      authService.setTokens(response.accessToken, response.refreshToken);
      set({
        user: response.user,
        accessToken: response.accessToken,
        isAuthenticated: true,
      });
    } catch (error) {
      set({ user: null, accessToken: null, isAuthenticated: false });
      throw error;
    }
  },

  logout: () => {
    authService.clearTokens();
    set({ user: null, accessToken: null, isAuthenticated: false });
  },

  setUser: (user) => {
    set({ user, isAuthenticated: !!user });
  },
}));
