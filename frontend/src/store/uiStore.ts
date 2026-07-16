import { create } from 'zustand';

interface UIStore {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  selectedLabId?: string;
  selectedOrgId?: string;
  setLab: (orgId: string, labId: string) => void;
}

export const useUIStore = create<UIStore>((set) => ({
  isDarkMode: localStorage.getItem('darkMode') === 'true',
  selectedLabId: localStorage.getItem('selectedLabId') || undefined,
  selectedOrgId: localStorage.getItem('selectedOrgId') || undefined,

  toggleDarkMode: () => {
    set((state) => {
      const newDarkMode = !state.isDarkMode;
      localStorage.setItem('darkMode', String(newDarkMode));
      if (newDarkMode) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      return { isDarkMode: newDarkMode };
    });
  },

  setLab: (orgId: string, labId: string) => {
    localStorage.setItem('selectedOrgId', orgId);
    localStorage.setItem('selectedLabId', labId);
    set({ selectedOrgId: orgId, selectedLabId: labId });
  },
}));
