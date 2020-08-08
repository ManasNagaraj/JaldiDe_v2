import express from 'express';
import User from '../models/userModel.js';
import { getToken } from '../User_util.js';
import Shop from '../models/shopModel.js';

const router = express.Router();

router.post('/signin', async (req, res) => {

  const signinUser = await User.findOne({
    email: req.body.email,
    password: req.body.password
  });
  
  if (signinUser) {
    res.send({
      _id: signinUser.id,
      name: signinUser.name,
      email: signinUser.email,
      token: getToken(signinUser)
    })

  } else {
    res.status(401).send({ msg: 'Invalid Email or Password.' });
  }

})

router.post('/register', async (req, res) => {
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password
  });
  const newUser = await user.save();
  if (newUser) {
    res.send({
      _id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      token: getToken(newUser)
    })
  } else {
    res.status(401).send({ msg: 'Invalid User Data.' });
  }
})





router.get("/stuff1", async (req, res) => {
  const shop = await Shop.findOne({
    _id: "5f2aff9027c38862cc6bbfd0"
  });
  if(shop)
  {
    shop.products.push({pname:"aa 2",pdesc:"aaaa 2"});
    res.send(shop);
  }
});

export default router; 

// router.get("/createadmin", async (req, res) => {
//   try {
//     const user = new User({
//       name: 'Basir',
//       email: 'basir.jafarzadeh@gmail.com',
//       password: '1234',
//     });
//     const newUser = await user.save();
//     res.send(newUser);
//   } catch (error) {
//     res.send({ msg: error.message });
//   }
// });