import express from 'express';
import { getToken } from '../auth/Seller_util.js';
import Seller from '../models/sellerModel.js';

const router = express.Router();

// @route    POST api/seller/signin
// @desc     Seller Sign In
// @access   Private
router.post('/signin', async (req, res) => {
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
      token: getToken(signinSeller),
    });
  } else {
    res.status(401).send({ msg: 'Invalid Email or Password.' });
  }
});

// @route    POST api/seller/register
// @desc     Seller Register
// @access   Private
router.post('/register', async (req, res) => {
  const seller = new Seller({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });
  const newSeller = await seller.save();
  if (newSeller) {
    res.send({
      _id: newSeller.id,
      name: newSeller.name,
      email: newSeller.email,
      isAdmin: newSeller.isAdmin,
      token: getToken(newSeller),
    });
  } else {
    res.status(401).send({ msg: 'Invalid Seller Data.' });
  }
});

export default router;
