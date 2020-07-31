import Axios from "axios"
import { ADD_TO_CART, CART_REMOVE_ITEM } from "../constants/cartConstants";
import Cookie from "js-cookie";

const addToCart = (shopID,productID) => async (dispatch, getState) => {
    try{
        const {data} = await Axios.get("/api/shops/"+shopID);

        dispatch({type: ADD_TO_CART, payload:{

            product: data.productItems[productID-1]._pid,
            pname: data.productItems[productID-1].pname,
            pprice: data.productItems[productID-1].pprice,
            pdesc: data.productItems[productID-1].pdesc

        }})

        const { cart: { cartItems } } = getState();
        Cookie.set("cartItems", JSON.stringify(cartItems));

    } catch(error) {
    }
}

const removeFromCart = (shopID) => (dispatch, getState) => 
{
    dispatch({ type: CART_REMOVE_ITEM, payload: shopID });
  
    const { cart: { cartItems } } = getState();
    Cookie.set("cartItems", JSON.stringify(cartItems));
}

export {addToCart,removeFromCart}