import React, { useEffect, useState } from 'react';
import Shops from '../components/Shops';
import { useSelector, useDispatch } from 'react-redux';
import { listShops } from '../actions/shopActions';

// Carousel
import Carousel from 'react-bootstrap/Carousel';

export default function Homepage() {
  const shopList = useSelector((state) => state.shopList);
  const [searchKeyword, setSearchKeyword] = useState('');
  const { shops, loading, error } = shopList;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listShops(searchKeyword));
    return () => {
      //
    };
  }, []);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(listShops(searchKeyword));
  };

  return (
    <div>
      {/* <div className='d-flex height-80 justify-content-center align-items-center flex-column'>
        <h1 className='hero-title text-center mb-3'>
          Buy from Shops around you
            </h1>
        <p className='lead text-center mb-5'>loralksdfklancnaksj dnffjasdhdfkj f afdksjahfkajsdhfkjas askjdfhakjshdf ksjhf asfkjsddfh jkfhdsjk hfasdf asdfhsajkdfh jkshf ewuhs dhashf shfkajshfh</p>

        <div className='d-flex mb-3'>

          <a className='btn  hero-btn'>Explore</a>
          <a className='btn hero-btn login-btn'>Login</a>
          {/* <form onSubmit={submitHandler}>
                <input
                  name="searchKeyword"
                  onChange={(e) => setSearchKeyword(e.target.value)}
                />
                <button type="submit">Search</button>
              </form>
        </div>

      </div> */}
      {loading ? (
        <div>loading...</div>
      ) : error ? (
        { error }
      ) : (
        <Shops shops={shops}></Shops>
      )}
    </div>
  );
}
