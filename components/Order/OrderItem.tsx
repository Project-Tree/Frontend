import OrderItemInterface from '../../interfaces/OrderItem';
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';
import ExpandLessRoundedIcon from '@mui/icons-material/ExpandLessRounded';
import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMoreRounded';
import style from './OrderItem.module.css';
import { FC } from 'react';

interface Props {
  order: OrderItemInterface;
  clearOrder: () => void;
  increaseCount: () => void;
  decreaseCount: () => void;
}

const OrderItem: FC<Props> = ({
  order,
  clearOrder,
  increaseCount,
  decreaseCount,
}) => {
  return (
    <div className={style.container}>
      <div className={style.name}>{order.name}</div>
      <div className={style.countContainer}>
        <div className={style.count}>x{order.count}</div>
        <ExpandLessRoundedIcon
          className={style.countUpIcon}
          onClick={increaseCount}
        />
        <ExpandMoreRoundedIcon
          className={style.countDownIcon}
          onClick={decreaseCount}
        />
      </div>
      <div className={style.totalPrice}>{order.price * order.count}TRE</div>
      <ClearRoundedIcon className={style.clearIcon} onClick={clearOrder} />
    </div>
  );
};

export default OrderItem;
