import { create } from "zustand";

export type GlobalAppState = {
  isDarkMode: boolean;
  loading: boolean;
  isCallBackUser: boolean;
  configApp: any;
  transaction_type_trading: string
  events:any
};

export type GlobalAppActions = {
  toggleDarkMode: (val: boolean) => void;
  handleLoading: (val: boolean) => void;
  handleCallbackUser: () => void;
  handleSetConfig: (val: any) => void;
  handleSetEvents: (val: any) => void;
  setTransactionTypeTrading:(val: any) => void;
};

export const useGlobalAppStore = create<GlobalAppState & GlobalAppActions>((set) => ({
  events: null,
  transaction_type_trading:"pending",
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
  setTransactionTypeTrading: (val: string) => {
    set((state) => {
      state.transaction_type_trading = val;
      return { ...state };
    });
  },
  handleSetEvents: (val: boolean) => {
    set((state) => {
      state.events = val;
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
}));
