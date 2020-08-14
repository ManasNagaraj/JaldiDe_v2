import express from 'express';
import Shop from '../models/shopModel.js';

const router = express.Router();

// @route    GET api/shop
// @desc     give all the listed shops
// @access   Private
router.get('/', async (req, res) => {
  const shops = await Shop.find({});
  res.send(shops);
});

// @route    GET api/shop/:id
// @desc     Details fetch based on shop ID
// @access   Private
router.get('/:id', async (req, res) => {
  const shopID = req.params.id;
  const shop = await Shop.findOne({ _id: shopID });
  if (shop) res.send(shop);
  else res.status(404).send({ msg: 'Shop not found! ' });
});

// @route    POST api/shop/create/:id
// @desc     Create Shop
// @access   Private
router.post('/create/:id', async (req, res) => {
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

// @route    POST api/shop/addproducts/:id
// @desc     add products to the shopID
// @access   Private
router.post('/addproducts/:id', async (req, res) => {
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

// @route    PUT api/shop/addproducts/:id/:productid
// @desc     update the existing product details in shopID
// @access   Private
router.put('/addproducts/:id/:productid', async (req, res) => {
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

// @route    DELETE api/shop/deleteproducts/:id/:productid
// @desc     delete a product from the shopID
// @access   Private
router.delete('/deleteproducts/:id/:productid', async (req, res) => {
  try {
    const shop = await Shop.findOne({ seller_id: req.params.id });
    if (shop) {
      const prod = await shop.productItems.find(
        (productItems) => productItems.id === req.params.productid
      );

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

export default router;
