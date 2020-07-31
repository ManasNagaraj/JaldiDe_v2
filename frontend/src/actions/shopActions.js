import { SHOP_LIST_REQUEST, SHOP_LIST_SUCCESS, SHOP_LIST_FAIL, PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS, PRODUCT_LIST_FAIL } from "../constants/shopConstants";
import axios from "axios";

const listShops = () => async (dispatch) => {
    try
    {
        dispatch({ type: SHOP_LIST_REQUEST });
        const { data } = await axios.get("/api/shops/");
        dispatch({ type: SHOP_LIST_SUCCESS, payload: data});
    }
    catch(error)
    {
        dispatch({ type: SHOP_LIST_FAIL, payload: error.message});
    }  
}

const listProducts = (shopID) => async (dispatch) => {
    try
    {
        dispatch({ type: PRODUCT_LIST_REQUEST, payload: shopID });
        const { data } = await axios.get("/api/shops/" + shopID);
        dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data });
    }
    catch(error)
    {
        dispatch({ type: PRODUCT_LIST_FAIL, payload: error.message });
    }
}

export { listShops , listProducts }