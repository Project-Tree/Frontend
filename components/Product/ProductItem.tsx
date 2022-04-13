import style from "./ProductItem.module.css"
import OrderItemInterface from '../../interfaces/OrderItem';
import ProductItemInterface from '../../interfaces/ProductItem';
import { FC, useCallback } from "react";

interface Props {
    product: ProductItemInterface,
    addOrderItem: (item: OrderItemInterface) => () => void
}

const ProductItem: FC<Props> = ({ product, addOrderItem }) => {
    const productToOrderItem = useCallback((productItem: ProductItemInterface) => {
        const orderItem: OrderItemInterface = {
            id: productItem.id,
            count: 1,
            name: productItem.name,
            price: productItem.price
        }

        return orderItem
    }, [])

    return <div className={style.container} onClick={addOrderItem(productToOrderItem(product))}>
        <img className={style.productImage} src={product.img} />
        <div className={style.productFooter}>
            <div className={style.productName}>{product.name}</div>
            <div className={style.productPrice}>{product.price} TRE</div>
        </div>
    </div>
}

export default ProductItem
