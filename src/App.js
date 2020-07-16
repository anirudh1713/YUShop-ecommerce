import React, {Component} from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';
import './App.css';
import Login from './Components/Login/Login';
import Home from './Container/Home/Home';
import Signup from './Components/Login/Signup/Signup';
import Cart from './Container/Cart/Cart';
import Checkout from "./Container/Checkout/Checkout";
import Logout from "./Components/Login/Logout/Logout";
import {connect} from "react-redux";
import * as actions from './auth';
import ContactUs from './Components/ContactUs/ContactUs';

class App extends Component {
    componentDidMount() {
        this.props.onAutoSignin();
    }

    render() {
    return (
        <div>
            <Switch>
                <Route path={"/cart"} component={Cart} />
                <Route path={"/contactus"} component={ContactUs} />
                <Route path={"/login"} component={Login} />
                <Route path={"/signup"} component={Signup} />
                <Route path={"/logout"} component={Logout} />
                <Route path={"/checkout"} component={Checkout} />
                <Route exact path={"/"} component={Home} />
                <Redirect to={"/"} />
            </Switch>
        </div>
    );
  };
}

const mapDispatchToProps = dispatch => {
    return {
        onAutoSignin: () => dispatch(actions.checkAuth())
    }
}

export default connect(null, mapDispatchToProps)(App);
