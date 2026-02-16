import { Button } from '@/components/ui/Button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/Dialog';
import { CONFIRM_VARIANT_MAP } from '@/constants/alert';
import { getTypeAlertColor } from '@/utils/helpers';
import { AlertTriangle } from 'lucide-react';

export interface DialogConfirmationProps {
  open: boolean;
  title: string;
  message: string | null;
  type: 'danger' | 'warning' | 'success' | 'info';
  btnConfirmText: string;
  isLoading: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export function ConfirmationDialog({
  open,
  title,
  message,
  type,
  btnConfirmText,
  isLoading,
  onClose,
  onConfirm,
}: DialogConfirmationProps) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent
        size="sm"
        className={
          isLoading ? '[&>button]:pointer-events-none [&>button]:opacity-0' : ''
        }
        onPointerDownOutside={(e) => {
          if (isLoading) e.preventDefault();
        }}
        onEscapeKeyDown={(e) => {
          if (isLoading) e.preventDefault();
        }}
      >
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div
              className={`w-10 h-10 rounded-full ${getTypeAlertColor(type).bg} flex items-center justify-center shrink-0`}
            >
              <AlertTriangle
                className={`w-5 h-5 ${getTypeAlertColor(type).text}`}
              />
            </div>
            <DialogTitle>{title}</DialogTitle>
          </div>
          <DialogDescription>{message}</DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <Button
            disabled={isLoading}
            type="button"
            variant="tertiary"
            size="md"
            className="min-w-28"
            isIconOnly
            aria-label="Confirm"
            onClick={onClose}
          >
            Cancel
          </Button>

          <Button
            disabled={isLoading}
            type="button"
            variant={CONFIRM_VARIANT_MAP[type]}
            size="md"
            className={`min-w-28`}
            isIconOnly
            aria-label="Confirm"
            onClick={onConfirm}
          >
            {isLoading ? 'Loading...' : btnConfirmText}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
