// import { create } from 'zustand';
// import type { Category } from '../types';
// import { persist } from 'zustand/middleware';

// type StoreCategories = {
//   category: Category | undefined;
//   selectCategory: (cat: Category | undefined) => void;
//   clear: () => void;
// };

// export const CategoryStore = create(
//   persist<StoreCategories>(
//     (set) => ({
//       category: undefined,
//       selectCategory: (cat: Category | undefined) => set({ category: cat }),
//       clear: () => set({ category: undefined }),
//     }),
//     {
//       name: 'ui-storage', // Nama untuk key di localStorage
//       partialize: (state) => ({ category: state.category, selectCategory: state.selectCategory, clear: state.clear }), // Menyimpan seluruh state ke localStorage
//     }
//   )
// );

import { create } from 'zustand';
import type { Category } from '../types';
import { persist } from 'zustand/middleware';

type StoreCategories = {
  category: Category | undefined;
  selectCategory: (cat: Category | undefined) => void;
  clear: () => void;
};

export const CategoryStore = create(
  persist<StoreCategories>(
    (set) => ({
      category: undefined,
      selectCategory: (cat: Category | undefined) => set({ category: cat }),
      clear: () => set({ category: undefined }),
    }),
    {
      name: 'ui-storage', // Nama untuk key di localStorage
      partialize: (state) => ({
        category: state.category,
        selectCategory: state.selectCategory,
        clear: state.clear,
      }), // Menyimpan seluruh state ke localStorage
    },
  ),
);
