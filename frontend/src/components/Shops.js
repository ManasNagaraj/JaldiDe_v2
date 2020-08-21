import React, { Component } from 'react';
import { TaggedContentCard } from 'react-ui-cards';

export default class Shops extends Component {
  render() {
    return (
      <div>
        <div className='card-container'>
          {this.props.shops.map((shop) => {
            return (
              <div key={shop._id}>
                <TaggedContentCard
                  width='20px'
                  float='false'
                  href={'/shop/' + shop._id}
                  thumbnail='https://images.livemint.com/rf/Image-621x414/LiveMint/Period2/2016/09/22/Photos/Processed/kirana3-kVmB--621x414@LiveMint.JPG'
                  title={shop.name}
                  description={shop.description}
                  tags={shop.category}
                />
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}
