import { getCoreRowModel, useReactTable } from '@tanstack/react-table';
import type { DataTableProps } from './types/types';
import { useTableState } from './hook/useTableState';
import { Table } from './components/DataTable';
import { Filter } from './components/DataFilter';
import { LoadingFallback } from '@/components/ui/Loading';
import { Button } from '@/components/ui/Button';
import { Pagination } from './components/Pagination';

export function DataTable<TData>({
  columns,
  data,
  total,
  filter,
  toolbarAction,
  actions,
  placeholder,
  loading,
  error,
  onFilterChange,
  onRowClick,
  onActionToolbar,
  onRowActionChange,
  onRetry,
}: DataTableProps<TData>) {
  const { sorting, pagination, pageCount } = useTableState<TData>({
    filter,
    total,
  });

  const table = useReactTable({
    data,
    columns,
    pageCount: pageCount,
    state: {
      sorting: sorting,
      pagination: pagination,
    },
    manualSorting: true,
    manualPagination: true,
    getCoreRowModel: getCoreRowModel(),
  });

  if (error) {
    return (
      <div className="p-12 text-center">
        <p className="text-danger-500 text-sm mb-3">Failed to load data.</p>
        <Button
          type="button"
          variant="tertiary"
          size="md"
          className="min-w-28"
          isIconOnly
          aria-label="Confirm"
          onClick={onRetry}
        >
          Try again!
        </Button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-neutral-200">
      <Filter<TData>
        filter={filter}
        loading={loading}
        placeholder={placeholder}
        toolbarAction={toolbarAction}
        onFilterChange={onFilterChange}
        onActionToolbar={onActionToolbar}
      />
      {loading ? (
        <LoadingFallback />
      ) : (
        <>
          {!loading && table.getRowModel().rows.length === 0 ? (
            <div className="p-12 text-center">
              <p className="text-neutral-500 text-sm">No products found</p>
            </div>
          ) : (
            <div>
              <Table<TData>
                table={table}
                filter={filter}
                actions={actions}
                onRowClick={onRowClick}
                onFilterChange={onFilterChange}
                onRowActionChange={onRowActionChange}
              />
              <Pagination
                table={table}
                total={total}
                loading={loading}
                filter={filter}
                paginationState={pagination}
                onFilterChange={onFilterChange}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
}
