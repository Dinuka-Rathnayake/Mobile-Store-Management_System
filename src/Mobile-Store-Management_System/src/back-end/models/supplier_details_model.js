const mongoose = require("mongoose")
const Schema = mongoose.Schema
const supplier_details_Schema = new Schema({
    SupplierId : {
        type : String,
        required : true
    },
    SupplierName : {
        type : String,
        required : true
    },

    /* Password : {
        type : String,
        required : false
    }, */
    Email:{
        type: String,
        required: true
    },
    PhoneNumber:{
        type: Number,
        required: true
    },
    SupplierAddress:{
        type: String,
        required: true
    },
    ItemType1:{
        type: String,
        required: true
    },
    ItemType2:{
        type: String,
        required: false
    },
    ItemType3:{
        type: String,
        required: false
    }
})

const supplier_details= mongoose.model("supplier_details",supplier_details_Schema)
module.exports = supplier_details
