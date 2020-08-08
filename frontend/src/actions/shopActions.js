import { SHOP_LIST_REQUEST, SHOP_LIST_SUCCESS, SHOP_LIST_FAIL, PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS, PRODUCT_LIST_FAIL, SHOP_SAVE_FAIL, SHOP_SAVE_SUCCESS, SHOP_SAVE_REQUEST, PRODUCT_SAVE_REQUEST, PRODUCT_SAVE_SUCCESS, PRODUCT_SAVE_FAIL } from "../constants/shopConstants";
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

const saveShop = (shop) => async (dispatch, getState) => {
    try {
      dispatch({ type: SHOP_SAVE_REQUEST, payload: shop });
      const { sellerSignin: { sellerInfo } } = getState();
      //if (!product._id) {
        const { data } = await axios.post('/createshop/'+ shop._id, shop);
        dispatch({ type: SHOP_SAVE_SUCCESS, payload: data });
      //} 
    //   else {
    //     const { data } = await Axios.put('/api/products/' + product._id, product, {
    //       headers: {
    //         'Authorization': 'Bearer ' + userInfo.token
    //       }
    //     });
    //     dispatch({ type: PRODUCT_SAVE_SUCCESS, payload: data });
    //   }
  
    } catch (error) {
  
      dispatch({ type: SHOP_SAVE_FAIL, payload: error.message });
    }
}

const saveProduct = (product) => async (dispatch, getState) => {
  try {
    dispatch({ type: PRODUCT_SAVE_REQUEST, payload: product });
    const { sellerSignin: { sellerInfo } } = getState();
    const { data } = await axios.post('/addproducts/'+ product._id, product);
    dispatch({ type: PRODUCT_SAVE_SUCCESS, payload: data });
  } catch (error) {

    dispatch({ type: PRODUCT_SAVE_FAIL, payload: error.message });
  }
}

export { listShops , listProducts ,saveShop, saveProduct}