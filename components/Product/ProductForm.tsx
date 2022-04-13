import style from './ProductForm.module.css';
import ImageOutlined from '@mui/icons-material/ImageOutlined';
import ProductFormInterface from '../../interfaces/ProductForm';
import { FC, useEffect, useState, useRef } from 'react';
import useIPFS from '../../hooks/useIPFS';

interface Props {
  isOpen: boolean;
  close: () => void;
  uploadAndAddProductItem: (productForm: ProductFormInterface) => Promise<void>;
}

interface Errors {
  name?: string;
  price?: string;
}

const initialFormData: ProductFormInterface = {
  imgData: '',
  name: '',
  price: 0,
  description: '',
};

const ProductForm: FC<Props> = ({ isOpen, close, uploadAndAddProductItem }) => {
  const [submitTrigger, setSubmitTrigger] = useState<boolean>(false);
  const [ipfs] = useIPFS();

  const [formData, setFormData] =
    useState<ProductFormInterface>(initialFormData);
  const [previewImage, setPreviewImage] = useState<string>(null);
  const onChangeImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const img: File = e.target.files[0];
    setPreviewImage(URL.createObjectURL(img));

    const reader = new window.FileReader();
    reader.readAsArrayBuffer(img);
    reader.onloadend = async () => {
      setFormData((prev) => ({ ...prev, imgData: reader.result }));
    };

    e.target.value = '';
  };
  const onChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value;
    setFormData((prev) => ({ ...prev, name }));
  };
  const onChangePrice = (e: React.ChangeEvent<HTMLInputElement>) => {
    const price = parseFloat(e.target.value);
    setFormData((prev) => ({ ...prev, price }));
  };
  const onChangeDescription = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const description = e.target.value;
    setFormData((prev) => ({ ...prev, description }));
  };
  const onSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    validateFormData();
    setSubmitTrigger(!submitTrigger);
  };

  const [errors, setErrors] = useState<Errors>({});
  const validateFormData = () => {
    if (formData.name === '') {
      const err = 'Please enter product name';
      setErrors((prev) => ({ ...prev, name: err }));
    } else if (formData.name.length > 20) {
      const err = 'Name length cannot be less than 20';
      setErrors((prev) => ({ ...prev, name: err }));
    } else {
      setErrors((prev) => ({ ...prev, name: null }));
    }

    if (formData.price < 0) {
      const err = 'Price cannot be less than 0';
      setErrors((prev) => ({ ...prev, price: err }));
    } else if (formData.price > 1000000000000000) {
      const err = 'Price cannot be more than 100 billion';
      setErrors((prev) => ({ ...prev, price: err }));
    } else {
      setErrors((prev) => ({ ...prev, price: null }));
    }
  };

  const isInitialMount = useRef(true);
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }
    let err: keyof Errors;
    for (err in errors) {
      if (errors[err]) return;
    }
    uploadAndAddProductItem(formData);
    close();

    setFormData(initialFormData);
    setPreviewImage('');
  }, [submitTrigger]);

  const onClickCancel = () => {
    close();
    setErrors({});
    setFormData(initialFormData);
    setPreviewImage('');
  };

  if (!isOpen) return null;

  return (
    <div className={isOpen ? 'openModal modal' : 'modal'}>
      <div className={style.container}>
        <label className={style.inputImage} htmlFor="inputImage">
          {previewImage ? (
            <img src={previewImage} className={style.previewImage}></img>
          ) : (
            <ImageOutlined className={style.imageIcon} />
          )}
        </label>
        <input
          type="file"
          id="inputImage"
          style={{ display: 'none' }}
          onChange={onChangeImage}
        ></input>
        <form className={style.formContainer}>
          {errors['name'] ? (
            <label className={style.errorMessage} htmlFor="inputName">
              {errors['name']}
            </label>
          ) : null}
          <input
            className={style.inputName}
            id="inputName"
            placeholder="상품명"
            type="text"
            onChange={onChangeName}
          ></input>
          {errors['price'] ? (
            <label className={style.errorMessage} htmlFor="inputPrice">
              {errors['price']}
            </label>
          ) : null}
          <input
            className={style.inputPrice}
            id="inputPrice"
            placeholder="가격 (TRE)"
            onChange={onChangePrice}
            type="number"
          ></input>
          <textarea
            className={style.inputDescription}
            name="productDescription"
            placeholder="상품 설명"
            onChange={onChangeDescription}
          ></textarea>
          <div className={style.buttonList}>
            <button className={style.buttonCancel} onClick={onClickCancel}>
              취소
            </button>
            <button className={style.buttonAddProduct} onClick={onSubmit}>
              상품 추가
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductForm;