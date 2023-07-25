var Validator =require("validator");
var isEmpty = require("is-empty");

module.exports = function validateRegisterInput(data){
    
    let errors = {}

    // Convert empty fields to an empty string so we can use validator functions
    data.name = !isEmpty(data.name) ? data.name : "";
    data.email = !isEmpty(data.email) ? data.email : "";
    data.password = !isEmpty(data.password) ? data.password : "";
    data.passwordSec = !isEmpty(data.passwordSec) ? data.passwordSec : "";

    //Name validation
    if(Validator.isEmpty(data.name)){
        errors.message = "Name field is required";
    }

    //Email validation
    if(Validator.isEmpty(data.email)){
        errors.message = "Email field is required";
    }else if(!Validator.isEmail(data.email)){
        console.log(data.email);
        errors.message = "Email is invalid";
    }

    //Password validation
    if(Validator.isEmpty(data.password)){
        errors.message = "Password field is required";
    }

    if(Validator.isEmpty(data.passwordSec)){
        errors.message = "Confirm Password field is required";
    }

    if(!Validator.isLength(data.password,{min:6,max:30})){
        errors.message = "Password must be at least 6 characters";
    }

    if(!Validator.equals(data.password, data.passwordSec)){
        errors.message = "Passwords must match";
    }

    return{
        errors,
        isValid:isEmpty(errors)
    };
};


