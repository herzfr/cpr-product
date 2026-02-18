import type { Filter } from '@/types/general';
import type { Product } from '../../types';

export type ProductState = {
  product: Product | null;
  category: string | null;
  displayMode: 'pagination' | 'infinite';
  filter: Filter<Product>;
  dialog: {
    title: string;
    type: 'custom' | 'confirmation' | null;
    open: boolean;
    waiting: boolean;
  };
};

export type ProductAction =
  | { type: 'SET_PRODUCT'; payload: Product }
  | { type: 'SET_CATEGORY'; payload: string }
  | { type: 'SET_FILTER'; payload: Filter<Product> }
  | { type: 'CREATE_PRODUCT' }
  | { type: 'UPDATE_PRODUCT'; payload: Product }
  | { type: 'DELETE_PRODUCT'; payload: Product }
  | { type: 'SET_WAITING'; payload: boolean }
  | { type: 'CLOSE_DIALOG' }
  | { type: 'SET_DISPLAY_MODE'; payload: 'pagination' | 'infinite' }
  | { type: 'NEXT_PAGE' }
  | { type: 'PREV_PAGE' }
  | { type: 'RESET_PRODUCT' }
  | { type: 'RESET_CATEGORY' }
  | { type: 'RESET_FILTER' }
  | { type: 'RESET_STATE' };

export const initialProductState: ProductState = {
  product: null,
  category: null,
  displayMode: 'pagination',
  filter: {
    limit: 10,
    skip: 0,
    search: '',
    sortBy: undefined,
    order: undefined,
  },
  dialog: {
    title: '',
    type: null,
    open: false,
    waiting: false,
  },
};

export function useProductReducer(
  state: ProductState,
  action: ProductAction,
): ProductState {
  switch (action.type) {
    case 'SET_PRODUCT':
      return {
        ...state,
        product: action.payload,
      };

    case 'SET_CATEGORY':
      return {
        ...state,
        category: action.payload,
        filter: {
          ...state.filter,
          skip: 0,
        },
      };

    case 'SET_FILTER':
      return {
        ...state,
        filter: {
          ...state.filter,
          ...action.payload,
        },
      };

    case 'SET_DISPLAY_MODE':
      return {
        ...state,
        displayMode: action.payload,
        filter: {
          ...state.filter,
          skip: 0,
        },
      };

    case 'NEXT_PAGE':
      return {
        ...state,
        filter: {
          ...state.filter,
          skip: Math.max(0, (state.filter.skip || 0) + 1),
        },
      };

    case 'PREV_PAGE':
      return {
        ...state,
        filter: {
          ...state.filter,
          skip: Math.max(1, (state.filter.skip || 0) - 1),
        },
      };

    case 'CREATE_PRODUCT':
      return {
        ...state,
        dialog: {
          open: true,
          title: 'Create Product',
          type: 'custom',
          waiting: false,
        },
      };

    case 'UPDATE_PRODUCT':
      return {
        ...state,
        product: action.payload,
        dialog: {
          open: true,
          title: 'Edit Product',
          type: 'custom',
          waiting: false,
        },
      };

    case 'DELETE_PRODUCT':
      return {
        ...state,
        product: action.payload,
        dialog: {
          open: true,
          title: 'Delete Product',
          type: 'confirmation',
          waiting: false,
        },
      };

    case 'SET_WAITING':
      return {
        ...state,
        dialog: {
          ...state.dialog,
          waiting: action.payload,
        },
      };

    case 'CLOSE_DIALOG':
      return {
        ...state,
        product: null,
        dialog: {
          open: false,
          title: '',
          type: null,
          waiting: false,
        },
      };

    case 'RESET_PRODUCT':
      return {
        ...state,
        product: null,
      };

    case 'RESET_CATEGORY':
      return {
        ...state,
        category: null,
      };

    case 'RESET_FILTER':
      return {
        ...state,
        filter: {
          limit: 10,
          skip: 0,
          search: '',
          sortBy: undefined,
          order: undefined,
        },
      };

    case 'RESET_STATE':
      return initialProductState;

    default:
      return state;
  }
}
