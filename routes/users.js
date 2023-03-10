const router=require("express").Router();
let User=require("../models/user.model");
const { route } = require("./booking");

router.route("/").get((req, res)=>{
    User.find()
        .then(users=>res.json(users))
        .catch(err=>res.status(400).json("Error: "+err));
});

//function to insert user data into database
router.route("/add").post((req, res)=>{
    const fname=req.body.fname;
    const lname=req.body.lname;
    const email=req.body.email;
    const password=req.body.password

    const newUser=new User({ fname, lname, email, password });

    newUser.save()
        .then(()=> res.json("User added!"))
        .catch(err => res.status(400).json("Error "+ err))
});

//function to get user data from database using id
router.route("/:id").get((req,res)=>{
    User.findById(req.params.id)
        .then(users=>res.json(users))
        .catch(err=>res.status(400).json("Error: "+ err));
});

//function to delete user data from database using id
router.route("/:id").delete((req,res)=>{
    User.findByIdAndDelete(req.params.id)
    .then(()=> res.json("User Deleted!"))
    .catch(err => res.status(400).json("Error "+ err))
})

//function to update user data from database using id
router.route('/update/:id').post((req, res) => {
    User.findById(req.params.id)
      .then(users => {
        users.fname = req.body.fname;
        users.lname = req.body.lname;
        users.email = req.body.email;
        users.password = req.body.password;
  
        users.save()
          .then(() => res.json('User updated!'))
          .catch(err => res.status(400).json('Error: ' + err));
      })
      .catch(err => res.status(400).json('Error: ' + err));
  });

    /* This function is used to validate user data.
    If user-data is present in database then it is searched and hence matched on the login page.
    If the data is not present then user not found message is displayed*/
    router.route("/login").post((req,res)=>{
        console.log(req.body);
        User.find({email: req.body.email, password: req.body.password}, function (err, result) {
            if (err){
                console.log(err);
            }
            else
            {
                if(result.length==0)
                {
                    return res.json({
                        "message": "User Not Found!"
                    })
                }
                console.log(result);
                return res.json({
                    "message": "Login Succesfull!",
                    "token": result[0].email
                })   
            }
    })})

module.exports=router;