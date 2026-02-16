import type { CreateProductPayload, Product } from '../types';

export function generateOptimisticProduct(payload: CreateProductPayload) {
  const optimisticProduct: Product = {
    id: Date.now(),
    title: payload.title ?? '',
    description: payload.description ?? '',
    category: payload.category ?? '',
    price: payload.price ?? 0,
    discountPercentage: payload.discountPercentage ?? 0,
    rating: 0,
    stock: 0,
    tags: [],
    brand: '',
    sku: '',
    weight: 0,
    dimensions: { width: 0, height: 0, depth: 0 },
    warrantyInformation: '',
    shippingInformation: '',
    availabilityStatus: '',
    reviews: [],
    returnPolicy: '',
    minimumOrderQuantity: 1,
    images: [],
    thumbnail: '',
    meta: { createdAt: '', updatedAt: '', barcode: '', qrCode: '' },
  };
  return optimisticProduct;
}
