import { create } from 'zustand';
import type { Product } from '../types';

type StoreProduct = {
  product: Product | null;
  setProduct: (prod: Product) => void;
  clearProduct: () => void;
};

export const useProductStore = create<StoreProduct>((set) => ({
  product: null,
  // =====================================
  setProduct: (product) => set({ product }),
  clearProduct: () => set({ product: null }),
}));