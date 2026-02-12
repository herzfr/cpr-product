import {
  flexRender,
  type Header,
  type Row,
  type Table,
} from '@tanstack/react-table';
import { SortIndicator } from '../helpers/sort';
import type { Product } from '@/features/product/types';
import { currencyPipe, getStockPriority, toTitleCase } from '@/utils/helpers';
import { Edit, Eye, Trash2 } from 'lucide-react';

interface TableProps<TData> {
  table: Table<TData>;
  onRowClick?: (row: Row<TData>) => void;
  onType?: (row: Row<TData>, type: 'view' | 'delete' | 'edit') => void;
  onSortChange?: (sortBy: string, order: 'asc' | 'desc' | 'none') => void;
}

export function Table<TData>({
  table,
  onRowClick,
  onType,
  onSortChange,
}: TableProps<TData>) {
  const actionButton = (key: string, row: Row<TData>) => {
    switch (key) {
      case 'view':
        return (
          <button
            onClick={(e) => {
              e.preventDefault();
              onType?.(row, 'view');
            }}
            title="View log"
            className="p-2 text-ait-neutral-500 hover:text-ait-primary-600 hover:bg-ait-primary-50 rounded-lg transition-all duration-200 hover:shadow-sm"
          >
            <Eye className="w-4 h-4" />
          </button>
        );
      case 'edit':
        return (
          <button
            onClick={(e) => {
              e.preventDefault();
              //   console.log(row, 'edit');
              onType?.(row, 'edit');
            }}
            title="Edit log"
            className="p-2 text-ait-neutral-500 hover:text-ait-primary-600 hover:bg-ait-primary-50 rounded-lg transition-all duration-200 hover:shadow-sm"
          >
            <Edit className="w-4 h-4" />
          </button>
        );
      case 'delete':
        return (
          <button
            onClick={(e) => {
              e.preventDefault();
              onType?.(row, 'delete');
            }}
            title="Delete log"
            className="p-2 text-ait-neutral-500 hover:text-ait-primary-600 hover:bg-ait-primary-50 rounded-lg transition-all duration-200 hover:shadow-sm"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        );
      default:
        break;
    }
  };

  const sortingChange = (header: Header<TData, unknown>) => {
    const currentSort = header.column.getIsSorted();
    if (currentSort === false) {
      table.setSorting([{ id: header.column.id, desc: false }]);
      onSortChange?.(header.column.id, 'asc');
    } else if (currentSort === 'asc') {
      table.setSorting([{ id: header.column.id, desc: true }]);
      onSortChange?.(header.column.id, 'desc');
    } else {
      table.setSorting([]);
      onSortChange?.(header.column.id, 'none');
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
                        {actionButton('view', row)}
                        {actionButton('edit', row)}
                        {actionButton('delete', row)}
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
