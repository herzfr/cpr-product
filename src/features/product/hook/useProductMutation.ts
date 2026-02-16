import { useMutation, useQueryClient } from '@tanstack/react-query';
import type {
  CreateProductPayload,
  Product,
  UpdateProductPayload,
} from '../types';
import { productKeys } from './useQuery';
import {
  createProduct,
  deleteProduct,
  updateProduct,
} from '../service/product.service';
import type { ApiResponse, Filter } from '@/types/general';
import { generateOptimisticProduct } from '../helpers/product.helper';

export type ProductMutationType = 'create' | 'update' | 'delete';
export type ProductMutationPayload =
  | { type: 'create'; data: CreateProductPayload }
  | { type: 'update'; data: UpdateProductPayload }
  | { type: 'delete'; data: { id: number } };

export const productMutationFn = async (payload: ProductMutationPayload) => {
  switch (payload.type) {
    case 'create':
      return createProduct(payload.data);
    case 'update':
      return updateProduct(payload.data);
    case 'delete':
      return deleteProduct(payload.data.id);
    default:
      throw new Error('Invalid mutation');
  }
};

export const useProductMutation = (params: Filter<Product>) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: productMutationFn,
    onMutate: async (payload: ProductMutationPayload) => {
      await queryClient.cancelQueries({ queryKey: productKeys.list(params) });

      const previousProducts = queryClient.getQueryData<
        ApiResponse<'products', Product[]>
      >(productKeys.list(params));

      if (previousProducts) {
        queryClient.setQueryData<ApiResponse<'products', Product[]>>(
          productKeys.list(params),
          (old) => {
            if (!old) return old;

            switch (payload.type) {
              case 'create':
                return {
                  ...old,
                  products: [
                    generateOptimisticProduct(payload.data),
                    ...old.products,
                  ],
                  total: old.total + 1,
                };
              case 'update':
                return {
                  ...old,
                  products: old.products.map((p) =>
                    p.id === payload.data.id
                      ? { ...p, ...payload.data.data }
                      : p,
                  ),
                };
              case 'delete':
                return {
                  ...old,
                  products: old.products.filter(
                    (p) => p.id !== payload.data.id,
                  ),
                  total: old.total - 1,
                };
              default:
                return old;
            }
          },
        );
      }

      return { previousProducts };
    },

    onError: (_err, _payload, context) => {
      if (context?.previousProducts) {
        queryClient.setQueryData(
          productKeys.list(params),
          context.previousProducts,
        );
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: productKeys.list(params) });
    },
  });
};
