import React, {Component} from "react";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import NavigationBar from '../../Components/NavigationBar/NavigationBar';
import * as actionTypes from '../../Store/actions';

class checkout extends Component{
    state = {
        name: "",
        email: "",
        phone: "",
        address: "",
        submitted: false
    };

    componentWillUnmount() {
        this.props.onCompUnmount();
    }

    check_Alpha = (name) => {
        let regex = /^[a-zA-Z ]{2,30}$/;
        if(regex.test(name) === false){
            return false;
        }
        return name !== " ";

    }

    check_address = (address) => {
        let regex = /^[a-zA-Z0-9\s,.'-]{3,}$/;
        return regex.test(address) !== false;
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
    onSubmitHandler = (e) => {
        e.preventDefault();
        this.setState({
            submitted: true
        });

        let message = null;
        if (this.check_Alpha(this.state.name) && this.check_Email(this.state.email) && this.check_phone(this.state.phone) && this.check_address(this.state.address)){
            this.notification = (
                <div className="notification is-success is-light">
                    Thank you for shopping, order will be delivered in 3-4 business days!
                </div>
            );

            setTimeout(() => {
                this.notification = null;
                this.props.history.push("/");
            }, 5000);
        }else {
            if (!this.check_Alpha(this.state.name)){
                message = "enter correct name."
            }else if (!this.check_phone(this.state.phone)){
                message = "enter correct phone number."
            }else if (!this.check_Email(this.state.email)){
                message = "enter correct email."
            }else if (!this.check_address(this.state.address)){
                message = "enter correct address."
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
            submitted: false
        });
    };

    onChangeHandler = (e) => {
        const control = e.target.getAttribute("name");
        this.setState({
            [control]: e.target.value
        });
    };

    render() {
        if (this.props.orderInfo === null && !this.props.checkoutFromCart){
            this.props.history.push("/");
        }

        let checkOutProducts;

        if (this.props.orderInfo) {
            checkOutProducts = (
                <tr>
                    <td><div className="section"><div className="container"><figure className="image is-64x64"><img src={this.props.orderInfo.image} alt=""/></figure></div></div></td>
                    <td><div className="section"><div className="container">{this.props.orderInfo.name}</div></div></td>
                    <td><div className="section"><div className="container">${this.props.orderInfo.price}</div></div></td>
                </tr>
            );
        }else {
            const cartIds = this.props.cartItems.map(item => {
                return item.id;
            });
            const filteredItems = this.props.products.filter(item => {
                return cartIds.includes(item.id);
            });
            console.log("filterd items in chekcout===", filteredItems);
            checkOutProducts = filteredItems.map(item => {
                return (
                    <tr key={item.id}>
                        <td><div className="section"><div className="container"><figure className="image is-64x64"><img src={item.imgSource} alt=""/></figure></div></div></td>
                        <td><div className="section"><div className="container">{item.name}</div></div></td>
                        <td><div className="section"><div className="container">${item.price}</div></div></td>
                    </tr>
                );
            });
        }

        const checkoutForm = (
            <div className="section">
                <div className="container">
                    <h1 className="title is-3" style={{padding: "5px", marginBottom: "15px"}}>Please enter details to place your order</h1>
                    {this.notification}
                    <form onSubmit={this.onSubmitHandler}>
                        <div className="field">
                            <label className="label">Name</label>
                            <div className="control">
                                <input onChange={this.onChangeHandler} name={"name"} value={this.state.name} className="input" type="text" placeholder="Name" />
                            </div>
                        </div>

                        <div className="field">
                            <label className="label">Phone</label>
                            <div className="control">
                                <input onChange={this.onChangeHandler} name={"phone"} value={this.state.phone} className="input" type="tel" placeholder="Phone number"/>
                            </div>
                        </div>

                        <div className="field">
                            <label className="label">Email</label>
                            <div className="control">
                                <input onChange={this.onChangeHandler} name={"email"} value={this.state.email} className="input" type="email" placeholder="Email" />
                            </div>
                        </div>

                        <div className="field">
                            <label className="label">Payment Method</label>
                            <div className="control">
                                <div className="select">
                                    <select>
                                        <option>Net Banking</option>
                                        <option>Credit Card</option>
                                        <option>Debit Card</option>
                                        <option>Cash on delivery(COD)</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className="field">
                            <label className="label">Address</label>
                            <div className="control">
                                <textarea onChange={this.onChangeHandler} name={"address"} value={this.state.address} className="textarea" placeholder="Address"/>
                            </div>
                        </div>

                        <div className="field is-grouped">
                            <div className="control">
                                <button className="button is-link">PLACE ORDER</button>
                            </div>
                            <div className="control">
                                <Link to={"/"} className="button is-link is-light">Cancel</Link>
                            </div>
                        </div>

                    </form>

                </div>
            </div>
        );

        return (
            <React.Fragment>
                <NavigationBar token={this.props.token} />

                <div className="section">
                    <div className="container">
                        <table className="table">
                            <thead>
                            <tr>
                                <th>Item(s)</th>
                                <th>Name</th>
                                <th>Price</th>
                            </tr>
                            </thead>

                            <tbody>
                            {checkOutProducts}
                            </tbody>

                        </table>
                    </div>
                </div>

                {checkoutForm}
            </React.Fragment>
        );
    }
}

const mapPropsToState = state => {
    return{
        orderInfo: state.base.orderInfo,
        cartItems: state.base.cart,
        products: state.base.productsData,
        checkoutFromCart: state.base.checkoutFromCart,
        token: state.auth.idToken
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onCompUnmount: () => dispatch({type: actionTypes.FALSE_CHECKOUT_FROM_CART})
    }
};

export default connect(mapPropsToState, mapDispatchToProps)(checkout);