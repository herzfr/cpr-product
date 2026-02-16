import { useEffect, useState } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { useProductDetail } from './useFetchProduct';
import { useProductStore } from '../../store/product/product.store';

export const useDetail = () => {
  const navigate = useNavigate();
  const { id: pathId } = useParams();
  const [searchParams] = useSearchParams();

  const [productId, setProductId] = useState<string>('');
  const { product } = useProductDetail(Number(productId));
  const queryId = searchParams.get('id');
  const id = pathId ?? queryId;

  const [displayImg, setDisplayImg] = useState<string>(
    'https://dummyimage.com/600x600/d4d4d4/fff&text=No+Image',
  );
  const productStore = useProductStore();

  useEffect(() => {
    if (id == null) {
      navigate('/', { replace: true });
    } else {
      setProductId(id);
    }
  }, [id, navigate]);

  useEffect(() => {
    if (product?.images?.length) {
      setDisplayImg(product.images[0]);
    } else {
      setDisplayImg('https://dummyimage.com/600x600/d4d4d4/fff&text=No+Image');
    }
  }, [product]);

  const back = () => {
    navigate('/', { replace: true });
  };

  const updateProduct = () => {
    if (product)
      productStore.dispatch({ type: 'UPDATE_PRODUCT', payload: product });
  };

  return {
    product,
    displayImg,
    productStore,
    setDisplayImg,
    updateProduct,
    back,
  };
};
