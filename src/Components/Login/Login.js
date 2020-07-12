import React from "react";
import {Link} from "react-router-dom";

const login = (props) => {
    return (
        <div style={{width: "50%", margin: "auto"}} className="section">
            <h1 style={{margin: "20px auto", color: "#3273dc"}} className="title is-1">Log In</h1>
            <form>
                <div className="field">
                    <label className="label">Email</label>
                    <div className="control">
                        <input className="input" type="email" placeholder="Email" />
                    </div>
                </div>

                <div className="field">
                    <label className="label">Password</label>
                    <div className="control">
                        <input className="input" type="password" placeholder="Password" />
                    </div>
                </div>

                <div className="field is-grouped">
                    <div className="control">
                        <button className="button is-link">Log in</button>
                    </div>
                    <div className="control">
                        <button className="button is-link is-light" onClick={() => props.history.push("/")}>Cancel</button>
                    </div>
                </div>
                <hr/>
                <Link to="/signup">New user? Click to signup</Link>
            </form>
        </div>
    );
};

export default login;