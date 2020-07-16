import axios from 'axios';
import * as actionTypes from './Store/actions';


const signUpStart = () => {
    return{
        type:actionTypes.SIGNUP_START
    }
}

const signInStart = () => {
    return{
        type:actionTypes.SIGNIN_START
    }
}

export const signUP = (email, password) => {
    const authData = {
        email: email,
        password: password,
        returnSecureToken: true
    }
    return dispatch => {
        dispatch(signUpStart());
        axios.post("https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDeYf2FCRdhka7Grhd1Erf4v6dj0WhFwoE", authData)
            .then(res => {
                console.log("signup ==> ", res.data);
                localStorage.setItem("token", res.data.idToken);
                const expDate = new Date(new Date().getTime() + (res.data.expiresIn * 1000));
                localStorage.setItem("expirationDate", expDate);
                localStorage.setItem("userId", res.data.localId);
                dispatch({type: actionTypes.SIGNUP_SUCCESS, token: res.data.idToken, userId: res.data.localId});
                dispatch(logOut(res.data.expiresIn));
            }).catch(err => {
                dispatch({type: actionTypes.SIGNUP_FAIL, error: err.response.data.error.message})
        });
    }
};

export const signIn = (email, password) => {
    const authData = {
        email: email,
        password: password,
        returnSecureToken: true
    }
    return dispatch => {
        dispatch(signInStart());
        axios.post("https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDeYf2FCRdhka7Grhd1Erf4v6dj0WhFwoE", authData)
            .then(res => {
                console.log("signin res===>", res.data);
                localStorage.setItem("token", res.data.idToken);
                const expDate = new Date(new Date().getTime() + (res.data.expiresIn * 1000));
                localStorage.setItem("expirationDate", expDate);
                localStorage.setItem("userId", res.data.localId);
                dispatch({type: actionTypes.SIGNIN_SUCCESS, token: res.data.idToken, userId: res.data.localId});
                dispatch(logOut(res.data.expiresIn));
            }).catch(err => {
                dispatch({type: actionTypes.SIGNIN_FAIL, error: err.response.data.error.message});
                console.log("err===>", err.response.data.error.message);
        });
    };
};

export const checkAuth = () => {
    return dispatch => {
        const token = localStorage.getItem("token");
        if (token!==null){
            const expTime = new Date(localStorage.getItem("expirationDate"));
            const userId = localStorage.getItem("userId");
            if (expTime > new Date()) {
                dispatch({type: actionTypes.SIGNIN_SUCCESS, token: token, userId: userId});
                dispatch(logOut((expTime.getTime() - new Date().getTime())/1000));
            }else{
                dispatch({type: actionTypes.LOGOUT});
            }
        }else {
            dispatch({type: actionTypes.LOGOUT});
        }
    };
};

export const logOut = (expTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch({type: actionTypes.LOGOUT});
        }, expTime*1000);
    };
}