// TO DO:- Routing needs to be done for some requests
import express from 'express';
import dotenv from 'dotenv';
import config from './config.js';
import mongoose from 'mongoose';
import userRoute from './routes/userRoute.js';
import sellerRoute from './routes/sellerRoute.js';
import bodyParser from 'body-parser';
import Shop from './models/shopModel.js';
import uploadRoute from './routes/uploadRoute.js';

dotenv.config();

const mongodbUrl = config.MONGODB_URL;
mongoose
  .connect(mongodbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .catch((error) => console.log(error.reason));

const app = express();

app.use(bodyParser.json());
app.use('/api/users', userRoute);
app.use('/api/seller', sellerRoute);

app.get('/api/shops', async (req, res) => {
  // res.send(data.shops);
  const shops = await Shop.find({});
  res.send(shops);
});

app.get('/api/shops/:id', async (req, res) => {
  const shopID = req.params.id;
  const shop = await Shop.findOne({ _id: shopID });
  if (shop) res.send(shop);
  else res.status(404).send({ msg: 'Shop not found! ' });
});

//Seller Creates Shop
app.post('/createshop/:id', async (req, res) => {
  const shop = new Shop({
    seller_id: req.params.id,
    name: req.body.name,
    description: req.body.desc,
  });
  shop.category.push(req.body.category);

  const newShop = await shop.save();
  if (newShop) {
    return res
      .status(201)
      .send({ message: 'New Product Created', data: newShop });
  }
  return res.status(500).send({ message: ' Error in Creating Product.' });
});

//Add new Product to a Shop
app.post('/addproducts/:id', async (req, res) => {
  const shop = await Shop.findOne({
    seller_id: req.params.id,
  });
  if (shop) {
    shop.productItems.push({
      pname: req.body.pname,
      pdesc: req.body.pdesc,
      pprice: req.body.pprice,
      image: req.body.image,
    });
    shop.save();
    res.send(shop);
  }
});

//Product Update
app.put('/addproducts/:id/:productid', async (req, res) => {
  await Shop.updateOne(
    { 'productItems._id': req.params.productid },
    {
      $set: {
        'productItems.$.pname': req.body.pname,
        'productItems.$.pdesc': req.body.pdesc,
        'productItems.$.pprice': req.body.pprice,
        'productItems.$.image': req.body.image,
      },
    }
  ).then(res.send('Success in Updating Product'));
});

//Product Delete
app.delete('/deleteproducts/:id/:productid', async (req, res) => {
  try {
    const shop = await Shop.findOne({ seller_id: req.params.id });
    if (shop) {
      const prod = await shop.productItems.find(
        (productItems) => productItems.id === req.params.productid
      );
      // Make sure comment exists

      // res.send(prod)
      // if (!prod) {
      //     return res.status(404).json({ msg: 'Product does not exist' });
      // }

      shop.productItems = shop.productItems.filter(
        ({ id }) => id !== req.params.productid
      );
      await shop.save();
    }
  } catch (err) {
    console.error(err.message);
    return res.status(500).send('Server Error');
  }
});

app.use('/addproducts/api/upload', uploadRoute);
app.listen(5000, () => console.log('Server started at port 5000'));
