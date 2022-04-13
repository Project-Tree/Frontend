import Header from '../components/Product/Header';
import style from './store.module.css';
import Product from '../components/Product/Product';
import Order from '../components/Order/Order';
import { NextPage } from 'next';
import useOrder from '../hooks/useOrder';
import useProduct from '../hooks/useProduct';
// import useIPFS from '../hooks/useIPFS';

const Store: NextPage = () => {
  const [productItems, uploadAndAddProductItem] = useProduct();
  const [
    orderItems,
    addOrderItem,
    clearOrderItem,
    increaseOrderItemCount,
    decreaseOrderItemCount,
  ] = useOrder();

  return (
    <div className={style.container}>
      <Header />
      <div className={style.body}>
        <Product productItems={productItems} addOrderItem={addOrderItem} />
        <Order
          orderItems={orderItems}
          uploadAndAddProductItem={uploadAndAddProductItem}
          clearOrderItem={clearOrderItem}
          increaseOrderItemCount={increaseOrderItemCount}
          decreaseOrderItemCount={decreaseOrderItemCount}
        />
      </div>
    </div>
  );
};

export default Store;
