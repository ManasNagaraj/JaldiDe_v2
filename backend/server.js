import express from 'express';
import data from './data.json';
import dotenv from 'dotenv';
import config from './config.js';
import mongoose from 'mongoose';

import userRoute from './routes/userRoute.js';
import bodyParser from 'body-parser';

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

app.get("/api/shops", (req, res) => {
    res.send(data.shops);
});

app.get("/api/shops/:id", (req, res) => {
    const shopID = req.params.id;
    const shop = data.shops.find(x=> x._id === shopID);
    if(shop)
        res.send(shop);
    else
        res.status(404).send({ msg: "Shop not found! "})
});


app.listen(5000, () => console.log("Server started at port 5000"));