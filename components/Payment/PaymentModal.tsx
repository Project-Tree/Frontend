import ClearRoundedIcon from "@mui/icons-material/ClearRounded";
import style from "./PaymentModal.module.css";
import QRCode from "react-qr-code";
import { FC } from "react";
import { Contract } from "ethers/lib/index";

interface Props {
  isOpen: boolean;
  close: () => void;
  account: string;
  totalPrice: number;
  treContract: Contract;
}

const PaymentModal: FC<Props> = ({
  isOpen,
  close,
  account,
  totalPrice,
  treContract,
}) => {
  const createQRCode = (to: string, value: number) => (
    <QRCode
      size={150}
      value={`ethereum:${treContract.address}@3/transfer?address=${account}&uint256=${totalPrice}`}
    ></QRCode>
  );

  if (!isOpen) return null;

  return (
    <div className={isOpen ? "openModal modal" : "modal"}>
      <div className={style.container}>
        <div className={style.closeIcon}>
          <ClearRoundedIcon onClick={close} />
        </div>
        {createQRCode(account, totalPrice)}
        <div className={style.account}>주소: {account}</div>
        <div className={style.storeName}> 가게 이름: 푸라닭</div>
        <div className={style.totalPrice}>결재 금액: {totalPrice} TRE</div>
      </div>
    </div>
  );
};

export default PaymentModal;
