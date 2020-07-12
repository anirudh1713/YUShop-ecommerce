import React from "react";

const product = (props) => {
    const imgSrc = "https://images.unsplash.com/photo-1580480055273-228ff5388ef8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1534&q=80";
    const id = props.id;
    return (
            <div style={{margin: "10px"}} className="card">
                <div className="card-image">
                    <figure className="image is-5by4">
                        <img src={imgSrc} alt="img"/>
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
                    <button style={{margin: "5px"}} className="card-footer-item button is-success">Buy Now</button>
                    <button style={{margin: "5px"}} className="card-footer-item button is-info" onClick={() => props.onAddToCart(id)}>Add to cart</button>
                </div>
            </div>
    );
};

export default product;