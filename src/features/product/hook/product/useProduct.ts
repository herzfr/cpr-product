import type { ColumnDef, Row } from '@tanstack/react-table';
import { useProductStore } from '../../store/product/product.store';
import { useCategoryList, useProductList } from './useFetchProduct';
import type { Product } from '../../types';
import { columnsProductTable } from '@/constants/table';
import { useEffect } from 'react';
import type { Filter } from '@/types/general';
import type {
  RowActionEvent,
  ToolbarActionEvent,
} from '@/components/shared/table/types/types';
import { useNavigate } from 'react-router-dom';
import { useProductMutation } from '../useProductMutation';
import { useToast } from '@/hooks/useToast';
import { useDebounce } from '@/hooks/useDebounce';

export const useProduct = () => {
  const productStore = useProductStore();
  const debouncedSearch = useDebounce(productStore.filter.search, 600);
  const debouncedFilter = {
    ...productStore.filter,
    search: debouncedSearch,
  };
  const productList = useProductList(debouncedFilter, productStore.category);
  const categoryList = useCategoryList();
  const toast = useToast();
  const columns: ColumnDef<Product>[] = columnsProductTable;
  const { mutateAsync } = useProductMutation(productStore.filter);

  const navigate = useNavigate();

  useEffect(() => {
    productList.refetch();
  }, []);

  const setFilter = (f: Filter<Product>) =>
    productStore.dispatch({ type: 'SET_FILTER', payload: f });

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
        const id = Number(action.value.id) + 1;
        navigate(`/product/detail?id=${id}`);
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
    toast,

    setFilter,
    setProduct,
    setActionRow,
    setActionToolbar,

    confirmationDialog,
    retry,
  };
};
