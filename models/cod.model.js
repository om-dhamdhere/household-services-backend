const { default: mongoose } = require("mongoose");


//defining the database schema for booking model
const codSchema=new mongoose.Schema({
        address1:{ type: String, required:true },

        address2:{ type: String, required:true} ,

        city:{ type: String, required:true },

        pin:{ type: String, required:true },

        state:{type: String, required:true},

        // service:{ type: Number, required:true },
    },{
        timestamps:true,
});

const Cod=mongoose.model("Cod",codSchema);
module.exports=Cod;