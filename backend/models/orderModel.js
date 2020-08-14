import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  cartItems: [
    {
      shop_id: { type: mongoose.Schema.Types.ObjectId },
      pname: String,
      pdesc: String,
      pprice: String,
      image: String,
      product: { type: mongoose.Schema.Types.ObjectId },
    },
  ],
  shipping: {
    address: String,
    city: String,
    pincode: Number,
    country: String,
  },
  total: { type: Number, default: 0 },
  isPaid: { type: Boolean, default: false },
  deliveryStatus: { type: Boolean, default: false },
  Accepted: { type: Boolean, default: false },
  time: {
    type: Date,
    default: Date.now,
  },
});

const orderModel = mongoose.model('Order', orderSchema);

export default orderModel;
