import { Button } from '@/components/ui/Button';
import { useProductForm } from '../hook/product/useProductForm';

const ProductForm = () => {
  const { errors, register, handleSubmit } = useProductForm();

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-ait-body-md-bold text-ait-neutral-900">
              Title
            </label>
            <input
              type="text"
              placeholder="Enter name"
              {...register('title')}
              className="w-full px-4 py-2.5 rounded-lg border border-ait-neutral-300 text-ait-body-md-regular placeholder:text-ait-neutral-500 focus:outline-none focus:ring-2 focus:ring-ait-primary-500 focus:border-transparent"
            />
          </div>
          <div className="space-y-2">
            <label className="text-ait-body-md-bold text-ait-neutral-900">
              Description
            </label>
            <input
              type="text"
              placeholder="Enter description"
              {...register('description')}
              className="w-full px-4 py-2.5 rounded-lg border border-ait-neutral-300 text-ait-body-md-regular placeholder:text-ait-neutral-500 focus:outline-none focus:ring-2 focus:ring-ait-primary-500 focus:border-transparent"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-ait-body-md-bold text-ait-neutral-900">
                Price
                <span className="text-ait-danger-500 ml-1">*</span>
              </label>
              <input
                type="text"
                placeholder="Enter price"
                {...register('price')}
                className="w-full px-4 py-2.5 rounded-lg border border-ait-neutral-300 text-ait-body-md-regular placeholder:text-ait-neutral-500 focus:outline-none focus:ring-2 focus:ring-ait-primary-500 focus:border-transparent"
              />
              {errors.price && (
                <p className="text-ait-caption-md-regular text-ait-neutral-500">
                  {errors.price.message}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <label className="text-ait-body-md-bold text-ait-neutral-900">
                Discount
                <span className="text-ait-danger-500 ml-1">*</span>
              </label>
              <input
                type="number"
                placeholder="Enter Discount"
                {...register('discountPercentage')}
                className="w-full px-4 py-2.5 rounded-lg border border-ait-neutral-300 text-ait-body-md-regular placeholder:text-ait-neutral-500 focus:outline-none focus:ring-2 focus:ring-ait-primary-500 focus:border-transparent"
              />
              {errors.discountPercentage && (
                <p className="text-ait-caption-md-regular text-ait-neutral-500">
                  {errors.discountPercentage.message}
                </p>
              )}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-ait-body-md-bold text-ait-neutral-900">
                Rating
                <span className="text-ait-danger-500 ml-1">*</span>
              </label>
              <input
                type="number"
                placeholder="Enter Rating"
                {...register('rating')}
                className="w-full px-4 py-2.5 rounded-lg border border-ait-neutral-300 text-ait-body-md-regular placeholder:text-ait-neutral-500 focus:outline-none focus:ring-2 focus:ring-ait-primary-500 focus:border-transparent"
              />
              {errors.rating && (
                <p className="text-ait-caption-md-regular text-ait-neutral-500">
                  {errors.rating.message}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <label className="text-ait-body-md-bold text-ait-neutral-900">
                Stock
                <span className="text-ait-danger-500 ml-1">*</span>
              </label>
              <input
                type="number"
                placeholder="Enter Stock"
                {...register('stock')}
                className="w-full px-4 py-2.5 rounded-lg border border-ait-neutral-300 text-ait-body-md-regular placeholder:text-ait-neutral-500 focus:outline-none focus:ring-2 focus:ring-ait-primary-500 focus:border-transparent"
              />
              {errors.stock && (
                <p className="text-ait-caption-md-regular text-ait-neutral-500">
                  {errors.stock.message}
                </p>
              )}
            </div>
          </div>
        </div>
        <Button
          type="submit"
          variant="text"
          size="sm"
          isIconOnly
          aria-label="Submit"
        >
          Submit
        </Button>
      </form>
    </>
  );
};

export default ProductForm;
