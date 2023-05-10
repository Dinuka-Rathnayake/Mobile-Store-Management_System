const mongoose = require('mongoose');


const Schema = mongoose.Schema;

const customerschema = new Schema({

name : {
       type : String,
       required : true
},

id : { 

    type : Number,
    required : true
},
email : {

    type : String,
    required : true 
},
inquiry : {

    type : String,
    required : true
},
responding : {
    type : String,
    required : true 
},

}) 

const customer = mongoose.model("customer",customerschema);



module.exports = customer;

 