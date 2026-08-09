import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useFavoriteStore = create(
    persist(
        (set) => ({
            favorites: [],
            toggleFavorite: (product) => set((state) => {
                const isExist = state.favorites.some((item) => item.id === product.id);
                if (isExist) {
                    return { favorites: state.favorites.filter((item) => item.id !== product.id) };
                }
                return { favorites: [...state.favorites, product] };
            }),
        }),
        {
            name: 'bought-product',
        }
    )
);