import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listMyOrders } from '../actions/orderActions';
import { Link } from 'react-router-dom';

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { makeStyles, withStyles, Tooltip, Button } from '@material-ui/core';

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white
  },
  body: {
    fontSize: 14
  }
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover
    }
  }
}))(TableRow);

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 700
  },
  input: {
    display: "none"
  }
}));

export default function OrderManagement(props) {

  const classes = useStyles();
  const dispatch = useDispatch();

  const myOrderList = useSelector((state) => state.myOrderList);
  const { loading: loadingOrders, orders, error: errorOrders } = myOrderList;
  const sellerSignin = useSelector((state) => state.sellerSignin);
  const { loading, sellerInfo, error } = sellerSignin;

  useEffect(() => {
    dispatch(listMyOrders(props.match.params.id));
    return () => {};
  }, []);
  if(orders)
  {console.log(orders.shipping)}
  
  return (
    <div className='profile-orders content-margined'>
      {loadingOrders ? (
        <div>Loading...</div>
      ) : errorOrders ? (
        <div>{errorOrders} </div>
      ) : (

        <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="center">Order Details</StyledTableCell>
              <StyledTableCell>Order ID</StyledTableCell>
              <StyledTableCell align="center">Date</StyledTableCell>
              <StyledTableCell align="center">Time</StyledTableCell>
              <StyledTableCell align="center">Customer Name</StyledTableCell>
              <StyledTableCell align="center">Location</StyledTableCell>
              
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order) => (
              <StyledTableRow key={order._id}>
                <StyledTableCell align="center">
                <Button variant="contained" color="primary" href={'/seller/orderdetails/' + sellerInfo._id + '/' + order._id}>
                    Order Deatils
                  </Button>
                </StyledTableCell>
                <StyledTableCell component="th" scope="row">
                  {order._id}
                </StyledTableCell>
                <StyledTableCell align="center">{order.time}</StyledTableCell>
                <StyledTableCell align="center">{order.time}</StyledTableCell>
                <StyledTableCell align="center">Name</StyledTableCell>
                <StyledTableCell align="center">{order.shipping.city}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      )}
    </div>
  );
}
