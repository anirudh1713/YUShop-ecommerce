import React, {Component} from "react";
import NavigationBar from '../../Components/NavigationBar/NavigationBar';
import Products from '../../Components/Products/Products';
import {connect} from "react-redux";
import * as actionTypes from '../../Store/actions';
import * as actions from '../../actionDispatcher';
import './Home.css';

class Home extends Component{

    componentDidMount() {
        this.props.onComponentMount();
    }

    render() {
        let content = (
            <React.Fragment>
                <Products
                    userId={this.props.userId}
                    token={this.props.token}
                    cartLoading={this.props.addToCartLoading}
                    prData={this.props.prData}
                    onAddToCart={this.props.onAddToCartHandler}
                    onBuyNow={this.props.onBuyNowHandler}  />
            </React.Fragment>
        );

        let message = null;
        let classnames = "Success-notification";
        let displayMsg = "Item added to cart."
        if (this.props.addToCartFail) {
            classnames = "Fail-notification"
            displayMsg = "Please signin"
        }
        if (this.props.addedToCart || this.props.addToCartFail){
            message = (
                <div>
                    <div className={classnames}>
                        {displayMsg}
                    </div>
                </div>
            );

            setTimeout(() => {
                message = null;
                this.props.onRemoveNotification();
            }, 3500);
        }

        return(
            <React.Fragment>
                <NavigationBar token={this.props.token} />
                {message}
                {content}
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return{
        prData: state.base.productsData,
        addToCartLoading: state.base.addToCartLoading,
        token: state.auth.idToken,
        userId: state.auth.userId,
        addedToCart: state.base.addedToCart,
        addToCartFail: state.base.addToCartFail
    };
}

const mapPropsToDispatch = dispatch => {
    return{
        onAddToCartHandler: (id, price, itemName, details, imageSource, token, userId) => dispatch(actions.onAddToCart(id, price, itemName, details, imageSource, token, userId)),
        onBuyNowHandler: (id, pName, price, image, details) => dispatch({type: actionTypes.BUY_NOW, payload: {id: id, name: pName, price: price, image: image, details: details}}),
        onComponentMount: () => dispatch({type: actionTypes.CLEAR_ORDER_INFO}),
        onRemoveNotification: () => dispatch({type:actionTypes.REMOVE_CART_NOTIFICATION})
    };
};

export default connect(mapStateToProps, mapPropsToDispatch)(Home);