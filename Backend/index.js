import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import Dataroute from './route/data.route.js';
import Userroute from './route/user.route.js';
import cartRoute from './route/cartitem.route.js'
import cors from 'cors'
import Stripe from 'stripe';
const app = express()

app.use(express.json());

dotenv.config()

app.use(cors());

const port = process.env.port || 4001;
const db = process.env.Db
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);
// console.log(stripe)
try {
  mongoose.connect(db);
  console.log("Database Connection Successful");
} catch (error) {
  console.log(error);
}

app.post("/create-checkout-session", async (req, res) => {
  let { Amount } = req.body;

  if (!Amount) {
    return res.status(400).json({ error: "Amount is required" });
  }

  Amount = Number(Amount);

  if (isNaN(Amount) || Amount <= 0) {
    return res.status(400).json({ error: "Invalid amount value" });
  }

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: "Demo Product",
            },
            unit_amount: Amount,
          },
          quantity: 1,
        },
      ],
      success_url: "http://localhost:3000/cart",
      cancel_url: "http://localhost:3000/cart",
    });

    res.json({ id: session.id, url: session.url });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

// Defining Route
app.use("/data", Dataroute);
app.use("/user", Userroute);
app.use("/CartCollection", cartRoute);

app.listen(port, "0.0.0.0", () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})
