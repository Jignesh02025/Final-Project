import cartCollection from '../model/cartitem.js'

export const storeCartCollection = async (req, res) => {
  try {
    const { user_id, image, title, price, product_id } = req.body;
    console.log(product_id)

    let currentItem = await cartCollection.findOne({ product_id });
    console.log(currentItem)
    if (currentItem) {
      currentItem.qut = currentItem.qut + 1;
      currentItem.total = currentItem.price * currentItem.qut;
      await currentItem.save();
      
      return res.status(200).json({ message: "Quantity updated in cart." });
    } else {
      const CartStore = new cartCollection({
        product_id,
        user_id,
        image,
        title,
        price,
        qut: 1,
        total: price * 1
      });
      
      await CartStore.save();
      return res.status(200).json({ message: "Cart item inserted." });
    }
  } catch (error) {
    console.error("Error inserting cart:", error);
    res.status(500).json({ message: "Cart Not Inserted", error: error.message });
  }
};


export const getCartCollection = async (req, res) => {
  try {
    const { user_id } = req.params;
    const cartcol = await cartCollection.find({ user_id })
    if(cartcol){
      res.status(200).json(cartcol)
    }
    else{
      console.log("No Data In Cart")
    }
  } catch (error) {
    console.log(error.message)
    res.status(500).json({ message: "Cart Data Not Fetching.." })
  }
}

export const removeCartItem = async (req, res) => {
  try {
    const { _id, user_id } = req.body;
    if (!_id || !user_id) {
      return res.status(400).json({ message: "Missing _id or userId" });
    }
    const cartItem = await cartCollection.findById(_id);
    if (!cartItem) return res.status(404).json({ message: "Item not found" });
    console.log(cartItem)
    if (cartItem.qut > 1) {
      cartItem.qut -= 1;
      cartItem.total = cartItem.price * cartItem.qut;
      await cartItem.save();
    } else {
      await cartItem.deleteOne({ _id });
    }
    const UpdateCart = await cartCollection.find({user_id })
    console.log(UpdateCart)
    res.status(200).json({ message: "Quatity Update", cart: UpdateCart });

  } catch (err) {
   console.error("Remove cart error:", err);
    if (!res.headersSent) { // ✅ Prevent double send
      return res.status(500).json({ message: "Server error" });
    }}
};
