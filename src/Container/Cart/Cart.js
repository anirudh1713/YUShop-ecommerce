import React, {Component} from "react";
import {connect} from "react-redux";
import NavigationBar from '../../Components/NavigationBar/NavigationBar';
import {Link, Redirect} from "react-router-dom";
import * as actions from '../../actionDispatcher';

class Cart extends Component {

    componentDidMount() {
        this.props.onFetchCart(this.props.token, this.props.userId);
    }

    render() {
        let cartToShow = (
            <div className="section">
                <div className="container">
                    <p style={{fontWeight: "700", color: "#3273dc"}} className="title is-1">Cart is empty!</p>
                    <Link to={"/"} className="button is-link">SHOP NOW!</Link>
                </div>
            </div>
        );

        let totalAmount = 0;
        if (this.props.cartItems.length > 0){
            this.props.cartItems.forEach(item => {
                totalAmount += item.price;
            });
            cartToShow = this.props.cartItems.map(item => {
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
                                    <button className="button is-outlined is-danger" onClick={() => this.props.onRemoveFromCart(item.dbId, this.props.token)}>REMOVE</button>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            });
        }

        let redirectToLogin = null;
        if (!this.props.token){
            redirectToLogin = <Redirect to={"/login"} />
        }

        return (
            <React.Fragment>
                {redirectToLogin}
                <NavigationBar token={this.props.token} />
                {cartToShow}
                {this.props.cartItems.length > 0 ?
                    <div className="section">
                        <div className="container">
                            <div className="media">
                                <div className="media-left">
                                </div>
                                <div style={{marginLeft: "20%"}} className="media-content">
                                    <p className="title is-3" style={{fontWeight: "700", display: "inline", margin: "0 15px"}}> Total Price : <span style={{color:"#3273dc"}}>${totalAmount}</span></p>
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
    }
}

const mapStateToProps = state => {
    return {
        products: state.base.productsData,
        cartItems: state.base.cart,
        totalPrice: state.base.totalPrice,
        token: state.auth.idToken,
        userId: state.auth.userId
    };
};

const mapDispatchToProps = dispatch => {
    return{
        onRemoveFromCart: (id, token) => dispatch(actions.onRemoveFromCart(id, token)),
        onFetchCart: (token, userId) => dispatch(actions.fetchCart(token, userId))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);