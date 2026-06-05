/* eslint-disable @typescript-eslint/no-explicit-any */
import { toast } from "sonner";
import { create } from "zustand";
import { axiosInstance } from "../lib/axiosInstance";

interface AuthStore {
  checkAuth: () => void;
  isCheckingAuth: boolean;
  authUser: any;
  isSigningUp: boolean;
  isLoggingIn: boolean;
  signup: (formData: {
    fullName: string;
    email: string;
    password: string;
  }) => Promise<void>;

  login: (formData: { email: string; password: string }) => Promise<void>;
}

interface SignUpData {
  fullName: string;
  email: string;
  password: string;
}

interface LoggingData {
  email: string;
  password: string;
}

export const useAuthStore = create<AuthStore>((set) => ({
  authUser: null,
  isCheckingAuth: true,
  isSigningUp: false,
  isLoggingIn: false,

  checkAuth: async () => {
    try {
      const response = await axiosInstance.get("/auth/check");
      set({ authUser: response.data });
    } catch {
      toast.error("Error in auth check");
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  signup: async (data: SignUpData) => {
    set({ isSigningUp: true });
    try {
      const response = await axiosInstance.post("/auth/signUp", data);
      set({ authUser: response?.data });
      toast.success("Account created successfully!");
    } catch (error: any) {
      toast.error(error?.response?.data?.message);
    } finally {
      set({ isSigningUp: false });
    }
  },

  login: async (data: LoggingData) => {
    set({ isLoggingIn: true });
    try {
      const response = await axiosInstance.post("/auth/login", data);
      set({ authUser: response?.data });
      toast.success("Account created successfully!");
    } catch (error: any) {
      toast.error(error?.response?.data?.message);
    } finally {
      set({ isLoggingIn: false });
    }
  },
}));
