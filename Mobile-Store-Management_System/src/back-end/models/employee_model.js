const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const employee2 = new Schema({

    
    Employee_Name : {
        type : String,
        required : true
    },

    Email_Address : {
        type : String,
        required : true
    },

    Registation_Date : {
        type : String,
        required : true
    },

    Phone_no : {
        type : Number,
        required : true
    },

    Employee_id :{
        type:String,
        required : true
    },

    Employee_PW :{
        type:String,
        required : true
    },

    Department :{
        type:String,
        required : true
    }
})

const employeeSchema = mongoose.model("Employee",employee2);

module.exports = {Employee: employeeSchema};