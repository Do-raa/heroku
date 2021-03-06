import Axios from 'axios';
import {ADD_TO_CART , CART_SAVE_SHIPPING, CART_SAVE_PAYMENT} from '../constants/cartConstants'; 
import {CART_REMOVE_ITEM} from '../constants/cartConstants'; 
import Cookie from 'js-cookie';

const addToCart = (productId ,qty) => async (dispatch , getState) => {
  
    try {
        const {data} = await Axios.get('/api/products/' + productId); 
        dispatch({ 
            type: ADD_TO_CART , payload: { 
                product: data._id, 
                name: data.name, 
                image: data.image, 
                price: data.price, 
                countInStock: data.countInStock, 
                qty
            }
        }) 
        const {cart:{cartItems}} = getState(); 
        Cookie.set("cartItems", JSON.stringify(cartItems))
    } catch (error) {
        
    }
}  

const removeFromCart = (productId) =>(dispatch , getState)=> { 
    dispatch({type: CART_REMOVE_ITEM , payload: productId}) 
    const {cart:{cartItems}} = getState(); 
    Cookie.set("cartItems", JSON.stringify(cartItems))
}

const saveShipping = (data) => (dispatch) => { 
    dispatch({type: CART_SAVE_SHIPPING , payload: data}) 
} 

const savePayment = (data) => (dispatch) => { 
    dispatch({type: CART_SAVE_PAYMENT , payload: data}) 
} 

export  {addToCart , removeFromCart, saveShipping, savePayment };
