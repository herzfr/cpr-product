import { currencyPipe, getStockPriority, toTitleCase } from '@/utils/helpers';
import { useDetail } from '../hook/product/useDetail';
import { ArrowLeft, Edit, Star } from 'lucide-react';

export default function Detail() {
  const { product, displayImg, setDisplayImg, back } = useDetail();

  if (!product) return null;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-ait-neutral-50 rounded-lg">
        <h3 className="text-ait-h3-semibold text-ait-neutral-900">
          Detail Product
        </h3>
        <button
          onClick={back}
          className="inline-flex items-center justify-center gap-2 whitespace-nowrap font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-40 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border border-primary-500 bg-white text-primary-500 hover:bg-primary-50 active:bg-primary-100 h-10 px-4 text-sm rounded-lg"
        >
          <ArrowLeft />
          Kembali
        </button>
      </div>

      <div className="bg-white rounded-xl border border-ait-neutral-200 shadow-sm overflow-hidden">
        <div className="flex">
          <div className="flex flex-5 flex-row p-2 gap-2">
            <div className="flex-8">
              <img src={displayImg} alt="" />
            </div>

            <div className="flex-2 gap-1 flex flex-col">
              {product.images.map((img, index) => {
                const isActive = img === displayImg;
                return (
                  <div
                    onClick={() => setDisplayImg(img)}
                    key={index}
                    className={`
                                cursor-pointer flex items-center gap-3 p-3
                                border bg-white transition-all
                                ${
                                  isActive
                                    ? 'border-ait-neutral-900 rounded-[10%]'
                                    : 'border-ait-neutral-200 rounded-lg hover:shadow-sm'
                                }
                              `}
                  >
                    <img src={img} alt={`img_${index}`} />
                  </div>
                );
              })}
            </div>
          </div>
          <div className="flex flex-5 flex-col p-2 gap-2">
            <div className="bg-ait-neutral-50 p-6 rounded-lg flex flex-col gap-4">
              <div>
                <p className="text-ait-body-lg-semibold text-ait-neutral-700">
                  {product?.title}
                </p>
                <p className="text-ait-caption-md-regular text-ait-neutral-500 mt-2">
                  {product?.description}
                </p>
              </div>

              <div className="flex flex-col gap-2">
                <div className="flex flex-row gap-2 font-medium text-xs">
                  <span className="flex items-center justify-center text-center">
                    Brand:
                  </span>
                  <div className="items-center gap-2 bg-info-50 text-info-600 border border-info-50 rounded-md px-1.5 py-0.5">
                    <span>{product.brand}</span>
                  </div>
                </div>

                <div className="flex flex-row gap-2 font-medium text-xs">
                  <span className="flex items-center justify-center text-center">
                    Category:
                  </span>
                  <div className="items-center gap-2 px-1.5 py-0.5 font-normal">
                    <span>{toTitleCase(product.category)}</span>
                  </div>
                </div>

                <div className="flex flex-row gap-2 font-medium text-xs">
                  <span className="flex items-center justify-center text-center">
                    Stock:
                  </span>
                  <div
                    className={`items-center gap-2 px-1.5 py-0.5 font-normal ${getStockPriority(product.stock)}`}
                  >
                    <span>{product.stock}</span>
                  </div>
                </div>

                <div className="flex flex-row gap-2 font-medium text-xs">
                  <span className="flex items-center justify-center text-center">
                    Weight:
                  </span>
                  <div className="items-center gap-2 px-1.5 py-0.5 font-normal">
                    <span>{product.weight}gr</span>
                  </div>
                </div>

                <div className="flex flex-row gap-2 font-medium text-xs">
                  <span className="flex items-center justify-center text-center">
                    Dimension:
                  </span>
                  <div className="items-center gap-2 px-1.5 py-0.5 font-normal flex">
                    <span>Depth: {product.dimensions.depth}</span>
                    <span>Width: {product.dimensions.width}</span>
                    <span>Height: {product.dimensions.height}</span>
                  </div>
                </div>

                <div className="flex flex-row gap-2 font-medium text-xs">
                  <span className="flex items-center justify-center text-center">
                    SKU:
                  </span>
                  <div className="items-center gap-2 px-1.5 py-0.5 font-normal">
                    <span>{product.sku}</span>
                  </div>
                </div>

                <div className="flex flex-row gap-2 font-medium text-xs">
                  <span className="flex items-center justify-center text-center">
                    Warranty:
                  </span>
                  <div className="items-center gap-2 px-1.5 py-0.5 font-normal">
                    <span>{product.warrantyInformation}</span>
                  </div>
                </div>

                <div className="flex flex-row gap-2 font-medium text-xs">
                  <span className="flex items-center justify-center text-center">
                    Shipping:
                  </span>
                  <div className="items-center gap-2 px-1.5 py-0.5 font-normal">
                    <span>{product.shippingInformation}</span>
                  </div>
                </div>

                <div className="flex flex-row gap-2 font-medium text-xs">
                  <span className="flex items-center justify-center text-center">
                    Minimum Order:
                  </span>
                  <div className="items-center gap-2 px-1.5 py-0.5 font-normal">
                    <span>{product.minimumOrderQuantity}</span>
                  </div>
                </div>

                <div className="flex flex-row gap-2 font-medium text-xs">
                  <span className="flex items-center justify-center text-center">
                    Discount:
                  </span>
                  <div className="items-center gap-2 px-1.5 py-0.5 font-normal">
                    <span>{product.discountPercentage}%</span>
                  </div>
                </div>

                <div className="flex flex-row gap-2 font-medium text-xs">
                  <span className="flex items-center justify-center text-center">
                    Rating:
                  </span>
                  <div className="items-center gap-2 px-1.5 py-0.5 font-normal">
                    <span className="flex gap-2">
                      <Star className="text-yellow-500" size={16} />
                      {product.rating}
                    </span>
                  </div>
                </div>

                <div className="flex flex-row gap-2 font-medium text-xs">
                  <span className="flex items-center justify-center text-center">
                    Return Policy:
                  </span>
                  <div className="items-center gap-2 px-1.5 py-0.5 font-normal">
                    <span>{product.returnPolicy}</span>
                  </div>
                </div>

                <div className="flex flex-row gap-2 font-medium text-xs">
                  <span className="flex items-start justify-center text-center">
                    Meta:
                  </span>
                  <div className="flex flex-col items-center gap-2 px-1.5 py-0.5 font-normal">
                    <span>{product.meta.barcode}</span>
                    <div>
                      <img
                        src={product.meta.qrCode}
                        alt={product.meta.barcode}
                      />
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-ait-h3-bold text-ait-primary-500">
                    {currencyPipe(product.price, 'en-US', 'USD')}
                  </span>
                  <button className="flex gap-2 bg-ait-primary-500 text-ait-white px-6 py-2 rounded-lg text-ait-body-md-bold hover:bg-ait-primary-400 transition-colors">
                    <Edit />
                    Update
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // return (
  //   <div>
  //     <h1>Product Detail</h1>
  //     {product &&
  //     <div>

  //     </div>
  //     }
  //   </div>
  // );
}
