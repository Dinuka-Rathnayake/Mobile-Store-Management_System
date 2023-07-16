//const router = require("express").Router();
const express = require("express")
const router = express.Router()
const {Salary} = require("../models/salary_model");



//http://localhost:8070/Salary/adding
//add
router.route("/adding").post(async(req,res)=>{
    try {
        const Employeeid = req.body.Employeeid;
        const RatePerHour = req.body.RatePerHour;
        const HourPerDay = req.body.HourPerDay;
        const NumberOfWokingDays = req.body.NumberOfWokingDays;
        const GrossSalary = req.body.GrossSalary;
        const Deduction = req.body.Deduction;
        const NetSalary = req.body.NetSalary;
       


        const test = await Salary.create({
            Employeeid,
            RatePerHour,
            HourPerDay,
            NumberOfWokingDays,
            GrossSalary,
            Deduction,
            NetSalary,
            
        })

        return res.status(200).json({
            status: '200',
            data:test,
            message: 'Success',
          });

    } catch (error) {
        console.log(error)

        return res.status(500).json({
            status: '500',
            data:null,
            message: 'Something went wrong, please try again later ',
          });
    }


})

//http://localhost:8060/Salary

//display
router.route("/").get((req,res)=>{
    Salary.find().then((Salary)=>{
        res.json(Salary)
    }).catch((err)=>{
       res.json(err)
    })
})

// //http://localhost:8060/Employee/update/0001


// //update
// router.route("/update/:id").put(async(req,res)=>{
//     let userid = req.params.id;
//     const {Employee_Name,Email_Address,Registation_Date,Monthly_Salary,Employee_id,
//         Employee_PW} = req.body;

//     const updateEmployee = {
//             Employee_id,
//             Employee_PW,
//             Employee_Name,
//             Email_Address,
//             Registation_Date,
//             Monthly_Salary
//     }

//     const update = await employee.findByIdAndUpdate(userid,updateEmployee)
//     .then(()=>{
//         res.status(200).send({status:"user updated"})
//     }).catch((err)=>{
//         console.log(err);
//         res.status(500).send({status:"Error with updating data",error: err.message});
//     }) 
// })
// //delete
// router.route("/delete/:id").delete(async(req,res)=>{
//    let userid = req.params.id;
   
//    await employee.findByIdAndDelete(userid)
//    .then(()=>{
//         res.status(200).send({status: "user deleted"});
//    }).catch((err)=>{
//     console.log(err.massage);
//     res.status(500).send({status: "Error with delete user", error: err.message});
//    })
// })



// router.route("/get/:id").get(async(req,res)=>{
//     let userid = req.params.id;
//     const user = await employee.findById(userid)
//     .then((employee)=>{
//         res.status(200).send({statusbar: "user fetched"})
//     }).catch(()=>{console.log(err.message);
//         res.status(500).send({status: "Error with get user",error: err.message});

//     })
// })

module.exports=router