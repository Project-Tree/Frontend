import { Contract, providers } from 'ethers';
import { FC, useMemo } from 'react';
import useModal from '../../hooks/useModal';
import OrderItemInterface from '../../interfaces/OrderItem';
import PaymentModal from '../Payment/PaymentModal';
import style from './OrderFooter.module.css';

interface Props {
  orderItems: OrderItemInterface[];
  account: string;
  provider: providers.Web3Provider;
  treContract: Contract;
}

const OrderFooter: FC<Props> = ({
  orderItems,
  account,
  provider,
  treContract,
}) => {
  const [madalOpen, openModal, closeModal] = useModal();

  const getTotalPrice = useMemo<number>(
    () => orderItems.reduce((total, cur) => total + cur.price * cur.count, 0),
    [orderItems]
  );

  return (
    <>
      <div className={style.container} onClick={openModal}>
        <div>{getTotalPrice} TRE</div>
        <div>결제하기</div>
      </div>
      <PaymentModal
        isOpen={madalOpen}
        close={closeModal}
        account={account}
        totalPrice={getTotalPrice}
      ></PaymentModal>
    </>
  );
};

export default OrderFooter;
