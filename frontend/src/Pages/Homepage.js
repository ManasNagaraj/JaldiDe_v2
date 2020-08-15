import React, { useEffect } from "react";
import Shops from "../components/Shops";
import { useSelector, useDispatch } from "react-redux";
import { listShops } from "../actions/shopActions";

export default function Homepage() {
  const shopList = useSelector((state) => state.shopList);
  const { shops, loading, error } = shopList;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listShops());
    return () => {
      //
    };
  }, []);

  return loading ? (
    <div>loading...</div>
  ) : error ? (
    { error }
  ) : (
    <div>
      <div>
        {/* Hero goes here */}
        <h1>Hero</h1>
      </div>
      <div>
        {/* How to use section goes here */}
        <h1>How to Use</h1>
      </div>
      <Shops shops={shops}></Shops>
    </div>
  );
}
