import Axios from "axios"
import { ADD_TO_CART, CART_REMOVE_ITEM } from "../constants/cartConstants";
import Cookie from "js-cookie";

const addToCart = (shopID,productID) => async (dispatch, getState) => {
    
    try{
        const {data} = await Axios.get("/api/shops/"+shopID);
        productID = ""+productID;
        const object = data.productItems.find( x => x._id === productID);
        //console.log(object);
        dispatch({type: ADD_TO_CART, payload:{
            product: object._id,
            pname: object.pname,
            pprice: object.pprice,
            pdesc: object.pdesc
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