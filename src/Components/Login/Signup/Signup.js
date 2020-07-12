import React from "react";

const signup = (props) => {

    return (
        <div style={{width: "50%", margin: "auto"}} className="container">
            <h1 style={{margin: "20px auto", color: "#3273dc"}} className="title is-1">Sign up</h1>
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
                        <input className="input" type="tel" placeholder="Phonr number"/>
                    </div>
                </div>

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
                        <button className="button is-link">Submit</button>
                    </div>
                    <div className="control">
                        <button className="button is-link is-light" onClick={() => props.history.push("/")}>Cancel</button>
                    </div>
                </div>

                <hr/>
                <a href="/login">Already a user? Click to login</a>
            </form>
        </div>
    );
};

export default signup;