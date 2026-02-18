import { renderHook, act } from '@testing-library/react';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import { useDetail } from '../useDetail';
import * as reactRouter from 'react-router-dom';
import * as useFetchProduct from '../useFetchProduct';
import * as productStore from '../../../store/product/product.store';
import React from 'react';

// Mock react-router-dom
vi.mock('react-router-dom', () => ({
  useNavigate: vi.fn(),
  useParams: vi.fn(),
  useSearchParams: vi.fn(),
  MemoryRouter: ({ children }: any) => <div>{children}</div>,
}));

// Mock useProductDetail
vi.mock('../useFetchProduct', () => ({
  useProductDetail: vi.fn(),
}));

// Mock useProductStore
vi.mock('../../../store/product/product.store', () => ({
  useProductStore: vi.fn(),
}));

describe('useDetail', () => {
  const mockNavigate = vi.fn();
  const mockDispatch = vi.fn();
  const mockProduct = {
    id: 1,
    title: 'Test Product',
    images: ['img1.png', 'img2.png'],
    price: 100,
  };

  beforeEach(() => {
    vi.clearAllMocks();
    (reactRouter.useNavigate as any).mockReturnValue(mockNavigate);
    (reactRouter.useParams as any).mockReturnValue({ id: '1' });
    (reactRouter.useSearchParams as any).mockReturnValue([
      new URLSearchParams(),
    ]);
    (useFetchProduct.useProductDetail as any).mockReturnValue({
      product: mockProduct,
    });
    (productStore.useProductStore as any).mockReturnValue({
      product: mockProduct,
      dispatch: mockDispatch,
    });
  });

  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <reactRouter.MemoryRouter>{children}</reactRouter.MemoryRouter>
  );

  it('should initialize with product id from params', () => {
    const { result } = renderHook(() => useDetail(), { wrapper });
    expect(result.current.product).toEqual(mockProduct);
  });

  it('should fallback to searchParams if id is not in params', () => {
    (reactRouter.useParams as any).mockReturnValue({ id: undefined });
    (reactRouter.useSearchParams as any).mockReturnValue([
      new URLSearchParams('id=2'),
    ]);

    renderHook(() => useDetail(), { wrapper });
    expect(useFetchProduct.useProductDetail).toHaveBeenCalledWith(2);
  });

  it('should navigate to home if no id is found', () => {
    (reactRouter.useParams as any).mockReturnValue({ id: undefined });
    (reactRouter.useSearchParams as any).mockReturnValue([
      new URLSearchParams(),
    ]);

    renderHook(() => useDetail(), { wrapper });
    expect(mockNavigate).toHaveBeenCalledWith('/', { replace: true });
  });

  it('should set displayImg to the first product image', () => {
    const { result } = renderHook(() => useDetail(), { wrapper });
    expect(result.current.displayImg).toBe('img1.png');
  });

  it('should update displayImg when setDisplayImg is called', () => {
    const { result } = renderHook(() => useDetail(), { wrapper });
    act(() => {
      result.current.setDisplayImg('img2.png');
    });
    expect(result.current.displayImg).toBe('img2.png');
  });

  it('should navigate back correctly', () => {
    const { result } = renderHook(() => useDetail(), { wrapper });
    act(() => {
      result.current.back();
    });
    expect(mockNavigate).toHaveBeenCalledWith('/', { replace: true });
  });

  it('should dispatch UPDATE_PRODUCT when updateProduct is called', () => {
    const { result } = renderHook(() => useDetail(), { wrapper });
    act(() => {
      result.current.updateProduct();
    });
    expect(mockDispatch).toHaveBeenCalledWith({
      type: 'UPDATE_PRODUCT',
      payload: mockProduct,
    });
  });
});
