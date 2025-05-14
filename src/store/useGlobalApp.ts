import { create } from "zustand";

export type GlobalAppState = {
  isDarkMode: boolean;
  loading: boolean;
  isCallBackUser: boolean;
  configApp: any;
};

export type GlobalAppActions = {
  toggleDarkMode: (val: boolean) => void;
  handleLoading: (val: boolean) => void;
  handleCallbackUser: () => void;
  handleSetConfig: (val: any) => void;
};

export const useGlobalAppStore = create<GlobalAppState & GlobalAppActions>(
  (set) => ({
    isDarkMode: false,
    isCallBackUser: false,
    loading: false,
    configApp: null,
    handleSetConfig: (val: boolean) => {
      set((state) => {
        state.configApp = val;
        return { ...state };
      });
    },
    handleLoading: (val: boolean) => {
      set((state) => {
        state.loading = val;
        return { ...state };
      });
    },
    handleCallbackUser: () => {
      set((state) => {
        state.isCallBackUser = !state.isCallBackUser;
        return { ...state };
      });
    },
    toggleDarkMode: (val: boolean) => {
      set((state) => {
        state.isDarkMode = val;
        return { ...state };
      });
    },
  })
);
