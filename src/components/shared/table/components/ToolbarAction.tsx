import { Button } from '@/components/ui/Button';
import {
  SimpleSelect,
  type SimpleSelectOption,
} from '@/components/ui/SimpleSelect';
import type { Action, ToolbarActionEvent } from '../types/types';

type ToolbarButton = {
  type: 'button';
  id: string;
} & Omit<Action, 'onClick'>;

type ToolbarSelect = {
  type: 'select';
  id: string;
  items: SimpleSelectOption[];
  selected?: string;
  placeholder?: string;
} & Omit<Action, 'onClick'>;

export type ToolbarAction = ToolbarButton | ToolbarSelect;

export type ToolbarActions = ToolbarAction[];

export function ToolbarActionData({
  disable,
  actionsToolbar,
  onActionToolbar,
}: {
  disable?: boolean;
  actionsToolbar: ToolbarActions;
  onActionToolbar?: (event: ToolbarActionEvent) => void;
}) {
  return (
    <>
      {actionsToolbar.map((action, idx) => {
        if (action.type === 'select') {
          return (
            <SimpleSelect
              disabled={disable}
              key={action.id}
              value={action.selected ?? 'all'}
              onChange={(value) => {
                onActionToolbar?.({
                  type: action.type,
                  id: action.id,
                  value,
                });
              }}
              options={action.items}
              placeholder={action.placeholder}
              className={`w-full sm:w-40 ${action.className}`}
            />
          );
        }

        if (action.type === 'button') {
          return (
            <Button
              key={idx}
              disabled={disable}
              variant={action.variant || 'text'}
              className={action.className}
              onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                e.stopPropagation();
                onActionToolbar?.({
                  type: action.type,
                  id: action.id,
                });
              }}
              aria-label={action.label}
            >
              {action.icon}
              {action.label}
            </Button>
          );
        }

        return null;
      })}
    </>
  );
}
