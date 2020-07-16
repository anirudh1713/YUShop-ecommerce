import * as actionTypes from './Store/actions';
import axios from 'axios';

export const onAddToCart = (id, price, itemName, details, imgSource, token, userId) => {
    return dispatch => {
        dispatch({type: actionTypes.ADD_TO_CART});
        axios.post("https://ecommerce-yushop.firebaseio.com/Cart.json?auth="+token, {id: id, price: price, name: itemName, details: details, imgSource: imgSource, userId: userId})
            .then(res => {
                dispatch({type: actionTypes.ADD_TO_CART_SUCCESS});
                id = res.data.name;
                axios.patch(`https://ecommerce-yushop.firebaseio.com/Cart/${id}.json?auth=`+token, {dbId:id})
                    .then(res => {
                        console.log("addto id ==>>", res)
                    }).catch(err => {
                    console.log("error in add to cart==> ",err);
                });
            }).catch(err => {
                console.log("errr=>>>", err);
            })
    };
};

export const onRemoveFromCart = (id, token) => {
    return dispatch => {
        dispatch({type: actionTypes.REMOVE_FROM_CART, id: id});
        axios.delete(`https://ecommerce-yushop.firebaseio.com/Cart/${id}.json?auth=`+token)
            .then(res => {
                dispatch({type: actionTypes.REMOVE_FROM_CART_SUCCESS});
                console.log("remoce response==> ",res);
            }).catch(err => {
                console.log("remove err =>>>", err);
        });
    }
}

export const fetchCart = (token, userId) => {
    return dispatch => {
        const qParams = "auth=" + token + '&orderBy="userId"&equalTo="' + userId +'"';
        axios.get("https://ecommerce-yushop.firebaseio.com/Cart.json?"+qParams)
            .then(res => {
                console.log("res data fetch ===>> ",res.data);
                let itemIds = [];
                Object.values(res.data).forEach(item => {
                    if (itemIds.length > 0){
                        itemIds = [...itemIds].filter(data => {
                            return data.id !== item.id;
                        });
                    }
                    itemIds.push(item);
                });
                dispatch({type: actionTypes.FETCH_CART, payload: itemIds});
            }).catch(err => {
            console.log("errr in fetchCart =>", err);
        });
    }
};