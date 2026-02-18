import type { ApiResponse, Filter } from '@/types/general';
import {
  fetchProduct,
  fetchProducts,
  fetchProductsByCategory,
} from '../service/product.service';
import type { Category, Product } from '../types';
import {
  keepPreviousData,
  useInfiniteQuery,
  useQuery,
} from '@tanstack/react-query';
import { fetchCategories } from '../service/category.service';

export const PRODUCT_KEYS = {
  all: ['products'] as const,
  categories: ['categories'] as const,
  list: (
    category?: string | null,
    search?: string,
    sortBy?: string,
    order?: string,
    skip?: number,
    limit?: number,
  ) =>
    [
      'products',
      'list',
      category ?? 'all',
      search ?? '',
      sortBy ?? '',
      order ?? '',
      skip ?? 0,
      limit ?? 10,
    ] as const,
  detail: (id: number) => ['products', 'detail', id] as const,
};

export const useProductsQuery = (params: Filter<Product>) => {
  return useQuery<ApiResponse<'products', Product[]>>({
    queryKey: PRODUCT_KEYS.list(
      null,
      params.search,
      params.sortBy,
      params.order,
      params.skip,
      params.limit,
    ),
    queryFn: () => fetchProducts(params),
    placeholderData: keepPreviousData,
  });
};

export const useProductsSkipQuery = (
  params: Filter<Product>,
  category?: string | null,
) => {
  const limit = params.limit ?? 10;

  return useInfiniteQuery({
    queryKey: [
      'products',
      'infinite',
      category ?? 'all',
      params.search ?? '',
      params.sortBy ?? '',
      params.order ?? '',
      limit,
    ],

    initialPageParam: 0,

    queryFn: async ({ pageParam = 0 }) => {
      const isInitialLoad = pageParam === 0;
      const initialSkip = params.skip ?? 0;

      const fetchSkip = isInitialLoad ? 0 : (pageParam as number);
      const fetchLimit =
        isInitialLoad && initialSkip > 0 ? initialSkip + limit : limit;

      const p = {
        ...params,
        limit: fetchLimit,
        skip: fetchSkip,
      };

      return category ? fetchProductsByCategory(category, p) : fetchProducts(p);
    },

    getNextPageParam: (lastPage: any) => {
      if (!lastPage || typeof lastPage.skip !== 'number') return undefined;
      const nextSkip = lastPage.skip + lastPage.limit;
      return nextSkip < lastPage.total ? nextSkip : undefined;
    },
  });
};

export const useProductsCategoryQuery = (
  category: string,
  params?: Filter<Product>,
) => {
  return useQuery<ApiResponse<'products', Product[]>>({
    queryKey: PRODUCT_KEYS.list(
      category,
      params?.search,
      params?.sortBy,
      params?.order,
      params?.skip,
      params?.limit,
    ),
    queryFn: () => fetchProductsByCategory(category, params),
    placeholderData: keepPreviousData,
  });
};

export const useProductQuery = (id: number) =>
  useQuery<Product>({
    queryKey: PRODUCT_KEYS.detail(id),
    queryFn: () => fetchProduct(id),
    enabled: !!id,
  });

export const useCategoryQuery = () =>
  useQuery<Category[]>({
    queryKey: PRODUCT_KEYS.categories,
    queryFn: () => fetchCategories(),
    placeholderData: keepPreviousData,
    staleTime: 1000 * 60 * 60, // 1 hour
  });
