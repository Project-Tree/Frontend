import ShoppingCartRoundedIcon from '@mui/icons-material/ShoppingCartRounded';
import { FC } from 'react';
import ProductForm from '../Product/ProductForm';
import useModal from '../../hooks/useModal';
import style from './OrderHeader.module.css';
import ProductFormInterface from '../../interfaces/ProductForm';

interface Props {
  uploadAndAddProductItem: (productForm: ProductFormInterface) => Promise<void>;
}

const OrderHeader: FC<Props> = ({ uploadAndAddProductItem }) => {
  const [modalOpen, openModal, closeModal] = useModal();

  return (
    <>
      <div className={style.template}>
        <ShoppingCartRoundedIcon
          sx={{
            fontSize: '35px',
            gridColumn: '2 / 3',
            gridRow: '2 / 3',
          }}
        />
        <button className={style.addProductButton} onClick={openModal}>
          상품 추가
        </button>
      </div>
      <ProductForm
        isOpen={modalOpen}
        close={closeModal}
        uploadAndAddProductItem={uploadAndAddProductItem}
      ></ProductForm>
    </>
  );
};

export default OrderHeader;
