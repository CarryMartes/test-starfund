import React, {FC} from "react";
import {IProductCard} from "../model";
import '../styles/Product.scss'
const Product: FC<{
    product: IProductCard,
    onAction: (product: IProductCard) => void
}> = ({product, onAction}) => {

    const getText = (disabled: boolean) => !disabled ? 'Add to busket' : 'Remove from busket';

    return (
        <div className="product">
            <div className="product__header">
                <img src={product.image} alt="glasses" />
            </div>
            <div className="product__content">
                <div className="product__content__rating">
                    {product.rating} rating
                </div>
                <div className="product__content__title">
                    { product.title }
                </div>
                <div className="product__content__description">
                    {product.description}
                </div>
                <div className="product__content__price">
                    {product.price} {product.currency}
                </div>
            </div>
            <div className="product__footer">
                <button className={product.disabled ? 'disabled' : ''}
                        onClick={() => onAction(product)}>
                    {getText(product.disabled)}
                </button>
            </div>
        </div>
    )
}

export default Product;