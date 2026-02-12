import type { Category } from '@/features/product/types';
import type { ColumnDef, Row } from '@tanstack/react-table';
import type { ReactNode } from 'react';

export interface Action {
  label: string;
  icon?: ReactNode;
  onClick: () => void;
  className?: string;
  variant?:
    | 'primary'
    | 'secondary'
    | 'tertiary'
    | 'text'
    | 'link'
    | 'destructive-primary'
    | 'destructive-secondary'
    | 'destructive-tertiary'
    | 'destructive-text'
    | 'destructive-link'
    | 'elevated-primary'
    | 'elevated-secondary';
}

export type DataTableProps<TData> = {
  data: TData[];
  columns: ColumnDef<TData>[];
  enableRowSelection: boolean;
  enablePagination: boolean;
  enableSorting: boolean;
  enableFiltering: boolean;
  pageSize: number;
  searchValue?: string;
  searchPlaceholder?: string;
  chooseCategory?: Category;
  categories?: Category[];
  actions?: Action[];

  // Func
  onRowClick: (row?: Row<TData>) => void;
  onRowClickType: (row?: Row<TData>, type?: 'view' | 'edit' | 'delete') => void;
  onSortChange: (sortBy: string, order: 'asc' | 'desc' | 'none') => void;
  onSearchChange: (search: string) => void;
  onCategoryChange: (category: Category | undefined) => void;
};
