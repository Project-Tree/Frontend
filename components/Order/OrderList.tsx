import { FC } from 'react';
import OrderItemInterface from '../../interfaces/OrderItem';
import OrderItem from './OrderItem';
import style from './OrderList.module.css';

interface Props {
  orderItems: OrderItemInterface[];
  clearOrderItem: (id: number) => () => void;
  increaseOrderItemCount: (id: number) => () => void;
  decreaseOrderItemCount: (id: number) => () => void;
}

const OrderList: FC<Props> = ({
  orderItems,
  clearOrderItem,
  increaseOrderItemCount,
  decreaseOrderItemCount,
}) => {
  return (
    <div className={style.container}>
      {orderItems.map((order: OrderItemInterface) => (
        <OrderItem
          key={order.id}
          order={order}
          clearOrder={clearOrderItem(order.id)}
          increaseCount={increaseOrderItemCount(order.id)}
          decreaseCount={decreaseOrderItemCount(order.id)}
        ></OrderItem>
      ))}
    </div>
  );
};

export default OrderList;
