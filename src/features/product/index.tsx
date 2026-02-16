import { lazy, type ElementType } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useToastStore } from './store/toast/toast.store';
import { ToastContainer } from '@/components/ui/Toast';

const Catalog = lazy(() => import('@/features/product/pages/Catalog'));
const Detail = lazy(() => import('@/features/product/pages/Detail'));

export default function ProductPage() {
  const toast = useToastStore((state) => state.toasts);

  type AppRoute =
    | { index: true; Component: ElementType }
    | { path: string; Component: ElementType };

  const routes: AppRoute[] = [
    { index: true, Component: Catalog },
    { path: 'detail', Component: Detail },
    { path: 'detail/:id', Component: Detail },
  ];

  return (
    <div>
      <Routes>
        {routes.map((r, index) => (
          <Route
            key={'index' in r ? index : r.path}
            index={'index' in r ? true : undefined}
            path={'path' in r ? r.path : undefined}
            element={<r.Component />}
          />
        ))}
      </Routes>
      <ToastContainer toasts={toast} />
    </div>
  );
}
