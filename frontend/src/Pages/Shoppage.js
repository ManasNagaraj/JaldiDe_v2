import React, { useEffect } from 'react';
import './Shoppage.css';
import Products from '../components/Products.js';
import { useSelector, useDispatch } from 'react-redux';
import { listProducts } from '../actions/shopActions';

export default function Shoppage(props) 
{
    const productList = useSelector(state => state.productList);
    const { products, loading, error } = productList;
    const dispatch = useDispatch();

    useEffect( () => 
    {
        dispatch(listProducts(props.match.params.id));
    
        return () => {
            //
        };
    }, [])

    return (
        loading ? <div>loading...</div> :
        <div>
            <h1>{products.name}</h1>
            <h3>{products.description}</h3>
            <Products data={products.productItems} id={props.match.params.id}></Products>            
        </div>
    )
}