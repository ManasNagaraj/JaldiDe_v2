import {createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { shopListReducer, productListReducer } from './reducers/shopReducers';
import thunk from 'redux-thunk';
import { cartReducer } from './reducers/cartReducers';
import Cookie from 'js-cookie';
const cartItems = Cookie.getJSON("cartItems") || [];

const initialState = {cart: { cartItems }};

const reducer = combineReducers({
    shopList: shopListReducer,
    productList: productListReducer,
    cart: cartReducer,
})

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, initialState, composeEnhancer(applyMiddleware(thunk)));
export default store;