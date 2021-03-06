import React, { useEffect } from 'react'; 
import {useDispatch , useSelector} from 'react-redux'; 
import {addToCart, removeFromCart} from '../actions/cartActions'; 
import {Link} from 'react-router-dom'; 


export default function CartScreen(props) {  
    const cart = useSelector(state=>state.cart); 
    const {cartItems} = cart;
    const productId = props.match.params.id; 
    const qty = props.location.search? Number(props.location.search.split("=")[1]):1; 
    const dispatch = useDispatch();  
    const removeFromCartHandler =(productId)=>{ 
        dispatch(removeFromCart(productId))
    }

    useEffect(() => {
        if(productId){ 
            dispatch(addToCart(productId,qty))
        }
    }, [dispatch,productId,qty]) 

    const checkoutHandler = () =>{ 
        props.history.push("/signin?redirect=shipping");
    }
    return (
        <div className="cart"> 
           <div className="cart-list"> 
              <ul className='cart-list-container'> 
                  <li> 
                    <h3>Shopping Cart</h3>
                  </li> 
                  {cartItems.length === 0 ? <div>Cart is empty</div>:cartItems.map(item=> 
                    <div>  
                        <div className="cart-image"> 
                            <img src={item.image} alt="product" /> 
                        </div>
                 
                        <div className="cart-name">

                            <div> 
                                <Link to={'/product/' + item.product}>{item.name}</Link> 
                            </div> 
                            <div>Qty:<select value={item.qty} onChange={(e)=>dispatch(addToCart(item.product, e.target.value))}> 
                                    <option>1</option> 
                                    <option>2</option> 
                                    <option>3</option>
                                </select></div>  
                            <button type="button" className="button" 
                                onClick={()=>removeFromCartHandler(item.product)}>Delete</button>
                        </div>  
                        <div className='cart-price'>Price : {item.price} TND</div>
                    </div> 
                    )}
              </ul>
           </div>
           <div className='cart-action'> 
               <h3> 
                   Subtotal ({cartItems.reduce((a , c) => a + c.qty, 0 )} items) 
                   : {cartItems.reduce((a , c) => a + c.price * c.qty, 0)} TND
               </h3>  
               <button className="button primary full-width" disabled={cartItems.length === 0} 
                  onClick={checkoutHandler}> 
                   Proceed To Checkout 
               </button>
               
           </div>
        </div>
)}

