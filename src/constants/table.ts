import type { Product } from '@/features/product/types';
import type { ColumnDef } from '@tanstack/react-table';

export const columnsProductTable: ColumnDef<Product>[] = [
  { header: 'Thumbnail', accessorKey: 'thumbnail', id: 'thumbnail' },
  { header: 'Title', accessorKey: 'title', id: 'title' },
  { header: 'Brand', accessorKey: 'brand', id: 'brand' },
  { header: 'Category', accessorKey: 'category', id: 'category' },
  { header: 'Price', accessorKey: 'price', id: 'price' },
  { header: 'Stock', accessorKey: 'stock', id: 'stock' },
  { header: 'Actions', accessorKey: 'action', id: 'action' },
];
