import { apiClient } from '@/lib/axios';
import type {
  CreateProductPayload,
  Product,
  UpdateProductPayload,
} from '../types';
import type { ApiResponse, Filter } from '@/types/general';

export const fetchProducts = async (
  filter: Filter<Product>,
): Promise<ApiResponse<'products', Product[]>> => {
  const { search, ...rest } = filter;
  const baseUrl = search ? '/products/search' : '/products';
  try {
    const { data } = await apiClient.get(baseUrl, {
      params: {
        ...(search ? { q: search } : {}),
        ...rest,
      },
    });
    return data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw new Error('Failed to fetch products');
  }
};

export const fetchProductsByCategory = async (
  category: string,
  params?: Filter<Product>,
): Promise<ApiResponse<'products', Product[]>> => {
  const { search, ...rest } = params || {};
  const baseUrl = `/products/category/${category}`;
  try {
    const { data } = await apiClient.get(baseUrl, {
      params: {
        ...(search ? { q: search } : {}),
        ...rest,
      },
    });
    return data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw new Error('Failed to fetch products');
  }
};

export const fetchProduct = async (id: number): Promise<Product> => {
  const { data } = await apiClient.get('/products/' + id);
  return data;
};

export const createProduct = async (
  product: CreateProductPayload,
): Promise<Product> => {
  const { data } = await apiClient.post('/products/add', product);
  return data;
};

export const updateProduct = async (
  product: UpdateProductPayload,
): Promise<Product> => {
  const { data } = await apiClient.put('/products/' + product.id, product.data);
  return data;
};

export const deleteProduct = async (id: number): Promise<Product[]> => {
  const { data } = await apiClient.delete('/products/' + id);
  return data;
};
