import React, {Component} from "react";
import {Link, Redirect} from "react-router-dom";
import {connect} from 'react-redux';
import * as actions from '../../auth';
import * as actionTypes from '../../Store/actions';

class login extends Component{
    state ={
        email: "",
        password: ""
    };

    componentDidMount() {
        this.props.onCompMount();
    }

    onSigninHandler = (e) => {
        e.preventDefault();
        this.props.onSignin(this.state.email, this.state.password);
    };

    onChangeHandler = (e) => {
        const controlName = e.target.getAttribute("name");
        this.setState({
            [controlName]: e.target.value
        });
    };

    render() {
        let errorPopup = null;
        if (this.props.error.err){
            errorPopup = (
                <div className="notification is-danger is-light">
                    {this.props.error.message}
                </div>
            );
        }

        let btnClasses = ["button", "is-link"];
        if (this.props.loading){
            btnClasses.push("is-loading");
        }else{
            if (btnClasses.includes("is-loading")){
                btnClasses.splice(2,1);
            }
        }

        let redirect = null;
        if (this.props.token){
            redirect = <Redirect to={"/"} />
        }

        return (
            <div style={{width: "70%", margin: "auto"}} className="section">
                {redirect}
                <h1 style={{margin: "20px auto", color: "#3273dc"}} className="title is-1">Log In</h1>
                {errorPopup}
                <form onSubmit={this.onSigninHandler}>
                    <div className="field">
                        <label className="label">Email</label>
                        <div className="control">
                            <input onChange={this.onChangeHandler} className="input" type="email" name="email" placeholder="Email" value={this.state.email}/>
                        </div>
                    </div>

                    <div className="field">
                        <label className="label">Password</label>
                        <div className="control">
                            <input onChange={this.onChangeHandler} className="input" type="password" name="password" placeholder="Password" value={this.state.password}/>
                        </div>
                    </div>

                    <div className="field is-grouped">
                        <div className="control">
                            <button className={btnClasses.join(" ")}>Log in</button>
                        </div>
                        <div className="control">
                            <button className="button is-link is-light" onClick={() => this.props.history.push("/")}>Cancel</button>
                        </div>
                    </div>
                    <hr/>
                    <Link to="/signup">New user? Click to signup</Link>
                </form>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return{
        error: state.auth.authErr,
        loading: state.auth.loading,
        token: state.auth.idToken
    }
};

const mapDispatchToProps = dispatch => {
    return{
        onSignin: (email, password) => dispatch(actions.signIn(email, password)),
        onCompMount: () => dispatch({type: actionTypes.COMPONENT_MOUT})
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(login);