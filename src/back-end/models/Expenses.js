const mongoose = require('mongoose');

const Schema = mongoose.Schema;
// create object
//backend validation

const expenseSchema = new Schema({

    billID:{
        type: String,
        required: true
    },
    date  :{
        type:String,
        required: true
    },
    payee :{
        type:String,
        required: true
    },
    amount :{
        type:Number,
        required: true
    },
    description :{
        type:String,
        required: true
    }

})

//added this line for solve error
mongoose.models = {};

//edited
const Expenses =  mongoose.model.Expenses || mongoose.model('Expenses', expenseSchema);
module.exports = Expenses;