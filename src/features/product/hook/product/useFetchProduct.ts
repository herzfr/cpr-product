import type { Filter } from '@/types/general';
import type { Category, Product } from '../../types';
import {
  useCategoryQuery,
  useProductQuery,
  useProductsCategoryQuery,
  useProductsQuery,
  useProductsSkipQuery,
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

export const useProductInfiniteList = (
  params: Filter<Product>,
  category?: string | null,
) => {
  const query = useProductsSkipQuery(params, category);

  const flatProducts =
    query.data?.pages?.flatMap((page) => page?.products ?? []) ?? [];

  const total = query.data?.pages?.[0]?.total ?? 0;
  const lastPage = query.data?.pages?.[(query.data?.pages?.length ?? 0) - 1];

  return {
    products: flatProducts,
    meta: {
      total,
      limit: lastPage?.limit ?? params.limit ?? 10,
      skip: lastPage?.skip ?? 0,
    },
    isLoading: query.isLoading,
    isFetching: query.isFetching,
    hasNextPage: !!query.hasNextPage,
    fetchNextPage: query.fetchNextPage,
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
