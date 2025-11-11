import mongoose from "mongoose";

const CartItemSchema = new mongoose.Schema({
  product_id: String,
  user_id: String,
  image : String,
  title : String,
  price : Number,
  qut : Number,
  total : Number
})

const Cartitem = mongoose.model("CartCollection", CartItemSchema);

export default Cartitem;