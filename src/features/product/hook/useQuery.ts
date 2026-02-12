import type { ApiResponse, Filter } from '@/types/general';
import {
  fetchProduct,
  fetchProducts,
  fetchProductsByCategory,
} from '../service/product.service';
import type { Category, Product } from '../types';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { fetchCategories } from '../service/category.service';

export const productKeys = {
  all: ['products'] as const,
  categories: ['categories'] as const,
  list: (params: Filter<Product>) => [...productKeys.all, params] as const,
  listCategory: () => [...productKeys.categories] as const,
  detail: (id: string) => [...productKeys.all, id] as const,
};

export const useProductsQuery = (params: Filter<Product>) => {
  return useQuery<ApiResponse<'products', Product[]>>({
    queryKey: [...productKeys.list(params)],
    queryFn: () => fetchProducts(params),
    placeholderData: keepPreviousData,
  });
};

export const useProductsCategoryQuery = (
  category: Category,
  params?: Filter<Product>,
) => {
  return useQuery<ApiResponse<'products', Product[]>>({
    queryKey: [productKeys.all, category],
    queryFn: () => fetchProductsByCategory(category, params),
    placeholderData: keepPreviousData,
  });
};

export const useProductQuery = (id: string) =>
  useQuery<Product>({
    queryKey: productKeys.detail(id),
    queryFn: () => fetchProduct(id),
    enabled: !!id,
  });

export const useCategoryQuery = () =>
  useQuery<Category[]>({
    queryKey: [...productKeys.listCategory()],
    queryFn: () => fetchCategories(),
    placeholderData: keepPreviousData,
  });
