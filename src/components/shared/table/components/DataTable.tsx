import { flexRender, type Header, type Table } from '@tanstack/react-table';
import { SortIndicator } from '../helpers/sort';
import type { Product } from '@/features/product/types';
import { currencyPipe, getStockPriority, toTitleCase } from '@/utils/helpers';
import type { DataTableProps } from '../types/types';

interface TableProps<TData> extends Pick<
  DataTableProps<TData>,
  'onRowClick' | 'actions' | 'onRowActionChange' | 'onFilterChange' | 'filter'
> {
  table: Table<TData>;
}

export function Table<TData>({
  table,
  filter,
  actions,
  onRowClick,
  onFilterChange,
  onRowActionChange,
}: TableProps<TData>) {
  const sortingChange = (header: Header<TData, unknown>) => {
    const currentSort = header.column.getIsSorted();
    const columnId = header.column.id as Extract<keyof TData, string>;

    if (currentSort === false) {
      table.setSorting([{ id: header.column.id, desc: false }]);
      onFilterChange({ ...filter, order: 'asc', sortBy: columnId });
    } else if (currentSort === 'asc') {
      table.setSorting([{ id: header.column.id, desc: true }]);
      onFilterChange({ ...filter, order: 'desc', sortBy: columnId });
    } else {
      table.setSorting([]);
      onFilterChange({ ...filter, order: undefined, sortBy: undefined });
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="overflow-x-auto rounded-lg border border-slate-200 shadow-sm">
        <table className="min-w-full divide-y divide-slate-200 bg-white text-sm">
          <thead className="bg-slate-50">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="px-4 py-3 font-semibold text-slate-900 text-left"
                  >
                    {header.isPlaceholder ? null : (
                      <div
                        className={
                          header.column.getCanSort()
                            ? 'cursor-pointer select-none flex items-center gap-2'
                            : ''
                        }
                        onClick={() => {
                          sortingChange(header);
                        }}
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                        {header.id !== 'thumbnail' &&
                          header.id !== 'action' && (
                            <SortIndicator header={header} />
                          )}
                      </div>
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="divide-y divide-slate-200">
            {table.getRowModel().rows.map((row) => (
              <tr
                key={row.id}
                className="transition-colors hover:bg-slate-50"
                onClick={() => {
                  onRowClick?.(row);
                }}
              >
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="px-4 py-3 text-slate-700">
                    {/* Render Image if the column is 'imageColumn' */}
                    {cell.column.id === 'thumbnail' ? (
                      <img
                        src={cell.getValue() as string}
                        className="w-16 h-16 object-cover"
                      />
                    ) : cell.column.id === 'title' ? (
                      <div>
                        <div className="font-semibold">
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext(),
                          )}
                        </div>
                        <div className="text-sm text-slate-500">
                          {(row.original as Product).description}
                        </div>
                      </div>
                    ) : cell.column.id === 'price' ? (
                      <>
                        {currencyPipe(
                          (row.original as Product).price,
                          'en-US',
                          'USD',
                        )}
                      </>
                    ) : cell.column.id === 'stock' ? (
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-ait-caption-md-semibold border ${getStockPriority(
                          (row.original as Product).stock,
                        )}`}
                      >
                        {(row.original as Product).stock}
                      </span>
                    ) : cell.column.id === 'action' ? (
                      <div className="flex">
                        {actions &&
                          actions.map((action, idx) => (
                            <button
                              key={idx}
                              onClick={(e) => {
                                e.preventDefault();
                                onRowActionChange?.({
                                  type: action.id,
                                  value: row.original,
                                });
                              }}
                              title="Delete"
                              className="p-2 text-ait-neutral-500 hover:text-ait-primary-600 hover:bg-ait-primary-50 rounded-lg transition-all duration-200 hover:shadow-sm"
                            >
                              {action.icon}
                            </button>
                          ))}
                      </div>
                    ) : cell.column.id === 'category' ? (
                      <div className="flex">
                        {toTitleCase((row.original as Product).category)}
                      </div>
                    ) : (
                      <>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </>
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
