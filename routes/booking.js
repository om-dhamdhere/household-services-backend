const router=require("express").Router();
let Booking=require("../models/booking.model");

router.route("/").get((req, res)=>{
    Booking.find()
        .then(bookings=>res.json(bookings))
        .catch(err=>res.status(400).json("Error: "+err));
});


//An API to create and insert all the data into database using key-value pairs
router.route("/add").post((req, res)=>{
    const fname=req.body.fname;
    const lname=req.body.lname;
    const email=req.body.email;
    const date=req.body.date;
    const service=req.body.service;

    const newBooking=new Booking({ fname, lname, email, date, service });

    newBooking.save()
        .then(()=> res.json("Booking Succesful!"))
        .catch(err => res.status(400).json("Error "+ err))
});

//function to fetch data with the help of id created
router.route("/:id").get((req,res)=>{
    Booking.findById(req.params.id)
        .then(bookings=>res.json(bookings))
        .catch(err=>res.status(400).json("Error: "+ err));
});

//function to delete data with the help of id created
router.route("/:id").delete((req,res)=>{
    Booking.findByIdAndDelete(req.params.id)
    .then(()=> res.json("Booking Removed!"))
    .catch(err => res.status(400).json("Error "+ err))
})

//function to update data with the help of id created
router.route('/update/:id').post((req, res) => {
    Booking.findById(req.params.id)
      .then(bookings => {
        bookings.fname = req.body.fname;
        bookings.lname = req.body.lname;
        bookings.email = req.body.email;
        bookings.date = req.body.date;
        bookings.service=req.body.service;
  
        bookings.save()
          .then(() => res.json('Booking updated!'))
          .catch(err => res.status(400).json('Error: ' + err));
      })
      .catch(err => res.status(400).json('Error: ' + err));
  });

module.exports=router;