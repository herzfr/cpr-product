import type { DialogConfirmationProps } from '@/components/shared/dialog/Confirmation';
import type { ButtonProps } from '@/components/ui/Button';

export const CONFIRM_VARIANT_MAP: Record<
  DialogConfirmationProps['type'],
  ButtonProps['variant']
> = {
  danger: 'danger',
  warning: 'primary',
  success: 'primary',
  info: 'primary',
};
