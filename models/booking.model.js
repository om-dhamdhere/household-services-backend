const { default: mongoose } = require("mongoose");


//defining the database schema for booking model
const bookingSchema=new mongoose.Schema({
        fname:{ type: String, required:true },

        lname:{ type: String, required:true} ,

        email:{ type: String, required:true },

        date:{ type: Date, required:true },

        enddate:{type: Date, required:true},

        // service:{ type: Number, required:true },
    },{
        timestamps:true,
});

const Booking=mongoose.model("Booking",bookingSchema);
module.exports=Booking;