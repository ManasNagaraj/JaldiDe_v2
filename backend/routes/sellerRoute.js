import express from 'express';
import { getTokenSeller } from '../auth/Seller_util.js';
// import { getTokenUser } from '../auth/User_util.js';
import Seller from '../models/sellerModel.js';

const router = express.Router();

// @route    POST api/seller/signin
// @desc     Seller Sign In
// @access   Private
router.post('/signin', async (req, res) => {
  try {
    const signinSeller = await Seller.findOne({
      email: req.body.email,
      password: req.body.password,
    });
    if (signinSeller) {
      res.send({
        _id: signinSeller.id,
        name: signinSeller.name,
        email: signinSeller.email,
        isAdmin: signinSeller.isAdmin,
        token: getTokenSeller(signinSeller),
      });
    } else {
      res.status(401).send({ msg: 'Invalid Email or Password.' });
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).send('server error');
  }
});

// @route    POST api/seller/register
// @desc     Seller Register
// @access   Private
router.post('/register', async (req, res) => {
  try {
    const seller = new Seller({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      sphone: req.body.sphone,
    });
    const newSeller = await seller.save();
    if (newSeller) {
      res.send({
        _id: newSeller.id,
        name: newSeller.name,
        email: newSeller.email,
        sphone: newSeller.sphone,
        isAdmin: newSeller.isAdmin,
        token: getTokenSeller(newSeller),
      });
    } else {
      res.status(401).send({ msg: 'Invalid Seller Data.' });
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).send('server error');
  }
});

export default router;
