import { useMemo } from 'react';
import type { DataTableProps } from '../types/types';
import type { PaginationState, SortingState } from '@tanstack/react-table';

export function useTableState<TData>({
  filter,
  total,
}: Pick<DataTableProps<TData>, 'filter' | 'total'>) {
  const sorting: SortingState = useMemo(() => {
    if (!filter.sortBy) return [];
    return [
      {
        id: String(filter.sortBy),
        desc: filter.order === 'desc',
      },
    ];
  }, [filter.sortBy, filter.order]);

  const limit = filter.limit ?? 10;
  const skip = filter.skip ?? 0;

  const pagination: PaginationState = {
    pageIndex: Math.floor(skip / limit),
    pageSize: limit,
  };

  const pageCount = Math.ceil(total / limit);

  return {
    sorting,
    pagination,
    pageCount,
  };
}
