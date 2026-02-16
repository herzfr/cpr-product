import { useForm } from 'react-hook-form';
import { productSchema, type ProductFormProps } from '../../types/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCallback, useEffect } from 'react';
import type { CreateProductPayload, UpdateProductPayload } from '../../types';
import {
  useProductMutation,
  type ProductMutationPayload,
} from '../useProductMutation';
import { useProductStore } from '../../store/product/product.store';
import { useToast } from '@/hooks/useToast';
// import { useProductStore } from '../../store/product/product.store';

export const useProductForm = () => {
  const { product, filter, dialog, dispatch } = useProductStore();
  const { mutate } = useProductMutation(filter);
  const {
    register,
    getValues,
    reset,
    handleSubmit: rhfHandleSubmit,
    formState,
  } = useForm<ProductFormProps>({
    resolver: zodResolver(productSchema),
    mode: 'all',
    reValidateMode: 'onChange',
    defaultValues: {
      id: product?.id ?? null,
      title: product?.title ?? '',
      description: product?.description ?? '',
      price: product?.price ?? 0,
      discountPercentage: product?.discountPercentage ?? 0,
      rating: product?.rating ?? 0,
      stock: product?.stock ?? 0,
      brand: product?.brand ?? '',
      category: product?.category ?? '',
    },
  });
  const toast = useToast();

  const setEditFormValues = useCallback(() => {
    reset({
      id: product?.id ?? null,
      title: product?.title ?? '',
      description: product?.description ?? '',
      price: product?.price ?? 0,
      discountPercentage: product?.discountPercentage ?? 0,
      rating: product?.rating ?? 0,
      stock: product?.stock ?? 0,
      brand: product?.brand ?? '',
      category: product?.category ?? '',
    });
  }, [reset]);

  useEffect(() => {
    setEditFormValues();
  }, [setEditFormValues]);

  const getFormValidity = () => {
    const values = getValues();
    const errorKeys = Object.keys(formState.errors);

    const fieldsStatus = Object.keys(values).map((key) => ({
      name: key,
      valid: !errorKeys.includes(key),
    }));

    return { fieldsStatus, isValid: formState.isValid };
  };

  const submitHandler = useCallback(
    (data: ProductFormProps) => {
      dispatch({ type: 'SET_WAITING', payload: true });

      const payload: ProductMutationPayload =
        data.id === null || data.id === undefined
          ? {
              type: 'create',
              data: {
                ...data,
                price: Number(data.price),
                discountPercentage: Number(data.discountPercentage),
                rating: Number(data.rating),
                stock: Number(data.stock),
              } as CreateProductPayload,
            }
          : {
              type: 'update',
              data: {
                id: data.id,
                data: {
                  ...data,
                  price: Number(data.price),
                  discountPercentage: Number(data.discountPercentage),
                  rating: Number(data.rating),
                  stock: Number(data.stock),
                  createdAt: undefined,
                  updatedAt: undefined,
                  id: undefined,
                },
              } as UpdateProductPayload,
            };

      mutate(payload, {
        onSuccess: () => {
          console.log('successs');

          dispatch({ type: 'CLOSE_DIALOG' });
          toast.success('Delete Success', 'Your product has been deleted');
        },
        onError: (error) => {
          const message =
            error.message ?? `Failed to ${payload.type} the product`;
          switch (payload.type) {
            case 'create':
              toast.error('Create Failed!', message);
              break;
            case 'update':
              toast.error('Update Failed!', message);
              break;
            default:
              break;
          }
          dispatch({ type: 'CLOSE_DIALOG' });
        },
      });
    },
    [mutate],
  );

  const handleSubmit = rhfHandleSubmit(submitHandler);

  useEffect(() => {
    if (Object.keys(formState.errors).length > 0) {
      console.log('Form Errors:', formState.errors);
    }
  }, [formState.errors]);

  return {
    submitHandler,
    handleSubmit,
    register,
    getValues,
    getFormValidity,
    setEditFormValues,
    product,
    filter,
    errors: formState.errors,
    isValid: formState.isValid,
    formState,
    isLoading: dialog.waiting,
  };
};
