import type { Header } from '@tanstack/react-table';
import { ChevronsUpDown, ChevronUp, ChevronDown } from 'lucide-react';

export function SortIndicator<TData>({
  header,
}: {
  header: Header<TData, unknown>;
}) {
  const sortDirection = header.column.getIsSorted();

  if (!sortDirection) {
    return <ChevronsUpDown className="w-4 h-4 text-neutral-400" />;
  }

  if (sortDirection === 'asc') {
    return <ChevronUp className="w-4 h-4 text-neutral-700" />;
  }

  return <ChevronDown className="w-4 h-4 text-neutral-700" />;
}
