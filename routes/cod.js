const router=require("express").Router();
let Cod=require("../models/cod.model");

router.route("/").get((req, res)=>{
    Cod.find()
        .then(cod=>res.json(cod))
        .catch(err=>res.status(400).json("Error: "+err));
});


//An API to create and insert all the data into database using key-value pairs
router.route("/add").post((req, res)=>{
    const address1=req.body.address1;
    const address2=req.body.address2;
    const city=req.body.city;
    const pin=req.body.pin;
    const state=req.body.state;

    const newCod=new Cod({ address1,address2,city,pin,state });

    newCod.save()
        .then(()=> res.json("Booking Succesful!"))
        .catch(err => res.status(400).json("Error "+ err))
});

//function to fetch data with the help of id created
router.route("/:id").get((req,res)=>{
    Cod.findById(req.params.id)
        .then(cod=>res.json(cod))
        .catch(err=>res.status(400).json("Error: "+ err));
});

module.exports=router;