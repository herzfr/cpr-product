import { MainLayout } from '@/components/layouts/MainLayout';
import { LoadingFallback } from '@/components/ui/Loading';
import { lazy, Suspense, type ElementType } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

const ProductPage = lazy(() => import('@/features/product'));
// const LoginPage = lazy(() => import('@/features/auth/pages/LoginPage'));

// function LoadingFallback() {
//   return (
//     <div className="flex items-center justify-center min-h-screen">
//       <div className="text-center">
//         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4" />
//         <p className="text-neutral-600">Loading...</p>
//       </div>
//     </div>
//   );
// }

export function AppRoutes() {
  type AppRoute =
    | { index: true; Component: ElementType }
    | { path: string; Component: ElementType };

  const routes: AppRoute[] = [
    { index: true, Component: () => <Navigate to="/product" replace /> },
    { path: '/product/*', Component: ProductPage },
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
