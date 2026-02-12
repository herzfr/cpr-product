import {
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import type { DataTableProps } from './types';
import { useTableState } from './hook/useTableState';
import { Table } from './components/DataTable';
import { Filter } from './components/DataFilter';

export function DataTable<TData>({
  data,
  columns,
  enablePagination = true,
  pageSize = 10,
  enableSorting = true,
  enableFiltering = true,
  searchPlaceholder = 'Search...',
  searchValue = '',
  chooseCategory,
  categories,
  onRowClick,
  onRowClickType,
  onSortChange,
  onCategoryChange,
  onSearchChange,
  actions,
}: DataTableProps<TData>) {
  const {
    sorting,
    setSorting,
    filter,
    setFilter,
    visibility,
    setVisibility,
    pagination,
    setPagination,
  } = useTableState(pageSize);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    ...(enableSorting && {
      getSortedRowModel: getSortedRowModel(),
      onSortingChange: setSorting,
    }),
    ...(enableFiltering && {
      getFilteredRowModel: getFilteredRowModel(),
      onColumnFiltersChange: setFilter,
    }),
    ...(enablePagination && {
      getPaginationRowModel: getPaginationRowModel(),
      onPaginationChange: setPagination,
    }),
    onColumnVisibilityChange: setVisibility,
    state: {
      sorting,
      columnFilters: filter,
      columnVisibility: visibility,
      pagination,
    },
  });

  return (
    <div className="bg-white rounded-lg shadow-sm border border-neutral-200">
      <Filter
        searchValue={searchValue}
        searchPlaceholder={searchPlaceholder}
        chooseCategory={chooseCategory}
        categories={categories}
        onCategoryChange={onCategoryChange}
        onSearchChange={onSearchChange}
        actions={actions}
      />
      <Table
        table={table}
        onRowClick={(row) => {
          onRowClick(row);
        }}
        onType={onRowClickType}
        onSortChange={onSortChange}
      />
    </div>
  );
}
