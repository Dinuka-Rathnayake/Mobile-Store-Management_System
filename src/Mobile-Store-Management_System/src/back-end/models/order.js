const mongoose = require('mongoose');
 
const Schema =  mongoose.Schema;

const order = new Schema({

   orderId : {
       type : String,
       required:true

   },

   name : {
       type : String,
       required:true
   },

   quentity : {
       type : Number,
       required:true
   },

   idno : {
       type : Number,
       required:true
   },

   adress : {
       type : String,
       required:true
   },


})

const Order = mongoose.model("Order",order);
module.exports = Order;