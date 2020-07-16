import React from "react";
import {Link} from "react-router-dom";

const navigationBar = (props) => {
    const onNavClickHandler = () => {
        const navBurger = document.querySelector(".navbar-burger");
        navBurger.classList.toggle("is-active");
        const navMenu = document.querySelector(".navbar-menu");
        navMenu.classList.toggle("is-active");
    };

    return (
        <nav className="navbar is-link">
            <div className="navbar-brand">
                <Link to="/" className="navbar-item">
                    <p className="title" style={{color: "white"}}>YUShop</p>
                </Link>

                <Link to={""} onClick={onNavClickHandler} role="button" className="navbar-burger" aria-label="menu" aria-expanded="false">
                    <span aria-hidden="true" />
                    <span aria-hidden="true" />
                    <span aria-hidden="true" />
                </Link>
            </div>

            <div className="navbar-menu">
                <div className="navbar-end">
                    <Link to="/" className="navbar-item">Home</Link>
                    <Link to="#" className="navbar-item">Sell</Link>
                    <Link to="/contactus" className="navbar-item">Contact Us</Link>
                    <div className="navbar-item">
                        <div className="buttons">
                            {props.token ? <Link to="/logout" className="button is-danger">Log out</Link>
                                : <Link to="/login" className="button is-primary">Log in</Link>
                            }
                            <Link to="/cart" className="button is-success">Cart</Link>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default navigationBar;