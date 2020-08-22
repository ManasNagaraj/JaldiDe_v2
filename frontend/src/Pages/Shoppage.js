import React, { useEffect } from 'react';
import Products from '../components/Products.js';
import { useSelector, useDispatch } from 'react-redux';
import { listProducts } from '../actions/shopActions';
import { Heading, Paragraph } from 'grommet';
import { Box } from "grommet/components/Box";

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
            <div style={{paddingLeft:50 , paddingRight:50 , paddingTop:20, paddingBottom:10}}>
            <Box
            round="medium"
            responsive="true"
            direction="column"
            // border={{ color: 'brand', size: 'large' }}
            pad="small">
            <Heading margin="none" alignSelf="center" pad="small">{products.name}</Heading>
            <Paragraph margin="none" alignSelf="center">{products.description}</Paragraph>
            </Box>
            </div>
            <Products data={products.productItems} id={props.match.params.id}></Products>            
        </div>
    )
}