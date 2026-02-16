import { Input } from '@/components/ui/Input';
import { Search } from 'lucide-react';
import type { DataTableProps, ToolbarActionEvent } from '../types/types';
import { ToolbarActionData } from './ToolbarAction';

interface FilterProps<TData> extends Pick<
  DataTableProps<TData>,
  'filter' | 'onFilterChange' | 'placeholder' | 'toolbarAction' | 'loading'
> {
  onActionToolbar: ((event: ToolbarActionEvent) => void) | undefined;
}

export function Filter<TData>({
  filter,
  loading,
  placeholder,
  toolbarAction,
  onFilterChange,
  onActionToolbar,
}: FilterProps<TData>) {
  return (
    <div className="flex items-center justify-between gap-4 p-4 border-b border-neutral-200">
      <div className="flex flex-1 items-center gap-4">
        <Input
          disabled={loading}
          variant="box"
          className="flex-1 max-w-sm"
          value={filter.search}
          onChange={(e) =>
            onFilterChange({ search: e.currentTarget.value, skip: 0 })
          }
          placeholder={placeholder?.search ?? 'Input field'}
          leading={<Search />}
          inputClassName="text-sm"
        />
      </div>
      <div className="flex items-center gap-2">
        {toolbarAction && (
          <ToolbarActionData
            disable={loading}
            actionsToolbar={toolbarAction}
            onActionToolbar={onActionToolbar}
          />
        )}
      </div>
    </div>
  );
}
