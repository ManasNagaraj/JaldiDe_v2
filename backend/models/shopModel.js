import mongoose from 'mongoose';

const shopSchema = new mongoose.Schema({
  seller_id: { type: mongoose.Schema.Types.ObjectId },
  name: { type: String, required: true },
  description: { type: String, required: true },
  //image: { type: String, required: true },

  category: [{ type: String, required: true }],
  productItems: [
    {
      pname: String,
      pdesc: String,
      pprice: Number,
      image: String,
    },
  ],
});

const shopModel = mongoose.model('Shop', shopSchema);

export default shopModel;
