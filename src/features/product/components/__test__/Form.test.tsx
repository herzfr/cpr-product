import { fireEvent, render, screen } from '@testing-library/react';
import { ProductForm } from '../Form';
import * as useProductFormHook from '../../hook/product/useProductForm';
import { ProductMock } from '@/constants/product.mock';

const mockHandleSubmit = vi.fn((onSubmit) => (e: any) => {
  if (e && e.preventDefault) e.preventDefault();
  return onSubmit({});
});
const mockRegister = vi.fn(() => ({
  onChange: vi.fn(),
  onBlur: vi.fn(),
  name: 'field',
  ref: vi.fn(),
}));
const mockSubmitHandler = vi.fn();

describe('Product Form', () => {
  const setupMock = (overrides = {}) => {
    vi.spyOn(useProductFormHook, 'useProductForm').mockReturnValue({
      errors: {},
      isLoading: false,
      register: mockRegister as any,
      handleSubmit: mockHandleSubmit as any,
      submitHandler: mockSubmitHandler,
      product: ProductMock,
      getValues: vi.fn(),
      getFormValidity: vi.fn(),
      setEditFormValues: vi.fn(),
      filter: {} as any,
      isValid: true,
      formState: {} as any,
      ...overrides,
    });
  };

  test('renders all input fields and labels', () => {
    setupMock();
    render(<ProductForm />);

    expect(screen.getByLabelText(/Title/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Enter name/i)).toBeInTheDocument();

    expect(screen.getByLabelText(/Description/i)).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText(/Enter description/i),
    ).toBeInTheDocument();

    expect(screen.getByLabelText(/Brand/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Enter brand/i)).toBeInTheDocument();

    expect(screen.getByLabelText(/Category/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Enter category/i)).toBeInTheDocument();

    expect(screen.getByText(/Price/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Enter price/i)).toBeInTheDocument();

    expect(screen.getByText(/Discount/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Enter Discount/i)).toBeInTheDocument();

    expect(screen.getByText(/Rating/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Enter Rating/i)).toBeInTheDocument();

    expect(screen.getByText(/Stock/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Enter Stock/i)).toBeInTheDocument();
  });

  test('displays error messages when they exist', () => {
    setupMock({
      errors: {
        title: { message: 'Title is required' },
        description: { message: 'Description is required' },
        price: { message: 'Price is required' },
      },
    });

    render(<ProductForm />);

    expect(screen.getByText('Title is required')).toBeInTheDocument();
    expect(screen.getByText('Description is required')).toBeInTheDocument();
    expect(screen.getByText('Price is required')).toBeInTheDocument();
  });

  test('shows loading state on submit button', () => {
    setupMock({ isLoading: true });
    render(<ProductForm />);

    const button = screen.getByRole('button', { name: /Submit/i });
    expect(button).toBeDisabled();
    expect(button).toHaveTextContent('Loading...');
  });

  test('calls handleSubmit when form is submitted', async () => {
    setupMock();
    render(<ProductForm />);

    const button = screen.getByRole('button', { name: /Submit/i });
    fireEvent.click(button);

    expect(mockHandleSubmit).toHaveBeenCalled();
  });
});
