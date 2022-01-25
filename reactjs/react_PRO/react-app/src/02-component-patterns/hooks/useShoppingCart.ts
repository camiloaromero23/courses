import { useState } from 'react';
import { Product } from '../interfaces/interfaces';

interface ProductInCart extends Product {
  count: number;
}

export const useShoppingCart = () => {
  const [shoppingCart, setShoppingCart] = useState<{
    [key: string]: ProductInCart;
  }>({});

  const onProductCountChange = ({
    count,
    product,
  }: {
    count: number;
    product: Product;
  }) => {
    setShoppingCart((prev) => {
      if (count === 0) {
        const { [product.id]: _, ...rest } = prev;
        return rest;
      }

      return {
        ...prev,
        [product.id]: { ...product, count },
      };
    });
  };

  return { shoppingCart, onProductCountChange };
};
