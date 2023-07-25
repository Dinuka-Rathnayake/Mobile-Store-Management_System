const mongoose = require("mongoose")
const Schema = mongoose.Schema
const supplier_deliverydetails_Schema = new Schema({
    User_Id : {
        type : String,
        required : true
    },
    Delivery_Date : {
        type : Number,
        required : true
    },
    quentity:{
        type: String,
        required: true
    },
    Item_Types:{
        type: String,
        required: true
    },
   
})

const supplier_deliverydetails = mongoose.model("supplier_deliverydetails",supplier_deliverydetails_Schema)
module.exports = supplier_deliverydetails