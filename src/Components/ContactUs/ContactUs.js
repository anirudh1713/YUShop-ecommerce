import React, {Component} from "react";
import {Link} from "react-router-dom";
import NavigationBar from '../NavigationBar/NavigationBar';
import {connect} from "react-redux";

class contactus extends Component {
    state = {
        name: "",
        email: "",
        phone: "",
        contactUsSubmit: false
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

    notification = null;
    onFormSubmit = (e) => {
        e.preventDefault();
        this.setState({
            contactUsSubmit: true
        });
        let message = null;
        if (this.check_Alpha(this.state.name) && this.check_Email(this.state.email) && this.check_phone(this.state.phone)){
                this.notification = (
                    <div className="notification is-success is-light">
                        Thank you for contacting us, we'll be in touch with you very soon!
                    </div>
                );

                setTimeout(() => {
                    this.notification = null;
                }, 5000);
        }else {
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
        }

        this.setState({
            contactUsSubmit: false
        })
    };

    onChangeHandler = (e) => {
        const control = e.target.getAttribute("name");
        this.setState({
            [control]: e.target.value
        });
    };

    render() {
        return (
            <React.Fragment>
                <NavigationBar token={this.props.token} />
                <div className="section">
                    <div className="container" style={{width: "70%"}}>
                        <h1 className="title is-1" style={{color: "#3273dc", fontWeight: "700"}}>Contact Us</h1>
                        {this.notification}
                        <form onSubmit={this.onFormSubmit}>
                            <div className="field">
                                <label className="label">Name</label>
                                <div className="control">
                                    <input onChange={this.onChangeHandler} value={this.state.name} name={"name"} className="input" type="text" placeholder="Name"/>
                                </div>
                            </div>

                            <div className="field">
                                <label className="label">Phone</label>
                                <div className="control">
                                    <input onChange={this.onChangeHandler} value={this.state.phone} name={"phone"} className="input" type="tel" placeholder="Phone number" />
                                </div>
                            </div>

                            <div className="field">
                                <label className="label">Email</label>
                                <div className="control">
                                    <input onChange={this.onChangeHandler} value={this.state.email} name={"email"} className="input" type="email" placeholder="Email" />
                                </div>
                            </div>

                            <div className="field">
                                <label className="label">Message</label>
                                <div className="control">
                                    <textarea className="textarea" placeholder="Explain how we can help you"/>
                                </div>
                            </div>

                            <div className="field is-grouped">
                                <div className="control">
                                    <button className="button is-link">Submit</button>
                                </div>
                                <div className="control">
                                    <Link to={"/"} className="button is-link is-light">Cancel</Link>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        token: state.auth.idToken
    }
};
export default connect(mapStateToProps)(contactus);