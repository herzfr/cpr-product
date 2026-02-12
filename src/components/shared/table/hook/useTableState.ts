import { useState } from 'react';
import type {
  ColumnFiltersState,
  PaginationState,
  SortingState,
  VisibilityState,
} from '@tanstack/react-table';

export function useTableState(initialPage = 0) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [filter, setFilter] = useState<ColumnFiltersState>([]);
  const [visibility, setVisibility] = useState<VisibilityState>({});
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: initialPage,
  });

  return {
    sorting,
    setSorting,
    filter,
    setFilter,
    visibility,
    setVisibility,
    pagination,
    setPagination,
  };
}
