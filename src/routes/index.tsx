import { MainLayout } from '@/components/layouts/MainLayout';
import { LoadingFallback } from '@/components/ui/Loading';
import { lazy, Suspense, type ElementType } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

const ProductPage = lazy(() => import('@/features/product'));
const ProductNotFound = lazy(() => import('@/features/not-found'));

export function AppRoutes() {
  type AppRoute =
    | { index: true; Component: ElementType }
    | { path: string; Component: ElementType };

  const routes: AppRoute[] = [
    { index: true, Component: () => <Navigate to="/product" replace /> },
    { path: '/product/*', Component: ProductPage },
    { path: '*', Component: ProductNotFound },
  ];

  return (
    <Suspense fallback={<LoadingFallback />}>
      <Routes>
        {/* Main Routes (with sidebar) */}
        <Route path="/" element={<MainLayout />}>
          {routes.map((r) => {
            const Component = r.Component;

            return 'index' in r ? (
              <Route key="index" index element={<Component />} />
            ) : (
              <Route key={r.path} path={r.path} element={<Component />} />
            );
          })}
        </Route>
      </Routes>
    </Suspense>
  );
}
