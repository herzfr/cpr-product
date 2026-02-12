import { useDebounce } from '@/hooks/useDebounce';
import { useEffect, useState } from 'react';
import type { Product } from '../../types';
import type { Filter } from '@/types/general';
import { useProductList } from './useFetchProduct';
import type { ColumnDef, Row } from '@tanstack/react-table';
import { useCategory } from '../category/useCategory';
import { CategoryStore } from '../../store/category.store';
import { useNavigate } from 'react-router-dom';
import { useProductForm } from './useProductForm';

export const useProduct = () => {
  const [search, setSearch] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const { category: chooseCategory, selectCategory: setChooseCategory } =
    CategoryStore();
  const debouncedSearch = useDebounce(search, 500);
  const [sortBy, setSortBy] = useState<keyof Product | undefined>(undefined);
  const [filter, setFilter] = useState<Filter<Product>>({
    limit: 10,
    skip: 0,
    search: debouncedSearch,
    order: undefined,
    sortBy: sortBy,
  });
  const { products, isLoading, error, refetch } = useProductList(
    filter,
    chooseCategory,
  );
  const { categories } = useCategory();
  const { setProduct, setEditFormValues } = useProductForm();
  const columns: ColumnDef<Product>[] = [
    { header: 'Thumbnail', accessorKey: 'thumbnail', id: 'thumbnail' },
    { header: 'Title', accessorKey: 'title', id: 'title' },
    { header: 'Brand', accessorKey: 'brand', id: 'brand' },
    { header: 'Category', accessorKey: 'category', id: 'category' },
    { header: 'Price', accessorKey: 'price', id: 'price' },
    { header: 'Stock', accessorKey: 'stock', id: 'stock' },
    { header: 'Actions', accessorKey: 'action', id: 'action' },
  ];
  const navigate = useNavigate();

  useEffect(() => {
    if (debouncedSearch !== filter.search) {
      setFilter((prevFilter) => ({
        ...prevFilter,
        search: debouncedSearch, // Use the debounced value for search
      }));
    }
  }, [debouncedSearch]);

  useEffect(() => {
    refetch();
  }, [filter, chooseCategory]);

  // useEffect(() => {}, [openDialog]);

  const handleView = (row?: Row<Product>) => {
    // console.log(row);
    // const id = Number(row?.id) + 1;
    // navigate(`/product/detail?id=${id}`);
  };

  const closeDialog = () => {
    setOpenDialog(false);
  };

  const handleClickRow = (
    prod?: Row<Product>,
    type?: 'view' | 'edit' | 'delete',
  ) => {
    switch (type) {
      case 'view':
        const id = Number(prod?.id) + 1;
        navigate(`/product/detail?id=${id}`);
        break;
      case 'edit':
        // console.log('edit');
        setProduct(prod?.original);
        setEditFormValues();
        setOpenDialog(true);
        break;
      default:
        break;
    }
  };

  const handleClickSort = (sortBy: string, order: 'asc' | 'desc' | 'none') => {
    if (isKeyOfProduct(sortBy)) {
      setSortBy(sortBy);
      setFilter({
        ...filter,
        sortBy: order === 'none' ? undefined : sortBy,
        order: order === 'none' ? undefined : order,
      });
    }
  };

  const handleSearch = (q: string) => {
    setSearch(q);
  };

  const isKeyOfProduct = (key: string): key is keyof Product => {
    return ['title', 'brand', 'category', 'price', 'stock'].includes(key);
  };

  return {
    products,
    categories,
    isLoading,
    error,
    columns,
    chooseCategory,
    search,
    filter,
    openDialog,
    handleView,
    handleClickRow,
    handleClickSort,
    handleSearch,
    setSearch,
    setChooseCategory,
    closeDialog,
  };
};
