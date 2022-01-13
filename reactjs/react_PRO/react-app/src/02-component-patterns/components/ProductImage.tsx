import styles from '../styles/styles.module.css';
import { useContext } from 'react';
import { ProductContext } from './ProductCard';

import noImg from '../assets/no-image.jpg';

export interface Props {
  img?: string;
  className?: string;
  style?: React.CSSProperties;
}

export const ProductImage = ({ img = '', className, style }: Props) => {
  const { product } = useContext(ProductContext);
  let imgToShow: string;

  if (img) {
    imgToShow = img;
  } else if (product.img) {
    imgToShow = product.img;
  } else {
    imgToShow = noImg;
  }

  return (
    <img
      className={`${styles.productImg} ${className}`}
      src={imgToShow}
      alt="Product"
      style={style}
    />
  );
};
