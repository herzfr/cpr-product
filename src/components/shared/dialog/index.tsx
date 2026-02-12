import {
  Dialog,
  DialogBody,
  DialogContent,
  // DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/Dialog';

type DialogStateProps = {
  title: string;
  component: React.ReactNode;
  isOpen: boolean;
  isShowButtonTrigger?: boolean;
  buttonText?: string;
  onClose?: () => void;
};

export function DialogData({
  component,
  isShowButtonTrigger,
  isOpen,
  buttonText,
  onClose,
}: DialogStateProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      {isShowButtonTrigger && (
        <DialogTrigger asChild>
          <button className="px-4 py-2.5 text-ait-body-md-semibold text-white bg-ait-primary-500 rounded-lg hover:bg-ait-primary-400 transition-colors">
            {buttonText}
          </button>
        </DialogTrigger>
      )}
      <DialogContent size="md">
        <DialogHeader>
          <DialogTitle>Card Details</DialogTitle>
        </DialogHeader>
        <DialogBody>{component}</DialogBody>
      </DialogContent>
    </Dialog>
  );
}
