const mongoose = require("mongoose")
const Schema = mongoose.Schema
const supplier_details_Schema = new Schema({
    User_Id : {
        type : String,
        required : true
    },
    Password : {
        type : Number,
        required : true
    },
    Email:{
        type: String,
        required: true
    },
    Phone_Number:{
        type: Number,
        required: true
    },
    Address:{
        type: String,
        required: true
    },
    Item_Types:{
        type: String,
        required: true
    }
})

const supplier_details= mongoose.model("supplier_details",supplier_details_Schema)
module.exports = supplier_details
