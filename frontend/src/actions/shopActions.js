import {
  SHOP_LIST_REQUEST,
  SHOP_LIST_SUCCESS,
  SHOP_LIST_FAIL,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL,
  SHOP_SAVE_FAIL,
  SHOP_SAVE_SUCCESS,
  SHOP_SAVE_REQUEST,
  PRODUCT_SAVE_REQUEST,
  PRODUCT_SAVE_SUCCESS,
  PRODUCT_SAVE_FAIL,
  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_DELETE_FAIL,
} from '../constants/shopConstants';
import axios from 'axios';

const listShops = (searchKeyword = '') => async (dispatch) => {
  try {
    dispatch({ type: SHOP_LIST_REQUEST });
    const { data } = await axios.get('/api/shops/?searchKeyword='+searchKeyword);
    dispatch({ type: SHOP_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: SHOP_LIST_FAIL, payload: error.message });
  }
};

const listProducts = (shopID) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_LIST_REQUEST, payload: shopID });
    const { data } = await axios.get('/api/shops/' + shopID);
    dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: PRODUCT_LIST_FAIL, payload: error.message });
  }
};

const saveShop = (shop) => async (dispatch, getState) => {
  try {
    dispatch({ type: SHOP_SAVE_REQUEST, payload: shop });
    const {
      sellerSignin: { sellerInfo },
    } = getState();
    //await axios.get(shop.product_id);
    if (shop.p_id !== 10) {
      console.log(shop.product_id);
      const { data } = await axios.post('api/shops/create/' + shop._id, shop);
      dispatch({ type: SHOP_SAVE_SUCCESS, payload: data });
    }
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
};

const saveProduct = (product) => async (dispatch, getState) => {
  try {
    dispatch({ type: PRODUCT_SAVE_REQUEST, payload: product });
    const {
      sellerSignin: { sellerInfo },
    } = getState();
    console.log(product.product_id);

    if (!product.product_id) {
      const { data } = await axios.post(
        'api/shops/addproducts/' + product._id,
        product
      );
      dispatch({ type: PRODUCT_SAVE_SUCCESS, payload: data });
    } else {
      const { data } = await axios.put(
        'api/shops/addproducts/' + product._id + '/' + product.product_id,
        product
      );
      dispatch({ type: PRODUCT_SAVE_SUCCESS, payload: data });
    }
  } catch (error) {
    dispatch({ type: PRODUCT_SAVE_FAIL, payload: error.message });
  }
};

const deleteProduct = (stuff) => async (dispatch, getState) => {
  try {
    //const { userSignin: { userInfo } } = getState();
    dispatch({ type: PRODUCT_DELETE_REQUEST, payload: stuff });
    console.log(stuff.prod_id);
    const { data } = await axios.delete(
      'api/ahops/deleteproducts/' + stuff.sel_id + '/' + stuff.prod_id
    );
    dispatch({ type: PRODUCT_DELETE_SUCCESS, payload: data, success: true });
  } catch (error) {
    dispatch({ type: PRODUCT_DELETE_FAIL, payload: error.message });
  }
};

export { listShops, listProducts, saveShop, saveProduct, deleteProduct };
