import { z } from 'zod';

export const productSchema = z.object({
  id: z.number().nullable(),
  title: z.string().min(1, 'Title wajib diisi'),
  description: z.string().min(1, 'Description wajib diisi'),
  price: z
    .number()
    .min(0, 'Price harus lebih besar atau sama dengan 0')
    .refine((val) => Number.isFinite(val), {
      message: 'Price tidak boleh kosong',
    }),
  discountPercentage: z
    .number()
    .min(0, 'Discount Percentage harus lebih besar atau sama dengan 0')
    .max(100, 'Discount Percentage harus kurang atau sama dengan 100')
    .refine((val) => Number.isFinite(val), {
      message: 'Discount Percentage tidak boleh kosong',
    }),
  rating: z
    .number()
    .min(0, 'Rating harus lebih besar atau sama dengan 0')
    .max(5, 'Rating harus kurang atau sama dengan 5')
    .refine((val) => Number.isFinite(val), {
      message: 'Rating tidak boleh kosong',
    }),
  stock: z
    .number()
    .min(0, 'Stock harus lebih besar atau sama dengan 0')
    .refine((val) => Number.isFinite(val), {
      message: 'Stock tidak boleh kosong',
    }),
  brand: z.string().min(1, 'Brand wajib diisi'),
  category: z.string().min(1, 'Category wajib diisi'),
});

export type ProductFormProps = z.infer<typeof productSchema>;
