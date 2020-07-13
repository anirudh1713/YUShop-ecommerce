import React from "react";
import {connect} from "react-redux";
import NavigationBar from '../../Components/NavigationBar/NavigationBar';
import {Link} from "react-router-dom";
import * as actionTypes from '../../Store/actions';

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

        cartToShow = cartData.map(item => {
            return (
                <div key={item.id} style={{margin: "10px 0"}} className="section">
                    <div className="container">
                        <div className="media">
                            <figure className="media-left">
                                <p className="image is-64x64">
                                    <img src={item.imgSource} alt="img"/>
                                </p>
                            </figure>

                            <div className="media-content">
                                <p><span className="title is-5">{item.name}</span> <br/> <span className="title is-5">${item.price}</span><br/>
                                    {item.details}
                                </p>
                            </div>

                            <div className="media-right">
                                <button className="button is-outlined is-danger" onClick={() => props.onRemoveFromCart(item.id, item.price)}>REMOVE</button>
                            </div>
                        </div>
                    </div>
                </div>
            );
        });
    }

    return (
        <React.Fragment>
            <NavigationBar />
            {cartToShow}
            {props.cartItems.length>0 ?
                <div className="section">
                    <div className="container">
                        <div className="media">
                            <div className="media-left">
                            </div>
                            <div style={{marginLeft: "20%"}} className="media-content">
                                <p className="title is-3" style={{fontWeight: "700", display: "inline", margin: "0 15px"}}> Total Price : <span style={{color:"#3273dc"}}>${props.totalPrice}</span></p>
                                <Link to={"/checkout"} className="button is-link">CHECKOUT</Link>
                            </div>
                            <div className="media-right">
                            </div>
                        </div>
                    </div>
                </div> : null
            }
        </React.Fragment>
    );
};

const mapStateToProps = state => {
    return {
        products: state.productsData,
        cartItems: state.cart,
        totalPrice: state.totalPrice
    };
};

const mapDispatchToProps = dispatch => {
    return{
        onRemoveFromCart: (id, price) => dispatch({type: actionTypes.REMOVE_FROM_CART, id: id, price: price})
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(cart);