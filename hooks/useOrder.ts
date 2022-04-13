import produce from 'immer';
import { useCallback, useState } from 'react';
import OrderItemInterface from '../interfaces/OrderItem';

const useOrder = (): [
        OrderItemInterface[], 
        (newOrder: OrderItemInterface) => () => void, 
        (id: number) => () => void, 
        (id: number) => () => void, 
        (id: number) => () => void
    ] => {
    const [orderItems, setOrderItems] = useState<OrderItemInterface[]>([]);
      const addOrderItem = useCallback(
        (newOrder: OrderItemInterface) => () => {
          const orderItem = orderItems.find((order) => order.id === newOrder.id);
          if (orderItem) {
            setOrderItems(
              produce((draft) => {
                const order: any = draft.find((order) => order.id === orderItem.id);
                order.count++;
              })
            );
            return;
          }
          setOrderItems((prev: OrderItemInterface[]) => [...prev, newOrder]);
        },
        [orderItems]
      );
      const clearOrderItem = useCallback(
        (id: number) => () => {
          setOrderItems((prev) => prev.filter((order) => order.id !== id));
        },
        []
      );
      const increaseOrderItemCount = useCallback(
        (id: number) => () => {
          setOrderItems(
            produce((draft) => {
              const order: any = draft.find((order) => order.id === id);
              order.count++;
            })
          );
        },
        []
      );
      const decreaseOrderItemCount = useCallback(
        (id: number) => () => {
          setOrderItems(
            produce((draft) => {
              const order: any = draft.find((order) => order.id === id);
              if (order.count > 1) order.count--;
            })
          );
        },
        []
      );
    return [orderItems, addOrderItem, clearOrderItem, increaseOrderItemCount, decreaseOrderItemCount]
}

export default useOrder

