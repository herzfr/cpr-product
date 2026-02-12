import { useEffect, useState } from 'react';
import type { Category } from '../../types';
import { useCategoryQuery } from '../useQuery';

export const useCategory = () => {
  const { data, isLoading, error } = useCategoryQuery();
  const [categories, setCategories] = useState<Category[]>();

  useEffect(() => {
    if (data) {
      setCategories(data);
    }
  }, [data, setCategories]);

  return { data, isLoading, error, categories };
};
