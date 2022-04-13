import OrderItemInterface from '../../interfaces/OrderItem';
import style from './Order.module.css';
import OrderFooter from './OrderFooter';
import OrderHeader from './OrderHeader';
import OrderList from './OrderList';
import { FC } from 'react';
import ProductFormInterface from '../../interfaces/ProductForm';
import useMetamask from '../../hooks/useMetamask';

interface Props {
  orderItems: OrderItemInterface[];
  uploadAndAddProductItem: (productForm: ProductFormInterface) => Promise<void>;
  clearOrderItem: (id: number) => () => void;
  increaseOrderItemCount: (id: number) => () => void;
  decreaseOrderItemCount: (id: number) => () => void;
}

const Order: FC<Props> = ({
  orderItems,
  uploadAndAddProductItem,
  clearOrderItem,
  increaseOrderItemCount,
  decreaseOrderItemCount,
}) => {
  const [provider, metamaskAccount, treContract] = useMetamask();

  return (
    <div className={style.container}>
      <OrderHeader uploadAndAddProductItem={uploadAndAddProductItem} />
      <OrderList
        orderItems={orderItems}
        clearOrderItem={clearOrderItem}
        increaseOrderItemCount={increaseOrderItemCount}
        decreaseOrderItemCount={decreaseOrderItemCount}
      />
      <OrderFooter
        orderItems={orderItems}
        account={metamaskAccount}
        provider={provider}
        treContract={treContract}
      />
    </div>
  );
};

export default Order;
