import React, {Component} from "react";
import NavigationBar from '../../Components/NavigationBar/NavigationBar';
import Products from '../../Components/Products/Products';
import {connect} from "react-redux";
import * as actionTypes from '../../Store/actions';

class Home extends Component{
    componentDidMount() {
        this.props.onComponentMount();
    }

    render() {
        return(
            <React.Fragment>
                <NavigationBar />
                <Products prData={this.props.prData} onAddToCart={this.props.onAddToCartHandler} onBuyNow={this.props.onBuyNowHandler} />
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return{
        prData: state.productsData
    };
}

const mapPropsToDispatch = dispatch => {
    return{
        onAddToCartHandler: (id, price) => dispatch({type: actionTypes.ADDED_TO_CART, id: id, price: price}),
        onBuyNowHandler: (id, pName, price, image, details) => dispatch({type: actionTypes.BUY_NOW, payload: {id: id, name: pName, price: price, image: image, details: details}}),
        onComponentMount: () => dispatch({type: actionTypes.CLEAR_ORDER_INFO})
    };
};

export default connect(mapStateToProps, mapPropsToDispatch)(Home);