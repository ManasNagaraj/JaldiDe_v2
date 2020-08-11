import React, { Component, useEffect } from 'react';
import { ProductCard } from 'react-ui-cards';

// export default class Products extends Component {
export default function Products(props) {
  // render() {
  const items = props.data;
  const handleAddToCart = () => {
    props.history.push('/cart/');
  };
  // console.log(props.match.params.id);
  if (items) {
    return (
      <div className='card-container'>
        {props.data.map((product) => {
          return (
            <div key={product._id}>
              <ProductCard
                photos={[
                  `${product.image}`,
                  'https://i.imgur.com/raPe27t.jpg',
                  'https://i.imgur.com/IpEsYSH.jpg',
                ]}
                price={product.pprice}
                productName={product.pname}
                description='kskcsmsmcklsclksmdlkcm ldsmclkclkdsclks clskmdclksmclmcl lmslcmlksmclksc lmslkcmlkms'
                buttonText='Add to cart'
                rating={3}
                url={
                  'http://localhost:3000/cart/' +
                  props.id +
                  '?product=' +
                  product._id
                }
              />
            </div>
          );
        })}
      </div>
    );
  } else {
    return <div>loading...</div>;
  }
}
