import { create } from 'zustand';
import {
  initialProductState,
  useProductReducer,
  type ProductAction,
  type ProductState,
} from './product.reducer';

type ProductStore = ProductState & {
  dispatch: (productAction: ProductAction) => void;
};

export const useProductStore = create<ProductStore>((set) => ({
  ...initialProductState,
  dispatch: (action) => set((state) => useProductReducer(state, action)),
}));
