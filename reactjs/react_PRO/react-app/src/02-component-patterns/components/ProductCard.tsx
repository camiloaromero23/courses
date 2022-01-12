import { createContext } from 'react';

import { useProduct } from '../hooks/useProduct';
import {
  ProductContextProps,
  ProductCardProps,
} from '../interfaces/interfaces';
import styles from '../styles/styles.module.css';

export const ProductContext = createContext({} as ProductContextProps);
const { Provider } = ProductContext;

export const ProductCard = ({ product, children }: ProductCardProps) => {
  const { counter, increaseBy } = useProduct();

  return (
    <div className={styles.productCard}>
      <Provider value={{ counter, increaseBy, product }}>
        {children}
        {/* <ProductImage img={product.img} /> */}
        {/* <ProductTitle title={product.title} /> */}
        {/* <ProductButtons counter={counter} increaseBy={increaseBy} /> */}
      </Provider>
    </div>
  );
};
