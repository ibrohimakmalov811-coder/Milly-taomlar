import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useBoughtStore = create(
  persist(
    (set) => ({
      boughtProducts: [],
      toggleShop: (product) => set((state) => {
        const isExist = state.boughtProducts.some((item) => item.id === product.id);
        if (isExist) {
          return { boughtProducts: state.boughtProducts.filter((item) => item.id !== product.id) };
        }
        return { boughtProducts: [...state.boughtProducts, product] };
      }),
      clearCart: () => set({ boughtProducts: [] })
    }),
    {
      name: 'bought-products-storage', 
    }
  )
);