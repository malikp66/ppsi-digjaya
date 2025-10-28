"use client";

import create from "zustand";

type SidebarSection = "dashboard" | "members" | "map" | "analytics" | "certificates";

type UIState = {
  sidebarOpen: boolean;
  activeSection: SidebarSection;
  toggleSidebar: () => void;
  setSection: (section: SidebarSection) => void;
  language: "id" | "su";
  setLanguage: (lang: "id" | "su") => void;
};

export const useUIStore = create<UIState>((set) => ({
  sidebarOpen: true,
  activeSection: "dashboard",
  language: "id",
  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
  setSection: (activeSection) => set({ activeSection }),
  setLanguage: (language) => set({ language }),
}));
