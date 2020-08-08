import express from 'express';
import data from './data.json';
import dotenv from 'dotenv';
import config from './config.js';
import mongoose from 'mongoose';

import userRoute from './routes/userRoute.js';
import sellerRoute from './routes/sellerRoute.js';
import bodyParser from 'body-parser';
import Shop from './models/shopModel.js';

dotenv.config();

const mongodbUrl = config.MONGODB_URL;
mongoose.connect(mongodbUrl,  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  }  ).catch(error => console.log(error.reason));

const app = express();

app.use(bodyParser.json());
app.use("/api/users", userRoute);
app.use("/api/seller", sellerRoute);

app.get("/api/shops",async (req, res) => {
    // res.send(data.shops);
    const shops = await Shop.find({});
    res.send(shops);
});

app.get("/api/shops/:id", async(req, res) => {
    const shopID = req.params.id;
    const shop = await Shop.findOne({_id: shopID})
    if(shop)
        res.send(shop);
    else
        res.status(404).send({ msg: "Shop not found! "})
});

// app.get("/createshop/:id", async (req, res) => {
//     try{
//       const sel_id = req.params.id;
//       const shop = new Shop();
//       shop.shopName = 'fuckkkkking shopppppp 4';
//       shop.seller_id = sel_id;
//       shop.products.push({pname:"aa 4",pdesc:"aaaa 4"});
//       const newShop = await shop.save();
//       res.send(newShop)
//     }catch (error) {
//       res.send({ msg: error.message });
//     }
//   });

app.post("/createshop/:id", async (req, res) => {
    // res.send(req.body._id)   
  const shop = new Shop({
    seller_id: req.params.id,
    name: req.body.name,
    description: req.body.desc,
  });
  shop.category.push(req.body.category);

  const newShop = await shop.save();
  if (newShop) {
    return res.status(201).send({ message: 'New Product Created', data: newShop });
  }
  return res.status(500).send({ message: ' Error in Creating Product.' });
})

app.post("/addproducts/:id", async (req, res) => {

    const shop = await Shop.findOne({
        seller_id: req.params.id
    });
    if(shop)
    {
    shop.productItems.push({pname:req.body.pname ,pdesc:req.body.pdesc,pprice:req.body.pprice});
    shop.save();
    res.send(shop);
    }
})



// app.get("/everything" , async (req,res) => {
//     const shop = await Shop.find({});
//     res.send(shop);
// })

app.listen(5000, () => console.log("Server started at port 5000"));