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

  const [displayImg, setDisplayImg] = useState<string>('');
  const productStore = useProductStore();

  useEffect(() => {
    if (id == null) {
      navigate('/', { replace: true });
    } else {
      setProductId(id);
    }
  }, [id, navigate]);

  useEffect(() => {
    setDisplayImg(product?.images[0] ?? '');
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
