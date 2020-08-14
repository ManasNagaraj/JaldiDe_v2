import React, { useEffect } from 'react';
import Shops from '../components/Shops';
import { useSelector, useDispatch } from 'react-redux';
import { listShops } from '../actions/shopActions';

export default function Homepage() {
  const shopList = useSelector((state) => state.shopList);
  const { shops, loading, error } = shopList;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listShops());
    return () => {
      //
    };
  }, [dispatch]);

  return loading ? (
    <div>loading...</div>
  ) : error ? (
    { error }
  ) : (
    <div>
      <Shops shops={shops}></Shops>
    </div>
  );
}
