import mongoose from "mongoose";

const dataschema =new mongoose.Schema({
    id: Number,
    name: String,
    category: String,
    image: String,
    new_price: Number,
    old_price: Number,
});
const Data = mongoose.model("Data", dataschema);

export default Data; 