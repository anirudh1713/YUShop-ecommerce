import * as actionTypes from './actions';

const chair = "https://images.unsplash.com/photo-1580480055273-228ff5388ef8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1534&q=80";
const note10 = "https://cdn.vox-cdn.com/thumbor/rahPPiKtfb7ydudp1ClkjOMlP5o=/0x0:687x520/1200x800/filters:focal(290x206:398x314)/cdn.vox-cdn.com/uploads/chorus_image/image/64795547/note10.0.jpg";
const tufa15 = "https://i.gadgets360cdn.com/products/large/Asus-TUF-A15-DB-800x800-1591094674.jpg";
const note8 = "https://www.gizmochina.com/wp-content/uploads/2019/09/Xiaomi-Redmi-Note-8-1.jpg";
const pillow = "https://www.shopcourtyard.com/images/products/v2/lrg/Marriott-feather-down-pillow-MAR-108_lrg.jpg";
const table = "https://www.boconcept.com/on/demandware.static/-/Sites-master-catalog/default/dw9fc54f37/images/530000/533591.jpg";
const washingmachine = "https://media3.bosch-home.com/Product_Shots/1600x900/MCSA02642741_WAT2846SIN_def.png";
const bicycle = "https://images-na.ssl-images-amazon.com/images/I/81eL463JX5L._SL1500_.jpg";

const initialState = {
    productsData: [
        {id: 1, name: "chair", details: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Labore, perferendis.", price: 50, imgSource: chair},
        {id: 2, name: "Galaxy Note 10", details: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Labore, perferendis.", price: 550, imgSource: note10},
        {id: 3, name: "Asus TUF A15", details: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Labore, perferendis.", price: 750, imgSource: tufa15},
        {id: 4, name: "Redmi Note 8", details: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Labore, perferendis.", price: 250, imgSource: note8},
        {id: 5, name: "Pillow", details: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Labore, perferendis.", price: 20, imgSource: pillow},
        {id: 6, name: "Table", details: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Labore, perferendis.", price: 70, imgSource: table},
        {id: 7, name: "Washing Machine", details: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Labore, perferendis.", price: 150, imgSource: washingmachine},
        {id: 8, name: "Bicycle", details: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Labore, perferendis.", price: 100, imgSource: bicycle}
    ],
    cart: [],
    totalPrice: 0,
    orderInfo: null,
    authErr: {
        err: false,
        message: null
    },
    addToCartLoading: false,
    onRemove: 0,
    checkoutFromCart: false,
    addedToCart: false,
    addToCartFail: false
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_CART:
            return {
                ...state,
                cart: action.payload
            };
        case actionTypes.ADD_TO_CART:
            return {
                ...state,
                addToCartLoading: true,
                addedToCart: false
            };
        case actionTypes.ADD_TO_CART_SUCCESS:
            return {
                ...state,
                addToCartLoading: false,
                addedToCart: true
            };
        case actionTypes.REMOVE_FROM_CART:
            const newCart = state.cart.filter((item) => {
                return item.dbId!==action.id;
            });
            return {
                ...state,
                addToCartLoading: true,
                cart: newCart
            };
        case actionTypes.REMOVE_FROM_CART_SUCCESS:
            return {
                ...state,
                addToCartLoading: false
            };
        case actionTypes.BUY_NOW:
            return{
                ...state,
                orderInfo: {
                    id: action.payload.id,
                    name: action.payload.name,
                    price: action.payload.price,
                    image: action.payload.image,
                    details: action.payload.details
                }
            };
        case actionTypes.CLEAR_ORDER_INFO:
            return {
                ...state,
                orderInfo: null
            };
        case actionTypes.LOGOUT:
            return {
                ...state,
                cart: []
            };
        case actionTypes.CHECKOUT_FROM_CART:
            return {
                ...state,
                checkoutFromCart: true
            };
        case actionTypes.FALSE_CHECKOUT_FROM_CART:
            return {
                ...state,
                checkoutFromCart: false
            };
        case actionTypes.REMOVE_CART_NOTIFICATION:
            return{
                ...state,
                addedToCart: false,
                addToCartFail: false
            };
        case actionTypes.ADD_TO_CART_FAIL:
            return{
                ...state,
                addToCartFail: true
            };
        case actionTypes.SIGNUP_SUCCESS:
        case actionTypes.SIGNIN_SUCCESS:
            return {
                ...state,
                addToCartFail: false
            };
        default:
            return state;
    }
};

export default reducer;