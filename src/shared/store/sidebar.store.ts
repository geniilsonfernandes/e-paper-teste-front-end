import { create } from "zustand";

interface SidebarState {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
  closeSidebar: () => void;
  openSidebar: () => void;
}

export const useSidebarStore = create<SidebarState>((set) => ({
  isSidebarOpen: false, // Estado inicial da sidebar

  toggleSidebar: () =>
    set((state) => ({
      isSidebarOpen: !state.isSidebarOpen, // Alterna o estado de aberto/fechado
    })),

  closeSidebar: () =>
    set({
      isSidebarOpen: false,
    }),

  openSidebar: () =>
    set({
      isSidebarOpen: true,
    }),
}));
