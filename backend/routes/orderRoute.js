import express from 'express';
import Shop from '../models/shopModel.js';
import Order from '../models/orderModel.js';
import { isAuth } from '../middleware/jwtauth.js';

const router = express.Router();

// @route    POST api/orders
// @desc     Create an order
// @access   Private
router.post('/', isAuth, async (req, res) => {
  try {
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
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

// @route    GET api/orders/:id
// @desc     show order on the DashBoard
// @access   Private
router.get('/:id', async (req, res) => {
  try {
    const shop = await Shop.findOne({
      seller_id: req.params.id,
    });

    console.log(shop._id);
    const order = await Order.find({
      'cartItems.shop_id': shop._id,
    });
    console.log(order);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('server error');
  }
});

export default router;
