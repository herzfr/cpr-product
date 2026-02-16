import type { Filter } from '@/types/general';
import type { ColumnDef, Row } from '@tanstack/react-table';
import type { ReactNode } from 'react';
import type { ToolbarActions } from '../components/ToolbarAction';

export type ToolbarActionEvent =
  | {
      type: 'button';
      id: string;
    }
  | {
      type: 'select';
      id: string;
      value: string;
    };

export type RowActionEvent<TData> = {
  type: string;
  value: TData;
};

export interface Action {
  id: string;
  label: string;
  icon?: ReactNode;
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

export interface DataTableProps<TData> {
  columns: ColumnDef<TData>[];
  data: TData[];
  total: number;
  filter: Filter<TData>;
  loading?: boolean;
  error?: Error | null;
  toolbarAction?: ToolbarActions;
  actions?: Action[];
  placeholder?: {
    search: string;
  };

  onFilterChange: (filter: Filter<TData>) => void;
  onRowClick: (row?: Row<TData>) => void;
  onRowActionChange: (action: RowActionEvent<TData>) => void;
  onActionToolbar?: ((event: ToolbarActionEvent) => void) | undefined;
  onRetry: () => void;
}
