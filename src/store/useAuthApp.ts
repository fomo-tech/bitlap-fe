import { create } from "zustand";

type IUser = {
  _id: string;
  name?: string;
  inviteUser?: [string];
  profilePicUrl?: string;
  phone?: string;
  totalWithdrawValue: number | 0;
  totalbuyTicket: number | 0;
  totalRewardToday: number | 0;
  totalDep: number | 0;
  drawNum: number | 0;
  mineNum: number | 0;
  duckSticker: number | 0;
  totalReceiveSalary: number | 0;
  isCheckinToday: boolean | false;
  password?: string;
  payment_password?: string;
  realBalance: number;
  bankList: Array<{
    nameBank: string;
    numberBank: string;
    holderName: string;
  }>;
  vip: number | 0;
  farmVip: number | 0;
  inviteCode?: string;
  checkInToday?: number;
  refCode: string;
  roles: any;
  verified?: boolean;
  status?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  userName?: string;
  userId?: number;
};

export type AuthState = {
  user: IUser | null;
  logged: boolean;
};

export type AuthActions = {
  onSetUser: (val: IUser) => void;
};

export const useAuthApp = create<AuthState & AuthActions>((set) => ({
  user: null,
  logged: !!JSON.parse(localStorage.getItem("logged") as string),
  onSetUser: (user: any) => {
    set((state) => {
      state.user = user;
      state.logged = true;
      localStorage.setItem("logged", "1");
      return { ...state };
    });
  },
}));
