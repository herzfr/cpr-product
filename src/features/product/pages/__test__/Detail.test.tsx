import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { vi } from 'vitest';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Detail from '../Detail';

// Mock helpers
vi.mock('@/utils/helpers', () => ({
  currencyPipe: (val: number) => `$${val}`,
  getStockPriority: () => 'stock-high',
  toTitleCase: (str: string) =>
    str.replace(
      /\w\S*/g,
      (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(),
    ),
}));

// Mock useDetail hook
const mockSetDisplayImg = vi.fn();
const mockUpdateProduct = vi.fn();
const mockBack = vi.fn();
const mockDispatch = vi.fn();

const defaultDetailValue = {
  product: {
    title: 'Test Product',
    description: 'Test description',
    images: ['img1.png', 'img2.png'],
    brand: 'BrandX',
    category: 'category test',
    stock: 10,
    weight: 100,
    dimensions: { depth: 10, width: 20, height: 30 },
    sku: 'SKU123',
    warrantyInformation: '1 year',
    shippingInformation: 'Free',
    minimumOrderQuantity: 1,
    discountPercentage: 10,
    rating: 4.5,
    returnPolicy: '30 days',
    meta: { barcode: '123456', qrCode: 'qr.png' },
    price: 1000,
  },
  isLoading: false,
  error: null,
  isInvalidId: false,
  displayImg: 'img1.png',
  productStore: {
    dialog: { type: 'custom', open: true, waiting: false },
    dispatch: mockDispatch,
  },
  setDisplayImg: mockSetDisplayImg,
  updateProduct: mockUpdateProduct,
  back: mockBack,
};

const mockUseDetail = vi.fn(() => defaultDetailValue);

vi.mock('../../hook/product/useDetail', () => ({
  useDetail: () => mockUseDetail(),
}));

vi.mock('@/components/shared/dialog/Custom', () => ({
  DialogCustom: ({ btnConfirmText, onClose }: any) => (
    <button onClick={onClose}>{btnConfirmText}</button>
  ),
}));

vi.mock('@/features/not-found', () => ({
  default: () => <div>Product Not Found Mock</div>,
}));

vi.mock('@/components/ui/Loading', () => ({
  LoadingFallback: () => <div>Loading Mock</div>,
}));

// Utility render wrapper
const renderWithProviders = (ui: React.ReactElement) => {
  const queryClient = new QueryClient();
  return render(
    <MemoryRouter>
      <QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>
    </MemoryRouter>,
  );
};

describe('Detail Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockUseDetail.mockReturnValue(defaultDetailValue);
  });

  test('renders product details', () => {
    renderWithProviders(<Detail />);
    expect(screen.getByText('Test Product')).toBeInTheDocument();
    expect(screen.getByText('Test description')).toBeInTheDocument();
    expect(screen.getByText('BrandX')).toBeInTheDocument();
    expect(screen.getByText('Category Test')).toBeInTheDocument();
    expect(screen.getByText('10')).toBeInTheDocument();
    expect(screen.getByText('$1000')).toBeInTheDocument();
  });

  test('renders loading state', () => {
    mockUseDetail.mockReturnValue({
      ...defaultDetailValue,
      isLoading: true,
      product: undefined,
    } as any);
    renderWithProviders(<Detail />);
    expect(screen.getByText('Loading Mock')).toBeInTheDocument();
  });

  test('renders not found state when product is null', () => {
    mockUseDetail.mockReturnValue({
      ...defaultDetailValue,
      product: undefined,
    } as any);
    renderWithProviders(<Detail />);
    expect(screen.getByText('Product Not Found Mock')).toBeInTheDocument();
  });

  test('renders not found state when isInvalidId is true', () => {
    mockUseDetail.mockReturnValue({
      ...defaultDetailValue,
      isInvalidId: true,
      product: undefined,
    } as any);
    renderWithProviders(<Detail />);
    expect(screen.getByText('Product Not Found Mock')).toBeInTheDocument();
  });

  test('calls back on Kembali button click', () => {
    renderWithProviders(<Detail />);
    fireEvent.click(screen.getByText('Kembali'));
    expect(mockBack).toHaveBeenCalled();
  });

  test('calls updateProduct on Update button click', () => {
    renderWithProviders(<Detail />);
    const button = screen.getByRole('button', { name: /Update/i });
    fireEvent.click(button);
    expect(mockUpdateProduct).toHaveBeenCalled();
  });
});
