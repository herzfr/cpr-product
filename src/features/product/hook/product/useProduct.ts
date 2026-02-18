import type { ColumnDef, Row } from '@tanstack/react-table';
import { useProductStore } from '../../store/product/product.store';
import { useCategoryList, useProductList } from './useFetchProduct';
import type { Product } from '../../types';
import { columnsProductTable } from '@/constants/table';
import { useRef } from 'react';
import type { Filter } from '@/types/general';
import type {
  RowActionEvent,
  ToolbarActionEvent,
} from '@/components/shared/table/types/types';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useProductMutation } from '../useProductMutation';
import { useDebounce } from '@/hooks/useDebounce';
import { useToastStore } from '../../store/toast/toast.store';

export const useProduct = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialized = useRef(false);
  const productStore = useProductStore();
  const debouncedSearch = useDebounce(productStore.filter.search, 600);
  const debouncedFilter = {
    ...productStore.filter,
    search: debouncedSearch,
  };
  const productList = useProductList(debouncedFilter, productStore.category);
  const categoryList = useCategoryList();
  const toast = useToastStore();
  const columns: ColumnDef<Product>[] = columnsProductTable;
  const { mutateAsync } = useProductMutation(productStore.filter);
  const navigate = useNavigate();
  const isKeyOfProduct = (key: string): key is keyof Product => {
    return ['title', 'brand', 'category', 'price', 'stock'].includes(key);
  };

  if (!initialized.current) {
    const limit = Number(searchParams.get('limit')) || 10;
    const skip = Number(searchParams.get('skip')) || 0;
    const search = searchParams.get('q') || '';
    const order = searchParams.get('order') as 'asc' | 'desc' | undefined;
    const rawSortBy = searchParams.get('sortBy');
    let sortBy: keyof Product | undefined;
    if (rawSortBy && isKeyOfProduct(rawSortBy)) {
      sortBy = rawSortBy;
    }
    productStore.dispatch({
      type: 'SET_FILTER',
      payload: { limit, skip, search, order, sortBy },
    });
    initialized.current = true;
  }

  const syncUrl = (filter: typeof productStore.filter) => {
    const isDefault =
      (filter.skip === 0 || !filter.skip) &&
      !filter.search?.trim() &&
      !filter.sortBy &&
      !filter.order;

    if (isDefault) {
      setSearchParams({});
      return;
    }

    const params: Record<string, string> = {
      limit: String(filter.limit ?? 10),
      skip: String(filter.skip ?? 0),
    };

    if (filter.search?.trim()) {
      params.search = filter.search.trim();
    }

    if (filter.sortBy) {
      params.sortBy = filter.sortBy;
    }

    if (filter.order) {
      params.order = filter.order;
    }

    setSearchParams(params);
  };

  const setFilter = (f: Filter<Product>) => {
    syncUrl(f);
    productStore.dispatch({ type: 'SET_FILTER', payload: f });
  };

  const retry = () => productList.refetch();

  const setProduct = (row?: Row<Product> | undefined) => {
    if (row)
      productStore.dispatch({
        type: 'SET_PRODUCT',
        payload: row?.original ?? null,
      });
  };

  const setActionRow = (action: RowActionEvent<Product>) => {
    switch (action.type) {
      case 'view':
        const id = action.value.id;
        navigate(`/product/detail/${id}`);
        break;
      case 'edit':
        productStore.dispatch({
          type: 'UPDATE_PRODUCT',
          payload: action.value,
        });
        break;
      case 'delete':
        productStore.dispatch({
          type: 'DELETE_PRODUCT',
          payload: action.value,
        });
        break;
      default:
        break;
    }
  };

  const setActionToolbar = (action: ToolbarActionEvent) => {
    console.log(action);
    switch (action.id) {
      case 'select-category':
        if (action.type === 'select') {
          if (action.value === 'all') {
            productStore.dispatch({ type: 'RESET_CATEGORY' });
            return;
          }

          productStore.dispatch({
            type: 'SET_CATEGORY',
            payload: action.value,
          });
        }

        break;
      case 'create-product':
        productStore.dispatch({
          type: 'RESET_PRODUCT',
        });
        productStore.dispatch({
          type: 'CREATE_PRODUCT',
        });
        break;

      default:
        break;
    }
  };

  const confirmationDialog = async () => {
    productStore.dispatch({
      type: 'SET_WAITING',
      payload: true,
    });

    await mutateAsync(
      { type: 'delete', data: { id: Number(productStore.product?.id) } },
      {
        onSuccess: () => {
          toast.success('Delete Success', 'Your product has been deleted');
          productStore.dispatch({ type: 'RESET_FILTER' });
        },
        onError: (err) => {
          console.log(err);
        },
      },
    );

    productStore.dispatch({
      type: 'CLOSE_DIALOG',
    });
  };

  return {
    productStore,
    productList,
    categoryList,
    columns,

    setFilter,
    setProduct,
    setActionRow,
    setActionToolbar,

    confirmationDialog,
    retry,
  };
};
