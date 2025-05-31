require('dotenv').config(); // add this on the very top

const express = require('express');
const app = express();

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY); // use env var here

app.use(express.json());

app.post('/create-payment-intent', async (req, res) => {
  const { amount, currency } = req.body;
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
    });
    res.send({ client_secret: paymentIntent.client_secret });
  } catch (e) {
    res.status(500).send({ error: e.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
