import React from "react";
import {Link} from "react-router-dom";

const product = (props) => {
    const id = props.id;
    const price = props.price;
    const name = props.name;
    const image = props.imgSource;
    const details = props.details;

    return (
            <div style={{margin: "10px"}} className="card">
                <div className="card-image">
                    <figure className="image is-5by4">
                        <img src={props.imgSource} alt="img"/>
                    </figure>
                </div>
                <div className="card-content">
                    <div className="media">
                        <div className="media-left">
                            <h2 style={{fontWeight: "500"}} className="is-size-4">{props.name}</h2>
                            <p style={{fontWeight: "500"}} className="title is-4">${props.price}</p>
                        </div>
                    </div>
                    <p style={{fontWeight: "300"}}>{props.details}</p>
                </div>

                <div className="card-footer">
                    <Link to={"/checkout"} style={{margin: "5px"}} className="card-footer-item button is-success" onClick={() => props.onBuyNow(id, name, price, image, details)}>Buy Now</Link>
                    <button style={{margin: "5px"}} className="card-footer-item button is-info" onClick={() => props.onAddToCart(id, price, name, details, image, props.token, props.userId)}>Add to cart</button>
                </div>
            </div>
    );
};

export default product;