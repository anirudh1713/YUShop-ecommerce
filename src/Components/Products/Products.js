import React from "react";
import Product from './Product/Product';
import './Products.css';

const products = (props) => {
    const productsToShow = props.prData.map(product => {
        return <Product key={product.id}
                        id={product.id}
                        name={product.name}
                        price={product.price}
                        details={product.details}
                        imgSource={product.imgSource}
                        onAddToCart={props.onAddToCart}
                        onBuyNow={props.onBuyNow}
                        onCartLoading={props.cartLoading}
                        token={props.token}
                        userId={props.userId}
        />;
    });

    return (
        <div className="container productHolder">
            {productsToShow}
        </div>
    );
};

export default products;