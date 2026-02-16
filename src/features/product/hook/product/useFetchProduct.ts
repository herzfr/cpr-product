import type { Filter } from '@/types/general';
import type { Category, Product } from '../../types';
import {
  useCategoryQuery,
  useProductQuery,
  useProductsCategoryQuery,
  useProductsQuery,
} from '../useQuery';

export const useProductList = (
  params: Filter<Product>,
  category: string | undefined | null,
) => {
  const query = category
    ? useProductsCategoryQuery(category, params)
    : useProductsQuery(params);
  return {
    products: query.data?.products ?? [],
    meta: {
      total: query.data?.total ?? 0,
      limit: query.data?.limit ?? 0,
      skip: query.data?.skip ?? 0,
    },
    isLoading: query.isLoading,
    isFetching: query.isFetching,
    error: query.error,
    refetch: query.refetch,
  };
};

export const useProductDetail = (id: number) => {
  const query = useProductQuery(id);
  return {
    product: query.data as Product | undefined,
    isLoading: query.isLoading,
    isFetching: query.isFetching,
    error: query.error,
    refetch: query.refetch,
  };
};

export const useCategoryList = () => {
  const query = useCategoryQuery();
  return {
    categories: query.data as Category[],
    isLoading: query.isLoading,
    error: query.error,
  };
};
