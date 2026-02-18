import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useProductDetail } from './useFetchProduct';
import { useProductStore } from '../../store/product/product.store';

export const useDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [productId, setProductId] = useState<string>('');
  const { product, isLoading, error } = useProductDetail(Number(productId));

  const [displayImg, setDisplayImg] = useState<string>(
    'https://dummyimage.com/600x600/d4d4d4/fff&text=No+Image',
  );
  const productStore = useProductStore();

  useEffect(() => {
    if (id) {
      setProductId(id);
    } else {
      navigate('/product', { replace: true });
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
    navigate('/product', { replace: true });
  };

  const updateProduct = () => {
    if (product)
      productStore.dispatch({ type: 'UPDATE_PRODUCT', payload: product });
  };

  const isInvalidId = isNaN(Number(id));

  return {
    product,
    isLoading,
    error,
    isInvalidId,
    displayImg,
    productStore,
    setDisplayImg,
    updateProduct,
    back,
  };
};
