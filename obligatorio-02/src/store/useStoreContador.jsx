import { create } from "zustand";
import { persist } from "zustand/middleware";
export const useStoreContador = create((set) => ({
  count: 1,
  inc: () => set((state) => ({ count: state.count + 1 })),
}));
