import express from 'express';
import { getToken } from '../Seller_util.js';
import Seller from '../models/sellerModel.js';
import Shop from '../models/shopModel.js';
import shopModel from '../models/shopModel.js';
import Order from '../models/orderModel.js';

const router = express.Router();

//order entry route
router.post('/', async (req, res) => {
  console.log(req.body);
  const order = new Order({
    cartItems: req.body.orderItems,
    shipping: req.body.shipping,
    total: req.body.itemPrice,
  });
  const newOrder = await order.save();
  if (newOrder) {
    res.send(newOrder);
  } else {
    res.status(401).send({ msg: 'Invalid Seller Data.' });
  }
});

router.get('/stuff', async (req, res) => {
  const orders = await Order.find({});
  res.send(orders);
});

export default router;
