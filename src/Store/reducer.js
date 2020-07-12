import * as actionTypes from './actions';

const initialState = {
    productsData: [
        {id: 1, name: "chair", details: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Labore, perferendis.", price: "50"},
        {id: 2, name: "Galaxy Note 10", details: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Labore, perferendis.", price: "550"},
        {id: 3, name: "Asus TUF A15", details: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Labore, perferendis.", price: "750"},
        {id: 4, name: "Redmi Note 8", details: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Labore, perferendis.", price: "250"},
        {id: 5, name: "Pillow", details: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Labore, perferendis.", price: "20"},
        {id: 6, name: "Table", details: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Labore, perferendis.", price: "70"},
        {id: 7, name: "Washing Machine", details: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Labore, perferendis.", price: "150"},
        {id: 8, name: "Bicycle", details: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Labore, perferendis.", price: "100"}
    ],
    cart: []
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADDED_TO_CART:
            return {
                ...state,
                cart: state.cart.concat(action.id)
            };
        default:
            return state;
    }
};

export default reducer;