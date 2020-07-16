import React, {Component} from "react";

import {connect} from 'react-redux';
import * as actionTypes from '../../../Store/actions';
import {Redirect} from "react-router";

class logout extends Component{
    componentDidMount() {
        localStorage.removeItem("token");
        localStorage.removeItem("expirationDate");
        localStorage.removeItem("userId");
        this.props.onLogout();
    }

    render() {
        return <Redirect to={"/"} />
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onLogout: () => dispatch({type: actionTypes.LOGOUT})
    };
};

export default connect(null, mapDispatchToProps)(logout);