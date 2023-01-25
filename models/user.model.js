const { default: mongoose } = require("mongoose");

//defining the database schema for signup model
const userSchema=new mongoose.Schema({
        fname:{ type: String, required:true },

        lname:{ type: String, required:true} ,

        email:{ type: String, required:true },

        password:{ type: String, required:true },
    },{
        timestamps:true,
});

const User=mongoose.model("User",userSchema);
module.exports=User;