import mongoose from 'mongoose';

const sellerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, dropDups: true },
  password: { type: String, required: true },
});

const sellerModel = mongoose.model("Seller", sellerSchema);

export default sellerModel;