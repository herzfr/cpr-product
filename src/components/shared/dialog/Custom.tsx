import {
  Dialog,
  DialogBody,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/Dialog';

type DialogStateProps = {
  open: boolean;
  title: string;
  component: React.ReactNode;
  btnConfirmText: string;
  isLoading: boolean;
  onClose: () => void;
  onConfirm?: () => void;
};

export function DialogCustom({
  open,
  title,
  component,
  isLoading,
  onClose,
}: DialogStateProps) {
  return (
    <Dialog
      open={open}
      onOpenChange={() => {
        onClose();
      }}
    >
      <DialogContent
        size="md"
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
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <DialogBody>{component}</DialogBody>
      </DialogContent>
    </Dialog>
  );
}
