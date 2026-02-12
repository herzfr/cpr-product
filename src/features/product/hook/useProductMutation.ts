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
import type { Filter } from '@/types/general';

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
  // <-- Kita tambah params di sini
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: productMutationFn,

    // 1. SEBELUM server menjawab (onMutate)
    onMutate: async (payload: ProductMutationPayload) => {
      // Hentikan proses refresh data lain supaya tidak bentrok
      await queryClient.cancelQueries({ queryKey: productKeys.list(params) });

      // Ambil "Foto" data saat ini sebagai cadangan (Backup)
      const previousProducts = queryClient.getQueryData<Product[]>(
        productKeys.list(params),
      );

      // LANGSUNG ubah tampilan di layar (Optimistic Update)
      if (previousProducts) {
        queryClient.setQueryData<Product[]>(productKeys.list(params), (old) => {
          if (!old) return [];

          if (payload.type === 'delete') {
            return old.filter((p) => p.id !== payload.data.id);
          }
          // ... logic untuk update & create sama seperti sebelumnya
          return old;
        });
      }

      // Kirim "Foto" cadangan ke context agar bisa dipakai kalau Error
      return { previousProducts };
    },

    // 2. KALAU GAGAL (onError)
    onError: (_err, _payload, context) => {
      // Ambil foto cadangan tadi, balikin ke layar
      if (context?.previousProducts) {
        queryClient.setQueryData(
          productKeys.list(params),
          context.previousProducts,
        );
      }
    },

    // 3. SETELAH SELESAI, sukses maupun gagal (onSettled)
    onSettled: () => {
      // Tarik data paling baru dari server buat memastikan
      queryClient.invalidateQueries({ queryKey: productKeys.list(params) });
    },
  });
};
