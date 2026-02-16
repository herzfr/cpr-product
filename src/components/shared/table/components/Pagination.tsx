import { Button } from '@/components/ui/Button';
import type { PaginationState, Table } from '@tanstack/react-table';
import type { DataTableProps } from '../types/types';

interface PaginationProps<TData> extends Pick<
  DataTableProps<TData>,
  'filter' | 'onFilterChange' | 'loading' | 'total'
> {
  table: Table<TData>;
  paginationState: PaginationState;
}

export function Pagination<TData>({
  filter,
  total,
  loading,
  onFilterChange,
}: PaginationProps<TData>) {
  const limit = filter.limit ?? 10;
  const skip = filter.skip ?? 0;

  const safeLimit = limit > 0 ? limit : 10;
  const pageCount = Math.max(1, Math.ceil(total / safeLimit));
  const pageIndex = Math.floor(skip / safeLimit);

  const isPrevDisabled = pageIndex <= 0;
  const isNextDisabled = pageIndex >= pageCount - 1;

  return (
    <div className="flex items-center justify-between px-4 py-4 border-t border-neutral-200">
      <div className="flex items-center gap-2">
        <span className="text-sm text-neutral-700">Rows per page</span>
        <select
          disabled={loading}
          value={limit}
          onChange={(e) => {
            onFilterChange({
              ...filter,
              limit: Number(e.target.value),
              skip: 0,
            });
          }}
          className="rounded-md border border-neutral-300 px-2 py-1 text-sm"
        >
          {[10, 20, 30, 40, 50].map((size) => (
            <option key={size} value={size}>
              {size}
            </option>
          ))}
        </select>
      </div>

      <div className="flex items-center gap-2">
        <Button
          variant="primary"
          size="sm"
          onClick={() =>
            onFilterChange({
              ...filter,
              skip: skip - limit,
            })
          }
          disabled={isPrevDisabled}
        >
          Previous
        </Button>
        Page {pageIndex + 1} of {pageCount || 1}
        <Button
          variant="primary"
          size="sm"
          onClick={() =>
            onFilterChange({
              ...filter,
              skip: skip + limit,
            })
          }
          disabled={isNextDisabled}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
