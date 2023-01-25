require("dotenv").config();
const express = require("express");
// const Razorpay = require("razorpay");
const Stripe = require('stripe')(process.env.SECRET_KEY);  //fetching the stripe secret key from .env file

const router = express.Router();

//posting all the data on /payment url 
router.route('/payment').post(async (req, res) => {
    let status, error;
    const { token, amount } = req.body;
    try {
      await Stripe.charges.create({
        source: token.id,
        amount,
        currency: 'inr',
      });
      status = 'success';
    } catch (error) {
      console.log(error);
      status = 'Failure';
    }
    res.json({ error, status });
  });

module.exports=router;