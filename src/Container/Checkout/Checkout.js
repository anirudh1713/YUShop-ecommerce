import React from "react";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import NavigationBar from '../../Components/NavigationBar/NavigationBar';

const checkout = (props) => {
    let checkOutProducts;

    if (props.orderInfo) {
        checkOutProducts = (
            <tr>
                <td><div className="section"><div className="container"><figure className="image is-64x64"><img src={props.orderInfo.image} alt=""/></figure></div></div></td>
                <td><div className="section"><div className="container">{props.orderInfo.name}</div></div></td>
                <td><div className="section"><div className="container">${props.orderInfo.price}</div></div></td>
            </tr>
        );
    }else {
        const filteredItems = props.products.filter(item => {
            return props.cartItems.includes(item.id);
        });

        checkOutProducts = filteredItems.map(item => {
            return (
                <tr>
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
                <form>
                    <div className="field">
                        <label className="label">Name</label>
                        <div className="control">
                            <input className="input" type="text" placeholder="Name" />
                        </div>
                    </div>

                    <div className="field">
                        <label className="label">Phone</label>
                        <div className="control">
                            <input className="input" type="tel" placeholder="Phone number"/>
                        </div>
                    </div>

                    <div className="field">
                        <label className="label">Email</label>
                        <div className="control">
                            <input className="input" type="email" placeholder="Email" />
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
                            <textarea className="textarea" placeholder="Address"/>
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
            <NavigationBar />

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
};

const mapPropsToState = state => {
    return{
        orderInfo: state.orderInfo,
        cartItems: state.cart,
        products: state.productsData
    };
};

export default connect(mapPropsToState)(checkout);