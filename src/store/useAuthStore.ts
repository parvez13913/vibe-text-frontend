import { toast } from "sonner";
import { create } from "zustand";
import { axiosInstance } from "../lib/axiosInstance";

interface AuthStore {
  checkAuth: () => void;
  isCheckingAuth: boolean;
  isSigninUp: boolean;
  authUser: any;
}

interface SignUpData {
  fullName: string;
  email: string;
  password: string;
}

export const useAuthStore = create<AuthStore>((set) => ({
  authUser: null,
  isCheckingAuth: true,
  isSigninUp: false,

  checkAuth: async () => {
    try {
      const response = await axiosInstance.get("/auth/check");
      set({ authUser: response.data });
    } catch (error) {
      toast.error("Error in auth check");
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  signUp: async (data: SignUpData) => {
    set({ isSigninUp: true });
    try {
      const response = await axiosInstance.post("/auth/signUp", data);
      set({ authUser: response?.data });
      toast.success("Account created successfully!");
    } catch (error: any) {
      toast.error(error?.response?.data?.message);
    } finally {
      set({ isSigninUp: false });
    }
  },
}));
