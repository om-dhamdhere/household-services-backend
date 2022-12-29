const { default: mongoose } = require("mongoose");

const bookingSchema=new mongoose.Schema({
        fname:{ type: String, required:true },

        lname:{ type: String, required:true} ,

        email:{ type: String, required:true },

        date:{ type: Date, required:true },

        service:{ type: Number, required:true },
    },{
        timestamps:true,
});

const Booking=mongoose.model("Booking",bookingSchema);
module.exports=Booking;