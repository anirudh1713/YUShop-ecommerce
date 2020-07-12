import React from "react";
import NavigationBar from '../../Components/NavigationBar/NavigationBar';
import Products from '../../Components/Products/Products';
import {connect} from "react-redux";
import * as actionTypes from '../../Store/actions';

const home = (props) => {
    return(
        <React.Fragment>
            <NavigationBar />
            <Products prData={props.prData} onAddToCart={props.onAddToCartHandler} />
        </React.Fragment>
    );
};

const mapStateToProps = state => {
    return{
        prData: state.productsData
    };
}

const mapPropsToDispatch = dispatch => {
    return{
        onAddToCartHandler: (id) => dispatch({type: actionTypes.ADDED_TO_CART, id: id})
    };
};

export default connect(mapStateToProps, mapPropsToDispatch)(home);