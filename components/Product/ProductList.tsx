import ProductItemInterface from '../../interfaces/ProductItem';
import ProductItem from './ProductItem';
import style from './ProductList.module.css';

const ProductList = ({ productItems, addOrderItem }: any) => {
  return (
    <div className={style.container}>
      {productItems.map((product: ProductItemInterface) => (
        <ProductItem
          key={product.id}
          product={product}
          addOrderItem={addOrderItem}
        ></ProductItem>
      ))}
    </div>
  );
};

export default ProductList;
