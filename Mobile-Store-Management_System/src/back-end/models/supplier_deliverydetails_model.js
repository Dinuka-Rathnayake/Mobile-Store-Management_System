const mongoose = require("mongoose")
const Schema = mongoose.Schema
const supplier_deliverydetails_Schema = new Schema({
    SupplierId : {
        type : String,
        required : true
    },
    DeliveryDate : {
        type : String,
        required : true
    },
    Quentity:{
        type: String,
        required: true
    },
    Items:{
        type: String,
        required: true
    },
   
})

const supplier_deliverydetails = mongoose.model("supplier_deliverydetails",supplier_deliverydetails_Schema)
module.exports = supplier_deliverydetails