import React from "react";
import {connect} from "react-redux";
import NavigationBar from '../NavigationBar/NavigationBar';
import {Link} from "react-router-dom";
import Products from "../Products/Products";

const cart = (props) => {
    let cartToShow = (
        <div className="section">
            <div className="container">
                <p style={{fontWeight: "700", color: "#3273dc"}} className="title is-1">Cart is empty!</p>
                <Link to={"/"} className="button is-link">SHOP NOW!</Link>
            </div>
        </div>
    );

    if (props.cartItems.length>0){
        let cartData = props.products.filter(product => {
            return props.cartItems.includes(product.id);
        });
        cartToShow = <Products prData={cartData} />
    }

    return (
        <React.Fragment>
            <NavigationBar />
            {cartToShow}
        </React.Fragment>
    );
};

const mapStateToProps = state => {
    return {
        products: state.productsData,
        cartItems: state.cart
    };
};

export default connect(mapStateToProps)(cart);