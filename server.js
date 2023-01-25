//importing all the required libraries
const express=require("express");
const cors=require("cors");
const mongoose=require("mongoose"); 
var path = require('path');
const stripe = require("stripe")("sk_test_51MHMreSGvcAlF106TrHc2PSSlpGhyvDtBjh7Zz46UCiwsYD4WDyYNTmZlQ67YWHRn55bgQrBnGFdT5X4Anu1l7kk00I4jHxTx7")
const uuid = require("uuid").v4

var createError = require('http-errors');

var indexRouter = require('./routes/index');

require("dotenv").config();  //using the keys stored in .env file

const app=express();
const port=process.env.PORT || 5000;  //running our server on port 5000

app.use(cors());
app.use(express.json());

const uri=process.env.ATLAS_URI;
mongoose.connect(uri, {useNewUrlParser: true});

//API to create MongoDB database connection
const connection=mongoose.connection;
connection.once('open', ()=>{
    console.log("Mongoose database connection successful");
})

const userRouter=require("./routes/users");
const bookRouter=require("./routes/booking");


app.use(`/`, indexRouter);
app.use("/users", userRouter);
app.use("/bookings", bookRouter);

//function to check whether server is running or not
app.listen(port, ()=>{
    console.log(`Server is running on port: ${port}`);  
});


//function to post(display) data related to stripe payment gateway
app.post("/checkout", async(req,res)=>{
    console.log(req.body)
    let error, status
      try{
          const {service,token}=req.body

          const customer = await stripe.customers.create({
            email: token.email,
            source: token.id
          })

          const key = uuid()

          const charge = await stripe.charges.create(
            {
                amount: service.price*100,
                currency: "usd",
                customer: customer.id,
                receipt_email: token.email,
                description: `Booked Service ${service.name}`,
                shipping:{
                    name: token.card.name,
                    address: {
                        line1: token.card.address_line1,
                        line2: token.card.address_line2,
                        city: token.card.address_city,
                        country: token.card.address_country,
                        postal_code: token.card.address_zip,
                    },
                },
            },
            {
                key,
            }
          );

          console.log("Charge:",{charge});
          status = "success";
      }
      catch(error)
      {
        console.log(error)
        status = "failure";
      }

      res.json({error, status});
})