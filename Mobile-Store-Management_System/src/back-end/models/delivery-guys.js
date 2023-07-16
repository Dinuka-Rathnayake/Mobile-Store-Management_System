 const mongoose = require('mongoose');
 
 const Schema =  mongoose.Schema;

 const deliveryGuys = new Schema({

    name : {
        type : String,
        required:true

    },

    adress : {
        type : String,
        required:true
    },

    idno : {
        type : Number,
        required:true
    },

    mobile : {
        type : Number,
        required:true
    },

    age : {
        type : Number,
        required:true
    },


 })

const delivery = mongoose.model("Delivery_guy",deliveryGuys);
module.exports = delivery;