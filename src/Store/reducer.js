import * as actionTypes from './actions';

const imgSrc = "https://images.unsplash.com/photo-1580480055273-228ff5388ef8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1534&q=80";

const initialState = {
    productsData: [
        {id: 1, name: "chair", details: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Labore, perferendis.", price: 50, imgSource: imgSrc},
        {id: 2, name: "Galaxy Note 10", details: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Labore, perferendis.", price: 550, imgSource: imgSrc},
        {id: 3, name: "Asus TUF A15", details: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Labore, perferendis.", price: 750, imgSource: imgSrc},
        {id: 4, name: "Redmi Note 8", details: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Labore, perferendis.", price: 250, imgSource: imgSrc},
        {id: 5, name: "Pillow", details: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Labore, perferendis.", price: 20, imgSource: imgSrc},
        {id: 6, name: "Table", details: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Labore, perferendis.", price: 70, imgSource: imgSrc},
        {id: 7, name: "Washing Machine", details: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Labore, perferendis.", price: 150, imgSource: imgSrc},
        {id: 8, name: "Bicycle", details: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Labore, perferendis.", price: 100, imgSource: imgSrc}
    ],
    cart: [],
    totalPrice: 0,
    orderInfo: null
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADDED_TO_CART:
            return {
                ...state,
                cart: state.cart.concat(action.id),
                totalPrice: state.totalPrice + action.price
            };
        case actionTypes.REMOVE_FROM_CART:
            const updatedCart = [...state.cart].filter(id => id!==action.id)
            return {
                ...state,
                cart: updatedCart,
                totalPrice: state.totalPrice - action.price
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
            }
        default:
            return state;
    }
};

export default reducer;