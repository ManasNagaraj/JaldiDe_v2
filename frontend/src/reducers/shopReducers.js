import { SHOP_LIST_REQUEST, SHOP_LIST_SUCCESS, SHOP_LIST_FAIL, PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS, PRODUCT_LIST_FAIL } from "../constants/shopConstants";

function shopListReducer(state = {shops:[]}, action){
    switch (action.type) {
        case SHOP_LIST_REQUEST:
            return { loading:true };
        case SHOP_LIST_SUCCESS:
            return { loading:false, shops: action.payload };
        case SHOP_LIST_FAIL:
            return { loading:false , error: action.payload };
        default:
            return state;
    }
}

function productListReducer(state = {products:[]}, action){
    switch (action.type) {
        case PRODUCT_LIST_REQUEST:
            return { loading:true };
        case PRODUCT_LIST_SUCCESS:
            return { loading:false, products: action.payload };
        case PRODUCT_LIST_FAIL:
            return { loading:false , error: action.payload };
        default:
            return state;
    }
}

export { shopListReducer , productListReducer}