import { useForm } from 'react-hook-form';
import { productSchema, type ProductFormProps } from '../../types/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCallback, useEffect, useState } from 'react';
import type {
  CreateProductPayload,
  Product,
  UpdateProductPayload,
} from '../../types';
import {
  useProductMutation,
  type ProductMutationPayload,
} from '../useProductMutation';
import type { Filter } from '@/types/general';

export const useProductForm = () => {
  const [product, setProduct] = useState<Product>();
  const [filter, setFilter] = useState<Filter<Product>>({
    limit: 10,
  });
  const { mutate } = useProductMutation(filter);
  const {
    register,
    getValues,
    reset,
    formState: { errors, isValid },
  } = useForm<ProductFormProps>({
    resolver: zodResolver(productSchema),
    defaultValues: product ?? {
      id: null,
      title: '',
      description: '',
      price: 0,
      discountPercentage: 0,
      rating: 0,
      stock: 0,
      brand: '',
      category: '',
    },
  });

  //   const clearForm = useCallback(() => {
  //     reset({
  //       id: null,
  //       title: '',
  //       description: '',
  //       price: 0,
  //       discountPercentage: 0,
  //       rating: 0,
  //       stock: 0,
  //       brand: '',
  //     });
  //   }, [reset]);

  // Update form values once product data is available
  const setEditFormValues = useCallback(() => {
    if (!product) {
      console.log('No product available');
      return;
    }

    console.log('Resetting form with:', product);
    reset({
      id: product.id ?? null,
      title: product.title ?? '',
      description: product.description ?? '',
      price: product.price ?? 0,
      discountPercentage: product.discountPercentage ?? 0,
      rating: product.rating ?? 0,
      stock: product.stock ?? 0,
      brand: product.brand ?? '',
      category: product.category ?? '',
    });
  }, [product, reset]);

  useEffect(() => {
    if (product) {
      setEditFormValues(); // Only reset when product is available
    }
  }, [product, setEditFormValues]);

  const getFormValidity = () => {
    const values = getValues();
    const errorKeys = Object.keys(errors);

    const fieldsStatus = Object.keys(values).map((key) => ({
      name: key,
      valid: !errorKeys.includes(key),
    }));

    return { fieldsStatus, isValid };
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = getValues();
    submitHandler(formData);
  };

  const submitHandler = (data: ProductFormProps) => {
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
              id: Number(data.id),
              data: {
                ...data,
                price: Number(data.price),
                discountPercentage: Number(data.discountPercentage),
                rating: Number(data.rating),
                stock: Number(data.stock),
                createdAt: undefined,
                updatedAt: undefined,
              },
            } as UpdateProductPayload,
          };

    mutate(payload, {
      onSuccess: () => {
        console.log('Horeee');
      },
      onError: (error) => {
        console.error('Gagal: ', error);
      },
    });
  };

  return {
    submitHandler,
    handleSubmit,
    register,
    getValues,
    getFormValidity,
    setFilter,
    setProduct,
    setEditFormValues,
    product,
    filter,
    errors,
  };
};
