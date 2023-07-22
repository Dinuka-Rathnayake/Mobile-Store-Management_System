const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Salary = new Schema({


    Employeeid :{
        type:String,
        required : true
    },
    RatePerHour :{
        type : String,
        required : true
    },
    
    HourPerDay : {
        type : String,
        required : true
    },

    NumberOfWokingDays : {
        type : String,
        required : true
    },

    GrossSalary : {
        type : String,
        required : true
    },

    Deduction : {
        type : String,
        required : true
    },

    NetSalary :{
        type : String,
        required : true
    },

    
})

const salarySchema = mongoose.model("Salary",Salary);

module.exports = {Salary: salarySchema};