import { create } from 'zustand';
import { User, Workspace } from '@types/index';

interface AuthStore {
  user: User | null;
  workspace: Workspace | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  setUser: (user: User | null) => void;
  setWorkspace: (workspace: Workspace | null) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  workspace: null,
  isAuthenticated: false,
  isLoading: false,
  setUser: (user) => set({ user, isAuthenticated: !!user }),
  setWorkspace: (workspace) => set({ workspace }),
  logout: () => set({ user: null, workspace: null, isAuthenticated: false }),
}));

interface ThemeStore {
  isDark: boolean;
  language: 'en' | 'ar';
  toggleTheme: () => void;
  setLanguage: (lang: 'en' | 'ar') => void;
}

export const useThemeStore = create<ThemeStore>((set) => ({
  isDark: typeof window !== 'undefined' ? document.documentElement.classList.contains('dark') : false,
  language: 'en',
  toggleTheme: () =>
    set((state) => {
      if (typeof window !== 'undefined') {
        document.documentElement.classList.toggle('dark');
      }
      return { isDark: !state.isDark };
    }),
  setLanguage: (language) => set({ language }),
}));

interface NotificationStore {
  notifications: Array<{ id: string; message: string; type: 'success' | 'error' | 'info' | 'warning' }>;
  addNotification: (message: string, type: 'success' | 'error' | 'info' | 'warning') => void;
  removeNotification: (id: string) => void;
}

export const useNotificationStore = create<NotificationStore>((set) => ({
  notifications: [],
  addNotification: (message, type) =>
    set((state) => ({
      notifications: [
        ...state.notifications,
        { id: Date.now().toString(), message, type },
      ],
    })),
  removeNotification: (id) =>
    set((state) => ({
      notifications: state.notifications.filter((n) => n.id !== id),
    })),
}));
