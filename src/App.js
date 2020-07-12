import React, {Component} from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Login from './Components/Login/Login';
import Home from './Container/Home/Home';
import Signup from './Components/Login/Signup/Signup';
import Cart from './Components/Cart/Cart';

class App extends Component {
  render() {
    return (
        <div>
            <Switch>
                <Route path={"/cart"} component={Cart} />
                <Route path={"/login"} component={Login} />
                <Route path={"/signup"} component={Signup} />
                <Route exact path={"/"} component={Home} />
            </Switch>
        </div>
    );
  };
}

export default App;
