import express from 'express';
import dotenv from 'dotenv';
import userRoute from './routes/userRoute.js';
import sellerRoute from './routes/sellerRoute.js';
import bodyParser from 'body-parser';
import mongoConnect from './databaseConfig/mongodb.js';
import uploadRoute from './routes/uploadRoute.js';
import orderRoute from './routes/orderRoute.js';
import shopRoute from './routes/shopRoute.js';

try {
  dotenv.config();

  mongoConnect();

  const app = express();

  app.use(bodyParser.json());
  app.use('/api/users', userRoute);
  app.use('/api/seller', sellerRoute);
  app.use('/api/orders', orderRoute);
  app.use('/api/shops', shopRoute);
  app.use('/addproducts/api/upload', uploadRoute);
  app.listen(5000, () => console.log('Server started at port 5000'));
} catch (error) {
  console.error(error.message);
  process.exit(1);
}
