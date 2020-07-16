import React, {Component} from "react";
import {Link, Redirect} from "react-router-dom";
import {connect} from "react-redux";
import * as actions from '../../../auth';
import * as actionTypes from '../../../Store/actions';

class Signup extends Component {
    state = {
        email: "",
        password: "",
        name: "",
        phone: "",
        submitted: false
    };

    onChangeHandler = (e) => {
        const crrElement = e.target.getAttribute("name");
        this.setState({
            [crrElement]: e.target.value
        });
    };

    check_Alpha = (name) => {
        let regex = /^[a-zA-Z ]{2,30}$/;
        if(regex.test(name) === false){
            return false;
        }
        return name !== " ";

    }

    check_phone = (phone) => {
        let regex = /^[0-9]{10}$/;
        return regex.test(phone);
    }

    check_Email = (email) => {
        let regex = /^(([a-zA-Z0-9_\-.]+)@([a-zA-Z0-9_\-.]+)\.([a-zA-Z]{2,5}){1,25})+([;.](([a-zA-Z0-9_\-.]+)@{[a-zA-Z0-9_\-.]+0\.([a-zA-Z]{2,5}){1,25})+)*$/;
        return regex.test(email);
    }


    componentDidMount() {
        this.props.onCompMount();
    }

    notification = null;
    authentication = (e) => {
        e.preventDefault();
        this.setState({
           submitted: true
        });

        let message = null;

        if (!this.check_Alpha(this.state.name)){
            message = "enter correct name."
        }else if (!this.check_phone(this.state.phone)){
            message = "enter correct phone number."
        }else if (!this.check_Email(this.state.email)){
            message = "enter correct email."
        }
        this.notification = (
            <div className="notification is-danger is-light">
                {message}
            </div>
        );

        setTimeout(() => {
            this.notification = null;
        }, 5000);

        if (this.check_Alpha(this.state.name) && this.check_phone(this.state.phone) && this.check_Email(this.state.email)){
            this.notification = null;
            this.props.onFormSubmit(this.state.email, this.state.password);
        }

        this.setState({
            submitted: false
        });
    }

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
            <div style={{width: "50%", margin: "auto"}} className="container">
                {redirect}
                {this.notification}
                <h1 style={{margin: "20px auto", color: "#3273dc"}} className="title is-1">Sign up</h1>
                {errorPopup}
                <form onSubmit={this.authentication}>
                    <div className="field">
                        <label className="label">Name</label>
                        <div className="control">
                            <input onChange={this.onChangeHandler} name={"name"} className="input" type="text" placeholder="Name" value={this.state.name}/>
                        </div>
                    </div>

                    <div className="field">
                        <label className="label">Phone</label>
                        <div className="control">
                            <input onChange={this.onChangeHandler} className="input" type="tel" name={"phone"} placeholder="Phone number" value={this.state.phone}/>
                        </div>
                    </div>

                    <div className="field">
                        <label className="label">Email</label>
                        <div className="control">
                            <input onChange={this.onChangeHandler} className="input" name={"email"} type="email" placeholder="Email" value={this.state.email}/>
                        </div>
                    </div>

                    <div className="field">
                        <label className="label">Password</label>
                        <div className="control">
                            <input onChange={this.onChangeHandler} className="input" name={"password"} type="password" placeholder="Password" value={this.state.password}/>
                        </div>
                    </div>

                    <div className="field is-grouped">
                        <div className="control">
                            <button className={btnClasses.join(" ")}>Submit</button>
                        </div>
                        <div className="control">
                            <Link to={"/"} className="button is-link is-light">Cancel</Link>
                        </div>
                    </div>

                    <hr/>
                    <Link to="/login">Already a user? Click to login</Link>
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
    return {
        onFormSubmit: (email, password) => dispatch(actions.signUP(email, password)),
        onCompMount: () => dispatch({type: actionTypes.COMPONENT_MOUT})
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Signup);