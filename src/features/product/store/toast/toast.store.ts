import type { ToastProps } from '@/components/ui/Toast';
import { create } from 'zustand';

type ToastInput = Omit<ToastProps, 'id' | 'onClose'>;

type ToastStore = {
  toasts: ToastProps[];
  addToast: (toast: ToastInput) => void;
  removeToast: (id: string) => void;
  success: (title: string, message?: string) => void;
  error: (title: string, message?: string) => void;
  info: (title: string, message?: string) => void;
  warning: (title: string, message?: string) => void;
};

export const useToastStore = create<ToastStore>((set) => ({
  toasts: [],
  removeToast: (id) =>
    set((state) => ({
      toasts: state.toasts.filter((t) => t.id !== id),
    })),

  addToast: (toast) =>
    set((state) => {
      const id = `toast-${Date.now()}-${Math.random()}`;

      const newToast: ToastProps = {
        ...toast,
        id,
        onClose: (toastId: string) => {
          set((state) => ({
            toasts: state.toasts.filter((t) => t.id !== toastId),
          }));
        },
      };

      return { toasts: [...state.toasts, newToast] };
    }),

  success: (title, message) =>
    set((state) => {
      const id = `toast-${Date.now()}-${Math.random()}`;
      return {
        toasts: [
          ...state.toasts,
          {
            id,
            type: 'success',
            title,
            message,
            onClose: (toastId: string) =>
              set((state) => ({
                toasts: state.toasts.filter((t) => t.id !== toastId),
              })),
          },
        ],
      };
    }),

  error: (title, message) =>
    set((state) => {
      const id = `toast-${Date.now()}-${Math.random()}`;
      return {
        toasts: [
          ...state.toasts,
          {
            id,
            type: 'error',
            title,
            message,
            onClose: (toastId: string) =>
              set((state) => ({
                toasts: state.toasts.filter((t) => t.id !== toastId),
              })),
          },
        ],
      };
    }),

  info: (title, message) =>
    set((state) => {
      const id = `toast-${Date.now()}-${Math.random()}`;
      return {
        toasts: [
          ...state.toasts,
          {
            id,
            type: 'info',
            title,
            message,
            onClose: (toastId: string) =>
              set((state) => ({
                toasts: state.toasts.filter((t) => t.id !== toastId),
              })),
          },
        ],
      };
    }),

  warning: (title, message) =>
    set((state) => {
      const id = `toast-${Date.now()}-${Math.random()}`;
      return {
        toasts: [
          ...state.toasts,
          {
            id,
            type: 'warning',
            title,
            message,
            onClose: (toastId: string) =>
              set((state) => ({
                toasts: state.toasts.filter((t) => t.id !== toastId),
              })),
          },
        ],
      };
    }),
}));
