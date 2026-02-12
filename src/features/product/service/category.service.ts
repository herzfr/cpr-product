import { apiClient } from '@/lib/axios';
import type { Category } from '../types';

export const fetchCategories = async (): Promise<Category[]> => {
  const url = 'products/categories';
  const { data } = await apiClient.get(url);
  return data;
};
