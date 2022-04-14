import { useCallback, useState, useRef } from 'react';
import ProductFormInterface from '../interfaces/ProductForm';
import ProductItemInterface from '../interfaces/ProductItem';
import useIPFS from './useIPFS';

const useProduct = (): [
        ProductItemInterface[], 
        (productForm: ProductFormInterface) => Promise<void>
    ] => {
    const [ipfs] = useIPFS()
    const nextProductID = useRef<number>(2);
    const [productItems, setProductItems] = useState<ProductItemInterface[]>([
      {
        id: 1,
        img: '/img/chicken.png',
        name: '콘소메이징',
        price: 100,
        description: '',
      },
    ]);
    const uploadAndAddProductItem = async (productForm: ProductFormInterface) => {
        const created = ipfs.addAll([
          {
            path: "thumbnail", 
            content: productForm.imgData
          }, {
            path: "body", 
            content: JSON.stringify({
              name: productForm.name, 
              price: productForm.price, 
              description: productForm.description
            })
          }
        ]);

        const newProduct: ProductItemInterface = {
          id: nextProductID.current++,
          img: productForm.imgURL,
          name: productForm.name, 
          price: productForm.price, 
          description: productForm.description
        }
        setProductItems((prev) => [...prev, newProduct]);
        
        let imgURL = ""
        for await(let v of created) {
          if (v.path === "thumbnail") {
            imgURL = `https://${v.cid.toV1().toString()}.ipfs.infura-ipfs.io`
            console.log(imgURL)
          }
        }
      }
    return [productItems, uploadAndAddProductItem]
}

export default useProduct

