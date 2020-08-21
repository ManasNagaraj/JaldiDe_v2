import React, { useEffect, useState } from "react";
import Shops from "../components/Shops";
import { useSelector, useDispatch } from "react-redux";
import { listShops } from "../actions/shopActions";
import { FormSearch } from 'grommet-icons';
import { Button, Grommet, TextInput } from 'grommet';
import { Box } from "grommet/components/Box";

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
      <form onSubmit={submitHandler}>
        <Box responsive="true" justify="center" direction="row" gap="small" pad={{ horizontal: '56px', vertical: "30px" }}>
          <TextInput
            icon={<FormSearch />}
            size="small"
            placeholder="Search"
            onChange={(e) => setSearchKeyword(e.target.value)}
          />
          <Button primary href="/" active="true" label="Back" />
        </Box>
      </form>
      {loading ? <div>loading...</div> : error ? { error } :
        <Shops shops={shops}></Shops>}
    </div>
  );
}
