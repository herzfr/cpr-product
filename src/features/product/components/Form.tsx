import { Button } from '@/components/ui/Button';
import { useProductForm } from '../hook/product/useProductForm';

export const ProductForm = () => {
  const { errors, isLoading, register, handleSubmit } = useProductForm();

  return (
    <form className="gap-2 flex flex-col" onSubmit={handleSubmit}>
      <div className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="title" className="text-ait-body-md-bold text-ait-neutral-900">
            Title
          </label>
          <input
            id="title"
            type="text"
            placeholder="Enter name"
            {...register('title')}
            className="w-full px-4 py-2.5 rounded-lg border border-ait-neutral-300 text-ait-body-md-regular placeholder:text-ait-neutral-500 focus:outline-none focus:ring-2 focus:ring-ait-primary-500 focus:border-transparent"
          />
          {errors.title && (
            <p className="text-ait-caption-md-regular text-ait-danger-500">
              {errors.title.message}
            </p>
          )}
        </div>
        <div className="space-y-2">
          <label htmlFor="description" className="text-ait-body-md-bold text-ait-neutral-900">
            Description
          </label>
          <input
            id="description"
            type="text"
            placeholder="Enter description"
            {...register('description')}
            className="w-full px-4 py-2.5 rounded-lg border border-ait-neutral-300 text-ait-body-md-regular placeholder:text-ait-neutral-500 focus:outline-none focus:ring-2 focus:ring-ait-primary-500 focus:border-transparent"
          />
          {errors.description && (
            <p className="text-ait-caption-md-regular text-ait-danger-500">
              {errors.description.message}
            </p>
          )}
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label htmlFor="brand" className="text-ait-body-md-bold text-ait-neutral-900">
              Brand
            </label>
            <input
              id="brand"
              type="text"
              placeholder="Enter brand"
              {...register('brand')}
              className="w-full px-4 py-2.5 rounded-lg border border-ait-neutral-300 text-ait-body-md-regular placeholder:text-ait-neutral-500 focus:outline-none focus:ring-2 focus:ring-ait-primary-500 focus:border-transparent"
            />
            {errors.brand && (
              <p className="text-ait-caption-md-regular text-ait-danger-500">
                {errors.brand.message}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <label htmlFor="category" className="text-ait-body-md-bold text-ait-neutral-900">
              Category
            </label>
            <input
              id="category"
              type="text"
              placeholder="Enter category"
              {...register('category')}
              className="w-full px-4 py-2.5 rounded-lg border border-ait-neutral-300 text-ait-body-md-regular placeholder:text-ait-neutral-500 focus:outline-none focus:ring-2 focus:ring-ait-primary-500 focus:border-transparent"
            />
            {errors.category && (
              <p className="text-ait-caption-md-regular text-ait-danger-500">
                {errors.category.message}
              </p>
            )}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label htmlFor="price" className="text-ait-body-md-bold text-ait-neutral-900">
              Price
              <span className="text-ait-danger-500 ml-1">*</span>
            </label>
            <input
              id="price"
              type="text"
              placeholder="Enter price"
              {...register('price', { valueAsNumber: true })}
              className="w-full px-4 py-2.5 rounded-lg border border-ait-neutral-300 text-ait-body-md-regular placeholder:text-ait-neutral-500 focus:outline-none focus:ring-2 focus:ring-ait-primary-500 focus:border-transparent"
            />
            {errors.price && (
              <p className="text-ait-caption-md-regular text-ait-danger-500">
                {errors.price.message}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <label htmlFor="discountPercentage" className="text-ait-body-md-bold text-ait-neutral-900">
              Discount
              <span className="text-ait-danger-500 ml-1">*</span>
            </label>
            <input
              id="discountPercentage"
              type="text"
              placeholder="Enter Discount"
              {...register('discountPercentage', { valueAsNumber: true })}
              className="w-full px-4 py-2.5 rounded-lg border border-ait-neutral-300 text-ait-body-md-regular placeholder:text-ait-neutral-500 focus:outline-none focus:ring-2 focus:ring-ait-primary-500 focus:border-transparent"
            />
            {errors.discountPercentage && (
              <p className="text-ait-caption-md-regular text-ait-danger-500">
                {errors.discountPercentage.message}
              </p>
            )}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label htmlFor="rating" className="text-ait-body-md-bold text-ait-neutral-900">
              Rating
              <span className="text-ait-danger-500 ml-1">*</span>
            </label>
            <input
              id="rating"
              type="text"
              placeholder="Enter Rating"
              {...register('rating', { valueAsNumber: true })}
              className="w-full px-4 py-2.5 rounded-lg border border-ait-neutral-300 text-ait-body-md-regular placeholder:text-ait-neutral-500 focus:outline-none focus:ring-2 focus:ring-ait-primary-500 focus:border-transparent"
            />
            {errors.rating && (
              <p className="text-ait-caption-md-regular text-ait-danger-500">
                {errors.rating.message}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <label htmlFor="stock" className="text-ait-body-md-bold text-ait-neutral-900">
              Stock
              <span className="text-ait-danger-500 ml-1">*</span>
            </label>
            <input
              id="stock"
              type="text"
              placeholder="Enter Stock"
              {...register('stock', { valueAsNumber: true })}
              className="w-full px-4 py-2.5 rounded-lg border border-ait-neutral-300 text-ait-body-md-regular placeholder:text-ait-neutral-500 focus:outline-none focus:ring-2 focus:ring-ait-primary-500 focus:border-transparent"
            />
            {errors.stock && (
              <p className="text-ait-caption-md-regular text-ait-danger-500">
                {errors.stock.message}
              </p>
            )}
          </div>
        </div>
      </div>
      <div className="gap-2 flex flex-row justify-end">
        <Button
          disabled={isLoading}
          type="submit"
          variant="primary"
          size="lg"
          className="min-w-25"
          isIconOnly
          aria-label="Submit"
        >
          {isLoading ? 'Loading...' : 'Submit'}
        </Button>
      </div>
    </form>
  );
};
