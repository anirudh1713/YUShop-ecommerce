import * as actionTypes from './actions';

const initialState = {
    authErr: {
        err: false,
        message: null
    },
    loading: false,
    idToken: null,
    userId: null
};

const reducer = (state=initialState, action) => {
    switch (action.type) {
        case actionTypes.LOGOUT:
            return{
                ...state,
                idToken: null,
                userId: null
            };
        case actionTypes.SIGNIN_START:
        case actionTypes.SIGNUP_START:
            return {
                ...state,
                loading: true
            };
        case actionTypes.SIGNUP_FAIL:
        case actionTypes.SIGNIN_FAIL:
            return {
                ...state,
                authErr: {
                    err: true,
                    message: action.error
                },
                loading: false
            };
        case actionTypes.SIGNUP_SUCCESS:
        case actionTypes.SIGNIN_SUCCESS:
            return {
                ...state,
                authErr: {
                    err: false,
                    message: null
                },
                loading: false,
                idToken: action.token,
                userId: action.userId
            };
        case actionTypes.COMPONENT_MOUT:
            return {
                ...state,
                authErr: {
                    err: false,
                    message: null
                },
                loading: false
            };
        default:
            return state;
    }
};

export default reducer;