import ProductList from './ProductList';

const Product = ({ productItems, addOrderItem }: any) => {
  return (
    <ProductList productItems={productItems} addOrderItem={addOrderItem} />
  );
};

export default Product;
