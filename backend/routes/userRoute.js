import express from 'express';
import User from '../models/userModel.js';
import { getToken } from '../auth/User_util.js';
import Shop from '../models/shopModel.js';

const router = express.Router();

// @route    POST api/user/signin
// @desc     User Signin
// @access   Private
router.post('/signin', async (req, res) => {
  try {
    const signinUser = await User.findOne({
      email: req.body.email,
      password: req.body.password,
    });

    if (signinUser) {
      res.send({
        _id: signinUser.id,
        name: signinUser.name,
        email: signinUser.email,
        token: getToken(signinUser),
      });
    } else {
      res.status(401).send({ msg: 'Invalid Email or Password.' });
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).send('server error');
  }
});

// @route    POST api/user/register
// @desc     User Register
// @access   Private
router.post('/register', async (req, res) => {
  try {
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });
    const newUser = await user.save();
    if (newUser) {
      res.send({
        _id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        token: getToken(newUser),
      });
    } else {
      res.status(401).send({ msg: 'Invalid User Data.' });
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).send('server error');
  }
});

//random stuff might remove later

// @route    POST api/orders
// @desc     Create an order
// @access   Private
router.get('/stuff1', async (req, res) => {
  try {
    const shop = await Shop.findOne({
      _id: '5f2aff9027c38862cc6bbfd0',
    });
    if (shop) {
      shop.products.push({ pname: 'aa 2', pdesc: 'aaaa 2' });
      res.send(shop);
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).send('server error');
  }
});

export default router;
